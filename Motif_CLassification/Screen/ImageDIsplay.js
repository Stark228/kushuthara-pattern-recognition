
import React from 'react';
import { View, StyleSheet, Text, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Button } from 'react-native-paper';
import bg from '../assets/storybg.png';
export default function ImageDisplayScreen({ route }) {

  const { result, imageUri } = route.params;
    const navigation = useNavigation();


    const descriptions = {
      'Dorji': 'Dorji or double thunderbolt is a ritual weapon in Hinduism, Buddhism, and Jainism. It represents the properties of indestructibility and irresistible force. It is thought to protect against all impediments, illnesses, and misfortunes.',
      'Karma': "Karma is a symbol of a butterfly that represents resurrection, change, renewal, hope, endurance, and the courage to embrace transformation to improve one's life. It is interpreted as a symbol of spiritual transformation in Buddhism",
      'Phyemali': 'Phyemali Tren is a bee web that represents fertility, wisdom, chastity, love, success, wealth, hard work, and altruism.',
      'Shinglo': 'Shinglo represents the tree of life. In general, leaves represent fertility and growth, though different leaves represent different symbols. Buddhists associate leaves with the Bodhi Fig tree, where the Buddha attained enlightenment through meditation. This textile design symbol combines temporal and spiritual significance.',
      'Yunrung': 'Yunrung or Swastika is derived from the Sanskrit word svastika, which means "conducive to well-being." It is a symbol of good fortune and prosperity in Buddhism, Hinduism, and Jainism. Because of the lovely patterns and their significance, people have adapted them for use as a textile design.',
    };
  
    // Check if the result matches any of the types
    const matchedDescription = descriptions[result];

  return (
    <ImageBackground source={bg} style={styles.container}>
      <Text></Text>
      <Text></Text>
      <Card style={{backgroundColor:'#B8B3A9'}}>
        <Card.Cover
          source={{ uri: imageUri }}
          style={{ height: 400 }} // Adjust the height as needed
        />
        <Card.Title title={ result } titleStyle={{ fontSize: 20 }} />
        {matchedDescription && (
          <Card.Content>
            <Text variant="bodyMedium">
              {matchedDescription}
            </Text>
          </Card.Content>
        )}
        </Card>
        <View style={styles.buttonContainer}>

          {/* <Button icon="arrow-left" mode="outlined" onPress={() => navigation.navigate('Classify')}>
              Retake
          </Button>
          <Button icon="home" mode="outlined" onPress={() => navigation.navigate('Home')}>
            Home
          </Button> */}

        </View>

        <View style={styles.buttonContainer}>
          <Button
            icon="arrow-left"
            mode="outlined"
            onPress={() => navigation.navigate('Classify')}
            style={{ color: 'white' }}
            labelStyle={{ color: 'white' }}
          >
            Retake
          </Button>

          <Button
            icon="home"
            mode="outlined"
            onPress={() => navigation.navigate('Home')}
            style={{ color: 'white' }}
            labelStyle={{ color: 'white' }}
          >
            Home
          </Button>
        </View>
     
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    color:'white'
  },
});