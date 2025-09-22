import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'announcio_settings';

export const saveSettings = async (settings) => {
  try {
    const jsonValue = JSON.stringify(settings);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

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
    return {
      text: '',
      fontColor: '#000000',
      backgroundColor: '#FFFFFF'
    };
  }
};