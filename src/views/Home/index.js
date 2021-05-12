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
} from 'react-native';

import styles from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TaskCard from '../../components/TaskCard';
import api from '../../services/api';

import filterItens from '../../utils/filterItens';

export default function Home() {
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lateCount, setLateCount] = useState();

  async function loadTasks() {
    await api.get(`/task/filter/${filter}/11:11:11:11:11:11`).then(response => {
      setTasks(response.data);
      setLoading(false);
    });
  }

  async function lateVerify() {
    await api.get(`/task/filter/late/11:11:11:11:11:11`).then(response => {
      setLateCount(response.data.length);
    });
  }

  function notification() {
    setFilter('late');
  }

  useEffect(() => {
    setLoading(true);
    loadTasks();
    lateVerify();
  }, [filter]);

  return (
    <View style={styles.container}>
      <Header
        ShowNotification
        showBack={false}
        pressNotification={notification}
        late={lateCount}
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
                type={item.type}
                title={item.title}
                when={item.when}
              />
            );
          })}
        </ScrollView>
      )}

      <Footer isEditing />
    </View>
  );
}
