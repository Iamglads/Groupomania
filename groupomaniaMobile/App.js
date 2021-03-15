/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';




import LoginScreen from './screens/LoginScreen'
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View>
         <LoginScreen />
      </View>
     
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
