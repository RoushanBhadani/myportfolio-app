import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AcademicsExp from "./AcademicsExp";
import Achievements from "./Achievements";

const Academic = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#f57b00",
        tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
        tabBarIndicatorStyle: { backgroundColor: "#f57b00" },
        tabBarStyle: {
          backgroundColor: "rgba(7,7,9,1)",
        },
      }}
    >
      <Tab.Screen
        name="academicExp"
        component={AcademicsExp}
        options={{
          title: "Academic",
        }}
      />
      <Tab.Screen
        name="achievements"
        component={Achievements}
        options={{
          title: "Achievements",
        }}
      />
    </Tab.Navigator>
  );
};

export default Academic;
