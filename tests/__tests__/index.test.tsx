import Alert from '../../src/Alert/index.web';

describe('ReactNativeAlert', () => {
  it('should export Alert class', () => {
    expect(Alert).toBeDefined();
    expect(typeof Alert.alert).toBe('function');
    expect(typeof Alert.prompt).toBe('function');
  });

  it('should have alert method', () => {
    expect(() => {
      Alert.alert('Test Title', 'Test Message');
    }).not.toThrow();
  });

  it('should have prompt method', () => {
    expect(() => {
      Alert.prompt('Test Title', 'Test Message');
    }).not.toThrow();
  });

  it('should support function callback for prompt', () => {
    const mockCallback = jest.fn();
    expect(() => {
      Alert.prompt('Test Title', 'Test Message', mockCallback);
    }).not.toThrow();
  });
});
