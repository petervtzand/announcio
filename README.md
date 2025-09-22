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

# Thoughts about creating the app this way

- Impressed about the way the actual app worked. It got the functionality exactly right the first time. I only had to adjust some styling and timing, so it was better readable + full screen.
- Also things like adding useful comments to a file saves a lot of time.
- Setting up and installing a project, doesn't seem to go very efficient. It tries something, than if it fails goes into another path. If you're building a bigger app, I guess having a clear view yourself, or start with your own template is better.
- It's easy to lose touch with your codebase. You feel like you lose control a little bit. It creates a lot of files you don't know the meaning of.
- I have concerns about the code not feeling like your own code, maybe you don't 100% stand behind it. Especially when you're working in a bigger team, you might be hesitant to commit this. But I guess this can be solved by either QA'ing your own code or make sure Claude writes it better with the help of some files.
