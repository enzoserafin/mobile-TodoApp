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

export default function DateTimePickerComponent() {
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    if (mode === 'date') setDate(format(new Date(currentDate), 'dd/MM/yyyy'));
    else setHour(format(new Date(currentDate), 'HH:mm'));
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <View>
        <TouchableOpacity onPress={showDatepicker}>
          <TextInput
            style={styles.input}
            placeholder="Clique aqui para definir a data..."
            editable={false}
            value={date}
          />
          <Image style={styles.iconTextInput} source={iconCalendar} />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={showTimepicker}>
          <TextInput
            style={styles.input}
            placeholder="Clique aqui para definir a hora..."
            editable={false}
            value={hour}
          />
          <Image style={styles.iconTextInput} source={iconClock} />
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          // testID="dateTimePicker"
          value={new Date()}
          mode={mode}
          is24Hour
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}
