# announcio

A React Native app that displays text character by character with customizable colors and looping animation. I created this app with claude code, to test its capabilities.

## Features

- Enter custom text messages
- Choose font color and background color
- Full-screen character-by-character animation
- Each character displays for 0.1 seconds
- Spaces show as empty background
- All text displayed in uppercase
- Automatic looping with 0.5-second pause
- Touch screen to return to input
- Local storage saves your settings

## Development Setup

### Prerequisites

- Node.js (v14 or newer)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Navigate to the project:**

   ```bash
   cd announcio
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **iOS Setup (macOS only):**
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

### Running the App

#### For iOS (macOS only):

```bash
npx react-native run-ios
```

#### For Android:

1. Start an Android emulator or connect an Android device
2. Run:
   ```bash
   npx react-native run-android
   ```

### Development Commands

- **Start Metro bundler:**

  ```bash
  npx react-native start
  ```

- **Clear cache if needed:**

  ```bash
  npx react-native start --reset-cache
  ```

- **Clean build (if facing issues):**

  ```bash
  # iOS
  cd ios && xcodebuild clean && cd ..

  # Android
  cd android && ./gradlew clean && cd ..
  ```

### Project Structure

```
src/
├── screens/
│   ├── InputScreen.js    # Main input screen with text and color selection
│   └── DisplayScreen.js  # Full-screen character animation display
└── utils/
    └── storage.js        # AsyncStorage utilities for saving/loading settings
```

### How to Use

1. **Input Screen:**

   - Enter your text message (max 200 characters)
   - Select font color from the color palette
   - Select background color from the color palette
   - Preview your selection
   - Tap "PLAY" to start the animation

2. **Display Screen:**

   - Characters appear one by one in uppercase
   - Each character shows for 0.1 seconds
   - Spaces display as empty background
   - Animation loops with 0.5-second pause
   - Touch anywhere to return to input screen

3. **Data Persistence:**
   - Your text and color choices are automatically saved
   - Settings persist between app restarts

### Troubleshooting

- **Metro bundler issues:** Run `npx react-native start --reset-cache`
- **iOS build issues:** Clean Xcode build folder and rebuild
- **Android build issues:** Clean gradle and rebuild
- **Package installation issues:** Delete `node_modules` and run `npm install` again

### Technical Details

- **React Native Version:** 0.81.4
- **Navigation:** React Navigation 6
- **Storage:** AsyncStorage
- **Animation:** JavaScript timers (setTimeout/setInterval)
- **Platform Support:** iOS and Android
