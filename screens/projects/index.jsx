import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PersonalProject from "./PersonalProject";
import CompanyProject from "./CompanyProject";

function Projects() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      backBehavior="none"
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
        name="personal"
        component={PersonalProject}
        backBehavior="none"
        options={{
          title: "Personal",
        }}
      />
      <Tab.Screen
        name="company"
        component={CompanyProject}
        options={{
          title: "Company",
        }}
      />
    </Tab.Navigator>
  );
}

export default Projects;
