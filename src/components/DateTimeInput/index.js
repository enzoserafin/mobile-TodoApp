/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import styles from './styles';

import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';

export default function DateTimePickerComponent({ type }) {
  const [date, setDate] = useState();
  const [modePicker, setModePicker] = useState('date');
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    if (modePicker === 'date')
      setDate(format(new Date(currentDate), 'dd/MM/yyyy'));
    else setDate(format(new Date(currentDate), 'HH:mm'));
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
            value={date}
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
