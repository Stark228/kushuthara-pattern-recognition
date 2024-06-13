import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, Image } from 'react-native';
import { Platform } from 'react-native';
import bg from '../assets/newbg1.png'
import AboutUs from './AboutUs';
import { ImageSlider } from "react-native-image-slider-banner";


const ThreeDotMenu = ({ openMenu }) => (
  <TouchableOpacity onPress={openMenu} style={{ marginRight: 15 }}>
    <Image
      source={{ uri: 'https://static.thenounproject.com/png/3636116-200.png' }}
      style={{ width: 20, height: 20, tintColor: 'black' }}
    />
  </TouchableOpacity>
);

function HomeScreen() {

  const font = Platform.OS === 'ios' ? 'Helvetica' : 'Roboto';
  const [isMenuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
    return (
      <ImageBackground
        source={bg}
        style={styles.backgroundImage}
      >
        <View style={{ marginTop: 40, marginLeft:325, marginBottom:4 }}>
        <ThreeDotMenu openMenu={openMenu} />  
        </View>
        <AboutUs isMenuVisible={isMenuVisible} closeMenu={closeMenu} />

        {/* <Text style={{ color: 'gray',fontSize:25, fontFamily: font, fontWeight: 'bold', textAlign:'center'  }}>KISHUTHARA PATTERN RECOGNITION</Text>
        <Text style={{ color: 'gray',fontSize:20, fontFamily: font, fontWeight: 'bold', textAlign:'center'  }}>KISHUTHARA PATTERN RECOGNITION</Text> */}

        <ImageSlider 
            data={[
                {img: 'https://i.postimg.cc/bYDPbrkc/1-removebg-preview.png'},
                {img: 'https://i.postimg.cc/43HvVjv1/White-4-removebg-preview.png'},
                {img: 'https://i.postimg.cc/mgr8zz17/2-removebg-preview.png'},
                {img: 'https://i.postimg.cc/C1tVXpyQ/4-removebg-preview-1.png'},
                
            ]}
            autoPlay={true}
            interval={20000}  // Set the interval to 3000 milliseconds (3 seconds) 
            height={300}
            closeIconColor="#fff"
          
        />
       
     
        <View style={{ position: 'absolute', bottom: 35, width: '100%',padding:20}}>
          {/* <Text style={{ color: 'black', textAlign: 'center', fontSize:22, fontFamily: font, fontWeight: 'bold'  }}>Kishuthara Motif Classification</Text> */}
          <Text style={{ color: 'white',fontSize:25, fontFamily: font, fontWeight: 'bold'  }}>EXPLORE {'\n'}BHUTANESE {'\n'}TEXTILE {'\n'}KISHUTHARA {'\n'}MOTIF WITH US.</Text>
           <Text style={{ color: 'white',fontSize:16, fontFamily: font, fontWeight: 'bold' }}>Kishuthara Pattern Recognition</Text>
       </View>
      </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch' or 'contain'
       // Optional: align content vertically
    },
  });

export default HomeScreen;
