import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function StartDatePicker() {
  const [eDate, setEDate] = useState('');
  const [eDate1, setEDate1] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => setShowPicker(!showPicker);

  const onChangeStart = ({ type }: any, selectDate: any) => {
    if (type == 'set') {
      const currentDate = selectDate;
      setStartDate(currentDate);
      if (Platform.OS === 'android') {
        togglePicker();
        setEDate(currentDate.toDateString());
      }
    } else {
      togglePicker();
    }
  };

  const onChangeEnd = ({ type }: any, selectDate: any) => {
    if (type == 'set') {
      const currentDate = selectDate;
      setEndDate(currentDate);
      if (Platform.OS === 'android') {
        togglePicker();
        setEDate1(currentDate.toDateString());
      }
    } else {
      togglePicker();
    }
  };

  const confirmIosDate = () => {
    setEDate(startDate.toDateString());
    togglePicker();
  };

  return (
    <View>
      <Text>Choose Date</Text>
      <View>
        <Text>Start Date</Text>
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={startDate}
            onChange={onChangeStart}
            minimumDate={new Date()}
            maximumDate={new Date('2026-12-31')}
          />
        )}

        {showPicker && Platform.OS === 'ios' && (
          <View>
            {/* style={{ flexDirection: 'row', justifyContent: 'space-between' }} */}
            <TouchableOpacity onPress={togglePicker}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmIosDate}>
              <Text>Confirm</Text>
            </TouchableOpacity>
          </View>
        )}

        {!showPicker && (
          <Pressable onPress={togglePicker}>
            <TextInput
              placeholder="1/1/2022"
              value={eDate}
              onChangeText={(text) => setStartDate(new Date(text))}
              editable={false}
              onPressIn={togglePicker}
            />
          </Pressable>
        )}
      </View>

      <View>
        <Text>End Date</Text>
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={endDate}
            onChange={onChangeEnd}
            minimumDate={new Date()}
            maximumDate={new Date('2026-12-31')}
          />
        )}

        {showPicker && Platform.OS === 'ios' && (
          <View>
            {/* style={{ flexDirection: 'row', justifyContent: 'space-between' }} */}
            <TouchableOpacity onPress={togglePicker}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmIosDate}>
              <Text>Confirm</Text>
            </TouchableOpacity>
          </View>
        )}

        {!showPicker && (
          <Pressable onPress={togglePicker}>
            <TextInput
              placeholder="1/1/2025"
              value={eDate1}
              onChangeText={(text) => setEndDate(new Date(text))}
              editable={false}
              onPressIn={togglePicker}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}
