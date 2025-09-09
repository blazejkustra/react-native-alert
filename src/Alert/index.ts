import { Alert as RNAlert } from 'react-native';
import ReactNativeAlert from '../NativeReactNativeAlert';

const ACTION = { buttonClicked: 0, dismissed: 1 } as const;
type AlertButton = NonNullable<Parameters<typeof RNAlert.alert>[2]>[number];

/**
 * Android-specific Alert implementation
 * Uses custom native module for both alerts and prompts with Material Design
 */
class Alert {
  /**
   * Launches an alert dialog with the specified title and message.
   * Uses custom native module with Material Design for Android.
   */
  static alert(...args: Parameters<typeof RNAlert.alert>) {
    RNAlert.alert(...args);
  }

  /**
   * Launches a prompt dialog with the specified title and message, allowing the user to enter text.
   * Uses custom native module with Material Design for Android.
   */
  static prompt(
    ...[
      title,
      message,
      callbackOrButtons,
      type,
      defaultValue,
      keyboardType,
      options,
    ]: Parameters<typeof RNAlert.prompt>
  ) {
    // Normalize to button array + parallel callbacks list (kept in JS!)
    let buttons: AlertButton[] = [];
    let callbacks: Array<((text: string) => void) | undefined> = [];

    if (typeof callbackOrButtons === 'function') {
      callbacks = [callbackOrButtons];
      buttons = [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', style: 'default' },
      ];
    } else if (Array.isArray(callbackOrButtons)) {
      buttons = callbackOrButtons.slice(0, 3);
      callbacks = buttons.map((b) => b?.onPress as (text: string) => void);
    } else {
      buttons = [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', style: 'default' },
      ];
    }

    ReactNativeAlert.prompt(
      {
        title: title ?? '',
        message: message ?? undefined,
        cancelable: !!options?.cancelable,
        buttons: buttons.map((b) => ({
          text: b?.text ?? '',
          style: b?.style ?? 'default',
        })),
        type: type ?? 'plain-text',
        defaultValue: defaultValue ?? '',
        keyboardType,
        userInterfaceStyle: options?.userInterfaceStyle ?? 'unspecified',
      },
      console.warn,
      (action: number, buttonKey: number, text?: string | null) => {
        if (action === ACTION.buttonClicked) {
          callbacks[buttonKey]?.(text ?? '');
        } else if (action === ACTION.dismissed) {
          options?.onDismiss?.();
        }
      }
    );
  }
}

export default Alert;
