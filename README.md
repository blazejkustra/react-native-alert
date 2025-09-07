# @blazejkustra/react-native-alert

Universal alerts and prompts for React Native that work across iOS, Android, and Web platforms with the same API as React Native's built-in Alert.

## Features

- ✅ **Cross-platform**: Works on iOS, Android, and Web
- ✅ **Same API**: Compatible with React Native's Alert API
- ✅ **Prompt support**: Includes prompt functionality for all platforms
- ✅ **Customizable**: Web implementation allows CSS customization
- ✅ **Theme support**: Respects dark/light mode on Android
- ✅ **TypeScript**: Full TypeScript support

## Installation

```sh
npm install @blazejkustra/react-native-alert
```

### iOS Setup

For iOS, you need to run:

```sh
cd ios && pod install
```

### Android Setup

No additional setup required for Android.

### Web Setup

For web, the library automatically includes the necessary CSS. You can customize the appearance by overriding the CSS classes.

To override the CSS, you can add a `alert.css` file to your project.

## Usage

### Basic Alert

```js
import Alert from '@blazejkustra/react-native-alert';

Alert.alert('Alert Title', 'This is the alert message');
```

### Alert with Buttons

```js
Alert.alert(
  'Alert Title',
  'This is the alert message',
  [
    { text: 'Cancel', style: 'cancel' },
    { text: 'OK', style: 'default' }
  ]
);
```

### Destructive Alert

```js
Alert.alert(
  'Delete Item',
  'Are you sure you want to delete this item?',
  [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Delete', style: 'destructive' }
  ]
);
```

### Prompt

```js
Alert.prompt(
  'Enter Name',
  'Please enter your name:',
  [
    { text: 'Cancel', style: 'cancel' },
    { 
      text: 'OK', 
      style: 'default',
      onPress: (value) => {
        if (value) {
          console.log('Name entered:', value);
        }
      }
    }
  ],
  'plain-text',
  'John Doe'
);
```

### Secure Text Prompt

```js
Alert.prompt(
  'Enter Password',
  'Please enter your password:',
  [
    { text: 'Cancel', style: 'cancel' },
    { 
      text: 'OK', 
      style: 'default',
      onPress: (value) => {
        if (value) {
          console.log('Password entered');
        }
      }
    }
  ],
  'secure-text'
);
```

## API Reference

### Alert.alert(title, message?, buttons?, options?)

- `title` (string): The alert title
- `message` (string, optional): The alert message
- `buttons` (AlertButton[], optional): Array of button objects
- `options` (AlertOptions, optional): Additional options

### Alert.prompt(title, message?, buttons?, type?, defaultValue?, keyboardType?)

- `title` (string): The prompt title
- `message` (string, optional): The prompt message
- `buttons` (AlertButton[], optional): Array of button objects
- `type` (string, optional): Input type ('default', 'plain-text', 'secure-text', 'login-password')
- `defaultValue` (string, optional): Default input value
- `keyboardType` (string, optional): Keyboard type (Android only)

### Types

```typescript
interface AlertButton {
  text: string;
  onPress?: (value?: string) => void;
  style?: 'default' | 'cancel' | 'destructive';
}

interface AlertOptions {
  cancelable?: boolean;
  onDismiss?: () => void;
}
```

## Platform-Specific Behavior

### iOS
- Uses native UIAlertController for alerts
- Custom implementation for prompts (since iOS doesn't have built-in prompt)

### Android
- Uses native AlertDialog with Material Design
- Automatically respects dark/light theme
- Supports all input types and keyboard types

### Web
- Uses HTML5 `<dialog>` element
- Fully customizable with CSS
- Responsive design with dark mode support

## Web Customization

The web implementation includes CSS classes that you can override:

```css
.alert-dialog {
  /* Dialog container */
}

.alert-container {
  /* Content container */
}

.alert-header {
  /* Title styling */
}

.alert-message {
  /* Message styling */
}

.alert-input {
  /* Input field styling */
}

.alert-btn-default {
  /* Default button styling */
}

.alert-btn-destructive {
  /* Destructive button styling */
}
```

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
