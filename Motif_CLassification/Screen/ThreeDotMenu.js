// ThreeDotMenu.js
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ThreeDotMenu = ({ openMenu, navigateToGallery }) => {
  const navigation = useNavigation();

  const handleGalleryPress = () => {
    closeMenu();
    navigation.navigate(navigateToGallery);
  };

  const closeMenu = () => {
    openMenu(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={openMenu}>
        <Appbar.Action icon="dots-vertical" color="black" />
      </TouchableOpacity>

      <Menu
        visible={openMenu}
        onDismiss={closeMenu}
        anchor={<Appbar.Action icon="dots-vertical" color="black" />}
      >
        <Menu.Item onPress={handleGalleryPress} title="Gallery" />
      </Menu>
    </View>
  );
};

export default ThreeDotMenu;
