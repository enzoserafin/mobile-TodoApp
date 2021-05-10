/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from './styles';

import add from '../../assets/add.png';
import save from '../../assets/save.png';

export default function Footer({ isEditing }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon}>
        <Image source={isEditing ? save : add} style={styles.iconImage} />
      </TouchableOpacity>

      <Text style={styles.text}>Organizando sua vida</Text>
    </View>
  );
}
