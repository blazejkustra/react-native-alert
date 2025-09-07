import { Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Alert from '@blazejkustra/react-native-alert';

export default function App() {
  const showAlert = () => {
    Alert.alert('Alert Title', 'This is a simple alert message', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', style: 'default' },
    ]);
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

  const showDestructiveAlert = () => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive' },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>React Native Alert Demo</Text>

      <TouchableOpacity style={styles.button} onPress={showAlert}>
        <Text style={styles.buttonText}>Show Alert</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={showPrompt}>
        <Text style={styles.buttonText}>Show Prompt</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.destructiveButton]}
        onPress={showDestructiveAlert}
      >
        <Text style={styles.buttonText}>Show Destructive Alert</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    minWidth: 200,
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
