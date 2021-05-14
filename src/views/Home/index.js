/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';

import styles from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TaskCard from '../../components/TaskCard';
import getDeviceId from '../../utils/getDeviceId';
import api from '../../services/api';

import filterItens from '../../utils/filterItens';

export default function Home({ navigation }) {
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lateCount, setLateCount] = useState();

  function loadTasks(deviceId) {
    setLoading(true);
    api
      .get(`/task/filter/${filter}/${deviceId}`)
      .then(response => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(err => {
        Alert.alert(err);
      });
  }

  async function lateVerify(deviceId) {
    try {
      const response = await api.get(`/task/filter/late/${deviceId}`);
      setLateCount(response.data.length);
    } catch (e) {
      Alert.alert(e);
    }
  }

  function notification() {
    setFilter('late');
  }

  function newTask() {
    navigation.navigate('Task');
  }

  function show(id) {
    navigation.navigate('Task', { idTask: id });
  }

  useEffect(() => {
    getDeviceId().then(deviceId => {
      loadTasks(deviceId);
      lateVerify(deviceId);
    });
  }, [filter]);

  return (
    <View style={styles.container}>
      <Header
        ShowNotification
        showBack={false}
        pressNotification={notification}
        late={lateCount}
        navigation={navigation}
      />

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

      <View style={styles.title}>
        <Text style={styles.titleText}>
          TAREAS {filter === 'late' && ' ATRASADAS'}
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator
          color="#EE6B26"
          size={50}
          style={{ flex: 1, alignItems: 'center' }}
        />
      ) : (
        <ScrollView
          style={styles.content}
          contentContainerStyle={{ alignItems: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          {tasks.map(item => {
            return (
              <TaskCard
                key={item._id}
                done={item.done}
                type={item.type}
                title={item.title}
                when={item.when}
                onPress={() => show(item._id)}
              />
            );
          })}
        </ScrollView>
      )}

      <Footer isEditing={false} onPress={newTask} />
    </View>
  );
}
