import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Home from './src/views/Home';

export default function App() {
  return (
    <>
      <SafeAreaView backgroundColor="#20295F">
        <StatusBar barStyle="light-content" backgroundColor="#20295F" />
      </SafeAreaView>
      <Home />
    </>
  );
}
