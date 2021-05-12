import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
// import Home from '°./src/views/Home';
import Task from './src/views/Task';

export default function App() {
  return (
    <>
      <SafeAreaView backgrounßdColor="#20295F">
        <StatusBar barStyle="light-content" backgroundColor="#20295F" />
      </SafeAreaView>
      <Task />
    </>
  );
}
