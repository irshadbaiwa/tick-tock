import React from 'react';
import { View, Text } from 'react-native';

import { theme } from '../styles/styles';
import styles from '../styles/styles';
import { getCurrentDay, getCurrentDate } from '../../utils/dateFormat';
 
export default function ClockRounded({moment}) {
  const hours = moment.getHours();
  const minutes = moment.getMinutes();
  const seconds = moment.getSeconds();

  // Rotation degree
  // 0deg faces 3 o'clock
  const secRotation = (seconds * 6) - 90;
  const minRotation = (minutes * 6) - 90;
  const hrRotation = ((hours * 30) + (minutes % 30)) - 90;

  return (
    <View style={[styles.clockRounded, styles.shadow]}>
      <View style={styles.clockAxis} />
      <View 
        style={[styles.hourHand, {
          // Point of rotation logic adopted from a post in StackOverflow
          // https://stackoverflow.com/a/58444898/14047307
          transform: [
            {translateX: -30},
            {translateY: 0},
            {rotate: `${hrRotation}deg`},
            {translateX: 30},
            {translateY: 0},
          ],
      }]} />
      <View 
        style={[styles.minHand, {
          transform: [
            {translateX: -40},
            {translateY: 0},
            {rotate: `${minRotation}deg`},
            {translateX: 40},
            {translateY: 0},
          ],
      }]} />
      <View 
        style={[styles.secHand, {
          transform: [
            {translateX: -45},
            {translateY: 0},
            {rotate: `${secRotation}deg`},
            {translateX: 45},
            {translateY: 0},
          ],
      }]} />
      <View style={styles.clockDigital}>
        <Text style={[styles.clockDigits, styles.digitFont]}>
          {('0' + hours).slice(-2)}:{('0' + minutes).slice(-2)}
        </Text>
      </View>
      <View style={[styles.clockDate]}>
        <Text numberOfLines={1} style={[styles.clockDigits, styles.digitFont]}>
          {`${getCurrentDay(moment)} ${getCurrentDate(moment)}`}
        </Text>
      </View>
    </View>
  );
}