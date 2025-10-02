import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from "react-native-reanimated";

function HomeContent() {
  const spacing = useSharedValue(0);

  useEffect(() => {
    spacing.value = withRepeat(
      withTiming(10, { duration: 1800 }),
      -1,
      true
    );
    
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      letterSpacing: spacing.value,
      textShadowRadius: spacing.value+30,
    };
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
      }}
    >
      <Text style={{ color: "white", fontSize: 28, fontWeight: "600" }}>
        Hi I'm
      </Text>

      <Animated.Text style={[styles.name, animatedStyle, { textShadowColor: "#f57b00ff" }]}>
        ROUSHAN
      </Animated.Text>

      <Text
        style={{
          color: "#ffffff",
          fontSize: 28,
          fontWeight: "600",
          textAlign: "center",
          marginTop: 12,
        }}
      >
        Transforming Ideas into Digital Reality
      </Text>

      <Text
        style={{
          color: "#ffffff",
          fontSize: 15,
          fontWeight: "600",
          textAlign: "center",
          marginTop: 12,
        }}
      >
        Contact Number: <Text style={{ color: "#f57900" }}>7484030370</Text>
      </Text>

      <Text
        style={{
          color: "#f57900",
          fontSize: 16,
          fontWeight: "400",
          textAlign: "center",
          marginTop: 12,
        }}
      >
        Innovative Frontend Creator | Building Sleek and User-Friendly Web
        Applications
      </Text>

      <View>
        <Image
          source={require("../../assets/boss.png")}
          style={{ width: 280, height: 400 }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

export default HomeContent;

const styles = StyleSheet.create({
  name: {
    color: "#f57b00ff",
    fontSize: 48,
    fontWeight: "600",
  },
});
