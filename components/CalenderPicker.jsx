import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import CalendarPicker from 'react-native-calendar-picker';

export default function Calender() {
  const [selectedStartDate, setSelectedStartDate] = useState('DD/MM/YYYY');

  const [selectedEndDate, setSelectedEndDate] = useState('DD/MM/YYYY');

  const minDate = new Date(); // Today
  const maxDate = new Date(2026, 11, 31);
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => setShowPicker(!showPicker);

  const onDateChange = (date, type) => {
    const newDate = JSON.stringify(date);
    console.log(newDate);
    const newD = newDate.substring(1, newDate.length - 1);
    const dates = newD.split('T');
    const date1 = dates[0].split('-');
    const day = date1[2];
    const month = date1[1];
    const year = date1[0];
    if (type == 'END_DATE') {
      if (day === undefined) {
        setSelectedEndDate('DD/MM/YYYY');
      } else {
        setSelectedEndDate(day + '/' + month + '/' + year);
      }
    } else {
      setSelectedStartDate(day + '/' + month + '/' + year);
    }
  };

  const confirmDate = () => {
    togglePicker();
  };

  return (
    <View>
      <View>
        {/* ...existing code... */}

        {!showPicker && (
          <Pressable onPress={togglePicker}>
            <Text editable={false} onPressIn={togglePicker}>
              Choose the date
            </Text>
          </Pressable>
        )}

        <View className="text-white">
          {showPicker && (
            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={true}
              minDate={minDate}
              maxDate={maxDate}
              todayBackgroundColor="#e1840b"
              selectedDayColor="#FF9C01"
              selectedDayTextColor="#FFFFFF"
              onDateChange={onDateChange}
            />
          )}
          {showPicker && (
            <View>
              {/* style={{ flexDirection: 'row', justifyContent: 'space-between' }} */}
              {/* <TouchableOpacity onPress={cancelDate}>
                <Text>Cancel</Text>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={confirmDate}>
                <Text>Confirm</Text>
              </TouchableOpacity>
            </View>
          )}

          <View>
            <Text className="text-lg font-bold text-black">
              SELECTED START DATE: {selectedStartDate}
            </Text>
            <Text className="text-lg font-bold text-black">
              SELECTED END DATE: {selectedEndDate}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
