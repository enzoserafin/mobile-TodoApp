import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import filterItens from '../../utils/filterItens';

export default function Home() {
  const [filter, setFilter] = useState();
  return (
    <View style={styles.container}>
      <Header showNotification />

      <View style={styles.filter}>
        {filterItens.map(item => (
          <TouchableOpacity
            key={item.title}
            onPress={() => setFilter(item.actived)}
          >
            <Text
              style={
                filter === item.actived
                  ? styles.filterTextActived
                  : styles.filterTextInative
              }
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Footer isEditing />
    </View>
  );
}
