import { Alert as RNAlert } from 'react-native';

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
  static prompt(...args: Parameters<typeof RNAlert.prompt>) {
    RNAlert.prompt(...args);
  }
}

export default Alert;
