import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ImageBackground, StyleSheet} from 'react-native';
import { Platform } from 'react-native';
import {Card} from 'react-native-paper';
import dorji from '../assets/images/dorji.png'
import karma from '../assets/images/karma.png'
import shinglo from '../assets/images/shinglo.png'
import phyemali from '../assets/images/phyemali.png'
import yunrung from '../assets/images/yunrung.png'
import AboutUs from './AboutUs';
import bg from '../assets/storybg.png'
import history from '../assets/history.jpeg'

const ThreeDotMenu = ({ openMenu }) => (
    <TouchableOpacity onPress={openMenu} style={{ marginRight: 15 }}>
      <Image
        source={{ uri: 'https://static.thenounproject.com/png/3636116-200.png' }}
        style={{ width: 20, height: 20, tintColor: 'black' }}
      />
    </TouchableOpacity>
  );

function Gallery() {

  const font = Platform.OS === 'ios' ? 'Helvetica' : 'Roboto';

  const cards = [ 
    {
      id: 1,
      title: 'Dorji',
      description: 'Dorji or double thunderbolt is a ritual weapon in Hinduism, Buddhism,and Jainism. It represents the properties of indestructibility and irresistible force. It is thought to protect against all impediments, illnesses, and misfortunes.',
      image : dorji
    },
    {
      id: 2,
      title: 'Karma',
      description: "Karma is a symbol of a butterfly that represents resurrection, change, renewal, hope, endurance, and the courage to embrace transformation to improve one's life. It is interpreted as a symbol of spiritual transformation in Buddhism",
      image : karma
    },
    {
      id: 3,
      title: 'Phyemali',
      description: 'Phyemali Tren is a bee web that represents fertility, wisdom, chastity, love, success, wealth, hard work, and altruism.',
      image : phyemali
    },
    {
      id: 4,
      title: 'Shinglo',
      description: 'Shinglo represents the tree of life. In general, leaves represent fertility and growth, though different leaves represent different symbols. Buddhists associate leaves with the Bodhi Fig tree, where the Buddha attained enlightenment through meditation. This textile design symbol combines temporal and spiritual significance.',
      image : shinglo
    },
    {
      id: 5,
      title: 'Yunrung',
      description: 'Yunrung or Swastika is derived from the Sanskrit word svastika, which means "conducive to well-being." It is a symbol of good fortune and prosperity in Buddhism, Hinduism, and Jainism. Because of the lovely patterns and their significance, people have adapted them for use as a textile design.',
      image : yunrung
    },
  ];

  const initialSelectedCard = cards[0];
  const [selectedCard, setSelectedCard] = useState(initialSelectedCard);

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
        <ScrollView>

        <AboutUs isMenuVisible={isMenuVisible} closeMenu={closeMenu} />
        <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ flex: 1,fontSize: 24, fontFamily: font, fontWeight:'bold',color:'black' }}>About Kishuthara</Text>
        <Text></Text>
            <Card style={{backgroundColor:'#B8B3A9'}}>
                
                <Card.Cover source={history} />
                {/* <Card.Title title="History of Kishuthara" titleStyle={{ fontSize: 24 }} /> */}
                {/* <Card.Title title=""/> */}
                <Card.Content>  
                    <Text style={{ fontSize: 16 }}>
                    {'\n'}Kishuthara is famousely known for its extremely intricate patterned silk textiles. The
                    hand-woven textiles comes from Khoma village, located approximately 11 km away from
                    Lhuentse district. The primary raw material for the textile is the brocades available in
                    retail markets. It is considerably expensive due to its huge investment of time and energy
                    for the weavers. The most expensive Kishuthara takes almost a year to complete due to
                    its complicated patterns and design. The cost differs with the complication of the pattern,
                    design and the quality of brocades being used.{'\n'}{'\n'}
                    Kishuthara is traditionally woven on a white background decorated with intricate discontinuous 
                    supplementary weft patterns called trima, a technique where extra weft yarns
                    are coiled around the warp to create motifs raised above the surface. Over the years,
                    kushuthara has evolved into many style variations, with more complex patterns and different background colors. 
                    With the availability of only natural dyes, the ground colors
                    were limited to blue (ngosham), red (mapsham), black (napsham), and green (jangsham).
                    Today, kushutharas are woven in a wide range of colors with synthetic dyes and imported
                    yarns from India and China. These contemporary designs are collectively known as pesar,
                    meaning new design .
                    </Text>
                </Card.Content>
            </Card>
      </View>

      <Text style={{ flex: 1, paddingLeft: 16, fontSize: 22, fontWeight:'bold' }}>Common Kishuthara motifs</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 16 }}>
      
        {cards.map((card) => (
           
          <TouchableOpacity
            key={card.id}
            onPress={() => setSelectedCard(card)}
            style={{
              padding: 8,
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
              backgroundColor: selectedCard && selectedCard.id === card.id ? 'lightblue' : '#B8B3A9',
            }}
          >
            <Text>{card.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flex: 1, padding: 16 }}>
        {selectedCard ? (
          <Card style={{backgroundColor:'#B8B3A9'}}>

            <Card.Cover source={selectedCard.image }/>
            <Card.Title title={selectedCard.title} titleStyle={{ fontSize: 20 }}/>
            <Card.Content>
                
                <Text style={{ fontSize: 16 }}>{selectedCard.description}</Text>
            </Card.Content>
         </Card>
        ) : (
          <Text>Select a card to see the description</Text>
        )}
      </View>  

      <View style={{ flex: 1, padding: 16 }}>

      </View>  
      </ScrollView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
     // Optional: align content vertically
  },
});

export default Gallery;
