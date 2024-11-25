import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import CustomButton from './CustomButton';
import { AntDesign } from '@expo/vector-icons';
interface CalenderProps {
  onDateChanges: (startDate: string, endDate: string) => void;
}

export default function Calender({ onDateChanges }: CalenderProps) {
  const [selectedStartDate, setSelectedStartDate] = useState('YYYY/MM/DD');

  const [selectedEndDate, setSelectedEndDate] = useState('YYYY/MM/DD');

  const minDate = new Date(); // Today
  const maxDate = new Date(2026, 11, 31);
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => setShowPicker(!showPicker);

  const onDateChange = (date: Date, type: 'START_DATE' | 'END_DATE') => {
    const newDate = JSON.stringify(date);
    const newD = newDate.substring(1, newDate.length - 1);
    const dates = newD.split('T');

    if (dates[0]) {
      const date1 = dates[0].split('-');
      const day = date1[2];
      const month = date1[1];
      const year = date1[0];

      if (type === 'END_DATE') {
        if (day === undefined) {
          setSelectedEndDate('YYYY/MM/DD');
        } else {
          setSelectedEndDate(year + '-' + month + '-' + day);
        }
      } else {
        // setSelectedStartDate(day + '/' + month + '/' + year);
        setSelectedStartDate(year + '-' + month + '-' + day);
      }
    }
  };

  const confirmDate = () => {
    togglePicker();
    onDateChanges(selectedStartDate, selectedEndDate);
  };
  const cancelDate = () => {
    togglePicker();
    setSelectedStartDate('YYYY/MM/DD');
    setSelectedEndDate('YYYY/MM/DD');
  };

  return (
    <View className="my-6 px-4 space-y-6">
      <View>
        {!showPicker && (
          <Pressable onPress={togglePicker}>
            <Text
              className="text-xl  font-psemibold text-center text-black mt-4 mb-4"
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
            <View className="flex flex-row justify-between">
              <TouchableOpacity
                onPress={cancelDate}
                className="bg-secondary rounded-xl px-12  mt-4 min-h-[62px] justify-center"
              >
                <Text className="text-primary font-psemibold  text-lg text-center">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-secondary rounded-xl px-12 mt-4 min-h-[62px] justify-center  "
                activeOpacity={0.7}
                onPress={confirmDate}
              >
                <Text className="text-primary font-psemibold text-lg text-center">
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View className="flex flex-row ml-5 mt-3">
            <View className="relative">
              <TextInput
                value={selectedStartDate}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                placeholder="Select date start"
              />
            </View>
            <Text className="mx-4 mt-3 text-gray-500">to</Text>
            <View className="relative">
              <TextInput
                value={selectedEndDate}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5  "
                placeholder="Select date start"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
