
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ImageSlider } from 'react-native-image-slider-banner';

const YourComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onItemChanged = (index) => {
    setCurrentIndex(index);
  };

  const data = [
    { img: 'https://i.postimg.cc/LXWW7HPg/final.png', caption: 'Caption 1 nsdbvh hurfguery ryuehyure' },
    { img: 'https://i.postimg.cc/vBcC81LZ/bg2-removebg-preview.png', caption: 'Caption 2' },
    { img: 'https://i.postimg.cc/kMZRgk9J/home-removebg-preview.png', caption: 'Caption 3' },
  ];

  return (
    <>
      <ImageSlider
        data={data}
        autoPlay={false}
        interval={7000}
        onItemChanged={onItemChanged}
        closeIconColor="#fff"
      />
      <View style={{ position: 'absolute', bottom: 0, width: '100%', padding: 16 }}>
      <Text style={{ color: 'white', textAlign: 'center' }}>{data[currentIndex]?.caption}</Text>
      <Text style={{ color: 'white', textAlign: 'center' }}>{data[0].caption}</Text>


      </View>
    </>
  );
};

export default YourComponent;

