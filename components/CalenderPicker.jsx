import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import CustomButton from './CustomButton';

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
    <View className="my-6 px-4 space-y-6">
      <View>
        {!showPicker && (
          <Pressable onPress={togglePicker}>
            <Text
              className="text-xl  font-psemibold text-black mt-4 mb-4"
              editable={false}
              onPressIn={togglePicker}
            >
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
              {/* <TouchableOpacity onPress={cancelDate}>
                <Text>Cancel</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                className="bg-secondary rounded-xl mt-4 min-h-[62px] justify-center  "
                activeOpacity={0.7}
                onPress={confirmDate}
              >
                <Text className="text-primary font-psemibold text-lg text-center">
                  Confirm
                </Text>
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
