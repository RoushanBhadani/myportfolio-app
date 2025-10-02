import { useEffect, useRef, useState } from 'react';
import { FlatList, Image, View } from 'react-native';
import {DATA} from "../../utils/Data";

function SkillsCarousel() {
    const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % DATA.length;
      setCurrentIndex(nextIndex);

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const itemRender = ({ item }) => {
    return (
      <View style={{ marginHorizontal: 20, marginVertical: 20, borderWidth: 1, borderColor:'#f57b00ff', borderRadius:5, padding:10, backgroundColor:'#fcb771ee' }}>
        <Image
          source={item.image}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
      </View>
    );
  };
  return (
    <FlatList
        ref={flatListRef}
        data={DATA}
        renderItem={itemRender}
        keyExtractor={(item) => item.id}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
  )
}

export default SkillsCarousel