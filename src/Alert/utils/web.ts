import { Alert as RNAlert, type AlertButton } from 'react-native';

// Web implementation
export function createDialogElement(
  title: string | null | undefined,
  message?: string | null | undefined,
  buttons: Parameters<typeof RNAlert.prompt>[2] = [
    { text: 'OK', style: 'default' },
  ],
  inputField?: string
) {
  const dialog = document.createElement('dialog');
  dialog.className = 'alert-dialog';
  dialog.innerHTML = `
      <div class="alert-container">
        <div class="alert-text-container">
          ${title ? `<h1 class="alert-header">${title}</h1>` : ''}
          ${
            inputField || message
              ? `<div class="alert-body">
            ${message ? `<p class="alert-message">${message}</p>` : ''}
            ${inputField ? inputField : ''}
          </div>`
              : ''
          }
        </div>
        <div class="alert-footer" id="buttons"></div>
      </div>
  `;

  const buttonsContainer = dialog.querySelector('#buttons');

  if (typeof buttons === 'function') {
    // If buttons is a function, create default OK/Cancel buttons
    const okButton = document.createElement('button');
    okButton.innerText = 'OK';
    okButton.className = 'alert-btn-default';
    okButton.addEventListener('click', () => {
      const inputValue = inputField
        ? (dialog.querySelector('input') as HTMLInputElement)?.value || ''
        : '';
      dialog.close();
      buttons(inputValue);
    });
    buttonsContainer?.appendChild(okButton);

    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    cancelButton.className = 'alert-btn-default';
    cancelButton.addEventListener('click', () => {
      dialog.close();
    });
    buttonsContainer?.appendChild(cancelButton);

    dialog.classList.add('alert-confirm');
  } else {
    // Handle array of buttons
    buttons?.forEach(({ text, style, onPress }) => {
      const button = document.createElement('button');
      button.innerText = text || 'OK';
      button.className =
        style === 'destructive' ? 'alert-btn-destructive' : 'alert-btn-default';
      button.addEventListener('click', () => {
        dialog.close();
        if (onPress) {
          onPress(
            inputField
              ? (dialog.querySelector('input') as HTMLInputElement)?.value
              : undefined
          );
        }
      });
      buttonsContainer?.appendChild(button);
    });

    // If there are exactly two buttons, set confirm style
    if (buttons?.length === 2) {
      dialog.classList.add('alert-confirm');
    }
  }

  return dialog;
}

export function showWebAlert(
  title: string,
  message?: string,
  buttons?: AlertButton[]
) {
  const dialog = createDialogElement(title, message, buttons);
  document.body.appendChild(dialog);
  dialog.showModal();
  dialog.addEventListener('close', () => {
    document.body.removeChild(dialog);
  });
}

export function showWebPrompt(
  title: string,
  message?: string,
  buttons?: Parameters<typeof RNAlert.prompt>[2],
  type?: 'default' | 'plain-text' | 'secure-text' | 'login-password',
  defaultValue?: string
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
