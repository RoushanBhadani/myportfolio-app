import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useLayoutEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function GradientWrapper({ children, margin }) {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  }, [navigation]);

  let lastOffset = 0;
  return (
    <LinearGradient
      colors={["rgba(7,7,9,1)", "rgba(27,24,113,1)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView
        style={{ margin: margin }}
        // onScroll={(event) => {
        //   const currentOffset = event.nativeEvent.contentOffset.y;
        //   if (currentOffset > lastOffset) {
        //     navigation.setOptions({ headerShown: false });
        //   } else {
        //     navigation.setOptions({ headerShown: true });
        //   }
        //   lastOffset = currentOffset;
        // }}
        // scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
