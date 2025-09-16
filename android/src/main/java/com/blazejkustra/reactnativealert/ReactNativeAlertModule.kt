package com.blazejkustra.reactnativealert

import android.content.Context
import android.os.Build
import android.text.InputFilter
import android.text.InputType
import android.view.ContextThemeWrapper
import android.view.ViewGroup
import android.view.WindowManager
import android.view.inputmethod.InputMethodManager
import android.widget.EditText
import android.widget.LinearLayout
import androidx.appcompat.app.AlertDialog
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.module.annotations.ReactModule
import java.lang.ref.WeakReference
import android.util.Log

@ReactModule(name = ReactNativeAlertModule.NAME)
class ReactNativeAlertModule(
  private val reactContext: ReactApplicationContext
) : NativeReactNativeAlertSpec(reactContext), LifecycleEventListener {

  private var dialogRef: WeakReference<AlertDialog?> = WeakReference(null)

  init {
    reactContext.addLifecycleEventListener(this)
  }

  override fun getName() = NAME

  override fun prompt(
    config: ReadableMap,
    onError: Callback,
    onAction: Callback
  ) {
    // Prevent multiple dialogs from being shown at once
    if (dialogRef.get()?.isShowing == true) {
      return
    }

    val activity = currentActivity ?: return
    if (activity.isFinishing || activity.isDestroyed) return

    UiThreadUtil.runOnUiThread {
      if (activity.isFinishing || activity.isDestroyed) return@runOnUiThread

      val themed: Context = if (Build.VERSION.SDK_INT >= 29) {
        // Use system theme on Android 10+ (API 29+)
        activity
      } else {
        // Use AppCompat theme for older versions
        ContextThemeWrapper(activity, androidx.appcompat.R.style.Theme_AppCompat_Dialog_Alert)
      }

      val type = config.getStringOrNull("type") ?: "default"
      val (contentView, usernameInput, mainInput) = buildInputs(themed, type, config)

      val builder = AlertDialog.Builder(themed)
        .setTitle(config.getStringOrNull("title") ?: "")
        .setMessage(config.getStringOrNull("message") ?: "")
        .setCancelable(config.getBooleanOrFalse("cancelable"))

      contentView?.let { builder.setView(it) }

      // map up to 3 buttons: neutral(0), negative(1), positive(2)
      val labels = (config.getArrayOrEmpty("buttons")).collectButtonLabels(max = 3)

      labels.getOrNull(0)?.let { text ->
        builder.setNeutralButton(text) { _, _ ->
          dialogRef.clear()
          onAction.invoke(
            0 /*buttonClicked*/,
            0 /*neutral*/,
            mainInput?.text?.toString(),
            usernameInput?.text?.toString()
          )
        }
      }
      labels.getOrNull(1)?.let { text ->
        builder.setNegativeButton(text) { _, _ ->
          dialogRef.clear()
          onAction.invoke(
            0,
            1 /*negative*/,
            mainInput?.text?.toString(),
            usernameInput?.text?.toString()
          )
        }
      }
      labels.getOrNull(2)?.let { text ->
        builder.setPositiveButton(text) { _, _ ->
          dialogRef.clear()
          onAction.invoke(
            0,
            2 /*positive*/,
            mainInput?.text?.toString(),
            usernameInput?.text?.toString()
          )
        }
      }

      builder.setOnCancelListener {
        dialogRef.clear()
        onAction.invoke(1 /*dismissed*/, -1, null, null)
      }

      val dialog = builder.create()
      dialogRef = WeakReference(dialog)

      // Set window soft input mode to show keyboard
      dialog.window?.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_VISIBLE)

      dialog.show()

      // Show keyboard after dialog is shown
      val firstInput = usernameInput ?: mainInput
      firstInput?.let { input ->
        input.requestFocus()
        input.post {
          val imm = activity.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
          imm.showSoftInput(input, InputMethodManager.SHOW_IMPLICIT)
        }
      }
    }
  }

  // ----- Lifecycle  -----
  override fun onHostResume() = Unit
  override fun onHostPause() = Unit
  override fun onHostDestroy() {
    dialogRef.get()?.let { if (it.isShowing) it.dismiss() }
    dialogRef.clear()
  }

  // ----- Helpers -----
  private val Int.dp: Int
    get() = (this * android.content.res.Resources.getSystem().displayMetrics.density).toInt()

  private fun Context.getThemeColor(attr: Int): Int {
    val typedArray = obtainStyledAttributes(intArrayOf(attr))
    val color = typedArray.getColor(0, 0xFF000000.toInt())
    typedArray.recycle()
    return color
  }

  private data class InputViews(
    val contentView: LinearLayout?,
    val usernameInput: EditText?,
    val mainInput: EditText?
  )

  private fun buildInputs(
    ctx: Context,
    type: String,
    config: ReadableMap
  ): InputViews {
    if (type == "default") return InputViews(null, null, null)

    val layout = LinearLayout(ctx).apply {
      orientation = LinearLayout.VERTICAL
      val horizontalPad = 20.dp
      val verticalPad = 12.dp
      setPadding(horizontalPad, verticalPad, horizontalPad, verticalPad)
      layoutParams = ViewGroup.LayoutParams(
        ViewGroup.LayoutParams.MATCH_PARENT,
        ViewGroup.LayoutParams.WRAP_CONTENT
      )
    }

    val isLogin = type == "login-password"

    val username = if (isLogin) EditText(ctx).apply {
      hint = config.getStringOrNull("usernamePlaceholder") ?: "Username"
      inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD
      config.getIntOrNull("usernameMaxLength")?.takeIf { it > 0 }?.let {
        filters = arrayOf(InputFilter.LengthFilter(it))
      }
      val tintColor = ctx.getThemeColor(android.R.attr.colorControlNormal)
      backgroundTintList = android.content.res.ColorStateList.valueOf(tintColor)
      val margin = 4.dp
      val params = LinearLayout.LayoutParams(
        LinearLayout.LayoutParams.MATCH_PARENT,
        LinearLayout.LayoutParams.WRAP_CONTENT
      ).apply {
        setMargins(0, 0, 0, margin)
      }
      layoutParams = params
      layout.addView(this)
    } else null

    val main = EditText(ctx).apply {
      hint = config.getStringOrNull("placeholder") ?: if (isLogin) "Password" else ""
      inputType = if (type == "secure-text" || isLogin)
        InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_PASSWORD
      else
        InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD
      setText(config.getStringOrNull("defaultValue") ?: "")
      config.getIntOrNull("maxLength")?.takeIf { it > 0 }?.let {
        filters = arrayOf(InputFilter.LengthFilter(it))
      }
      // Apply theme-aware background tint
      val tintColor = ctx.getThemeColor(android.R.attr.colorControlNormal)
      backgroundTintList = android.content.res.ColorStateList.valueOf(tintColor)
      layoutParams = LinearLayout.LayoutParams(
        LinearLayout.LayoutParams.MATCH_PARENT,
        LinearLayout.LayoutParams.WRAP_CONTENT
      )
    }

    // keyboardType only on first field
    applyKeyboardType(username ?: main, config.getStringOrNull("keyboardType"))

    layout.addView(main)
    return InputViews(layout, username, main)
  }

  private fun applyKeyboardType(target: EditText, keyboardType: String?) {
    when (keyboardType) {
      "email-address" -> target.inputType =
        InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS

      "numeric", "number-pad" -> target.inputType = InputType.TYPE_CLASS_NUMBER
      "phone-pad" -> target.inputType = InputType.TYPE_CLASS_PHONE
      "decimal-pad" -> target.inputType =
        InputType.TYPE_CLASS_NUMBER or InputType.TYPE_NUMBER_FLAG_DECIMAL

      "url" -> target.inputType = InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_URI
      "web-search", "twitter" -> target.inputType =
        InputType.TYPE_CLASS_TEXT or InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD

      else -> Unit
    }
  }

  // ReadableMap safe accessors
  private fun ReadableMap.getStringOrNull(key: String): String? =
    if (hasKey(key) && !isNull(key)) getString(key) else null

  private fun ReadableMap.getBooleanOrFalse(key: String): Boolean =
    if (hasKey(key) && !isNull(key)) getBoolean(key) else false

  private fun ReadableMap.getIntOrNull(key: String): Int? =
    if (hasKey(key) && !isNull(key)) getInt(key) else null

  private fun ReadableMap.getArrayOrEmpty(key: String): ReadableArray =
    if (hasKey(key) && !isNull(key)) getArray(key)
      ?: Arguments.createArray() else Arguments.createArray()

  private fun ReadableArray.collectButtonLabels(max: Int): List<String> {
    val out = ArrayList<String>(max)
    val count = kotlin.math.min(max, size())
    for (i in 0 until count) {
      val m = getMap(i)
      val label = m?.getString("text") ?: ""
      out.add(label)
    }
    return out
  }

  companion object {
    const val NAME = "ReactNativeAlert"
  }
}
