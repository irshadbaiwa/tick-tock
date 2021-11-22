import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Platform, UIManager, LayoutAnimation } from 'react-native';
import ClockRounded from '../blocks/ClockRounded';
import CityClock from '../blocks/CityClock';
import Kano from '../../assets/cities/Kano.jpg';
import Massachusetts from '../../assets/cities/Massachusetts.jpeg';
import Dubai from '../../assets/cities/Dubai.jpg';
import Paris from '../../assets/cities/Eiffel.jpeg';
import London from '../../assets/cities/London.jpeg';
import Moscow from '../../assets/cities/Moscow.jpg';
import Tokyo from '../../assets/cities/Tokyo.jpeg';
import Madrid from '../../assets/cities/Madrid.jpg';
import Riyadh from '../../assets/cities/Riyadh.png';
import Beijing from '../../assets/cities/Beijing.jpg';
import Maldives from '../../assets/cities/Maldives.jpg';
import Istanbul from '../../assets/cities/Istanbul.jpg';
import Singapore from '../../assets/cities/Singapore.jpeg';
import Melbourne from '../../assets/cities/Melbourne.jpg';
import Mexico from '../../assets/cities/Mexico.jpg';
import SaoPaulo from '../../assets/cities/SaoPaulo.jpg';
import styles from '../styles/styles';

// Android animation configuration
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initial state
      time: new Date(),
      showZonalTimes: false,
    };
  }

  tick = () => {
    this.setState({
      time: new Date(),
    })
  }

  toggle = () => {
    this.setState({
      showZonalTimes: !this.state.showZonalTimes
    });
  }

  componentDidMount() {
    // Start ticking
    this.clockId = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    // Stop ticking
    clearInterval(this.clockId);
  }

  render() {
    const time = this.state.time;
    const UTCHours = time.getUTCHours();
    const UTCMinutes = time.getUTCMinutes();
    return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={{alignItems:'center'}}>
        <ClockRounded moment={time} />
        <TouchableOpacity 
          style={styles.center}
          onPress={() => {
              // Animate layout change
              LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
              // Show city clocks
              this.toggle();
            }
          }
        >
          <Text style={[styles.textFont, {fontSize: 12, color: '#0275d8', margin: 4}]}>
            {!this.state.showZonalTimes ? 'Show other time zones' : 'Hide'}
          </Text>
        </TouchableOpacity>
        {this.state.showZonalTimes && (
        <View style={styles.row}>
          <CityClock 
            cityName="Kano, Nigeria" 
            cityPhoto={Kano}
            // Kano is +1 hr ahead of UTC 
            Time={{UTCHours, UTCMinutes, hrDiff:+1, minDiff:0}}
          />
          <CityClock 
            cityName="Massachusetts, USA" 
            cityPhoto={Massachusetts}
            // Massachusetts is -5 hrs behind UTC
            Time={{UTCHours, UTCMinutes, hrDiff:-5, minDiff:0}}
          />
          <CityClock 
            cityName="Dubai, UAE" 
            cityPhoto={Dubai} 
            // Dubai +4 hrs ahead of UTC
            Time={{UTCHours, UTCMinutes, hrDiff:+4, minDiff:0}}
         />
          <CityClock 
            cityName="Paris, France" 
            cityPhoto={Paris} 
            // Paris is +1 hr ahead of UTC
            Time={{UTCHours, UTCMinutes, hrDiff:+1, minDiff:0}}
          />
          <CityClock 
            cityName="London, England" 
            cityPhoto={London} 
            // London has the same time as UTC
            Time={{UTCHours, UTCMinutes, hrDiff:0, minDiff:0}}
         />
          <CityClock 
            cityName="Moscow, Russia" 
            cityPhoto={Moscow} 
            // Moscow is +3 hrs ahead of UTC
            Time={{UTCHours, UTCMinutes, hrDiff:+3, minDiff:0}}
          />
          <CityClock 
            cityName="Tokyo, Japan" 
            cityPhoto={Tokyo} 
            // Tokyo is +9 hrs ahead of UTC
            Time={{UTCHours, UTCMinutes, hrDiff:+9, minDiff:0}}
          />
          <CityClock 
            cityName="Madrid, Spain" 
            cityPhoto={Madrid} 
            // Madrid is +1 hr ahead of UTC
            Time={{UTCHours, UTCMinutes, hrDiff:+1, minDiff:0}}
          />
          <CityClock 
            cityName="Riyadh, KSA" 
            cityPhoto={Riyadh} 
            // Riyadh is +3 hrs ahead of UTC
            Time={{UTCHours, UTCMinutes, hrDiff:+3, minDiff:0}}
          />
          <CityClock 
            cityName="Beijing, China" 
            cityPhoto={Beijing} 
            // Beijing is +8 hrs ahead of UTC
            Time={{UTCHours, UTCMinutes, hrDiff:+8, minDiff:0}}
          />
          <CityClock 
            cityName="Malé, Maldives" 
            cityPhoto={Maldives} 
            // Maldives is +5 hrs ahead of UTC
            Time={{UTCHours, UTCMinutes, hrDiff:+5, minDiff:0}}
          />
          <CityClock 
            cityName="Istanbul, Turkey" 
            cityPhoto={Istanbul} 
            // Istanbul is +3 hrs ahead of UTC
            Time={{UTCHours, UTCMinutes, hrDiff:+3, minDiff:0}}
          />
          <CityClock 
            cityName="Singapore" 
            cityPhoto={Singapore} 
            // Singapore is +8 hrs ahead of UTC
            Time={{UTCHours, UTCMinutes, hrDiff:+3, minDiff:0}}
          />
          <CityClock 
            cityName="Melbourne, Australia" 
            cityPhoto={Melbourne} 
            // Melbourne is +11 hrs ahead of UTC
            Time={{UTCHours, UTCMinutes, hrDiff:+11, minDiff:0}}
          />
          <CityClock 
            cityName="Mexico City" 
            cityPhoto={Mexico} 
            // Mexico City is -6 hrs Behind of UTC
            Time={{UTCHours, UTCMinutes, hrDiff:-6, minDiff:0}}
          />
          <CityClock 
            cityName="São Paulo, Brazil" 
            cityPhoto={SaoPaulo} 
            // Saopaulo is -3 hrs behind of UTC
            Time={{UTCHours, UTCMinutes, hrDiff:-3, minDiff:0}}
          />
        </View>
        )}
      </View>
    </ScrollView>
    );
  }
}