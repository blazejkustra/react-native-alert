import { Alert as RNAlert } from 'react-native';
import ReactNativeAlert from './NativeReactNativeAlert';
import type {
  AlertButton,
  AlertOptions,
  PromptButtons,
} from './NativeReactNativeAlert';

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
    title: string,
    message?: string,
    buttons?: PromptButtons,
    type?: 'default' | 'plain-text' | 'secure-text' | 'login-password',
    defaultValue?: string,
    keyboardType?: string
  ) {
    // Convert function callback to button array for native module
    if (typeof buttons === 'function') {
      const callback = buttons;
      buttons = [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', style: 'default', onPress: callback },
      ];
    }

    ReactNativeAlert.prompt(
      title,
      message,
      buttons,
      type,
      defaultValue,
      keyboardType
    );
  }
}

export default Alert;
export type { AlertButton, AlertOptions, PromptButtons };
