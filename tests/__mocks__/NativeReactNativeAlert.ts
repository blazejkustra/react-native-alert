// Mock for testing
import {
  Alert as RNAlert,
  type AlertButton as RNAlertButton,
  type AlertOptions as RNAlertOptions,
} from 'react-native';

export type AlertButton = RNAlertButton;
export type AlertOptions = RNAlertOptions;

export interface Spec {
  /**
   * Launches an alert dialog with the specified title and message.
   *
   * @param title - The dialog's title
   * @param message - An optional message that appears below the title
   * @param buttons - An optional array of buttons. If no buttons are provided, the alert will show a default 'OK' button
   * @param options - An optional AlertOptions object
   *
   * @example
   * ```typescript
   * // Simple alert
   * alert('Alert Title', 'This is the alert message');
   *
   * // Alert with custom buttons
   * alert('Delete Item', 'Are you sure?', [
   *   { text: 'Cancel', style: 'cancel' },
   *   { text: 'Delete', style: 'destructive' }
   * ]);
   * ```
   */
  alert: typeof RNAlert.alert;

  /**
   * Launches a prompt dialog with the specified title and message, allowing the user to enter text.
   *
   * @param title - The dialog's title
   * @param message - An optional message that appears below the title
   * @param buttons - An optional array of buttons. If no buttons are provided, the prompt will show default 'Cancel' and 'OK' buttons
   * @param type - The type of text input. Can be 'default', 'plain-text', 'secure-text', or 'login-password'
   * @param defaultValue - The default text in the text input
   * @param keyboardType - The keyboard type (Android only)
   *
   * @example
   * ```typescript
   * // Simple prompt
   * prompt('Enter Name', 'Please enter your name:');
   *
   * // Secure text prompt
   * prompt('Enter Password', 'Please enter your password:', [
   *   { text: 'Cancel', style: 'cancel' },
   *   { text: 'OK', style: 'default', onPress: (value) => console.log(value) }
   * ], 'secure-text');
   * ```
   */
  prompt: typeof RNAlert.prompt;
}

const mockModule: Spec = {
  alert: jest.fn(),
  prompt: jest.fn(),
};

export default mockModule;
