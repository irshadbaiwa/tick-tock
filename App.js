import React from 'react';
import Main from './components/Main';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

export default class App extends React.Component {
  state = {
    isReady: false,
  }

  loadFonts = async () => {
    await Font.loadAsync({
      Poppins: require('./assets/fonts/Poppins.ttf'),
      SyneMono: require('./assets/fonts/SyneMono-Regular.ttf'),
    });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.loadFonts}
          // Set state to ready when fonts are loaded
          onFinish={() => this.setState({isReady: true})}
          // Ignore and use default fonts when an error occurs
          onError={(error) => this.setState({isReady: true})}
        />
      );
    }
    return (
      <Main />
    );
  }
}
