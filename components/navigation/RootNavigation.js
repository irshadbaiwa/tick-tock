import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Clock from '../screens/Clock';
import Stopwatch from '../screens/Stopwatch';
import Timer from '../screens/Timer';

import { theme } from '../styles/styles';

// Navigator instance
const Tab = createBottomTabNavigator();

export default function AppNavigation() {

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        initialRouteName="Clock"
        screenOptions={{
          tabBarInactiveTintColor: '#757575',
          tabBarStyle: {backgroundColor: theme.colors.backgroundCard, paddingBottom: 5},
          headerStyle: {backgroundColor: '#fff'}
        }}
      >

        <Tab.Screen
          name="Clock"
          component={Clock}
          options={{
            title: "Clock",
            tabBarIcon: ({focused, color, size}) => {
              let icon = focused ? "time" : "time-outline";
              return (
                <Ionicons name={icon} color={color} size={size} />
              );
            },
          }}
        />

        <Tab.Screen
          name="Stopwatch"
          component={Stopwatch}
          options={{
            title: "Stopwatch",
            tabBarIcon: ({focused, color, size}) => {
              let icon = focused ? "stopwatch" : "stopwatch-outline";
              return (
                <Ionicons name={icon} color={color} size={size} />
              );
            },
          }}
        />
        
        <Tab.Screen
          name="Timer"
          component={Timer}
          options={{
            title: "Timer",
            tabBarIcon: ({focused, color, size}) => {
              let icon = focused ? "timer" : "timer-outline";
              return (
                <Ionicons name={icon} color={color} size={size} />
              );
            },
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );

}
