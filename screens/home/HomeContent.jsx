import { Button, Image, StyleSheet, Text, View } from 'react-native'
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

function HomeContent() {
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
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

        <Animated.View style={[styles.box, style]} />
      <Button
        title="toggle"
        onPress={() => {
          randomWidth.value = Math.random() * 350;
        }}
      />
        <Text style={{ color: "white", fontSize: 28, fontWeight: 600 }}>
          Hi I'm
        </Text>
        <Text style={{ color: "#f57b00ff", fontSize: 48, fontWeight: 600 }}>
          Roushan
        </Text>
        <Text
          style={{
            color: "#ffffff",
            fontSize: 28,
            fontWeight: 600,
            textAlign: "center",
            marginTop: 12,
          }}
        >
          Transforming Ideas into Digital Reality
        </Text>

        <Text
          style={{
            color: "#ffffff",
            fontSize: 20,
            fontWeight: 600,
            textAlign: "center",
            marginTop: 12,
          }}
        >
          Contact Number: <Text style={{ color: "#f57b00ff" }}>7484030370</Text>
        </Text>
        <Text
          style={{
            color: "#ffffff",
            fontSize: 16,
            fontWeight: 600,
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
  )
}

export default HomeContent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 80,
    backgroundColor: 'black',
    margin: 30,
  },
});