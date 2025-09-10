![React Native Alert](./assets/banner.png)

# @blazejkustra/react-native-alert

✨ **Universal, customizable alerts and prompts** for React Native — identical API to the built-in `Alert`, but works seamlessly across **iOS, Android, and Web**.

## 🚀 Features

* **Cross-platform** – iOS, Android, Web with one API
* **Drop-in replacement** – same API as `Alert`
* **Prompts everywhere** – text input prompts supported on all platforms
* **Modern Web implementation** – built with `<dialog>` + CSS custom properties
* **Dark/light themes** – automatic with manual override
* **Accessible** – full keyboard navigation + screen reader support
* **TypeScript ready** – complete type definitions

## 📦 Installation

```sh
npm install @blazejkustra/react-native-alert
```

No extra setup needed on iOS or Android (just rebuild your app).
On Web, styles are injected automatically and can be customized with CSS variables.

## 🛠 Usage

### Basic Alert

```ts
import Alert from '@blazejkustra/react-native-alert';

Alert.alert('Hello!', 'This is a cross-platform alert.');
```

### Alert with Buttons

```ts
Alert.alert(
  'Confirm',
  'Do you want to continue?',
  [
    { text: 'Cancel', style: 'cancel' },
    { text: 'OK', style: 'default' },
  ]
);
```

### Destructive Alert

```ts
Alert.alert(
  'Delete item?',
  'This action cannot be undone.',
  [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Delete', style: 'destructive' },
  ]
);
```

### Prompt

```ts
Alert.prompt(
  'Enter your name',
  'Please type your name below:',
  [
    { text: 'Cancel', style: 'cancel' },
    { text: 'OK', onPress: (value) => console.log('Name:', value) },
  ],
  'plain-text',
  'John Doe'
);
```

### Secure Prompt

```ts
Alert.prompt(
  'Password',
  'Enter your password:',
  [
    { text: 'Cancel', style: 'cancel' },
    { text: 'OK', onPress: () => console.log('Password entered') },
  ],
  'secure-text'
);
```

For more examples, see [example/src/App.tsx](example/src/App.tsx).

## 📖 API

Same as [React Native Alert](https://reactnative.dev/docs/alert).

## 📱 Platform Notes

* **iOS** – uses React Native's built-in `Alert.alert` and `Alert.prompt`
* **Android** – uses React Native's built-in `Alert.alert` and custom native module with Material styling for `Alert.prompt`
* **Web** – HTML5 `<dialog>`, themeable via CSS variables

## 🎨 Web Customization

Override CSS variables to match your design system:

```css
:root {
  --rn-alert-accent: #059669;   /* Primary button */
  --rn-alert-danger: #dc2626;   /* Destructive button */
  --rn-alert-bg: #fefefe;       /* Dialog background */
  --rn-alert-fg: #111827;       /* Text color */
  --rn-alert-radius: 16px;        /* Border radius */
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    ...
  }
}

```

Available variables:
* `--rn-alert-bg` – dialog background
* `--rn-alert-fg` – primary text color
* `--rn-alert-muted` – secondary / muted text
* `--rn-alert-surface` – input & surface background
* `--rn-alert-border` – border color
* `--rn-alert-elev` – box shadow / elevation
* `--rn-alert-accent` – primary button color
* `--rn-alert-accent-hover` – primary button hover color
* `--rn-alert-danger` – destructive button color
* `--rn-alert-danger-hover` – destructive button hover color
* `--rn-alert-radius` – border radius (dialogs/buttons)
* `--rn-alert-radius-sm` – small border radius (inputs/buttons)
* `--rn-alert-spacing` – default padding
* `--rn-alert-spacing-sm` – small padding
* `--rn-alert-btn-min` – minimum button height (touch target)
* `--rn-alert-outline` – focus outline style
* `--rn-alert-outline-weak` – subtle focus outline
* `--rn-alert-font` – font family
* `--rn-alert-font-size` – base font size
* `--rn-alert-title-size` – title font size

## 🤝 Contributing

We welcome contributions!
See [CONTRIBUTING.md](CONTRIBUTING.md) for workflow and [CODE\_OF\_CONDUCT.md](CODE_OF_CONDUCT.md).

## 📄 License

MIT © [Blazej Kustra](https://github.com/blazejkustra)

---

Built with [create-react-native-library](https://github.com/callstack/react-native-builder-bob) 🛠
