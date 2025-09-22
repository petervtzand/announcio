import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { loadSettings, saveSettings } from '../utils/storage';

/**
 * InputScreen - Main screen for entering text and selecting colors
 * Allows users to input text, choose font and background colors, and navigate to display
 */
const InputScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  // State for user input and color selections
  const [text, setText] = useState('');
  const [fontColor, setFontColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  // Load saved settings when component mounts
  useEffect(() => {
    loadInitialSettings();
  }, []);

  /**
   * Loads previously saved settings from AsyncStorage
   * Sets state with saved values or defaults if none exist
   */
  const loadInitialSettings = async () => {
    const settings = await loadSettings();
    setText(settings.text);
    setFontColor(settings.fontColor);
    setBackgroundColor(settings.backgroundColor);
  };

  /**
   * Handles play button press
   * Validates input, saves settings, and navigates to display screen
   */
  const handlePlay = async () => {
    if (!text.trim()) {
      Alert.alert('Error', 'Please enter some text');
      return;
    }

    const settings = {
      text: text.trim(),
      fontColor,
      backgroundColor,
    };

    await saveSettings(settings);
    navigation.navigate('Display', settings);
  };

  // Available color options for font and background (retro theme)
  const colorOptions = [
    '#2E2E2E', '#F5F5DC', '#D2691E', '#8B4513', '#4682B4',
    '#DAA520', '#CD5C5C', '#20B2AA', '#DDA0DD'
  ];

  /**
   * ColorPicker component - Renders a row of color selection buttons
   * @param {string} selectedColor - Currently selected color
   * @param {Function} onColorChange - Callback when color is selected
   * @param {string} title - Label for the color picker section
   */
  const ColorPicker = ({ selectedColor, onColorChange, title }) => (
    <View style={styles.colorPickerContainer}>
      <Text style={styles.colorPickerTitle}>{title}</Text>
      <View style={styles.colorRow}>
        {colorOptions.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorOption,
              { backgroundColor: color },
              selectedColor === color && styles.selectedColor,
            ]}
            onPress={() => onColorChange(color)}
          />
        ))}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        {/* App title */}
        <Text style={styles.title}>ANNOUNCIO</Text>

        {/* Text input section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter your text:</Text>
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={setText}
            placeholder="Type your message here..."
            multiline
            maxLength={200}
          />
        </View>

        {/* Color pickers side by side */}
        <View style={styles.colorPickersRow}>
          <View style={styles.colorPickerHalf}>
            <ColorPicker
              selectedColor={fontColor}
              onColorChange={setFontColor}
              title="Font Color"
            />
          </View>
          <View style={styles.colorPickerHalf}>
            <ColorPicker
              selectedColor={backgroundColor}
              onColorChange={setBackgroundColor}
              title="Background Color"
            />
          </View>
        </View>

        {/* Preview section showing how the text will look */}
        <View style={styles.previewContainer}>
          <Text style={styles.previewLabel}>Preview:</Text>
          <View style={[styles.preview, { backgroundColor }]}>
            <Text style={[styles.previewText, { color: fontColor }]}>
              {text || 'Your text will appear here'}
            </Text>
          </View>
        </View>

        {/* Play button to start the animation */}
        <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
          <Text style={styles.playButtonText}>PLAY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 40,
    color: '#FFFFFF',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  inputContainer: {
    marginBottom: 32,
    backgroundColor: '#2d2d2d',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#FFFFFF',
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#4a4a4a',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#1a1a1a',
    color: '#FFFFFF',
    minHeight: 90,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  colorPickerContainer: {
    marginBottom: 15,
    backgroundColor: '#2d2d2d',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  colorPickerTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  colorOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#4a4a4a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedColor: {
    borderColor: '#00D4AA',
    borderWidth: 3,
    transform: [{ scale: 1.05 }],
  },
  previewContainer: {
    marginBottom: 32,
    backgroundColor: '#2d2d2d',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  previewLabel: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  preview: {
    padding: 24,
    borderRadius: 12,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4a4a4a',
  },
  previewText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  playButton: {
    backgroundColor: '#00D4AA',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#00D4AA',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    marginHorizontal: 20,
  },
  playButtonText: {
    color: '#000000',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
  },
  colorPickersRow: {
    flexDirection: 'row',
    marginBottom: 25,
    gap: 16,
  },
  colorPickerHalf: {
    flex: 1,
  },
});

export default InputScreen;