import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SKILLS } from "../../utils/Skills";

const SkillBar = ({ name, percentage }) => (
  <View style={styles.skillItem}>
    <View style={styles.skillTextContainer}>
      <Text style={styles.skillName}>{name}</Text>
      <Text style={styles.skillPercentage}>{percentage}</Text>
    </View>
    <View style={styles.progressBarBackground}>
      <View style={[styles.progressBarFill, { width: percentage }]} />
    </View>
  </View>
);

export default function SkillsCategory() {
  const [activeSection, setActiveSection] = useState(SKILLS[0]?.title);

  const handleToggle = (title) => {
    setActiveSection((prevTitle) => (prevTitle === title ? null : title));
  };

  return (
    <View style={styles.container}>
      <Text style={{color:'white', fontSize:25, fontWeight:600, marginBottom:30}}>Technical Proficiency</Text>
      {SKILLS.map((section) => (
        <View key={section.title}>
          <View style={styles.section}>
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons
                name={section.icon || "chevron-right-circle"}
                size={28}
                color="#FFF"
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleToggle(section.title)}
            >
              <Text style={styles.buttonText}>{section.title}</Text>
            </TouchableOpacity>
          </View>

          {activeSection === section.title && (
            <View style={styles.skillsContent}>
              <Text style={styles.contentTitle}>{section.title}</Text>
              {section.skills.map((item) => (
                <SkillBar
                  key={item.skill}
                  name={item.skill}
                  percentage={item.percentage}
                />
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconWrapper: {
    backgroundColor: "rgba(27,24,113,1)",
    padding: 12,
    borderRadius: 50,
    marginRight: -15,
    zIndex: 1,
    borderColor: "#f57b00ff",
    borderWidth: 2,
  },
  button: {
    flex: 1,
    backgroundColor: "#f57b00ff",
    paddingVertical: 15,
    paddingLeft: 30,
    borderRadius: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  skillsContent: {
    // backgroundColor: "#1C1648",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    borderColor: "#f57b00ff",
    borderWidth: 1,
  },
  contentTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#3A3172",
  },
  skillItem: {
    marginBottom: 15,
  },
  skillTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  skillName: {
    color: "#E0E0E0",
    fontSize: 16,
  },
  skillPercentage: {
    color: "#f57b00ff",
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#3A3172",
    borderRadius: 4,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#f57b00ff",
    borderRadius: 4,
  },
});
