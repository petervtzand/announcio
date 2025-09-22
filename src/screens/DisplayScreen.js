import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
} from 'react-native';

// Get device screen dimensions for responsive sizing
const { width, height } = Dimensions.get('window');

const DisplayScreen = ({ navigation, route }) => {
  // Extract user settings passed from InputScreen
  const { text, fontColor, backgroundColor } = route.params;

  // Track which character in the text we're currently displaying
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  // Control whether the animation is running or stopped
  const [isPlaying, setIsPlaying] = useState(true);

  // Convert text to uppercase and split into individual characters
  const characters = text.toUpperCase().split('');

  // Handle touch events - stop animation and return to input screen
  const handleScreenTouch = useCallback(() => {
    setIsPlaying(false);
    navigation.goBack();
  }, [navigation]);

  // Main animation logic - runs every time currentCharIndex changes
  useEffect(() => {
    // Exit early if animation is stopped
    if (!isPlaying) return;

    // Set timer to advance to next character
    const timer = setTimeout(() => {
      if (currentCharIndex < characters.length) {
        // Move to next character (450ms delay per character)
        setCurrentCharIndex(currentCharIndex + 1);
      } else {
        // All characters shown, wait 800ms then restart from beginning
        setTimeout(() => {
          setCurrentCharIndex(0);
        }, 800);
      }
    }, 350);

    // Cleanup timer when component unmounts or dependencies change
    return () => clearTimeout(timer);
  }, [currentCharIndex, characters.length, isPlaying]);

  // Determine what character to display based on current index
  const getCurrentDisplay = () => {
    // If we've gone past the end, show nothing (pause between loops)
    if (currentCharIndex >= characters.length) {
      return '';
    }

    // Get the current character
    const currentChar = characters[currentCharIndex];
    return currentChar
  };

  return (
    // TouchableWithoutFeedback detects taps anywhere on screen
    <TouchableWithoutFeedback onPress={handleScreenTouch}>
      <View style={[styles.container, { backgroundColor }]}>
        {/* Hide status bar for full-screen experience */}
        <StatusBar hidden />

        {/* Container to center the character on screen */}
        <View style={styles.centerContainer}>
          {/* Display the current character with user's chosen font color */}
          <Text style={[styles.character, { color: fontColor }]}>
            {getCurrentDisplay()}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  // Full-screen container with dynamic background color
  container: {
    flex: 1,
    width: width,
    height: height,
  },

  // Center the character both horizontally and vertically
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Large, screen-filling character styling
  character: {
    // Font size is 100% of the smaller screen dimension for maximum size
    fontSize: Math.min(width, height),
    fontWeight: 'bold',
    textAlign: 'center',
    // Ensure character doesn't exceed screen bounds
    maxWidth: width,
    maxHeight: height,
  },
});

export default DisplayScreen;