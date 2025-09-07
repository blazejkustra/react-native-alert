import { Alert as RNAlert } from 'react-native';
import ReactNativeAlert from './NativeReactNativeAlert';
import type { AlertButton, AlertOptions } from './NativeReactNativeAlert';

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
  static prompt(...args: Parameters<typeof RNAlert.prompt>) {
    ReactNativeAlert.prompt(...args);
  }
}

export default Alert;
export type { AlertButton, AlertOptions };
