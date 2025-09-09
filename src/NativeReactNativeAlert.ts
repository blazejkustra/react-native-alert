import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export type AlertButtonStyle = 'default' | 'cancel' | 'destructive';
export type AlertType =
  | 'default'
  | 'plain-text'
  | 'secure-text'
  | 'login-password';

export type DialogButton = {
  text?: string | null;
  style?: AlertButtonStyle | null;
  isPreferred?: boolean | null;
};

export type DialogOptions = {
  title?: string | null;
  message?: string | null;
  cancelable?: boolean | null;
  userInterfaceStyle?: 'unspecified' | 'light' | 'dark' | 'automatic' | null;

  type?: AlertType | null;
  defaultValue?: string | null;
  keyboardType?: string | null;

  placeholder?: string | null;
  usernamePlaceholder?: string | null;
  maxLength?: number | null;
  usernameMaxLength?: number | null;

  buttons?: Array<DialogButton> | null;
};

export interface Spec extends TurboModule {
  prompt(
    config: DialogOptions,
    onError: (message: string) => void,
    onAction: (
      action: number,
      buttonKey: number,
      text?: string | null,
      username?: string | null
    ) => void
  ): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ReactNativeAlert');
