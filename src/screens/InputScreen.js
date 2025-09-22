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

const InputScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const [fontColor, setFontColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  useEffect(() => {
    loadInitialSettings();
  }, []);

  const loadInitialSettings = async () => {
    const settings = await loadSettings();
    setText(settings.text);
    setFontColor(settings.fontColor);
    setBackgroundColor(settings.backgroundColor);
  };

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

  const colorOptions = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'
  ];

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
        <Text style={styles.title}>announcio</Text>

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

        <ColorPicker
          selectedColor={fontColor}
          onColorChange={setFontColor}
          title="Font Color"
        />

        <ColorPicker
          selectedColor={backgroundColor}
          onColorChange={setBackgroundColor}
          title="Background Color"
        />

        <View style={styles.previewContainer}>
          <Text style={styles.previewLabel}>Preview:</Text>
          <View style={[styles.preview, { backgroundColor }]}>
            <Text style={[styles.previewText, { color: fontColor }]}>
              {text || 'Your text will appear here'}
            </Text>
          </View>
        </View>

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
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  colorPickerContainer: {
    marginBottom: 25,
  },
  colorPickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  colorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  selectedColor: {
    borderColor: '#007AFF',
    borderWidth: 3,
  },
  previewContainer: {
    marginBottom: 30,
  },
  previewLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  preview: {
    padding: 20,
    borderRadius: 8,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  playButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default InputScreen;