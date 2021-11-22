import React, { Component } from "react";
import { Text, View, TouchableOpacity, Platform, UIManager, LayoutAnimation } from "react-native";
import { Audio } from "expo-av";
import styles, { theme } from "../styles/styles";
import { Ionicons } from '@expo/vector-icons';

// Android animation configuration
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      counting: false,
      finished: false,
    };  
  }


  startCounter = () => {
    if (this.state.counting) {
      this.pauseCounter()
      return;
    }

    // Update state
    this.setState({counting: true, finished: false});

    // Start counter
    this.count();
  }

  count = () => {
    this.counterId = setInterval(() => {
      // Increase time by 10 milliseconds (0.1sec)
      let totalMilliSecs = (this.state.hours * 60 * 60 * 10) + (this.state.minutes * 60 * 10) + (this.state.seconds * 10) + (this.state.milliseconds);
      totalMilliSecs += 1;

      // Compute and reset state variables
      let hrs = Math.floor(totalMilliSecs / (60 * 60 * 10));
      totalMilliSecs -= (hrs * 60 * 60 * 10);
      let mins = Math.floor(totalMilliSecs / (60 * 10));
      totalMilliSecs -= (mins * 60 * 10);
      let secs = Math.floor(totalMilliSecs / 10);
      totalMilliSecs -= (secs * 10);
      let ms = totalMilliSecs;

      this.setState({
        hours: hrs,
        minutes: mins,
        seconds: secs,
        milliseconds: ms,
      });
    }, 100);
  
  }

  pauseCounter = () => {
    // Stop counter
    clearInterval(this.counterId);
    this.setState({
      counting: false,
    })
  }

  reset = () => {
    // Stop counter and reset the state
    clearInterval(this.counterId);
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      counting: false,
      finished: false,
    });
  }

  finish = () => {
    // Stop counter
    this.pauseCounter();

    // Play sound
    this.playSoundAsync();

    // update state
    this.setState({
      finished: true,
      counting: false,
    })
  }

  loadSoundAsync = async () => {
    await this.sound.loadAsync(
      require('../../assets/sounds/lap.mp3')
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
    // Clear counter if any
    clearInterval(this.counterId);
    // unload sound file
    this.unloadSoundAsync();
  }

  render() {
    return (
        <View style={[styles.center, styles.page]}>
            <Text style={[styles.digitFont, styles.stopWatchTime, styles.shadow]}>
              {`0${this.state.hours}`.slice(-2)}
              :{`0${this.state.minutes}`.slice(-2)}
              :{`0${this.state.seconds}`.slice(-2)}.{this.state.milliseconds}
            </Text>
          <View style={[styles.center, {flexDirection:'row',}]}>
            <TouchableOpacity
              onPress={() => {
                // Animate layout
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                // Reset stopwatch
                this.reset();
                }
              } 
              style={[styles.center,{padding: 10,}]}  
            >
              <Text 
                style={[styles.textFont, {
                  fontSize: 20,
                  color: theme.colors.text
                }]}
              >
                <Ionicons name="refresh-outline" size={20} style={{margin:2}} />
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => {
                // Animate layout
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                // start counting
                this.startCounter();
                }
              }
              style={[styles.startButton, styles.center]}  
            >
            <Ionicons
              name={this.state.counting ? 'pause' : 'play'}
              color={theme.colors.backgroundCard}
              size={40}
            />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => {
                // Animate layout
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                // Finish counting
                this.finish();
                }
              }
              disabled={!this.state.counting}
              style={[styles.center, {padding: 10,}]}  
            >
              <Text style={[styles.textFont, {fontSize:20, color: (this.state.counting) ? theme.colors.text : '#999'}]}>
                <Ionicons name="flag-outline" size={20} style={{margin:2}}/>
                 Finish
              </Text>
            </TouchableOpacity>
          </View>
          {(this.state.finished && (
            <View style={styles.center, styles.row}>
              <Text style={[styles.textFont, {fontSize: 18, color: theme.colors.text, margin: 2}]}>
                Total Time - 
              </Text>
              <Text style={[styles.textFont, {fontSize: 18, color: 'green', margin: 2}]}>
                {`${this.state.hours}hrs ${this.state.minutes}mins ${this.state.seconds}secs ${this.state.milliseconds * 100}ms`}
              </Text>
            </View>
          ))}
        </View>
    );
  }
}