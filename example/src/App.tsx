import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Alert from '@blazejkustra/react-native-alert';

export default function App() {
  const showAlert = () => {
    Alert.alert('Alert Title', 'This is a simple alert message', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', style: 'default' },
    ]);
  };

  const showDestructiveAlert = () => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive' },
      ]
    );
  };

  const showPrompt = () => {
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
              Alert.alert('Hello', `Hello, ${value}!`);
            }
          },
        },
      ],
      'plain-text',
      'John Doe'
    );
  };

  const showPasswordPrompt = () => {
    Alert.prompt(
      'Enter Password',
      'Please enter your password:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Login',
          style: 'default',
          onPress: (value) => {
            if (value) {
              Alert.alert('Success', 'Password entered successfully!');
            }
          },
        },
      ],
      'secure-text'
    );
  };

  const showLoginPrompt = () => {
    Alert.prompt(
      'Login',
      'Enter your credentials:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign In',
          style: 'default',
          onPress: (value) => {
            Alert.alert('Login', `Login attempted with: ${value}`);
          },
        },
      ],
      'login-password'
    );
  };

  const showEmailPrompt = () => {
    Alert.prompt(
      'Enter Email',
      'Please enter your email address:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Subscribe',
          style: 'default',
          onPress: (value) => {
            if (value && value.includes('@')) {
              Alert.alert('Success', `Subscribed with: ${value}`);
            } else {
              Alert.alert('Error', 'Please enter a valid email address');
            }
          },
        },
      ],
      'plain-text',
      '',
      'email-address'
    );
  };

  const showPhonePrompt = () => {
    Alert.prompt(
      'Enter Phone Number',
      'Please enter your phone number:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          style: 'default',
          onPress: (value) => {
            if (value) {
              Alert.alert('Saved', `Phone number saved: ${value}`);
            }
          },
        },
      ],
      'plain-text',
      '',
      'phone-pad'
    );
  };

  const showNumericPrompt = () => {
    Alert.prompt(
      'Enter Age',
      'Please enter your age:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          style: 'default',
          onPress: (value) => {
            const age = parseInt(value || '0', 10);
            if (age > 0 && age < 150) {
              Alert.alert('Age Confirmed', `You are ${age} years old`);
            } else {
              Alert.alert('Invalid Age', 'Please enter a valid age');
            }
          },
        },
      ],
      'plain-text',
      '',
      'numeric'
    );
  };

  const showURLPrompt = () => {
    Alert.prompt(
      'Enter Website',
      'Please enter a website URL:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Visit',
          style: 'default',
          onPress: (value) => {
            if (
              value &&
              (value.startsWith('http://') || value.startsWith('https://'))
            ) {
              Alert.alert('URL Valid', `Opening: ${value}`);
            } else {
              Alert.alert(
                'Invalid URL',
                'Please enter a valid URL starting with http:// or https://'
              );
            }
          },
        },
      ],
      'plain-text',
      'https://',
      'url'
    );
  };

  const showMultiButtonPrompt = () => {
    Alert.prompt(
      'Enter Comment',
      'Please enter your comment:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save Draft',
          style: 'default',
          onPress: () => {
            Alert.alert(
              'Draft Saved',
              'Your comment has been saved as a draft'
            );
          },
        },
        {
          text: 'Post',
          style: 'default',
          onPress: (value) => {
            if (value && value.trim().length > 0) {
              Alert.alert('Posted', `Comment posted: "${value}"`);
            } else {
              Alert.alert('Error', 'Please enter a comment before posting');
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const showDestructivePrompt = () => {
    Alert.prompt(
      'Delete Account',
      'Type "DELETE" to confirm account deletion, this action cannot be undone. Are you sure you want to proceed? You will lose all your data. Now type "DELETE" to confirm, or type anything else to cancel.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Account',
          style: 'destructive',
          onPress: (value) => {
            if (value === 'DELETE') {
              Alert.alert(
                'Account Deleted',
                'Your account has been permanently deleted'
              );
            } else {
              Alert.alert(
                'Invalid Confirmation',
                'Please type "DELETE" exactly to confirm'
              );
            }
          },
        },
      ],
      'plain-text'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>React Native Alert Demo</Text>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.button} onPress={showAlert}>
          <Text style={styles.buttonText}>Show Alert</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.destructiveButton]}
          onPress={showDestructiveAlert}
        >
          <Text style={styles.buttonText}>Show Destructive Alert</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={showPrompt}>
          <Text style={styles.buttonText}>Show Basic Prompt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.passwordButton]}
          onPress={showPasswordPrompt}
        >
          <Text style={styles.buttonText}>Show Password Prompt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={showLoginPrompt}
        >
          <Text style={styles.buttonText}>Show Login Prompt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.emailButton]}
          onPress={showEmailPrompt}
        >
          <Text style={styles.buttonText}>Show Email Prompt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.phoneButton]}
          onPress={showPhonePrompt}
        >
          <Text style={styles.buttonText}>Show Phone Prompt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.numericButton]}
          onPress={showNumericPrompt}
        >
          <Text style={styles.buttonText}>Show Numeric Prompt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.urlButton]}
          onPress={showURLPrompt}
        >
          <Text style={styles.buttonText}>Show URL Prompt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.multiButton]}
          onPress={showMultiButtonPrompt}
        >
          <Text style={styles.buttonText}>Show Multi-Button Prompt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.destructiveButton]}
          onPress={showDestructivePrompt}
        >
          <Text style={styles.buttonText}>Show Destructive Prompt</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    paddingTop: 20,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    minWidth: 200,
    alignSelf: 'center',
  },
  passwordButton: {
    backgroundColor: '#8E44AD',
  },
  loginButton: {
    backgroundColor: '#E67E22',
  },
  emailButton: {
    backgroundColor: '#3498DB',
  },
  phoneButton: {
    backgroundColor: '#2ECC71',
  },
  numericButton: {
    backgroundColor: '#9B59B6',
  },
  urlButton: {
    backgroundColor: '#1ABC9C',
  },
  multiButton: {
    backgroundColor: '#F39C12',
  },
  destructiveButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
