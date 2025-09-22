import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage key for persisting user settings
const STORAGE_KEY = 'announcio_settings';

/**
 * Saves user settings to AsyncStorage
 * @param {Object} settings - User settings object containing text, fontColor, and backgroundColor
 * @param {string} settings.text - The text message to display
 * @param {string} settings.fontColor - Hex color code for font color
 * @param {string} settings.backgroundColor - Hex color code for background color
 */
export const saveSettings = async (settings) => {
  try {
    const jsonValue = JSON.stringify(settings);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

/**
 * Loads user settings from AsyncStorage
 * @returns {Promise<Object>} User settings object or default values if not found/error
 * @returns {string} return.text - The saved text message (empty string if none)
 * @returns {string} return.fontColor - The saved font color (black if none)
 * @returns {string} return.backgroundColor - The saved background color (white if none)
 */
export const loadSettings = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : {
      text: '',
      fontColor: '#000000',
      backgroundColor: '#FFFFFF'
    };
  } catch (error) {
    console.error('Error loading settings:', error);
    // Return default settings if loading fails
    return {
      text: '',
      fontColor: '#000000',
      backgroundColor: '#FFFFFF'
    };
  }
};