import { FlatList, Text, View } from "react-native";
import GradientWrapper from "../../components/LinearGradient";
import { WORK_EXPERIENCE } from "../../utils/Data";

function Experience() {
  return (
    <GradientWrapper margin={16}>
      <View style={{ flexDirection: "row", alignItems:'center', marginBottom: 15, }}>
        <View
          style={{
            width: 6,
            height: 22,
            backgroundColor: "#f57b00ff",
            marginRight: 10,
          }}
        ></View>
        <Text
          style={{
            color: "#ffffff",
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          Work Experience
        </Text>
      </View>
      {WORK_EXPERIENCE?.map((work, index) => (
        <View
          key={index}
          style={{
            borderWidth: 1,
            borderColor: "#f57b00ff",
            borderRadius: 5,
            marginBottom: 10,
            padding: 8,
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: 600 }}>
            {work.title}
          </Text>
          <View
            style={{
              marginVertical: 8,
              borderRadius: 5,
              padding: 8,
              backgroundColor: "rgba(7,7,9,1)",
            }}
          >
            <Text style={{ color: "#ffffff", fontSize: 12 }}>{work.date}</Text>
          </View>
          {work.responsibility.map((item, idx) => (
            <View
              key={idx}
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: 6,
              }}
            >
              <Text
                style={{
                  color: "#f57b00",
                  fontSize: 16,
                  marginRight: 6,
                  lineHeight: 20,
                }}
              >
                ●
              </Text>
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 14,
                  lineHeight: 20,
                  flex: 1,
                }}
              >
                {item}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </GradientWrapper>
  );
}

export default Experience;
