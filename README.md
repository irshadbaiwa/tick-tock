# **tick-tock**
## CS50x Final Project

### Youtube Demo: [link](url)
### Description

tick-tock is a cross-platform (Android, iOS, web) app developed using [react-native](https://reactnative.dev/) and [expo](https://expo.dev/) tools. 

It's interface contains a **Clock**; which shows the current local time and some other time zones, a **Stopwatch** that counts time, and a **Timer** that counts down a specified duration of time.

### File Tree
- App.js
- app.json
- package.json
- build
  - tick-tock.apk
- components
  - Main.js
  - navigation
    - RootNavigation.js
  - screens
    - Clock.js
    - Stopwatch.js
    - Timer.js
  - blocks
    - ClockRounded.js
    - CityClock.js
  - styles
    - styles.js
- utils
  - dateFormat.js
- assets
  - cities
  - fonts
  - sounds
  - icon.png
  - splash.png

### Folders/Files Descriptions
#### App.js
This is the root file of the project which is loaded as the index, it basically loads the Main.js and custome fonts used

#### app.json
Contains metadata about the app used when  building the app

#### package.json
Specifies the framework and libraries used to build the project

#### build
This contain the apk file of the app (for Android)

#### Components
This folder contains the various components of the app.
It is subsectined into navigation, screens, styles, blocks and Main.js

##### Main.js
This loads App Navigation component

##### navigation
Contains RootNavigation.js which is the Navigation Conatiner (Bottom tabs) of the app

##### screens
Clock.js is the screen for the live clock

Stopwatch.js is the screen for the stopwatch

Timer.js contains timer logic

##### blocks
This folder contains the building block used by screens

##### styles
Contains style and theme of the app

#### utils
dateFormat.js defines helper functions that format time instances

#### assets
This folder containers static files. This include the icon, splash screen, images, fonts and sounds
