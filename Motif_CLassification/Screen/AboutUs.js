import React, { useRef, useState, useEffect } from 'react';
import { Modal, View, Text, ScrollView, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import map from '../assets/map1.png';
import bg from '../assets/storybg.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { ImageSlider } from "react-native-image-slider-banner";
function AboutUs({ isMenuVisible, closeMenu }) {
  const [activeIndex, setActiveIndex] = useState(2);
  const carouselRef = useRef(null);

  const carouselItems = [
    {
      title: 'Item 1',
      imageSource: 'https://i.postimg.cc/3w3PvLhW/Aesthetic-Feminine-Motivation-Quote-Mood-Photo-Coffee-Your-Story.png',
    },
    {
      title: 'Item 2',
      imageSource: 'https://via.placeholder.com/300',
    },
    {
      title: 'Item 3',
      imageSource: 'https://via.placeholder.com/300',
    },
    {
      title: 'Item 4',
      imageSource: 'https://via.placeholder.com/300',
    },
  ];

  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ backgroundColor: 'floralwhite', borderRadius: 5, height: 300, width: 180 }}>
        <Image source={{ uri: item.imageSource }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />
      </View>
    );
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.snapToItem(1);
    }
  }, [carouselRef]);

  return (
    <Modal visible={isMenuVisible} onRequestClose={closeMenu} animationType="slide">
      <ScrollView style={styles.container}>
        <ImageBackground style={styles.backgroundImage}>
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={closeMenu} >
                <Icon name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.title}>About</Text>
            </View>
            <View style={{width: '100%',padding:5}}>
                {/* <Text style={{ color: 'black', textAlign: 'center', fontSize:22, fontFamily: font, fontWeight: 'bold'  }}>Kishuthara Motif Classification</Text> */}
                <Text style={{ color: 'gray',fontSize:25,  fontWeight: 'bold', textAlign:'center'  }}>EXPLORE BHUTANESE {'\n'}TEXTILE KISHUTHARA {'\n'}MOTIF WITH US.{'\n'}</Text>
                
            </View>
            <Text style={{ color: 'gray',  fontSize: 21, fontWeight: 'bold', paddingLeft:20}}>
            OUR TEAM
            </Text>
            <ImageSlider 
            data={[
                {img: 'https://i.postimg.cc/RZZDQkCD/nima1.png'},
                {img: 'https://i.postimg.cc/CxVz9BDb/tj.png'},
                {img: 'https://i.postimg.cc/SKTgyh3p/pelki.png'},
                {img: 'https://i.postimg.cc/xdw9pW59/yd.png'},
                
            ]}
            autoPlay={false}
            interval={10000}  // Set the interval to 3000 milliseconds (3 seconds) 
            height={300}
            width={200}
            closeIconColor="#fff"
          
          />
          <View style={{fontSize: 16, padding:20}}>
            <Text style={{ color: 'gray',  fontSize: 21, fontWeight: 'bold'}}>
            OUR OBJECTIVES {'\n'}
            </Text>
            
            <Text style={{ fontSize: 16}}>
            Kishuthara is a well known hand woven textile in Bhutan. It is known for its extremely
            intricate patterned silk textile. However, most Bhutanese individuals and foreigners are
            not aware of the different patterns used in Kishuthara. The purpose of the study is to
            develop a deep learning model capable of recognizing and classifying five different patterns
            commonly found in Kishuthara. The scope of the study is within the country. Our primary target 
            audience are buyers and tourists. Using this system, they can easily identify
            and learn about the significance of kishuthara patterns.
            </Text>
            
          </View>

          <View style={{width: '100%',padding:20}}>
  
                <Text style={{ color: 'gray',fontSize:21,  fontWeight: 'bold', }}>WE ARE, BASED IN {'\n'}KABJISA, THINPHU.{'\n'}</Text>
                <Image source={map} style={styles.image}/>
                
            </View>
          
            
          </View>

          {/* <View>
            <Carousel
              layout={'default'}
              ref={carouselRef}
              data={carouselItems}
              sliderWidth={300}
              itemWidth={200}
              initialScrollIndex={2}
              renderItem={_renderItem}
              onSnapToItem={(index) => setActiveIndex(index)}
            />
          </View> */}
        </ImageBackground>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: 'cover',
    alignSelf: 'center',
    padding:20
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    opacity:0.9
  },
  contentContainer: {
    flex: 1,

  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    color: 'black',
    paddingLeft: 10,
  },

});

export default AboutUs;
