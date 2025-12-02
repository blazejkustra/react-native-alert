import { Alert as RNAlert, type AlertButton } from 'react-native';

// Track active dialogs to prevent multiple dialogs from appearing simultaneously
let activeDialog: HTMLDialogElement | null = null;

/**
 * Creates a modern HTML5 dialog element for alerts and prompts
 * Uses unique class names to avoid conflicts with user stylesheets
 */
export function createDialogElement(
  title: string | null | undefined,
  message?: string | null | undefined,
  buttons: Parameters<typeof RNAlert.prompt>[2] = [
    { text: 'OK', style: 'default' },
  ],
  inputField?: string
): HTMLDialogElement {
  const dialog = document.createElement('dialog');
  dialog.className = 'rn-alert__dialog';

  // Build the dialog content with improved structure
  dialog.innerHTML = `
    <div class="rn-alert__container">
      <div class="rn-alert__content">
        ${title ? `<h2 class="rn-alert__title">${title}</h2>` : ''}
        ${
          inputField || message
            ? `<div class="rn-alert__body">
                ${message ? `<p class="rn-alert__message">${message}</p>` : ''}
                ${inputField ? `<div class="rn-alert__input-container">${inputField}</div>` : ''}
              </div>`
            : ''
        }
      </div>
      <div class="rn-alert__actions" id="rn-alert-buttons"></div>
    </div>
  `;

  const buttonsContainer = dialog.querySelector('#rn-alert-buttons');

  if (typeof buttons === 'function') {
    // Handle function callback with default OK/Cancel buttons
    createDefaultButtons(dialog, buttonsContainer, buttons, inputField);
    dialog.classList.add('rn-alert__dialog--confirm');
  } else {
    // Handle array of buttons
    createCustomButtons(dialog, buttonsContainer, buttons, inputField);

    // Apply confirm styling for two-button dialogs
    if (buttons?.length === 2) {
      dialog.classList.add('rn-alert__dialog--confirm');
    }
  }

  return dialog;
}

/**
 * Creates default OK/Cancel buttons for function callbacks
 */
function createDefaultButtons(
  dialog: HTMLDialogElement,
  container: Element | null,
  callback: (text: string) => void,
  inputField?: string
): void {
  // OK Button
  const okButton = document.createElement('button');
  okButton.innerText = 'OK';
  okButton.className = 'rn-alert__button rn-alert__button--primary';
  okButton.addEventListener('click', () => {
    const inputValue = inputField
      ? (dialog.querySelector('input') as HTMLInputElement)?.value || ''
      : '';
    dialog.close();
    callback(inputValue);
  });
  container?.appendChild(okButton);

  // Cancel Button
  const cancelButton = document.createElement('button');
  cancelButton.innerText = 'Cancel';
  cancelButton.className = 'rn-alert__button rn-alert__button--secondary';
  cancelButton.addEventListener('click', () => {
    dialog.close();
  });
  container?.appendChild(cancelButton);
}

/**
 * Creates custom buttons from the buttons array
 */
function createCustomButtons(
  dialog: HTMLDialogElement,
  container: Element | null,
  buttons: AlertButton[] | null,
  inputField?: string
): void {
  buttons?.forEach(({ text, style, onPress, isPreferred }, index) => {
    const button = document.createElement('button');
    button.innerText = text || 'OK';

    // Determine button variant based on priority:
    // 1. Destructive style (highest priority)
    // 2. Preferred button
    // 3. Fallback: first button in 2-button dialog (if second isn't preferred)
    // 4. Default: secondary
    const baseClass = 'rn-alert__button';
    let variantClass: string;

    if (style === 'destructive') {
      variantClass = 'rn-alert__button--destructive';
    } else if (isPreferred === true) {
      variantClass = 'rn-alert__button--primary';
    } else {
      const isFirstButtonInTwoButtonDialog =
        index === 0 && buttons.length === 2;
      const secondButtonIsNotPreferred = buttons[1]?.isPreferred !== true;

      if (isFirstButtonInTwoButtonDialog && secondButtonIsNotPreferred) {
        variantClass = 'rn-alert__button--primary';
      } else {
        variantClass = 'rn-alert__button--secondary';
      }
    }

    button.className = `${baseClass} ${variantClass}`;

    button.addEventListener('click', () => {
      dialog.close();
      if (onPress) {
        const inputValue = inputField
          ? (dialog.querySelector('input') as HTMLInputElement)?.value
          : undefined;
        onPress(inputValue);
      }
    });

    container?.appendChild(button);
  });
}

/**
 * Shows a web alert dialog with improved error handling
 */
export function showWebAlert(
  title: string,
  message?: string,
  buttons?: AlertButton[]
): void {
  // Prevent multiple dialogs
  if (activeDialog) {
    return;
  }

  const dialog = createDialogElement(title, message, buttons);
  activeDialog = dialog;
  document.body.appendChild(dialog);
  dialog.showModal();

  dialog.addEventListener('close', () => {
    document.body.removeChild(dialog);
    activeDialog = null;
  });
}

/**
 * Shows a web prompt dialog with improved error handling
 */
export function showWebPrompt(
  title: string,
  message?: string,
  buttons?: AlertButton[],
  type?: 'default' | 'plain-text' | 'secure-text' | 'login-password',
  defaultValue?: string
): void {
  // Prevent multiple dialogs
  if (activeDialog) {
    return;
  }

  const inputType = type === 'secure-text' ? 'password' : 'text';
  const inputField = `
    <input 
      type="${inputType}" 
      value="${defaultValue || ''}" 
      class="rn-alert__input-field" 
      placeholder="Enter text..."
      autocomplete="off"
    />
  `;

  const dialog = createDialogElement(title, message, buttons, inputField);
  activeDialog = dialog;
  document.body.appendChild(dialog);
  dialog.showModal();

  dialog.addEventListener('close', () => {
    document.body.removeChild(dialog);
    activeDialog = null;
  });
}
