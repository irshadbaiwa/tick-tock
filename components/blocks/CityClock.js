import React from "react";
import { ImageBackground, View, Text } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from '@expo/vector-icons';
import styles from "../styles/styles";
import { getZonalTime } from "../../utils/dateFormat";

// Export memoised component for performance
export default React.memo(CityClock);

function CityClock({cityPhoto, Time, cityName}) {
  const cityTime = getZonalTime(Time.UTCHours, Time.UTCMinutes, Time.hrDiff, Time.minDiff);
  return (
    <View style={styles.cityClockContainer}>
      <View style={{height:100, width:150,}}>
        <ImageBackground
          source={cityPhoto}
          resizeMode="cover"
          style={[styles.center, styles.page, {width: 150, height: 100,}]}
        >
          <BlurView 
            style={[styles.center, {padding: 5, overflow: 'hidden', borderRadius: 5,}]}
            tint="dark"
            intensity={60}
          >
            <Text style={[styles.digitFont, {fontSize: 30, color: '#fff'}]}>
              {cityTime}
            </Text>
          </BlurView>
        </ImageBackground>
      </View>
      <View style={[styles.center, styles.cityNameView]}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.textFont, {color:'#137894', padding:5, fontSize:12,}]}>
          <Ionicons name="location" />
          {cityName}
        </Text>
      </View>
    </View>
  );
}
