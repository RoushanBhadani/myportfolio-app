import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { academic } from "../../utils/Data";
import GradientWrapper from "../../components/LinearGradient";
const { width } = Dimensions.get("window");

const AcademicsExp = () => {
  const curveHeight = 180;

  return (
    <GradientWrapper margin={16}>
      <View style={styles.container}>
        <Svg height={academic.length * curveHeight + 100} width={width}>
          {academic.map((_, i) => {
            const y = i * curveHeight + 50;
            const controlX = width / 2 + (i % 2 === 0 ? 100 : -100);
            const nextY = y + curveHeight;

            return (
              <Path
                key={i}
                d={`M${width / 2} ${y} Q${controlX} ${(y + nextY) / 2}, ${
                  width / 2
                } ${nextY}`}
                stroke="#f57b00ff"
                strokeWidth={3}
                fill="transparent"
              />
            );
          })}

          {academic.map((_, i) => {
            const y = i * curveHeight + 50;
            return (
              <Circle
                key={`circle-${i}`}
                cx={width / 2}
                cy={y}
                r={10}
                fill="#f57b00ff"
                strokeWidth={3}
                stroke="#ffffff"
              />
            );
          })}
        </Svg>

        <View style={styles.content}>
          {academic.map((item, i) => (
            <View
              key={i}
              style={[
                styles.card,
                i % 2 === 0 ? styles.leftAlign : styles.rightAlign,
                { top: i * curveHeight + 20 },
                // i%2==0 ? width: "40%": width:"0"
              ]}
            >
              <Text style={styles.degree}>{item.degree}</Text>
              <Text style={styles.text}>Grade: {item.grade}</Text>
              <Text style={styles.address}>{item.school}</Text>
              <Text style={styles.address}>{item.address}</Text>
            </View>
          ))}
        </View>
      </View>
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    position: "absolute",
    top: 25,
    left: 0,
    right: 0,
  },
  card: {
    position: "absolute",
    backgroundColor: "transparent",
  },
  leftAlign: {
    width: "60%",
    alignSelf: "flex-start",
    paddingLeft: 50,
  },
  rightAlign: {
    width: "40%",
    alignSelf: "flex-end",
    paddingLeft: 10,
  },
  degree: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#f57b00ff",
  },
  text: {
    color: "#ffffffff",
    fontSize: 14,
  },
  address: {
    color: "#f1bb84ff",
    fontSize: 14,
  },
});

export default AcademicsExp;
