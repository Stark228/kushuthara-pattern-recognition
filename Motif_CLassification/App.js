import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

import Classify from './Screen/CLassify';
import ImageDisplayScreen from './Screen/ImageDIsplay';
import MyTabs from './Screen/MyTabs';

const Stack = createStackNavigator();

export default function App() {

  return (
    <SafeAreaProvider>
     
      <NavigationContainer> 
 
        <Stack.Navigator
              screenOptions={{
                headerShown: false,
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    textAlign: 'center',
                    alignSelf: 'center',
                    flex: 1,
                    
                  }
              }}
            >
              <Stack.Screen name='Home1' component={MyTabs} />
              <Stack.Screen name='ImageDisplay' component={ImageDisplayScreen}/>
              <Stack.Screen name='Classify' component={Classify}/>
              
            </Stack.Navigator>
 
      </NavigationContainer>
    </SafeAreaProvider>
  );
}




