import { Alert as RNAlert } from 'react-native';
import { createDialogElement } from './utils/web';

// Import CSS for web platform
// require('./web/alert.css');

/**
 * Web-specific Alert implementation using HTML5 dialog elements
 */
class Alert {
  /**
   * Launches an alert dialog with the specified title and message.
   */
  static alert(...[title, message, buttons]: Parameters<typeof RNAlert.alert>) {
    const dialog = createDialogElement(title, message, buttons);
    document.body.appendChild(dialog);
    dialog.showModal();
    dialog.addEventListener('close', () => {
      document.body.removeChild(dialog);
    });
  }

  /**
   * Launches a prompt dialog with the specified title and message, allowing the user to enter text.
   *
   * @param title - The dialog's title
   * @param message - An optional message that appears below the title
   * @param buttons - An optional array of buttons or a function that will be called with the prompt's value
   * @param type - The type of text input. Can be 'default', 'plain-text', 'secure-text', or 'login-password'
   * @param defaultValue - The default text in the text input
   * @param keyboardType - The keyboard type (Android only)
   *
   * @example
   * ```typescript
   * // Simple prompt with function callback
   * Alert.prompt('Enter Name', 'Please enter your name:', (value) => {
   *   console.log('Name entered:', value);
   * });
   *
   * // Prompt with custom buttons
   * Alert.prompt('Enter Password', 'Please enter your password:', [
   *   { text: 'Cancel', style: 'cancel' },
   *   { text: 'OK', style: 'default', onPress: (value) => console.log(value) }
   * ], 'secure-text');
   * ```
   */
  static prompt(
    ...[title, message, buttons, type, defaultValue]: Parameters<
      typeof RNAlert.prompt
    >
  ) {
    const inputField = `
      <input type="${type === 'secure-text' ? 'password' : 'text'}" value="${defaultValue || ''}" class="alert-input" />
    `;
    const dialog = createDialogElement(title, message, buttons, inputField);
    document.body.appendChild(dialog);
    dialog.showModal();
    dialog.addEventListener('close', () => {
      document.body.removeChild(dialog);
    });
  }
}

export default Alert;
