package com.blazejkustra.reactnativealert

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import java.util.HashMap

class ReactNativeAlertPackage : BaseReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return when (name) {
      ReactNativeAlertModule.NAME -> ReactNativeAlertModule(reactContext)
      else -> null
    }
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
      moduleInfos[ReactNativeAlertModule.NAME] = ReactModuleInfo(
        ReactNativeAlertModule.NAME,
        ReactNativeAlertModule.NAME,
        false, // canOverrideExistingModule
        false, // needsEagerInit
        false, // isCxxModule
        true // isTurboModule
      )
      moduleInfos
    }
  }
}
