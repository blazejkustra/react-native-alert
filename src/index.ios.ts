import { Alert as RNAlert } from 'react-native';
import ReactNativeAlert from './NativeReactNativeAlert';
import type {
  AlertButton,
  AlertOptions,
  PromptButtons,
} from './NativeReactNativeAlert';

/**
 * iOS-specific Alert implementation
 * Uses React Native's built-in Alert for alerts and custom native module for prompts
 */
class Alert {
  /**
   * Launches an alert dialog with the specified title and message.
   * Uses React Native's built-in Alert for iOS.
   */
  static alert(...args: Parameters<typeof RNAlert.alert>) {
    RNAlert.alert(...args);
  }

  /**
   * Launches a prompt dialog with the specified title and message, allowing the user to enter text.
   * Uses custom native module since iOS doesn't have built-in prompt.
   */
  static prompt(
    ...[title, message, buttons, type, defaultValue, keyboardType]: Parameters<
      typeof RNAlert.prompt
    >
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
