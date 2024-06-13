
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import HomeScreen from './HomeScreen';
import AboutUs from './AboutUs';
import Classify from './CLassify';
import Gallery from './Gallery';
import scan from '../assets/images/scan.png'

const Tab = createBottomTabNavigator();

const ThreeDotMenu = ({ openMenu }) => (
  <TouchableOpacity onPress={openMenu} style={{ marginRight: 15 }}>
    <Image
      source={{ uri: 'https://static.thenounproject.com/png/3636116-200.png' }}
      style={{ width: 20, height: 20, tintColor: 'black' }}
    />
  </TouchableOpacity>
);

const MyTabs = () => {
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <View style={{flex:1}}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // tabBarStyle: { backgroundColor: 'gray' },
          headerShown:false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'md-home'; // Replace with Ionicons name for Home
            } else if (route.name === 'Story') {
              iconName = 'md-book'; // Replace with Ionicons name for Story
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => <ThreeDotMenu openMenu={openMenu} />,
          }}
        />
        <Tab.Screen
          name="Story"
          component={Gallery}
          options={{
            headerRight: () => <ThreeDotMenu openMenu={openMenu} />,
          }}
        />
      </Tab.Navigator>
      <View style={styles.touchableOpacityStyle}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate(Classify)}>
          
          <Image
            source={scan}
            style={styles.floatingButtonStyle}
          />
          <Text style={{ fontWeight: 'bold', marginStart:5, }}>Classify</Text>
        </TouchableOpacity>
      </View>
      {/* <AboutUs isMenuVisible={isMenuVisible} closeMenu={closeMenu} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 155,
    bottom: 4,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
    borderRadius:30
  },
});


export default MyTabs;


