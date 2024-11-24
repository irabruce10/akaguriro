import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { FadeInLeft } from 'react-native-reanimated';

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const flatListRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex === images.length - 1) {
        setActiveIndex(0);
        flatListRef?.current?.scrollToIndex({
          index: 0,
          animated: true,
          FadeInLeft,
        });
      } else {
        flatListRef?.current?.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
      }
      setActiveIndex(activeIndex);
    }, 2000);
    return () => clearInterval(interval);
  });
  const images = [
    {
      id: 1,
      image: require('../assets/images/pc.jpg'),
    },
    {
      id: 2,

      image: require('../assets/images/pc1.jpg'),
    },
    {
      id: 3,
      image: require('../assets/images/3.jpg'),
    },
  ];

  const getItemLayout = (data: any, index: number) => {
    return {
      length: screenWidth,
      offset: screenWidth * index,
      index,
    };
  };

  const handleScroll = (event: any) => {
    //get the scroll position
    const scrollPosition = event.nativeEvent.contentOffset.x;

    //get the index of current active

    const activeIndex = Math.round(scrollPosition / screenWidth);

    setActiveIndex(activeIndex);
  };

  const renderDotIndicator = () => {
    return images.map((dot, index) => {
      //set the active dot to white color
      const activeDotColor = index === activeIndex ? '#ea831c' : '#ccc';

      //return the dot
      return (
        <View
          key={index}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 6,
            backgroundColor: activeDotColor,
          }}
        />
      );
    });
  };

  const renderItems = ({ item, index }: { item: any; index: number }) => {
    return (
      <View>
        <Image
          source={item.image}
          style={{ height: 200, width: screenWidth }}
        />
      </View>
    );
  };
  return (
    <View>
      <Text className="text-center mb-6 text-xl text-white ">
        Modern Luxury Apartments .
      </Text>
      <FlatList
        data={images}
        ref={flatListRef}
        getItemLayout={getItemLayout}
        renderItem={renderItems}
        keyExtractor={(item: any) => String(item.id)}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
      />

      <View className="flex flex-row  justify-center mt-6 ">
        {renderDotIndicator()}
      </View>
    </View>
  );
}
