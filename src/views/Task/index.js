import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Switch,
} from 'react-native';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import typeIcons from '../../utils/typeIcons';
import DateTimeInput from '../../components/DateTimeInput';
import styles from './styles';

export default function Task() {
  const [done, setDone] = useState(false);
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Header showBack />
      <ScrollView style={{ width: '100%' }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 10 }}
        >
          {typeIcons.map(
            icon =>
              icon != null && (
                <TouchableOpacity key={icon}>
                  <Image source={icon} style={styles.imageIcon} />
                </TouchableOpacity>
              ),
          )}
        </ScrollView>

        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          maxLength={30}
          placeholder="Lembre-me de fazer"
        />

        <Text style={styles.label}>Detalhes</Text>
        <TextInput
          style={styles.inputArea}
          maxLength={200}
          multiline
          placeholder="Detalhes da atividade que eu tenho que lembrar..."
        />

        <DateTimeInput />

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
            <Text style={styles.removeLabel}>EXCLUIR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer isEditing />
    </KeyboardAvoidingView>
  );
}
