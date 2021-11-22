import React, { Component } from "react";
import { TouchableOpacity, Text, View, TextInput, Vibration, Platform, UIManager, LayoutAnimation } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import styles, { theme } from "../styles/styles";
import { Audio } from "expo-av";

// Android animation configuration
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      counting: false,
      finished: true,
    };
  }

  startCountDown = () => {
    // If time is not inputed
    if (!(this.state.hours || this.state.minutes ||this.state.seconds)) {
      return;
    } else if (this.state.counting) {
      // If already counting, pause timer
      this.pauseCountDown();
      return;
    }
    // Else start/resume countdown
    this.countDown();
  }

  countDown = () => {
    // Animate input fields' disappearance
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    // Update state to counting
    this.setState({
      counting: true,
      finished: false
    });

    // start timer
    this.timerId = setInterval(() => {
      // Reduce total time by 1 second
      let totalSeconds = (this.state.hours * 60 * 60) + (this.state.minutes * 60) + (this.state.seconds);
      if (totalSeconds > 1) {
        totalSeconds -= 1;
      } else {
        this.finish();
        return;
      }

      // reset state variables
      let hrs = Math.floor(totalSeconds / (60 * 60));
      totalSeconds -= (hrs * 60 * 60);
      let mins = Math.floor(totalSeconds / 60);
      totalSeconds -= (mins * 60);
      let secs = totalSeconds;

      this.setState({
        hours: hrs,
        minutes: mins,
        seconds: secs
      });
    }, 1000);
  }

  pauseCountDown = () => {
    // Clear timer interval
    clearInterval(this.timerId)

    // change counting state to false
    this.setState({
      counting: false,
    })
  }

  finish = () => {
    // Play sound and vibrate
    this.playSoundAsync();
    Vibration.vibrate();

    // reset timer
    this.reset();
  }

  reset = () => {
    // Animate input fields reappearance
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    // Clear timer
    clearInterval(this.timerId);
    // clear state
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
      counting: false,
      finished: true,
    })
  }

  setTime = (valueString, variable) => {
    // Convert input to integer
    let value = parseInt(valueString);

    // Handle errors
    if (isNaN(value) || value < 0) {
      return;
    }

    // Reject values with more than 2 digits
    if (String(value).length > 2) return

    // Update state
    this.setState({
      [variable]: value,
    })

  }

  loadSoundAsync = async () => {
    await this.sound.loadAsync(
      require('../../assets/sounds/complete.wav')
    );
  }

  playSoundAsync = async () => {
    if (this.sound) {
      await this.sound.replayAsync();
    }
  }

  unloadSoundAsync = async () => {
    await this.sound.unloadAsync();
  }

  componentDidMount() {
    // load sound file
    this.sound = new Audio.Sound();
    this.loadSoundAsync();
  }

  componentWillUnmount() {
    // reset timer
    this.reset();

    // unload sound file from memory
    this.unloadSoundAsync();
  }

  render() {
    return (
      <View style={[styles.page, styles.center]}>
        {(!this.state.counting) && (this.state.finished) && (
        <View style={{flexDirection:'row'}}>
        <TextInput 
          style={styles.inputBox}
          onChangeText={(value) => this.setTime(value, 'hours')} 
          placeholder={'hrs'}
          keyboardType="numeric"
        />
        <TextInput 
          style={styles.inputBox}
          onChangeText={(value) => this.setTime(value, 'minutes')} 
          keyboardType="numeric"
          placeholder={'mins'}
        />
        <TextInput 
          style={styles.inputBox}
          onChangeText={(value) => this.setTime(value, 'seconds')} 
          keyboardType="numeric"
          placeholder={'secs'}
        />
        </View>
        )}
        <View>
          <Text 
            style={[styles.digitFont, styles.timerTime, styles.shadow]}
          >
            {('0' + this.state.hours).slice(-2)} : {('0' + this.state.minutes).slice(-2)} : {('0' + this.state.seconds).slice(-2)}
          </Text>
        </View>
        <TouchableOpacity 
          onPress={this.startCountDown}
          style={[styles.center, styles.startButton]}
        >
          <Ionicons 
            name={this.state.counting ? 'pause' : 'play'}
            color={theme.colors.backgroundCard}
            size={40}
          />
        </TouchableOpacity>
        <TouchableOpacity
          title="Reset" 
          onPress={this.reset}
          style={styles.center}
        >
          <Text style={[styles.textFont, {fontSize:20, color: theme.colors.text}]}>
            <Ionicons name="refresh-outline" size={20} style={{margin:2}} />
            Reset
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}