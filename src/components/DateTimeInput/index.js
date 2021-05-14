/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  View,
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
  const [dateTime, setDateTime] = useState();
  const [modePicker, setModePicker] = useState('date');
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (type === 'date' && date) {
      setDateTime(format(new Date(date), 'dd/MM/yyyy'));
    }

    if (type === 'time' && hour) {
      setDateTime(format(new Date(hour), 'HH:mm'));
    }
  }, []);

  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate || dateTime;
    setShowPicker(Platform.OS === 'ios');
    if (modePicker === 'date') {
      if (isPast(new Date(currentDate, 24, 59, 59, 0)))
        Alert.alert('Você não pode escolher uma data passada');
      setDateTime(format(new Date(currentDate), 'dd/MM/yyyy'));
      save(format(new Date(currentDate), 'yyy-MM-dd'));
    } else {
      setDateTime(format(new Date(currentDate), 'HH:mm'));
      save(format(new Date(currentDate), 'HH:mm'));
    }
  };

  function showDataPicker() {
    setShowPicker(true);
    setModePicker(type);
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
            value={dateTime}
          />
          <Image
            style={styles.iconTextInput}
            source={type === 'date' ? iconCalendar : iconClock}
          />
        </TouchableOpacity>
      </View>
      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode={modePicker}
          is24Hour
          display="default"
          minimumDate={new Date()}
          onChange={onChange}
        />
      )}
    </View>
  );
}
