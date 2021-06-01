import React from 'react';

import { SafeAreaView, StatusBar } from 'react-native';
import Routes from './src/routes';

export default function App() {
  return (
    <>
      <SafeAreaView backgroundColor="#20295F">
        <StatusBar barStyle="light-content" backgroundColor="#20295F" />
      </SafeAreaView>
      <Routes />
    </>
  );
}
