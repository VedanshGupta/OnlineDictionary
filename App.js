import React from 'react';
import { Component }from 'react';
import { View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class App extends Component{
	render(){ 
	  return (
      <SafeAreaProvider>
        <View>
          <HomeScreen />
        </View>
      </SafeAreaProvider>
	  )
	}
}
