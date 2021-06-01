/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, isPast } from 'date-fns';
import styles from './styles';

import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';

export default function DateTimePickerComponent({ type, save, date, hour }) {
  const [inputDate, setInputDate] = useState();
  const [dateTime, setDateTime] = useState(new Date());
  const [modePicker, setModePicker] = useState('date');
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (type === 'date' && date) {
      setInputDate(format(new Date(date), 'dd/MM/yyyy'));
      save(format(new Date(date), 'yyy-MM-dd'));
    }

    if (type === 'time' && hour) {
      setInputDate(format(new Date(hour), 'HH:mm'));
      save(format(new Date(hour), 'HH:mm'));
    }
  }, []);

  const onChange = (_, selectedDate) => {
    if (selectedDate === undefined) {
      setShowPicker(Platform.OS === 'ios');
      return;
    }
    const currentDate = selectedDate || new Date();
    setShowPicker(Platform.OS === 'ios');
    if (modePicker === 'date') {
      if (isPast(new Date(currentDate, 24, 59, 59, 0)))
        Alert.alert('Você não pode escolher uma data passada');
      setInputDate(format(new Date(currentDate), 'dd/MM/yyyy'));
      setDateTime(currentDate);
      save(format(new Date(currentDate), 'yyy-MM-dd'));
    } else {
      if (isPast(new Date(currentDate)))
        Alert.alert('Você não pode escolher uma hora passada');
      setInputDate(format(new Date(currentDate), 'HH:mm'));
      setDateTime(currentDate);
      save(format(new Date(currentDate), 'HH:mm'));
    }
  };

  function showDataPicker() {
    setShowPicker(true);
    setModePicker(type);
  }

  function closePicker() {
    setShowPicker(false);
  }

  return (
    <View>
      <View>
        <TouchableOpacity onPress={showDataPicker}>
          <TextInput
            style={styles.input}
            placeholder={
              type === 'date'
                ? 'Clique aqui para definir a data...'
                : 'Clique aqui para definir a hora...'
            }
            editable={false}
            value={inputDate}
          />
          <Image
            style={styles.iconTextInput}
            source={type === 'date' ? iconCalendar : iconClock}
          />
        </TouchableOpacity>
      </View>
      {showPicker && Platform.OS === 'ios' && (
        <TouchableOpacity onPress={closePicker}>
          <Text style={styles.textCloseButton}>Fechar</Text>
        </TouchableOpacity>
      )}
      {showPicker && (
        <DateTimePicker
          value={dateTime}
          mode={modePicker}
          is24Hour
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minimumDate={new Date()}
          onChange={onChange}
        />
      )}
    </View>
  );
}
