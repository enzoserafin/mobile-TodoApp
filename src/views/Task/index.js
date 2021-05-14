/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Switch,
  Alert,
  ActivityIndicator,
} from 'react-native';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import typeIcons from '../../utils/typeIcons';
import DateTimeInput from '../../components/DateTimeInput';
import styles from './styles';
import getDeviceId from '../../utils/getDeviceId';
import api from '../../services/api';

export default function Task({ navigation }) {
  const [id, setId] = useState();
  const [done, setDone] = useState(false);
  const [type, setType] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [deviceId, setDeviceId] = useState();
  const [load, setLoad] = useState(true);

  function formTaskValidate() {
    if (!type) {
      return Alert.alert('Você precisa selecionar o tipo da tarefa');
    }
    if (!title) {
      return Alert.alert('Você precisa informar o título da tarefa');
    }
    if (!description) {
      return Alert.alert('Você precisa informar a descrição da tarefa');
    }
    if (!date) {
      return Alert.alert('Você precisa definir a data da tarefa');
    }
    if (!hour) {
      return Alert.alert('Você precisa definir a hora da tarefa');
    }
    return true;
  }

  function saveTask() {
    if (formTaskValidate()) {
      if (id) {
        api
          .put(`/task/${id}`, {
            macaddress: deviceId,
            done,
            type,
            title,
            description,
            when: `${date}T${hour}:00.000`,
          })
          .then(() => {
            navigation.navigate('Home');
          })
          .catch(e => {
            Alert.alert('Erro ao atualizar a tarefa', e);
          });
      } else {
        api
          .post('/task', {
            macaddress: deviceId,
            type,
            title,
            description,
            when: `${date}T${hour}:00.000`,
          })
          .then(() => {
            navigation.navigate('Home');
          })
          .catch(e => {
            Alert.alert('Erro ao cadastrar a tarefa', e);
          });
      }
    }
  }

  async function loadTask() {
    await api
      .get(`/task/${id}`)
      .then(response => {
        setLoad(true);
        setDone(response.data.done);
        setType(response.data.type);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setDate(response.data.when);
        setHour(response.data.when);
      })
      .catch(err => {
        Alert.alert(`Erro ao buscar tarefa :${err}`);
      });
  }

  function deleteTask() {
    api.delete(`/task/${id}`).then(() => {
      navigation.navigate('Home');
    });
  }

  async function remove() {
    Alert.alert(
      'Remover Tarefa',
      'Deseja remover essa tarefa?',
      [{ text: 'Cancelar' }, { text: 'Confirmar', onPress: deleteTask() }],
      { cancelable: true },
    );
  }

  useEffect(() => {
    getDeviceId().then(result => {
      setDeviceId(result);
      setLoad(false);
    });

    if (navigation.state.params) {
      setId(navigation.state.params.idTask);
      loadTask().then(() => setLoad(false));
    }
  }, [deviceId]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Header showBack navigation={navigation} />
      {load ? (
        <ActivityIndicator
          color="#EE6B26"
          size={50}
          style={{ flex: 1, alignItems: 'center' }}
        />
      ) : (
        <ScrollView style={{ width: '100%' }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 10 }}
          >
            {typeIcons.map(
              (icon, index) =>
                icon != null && (
                  <TouchableOpacity key={icon} onPress={() => setType(index)}>
                    <Image
                      source={icon}
                      style={[
                        styles.imageIcon,
                        type && type !== index && styles.typeIconInative,
                      ]}
                    />
                  </TouchableOpacity>
                ),
            )}
          </ScrollView>

          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            maxLength={30}
            placeholder="Lembre-me de fazer"
            onChangeText={text => setTitle(text)}
            value={title}
          />

          <Text style={styles.label}>Detalhes</Text>
          <TextInput
            style={styles.inputArea}
            maxLength={200}
            multiline
            placeholder="Detalhes da atividade que eu tenho que lembrar..."
            onChangeText={text => setDescription(text)}
            value={description}
          />

          <DateTimeInput type="date" save={setDate} date={date} />
          <DateTimeInput type="time" save={setHour} hour={hour} />

          {id && (
            <View style={styles.inLine}>
              <View style={styles.inputInLine}>
                <Switch
                  onValueChange={() => setDone(!done)}
                  value={done}
                  thumbColor={done ? '#00761B' : '#EE6B26'}
                />
                <Text style={styles.switchLabel}>Concluído</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.removeLabel} onPress={remove}>
                  EXCLUIR
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
      <Footer isEditing onPress={saveTask} />
    </KeyboardAvoidingView>
  );
}
