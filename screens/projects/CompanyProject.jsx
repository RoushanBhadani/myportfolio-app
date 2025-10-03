import { Button, Image, Linking, Pressable, Text, View } from "react-native";
import GradientWrapper from "../../components/LinearGradient";
import { companyProjectData } from "../../utils/Data";

function CompanyProject() {
  return (
    <GradientWrapper margin={16}>
      {companyProjectData.map((item, index) => (
        <View
          key={index}
          style={{
            borderWidth: 1,
            borderColor: "#f57b00ff",
            borderRadius: 5,
            marginBottom: 10,
          }}
        >
          <Image
            source={item.image}
            style={{
              width: "100%",
              height: "220",
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
            }}
            resizeMode="contain"
          />

          <View
            style={{
              padding: 10,
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,
              backgroundColor: "#f6f6f6",
            }}
          >
            <Text style={{ color: "#f57b00ff", fontSize: 24, fontWeight: 600 }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 15, marginVertical: 5 }}>
              {item.subtitle}
            </Text>
            <Text>
              {item.currentlyWorking
                ? "Description is available when project is completed."
                : item.description}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 5,
              }}
            >
              <Text style={{ fontWeight: 500, fontSize: 15 }}>
                Level: <Text style={{ color: "#f57b00ff" }}>{item.level}</Text>
              </Text>

              <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable
                  style={{
                    paddingVertical: 6,
                    borderWidth: 1,
                    borderColor: item.link ? "#f57b00ff" : "#f0c397ff",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    borderRadius: 5,
                    elevation: 5,
                    backgroundColor: item.link ? "#f57b00ff" : "#f0c397ff",
                  }}
                  onPress={() => Linking.openURL(item.link)}
                >
                  <Text
                    style={{ color: "#ffffff", fontSize: 15, fontWeight: 500 }}
                  >
                    Visit
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      ))}
    </GradientWrapper>
  );
}

export default CompanyProject;
