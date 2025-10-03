import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, Text, View } from "react-native";
import Home from "./screens/home";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Projects from "./screens/projects";
import Experience from "./screens/Experience";
import CustomDrawerContent from "./components/DrawerContent";
import Academic from "./screens/Academics";
import ContactUs from "./screens/ContactUs";
import AboutUs from "./screens/AboutUs";
import ShakeHandler from "./components/ShakeHandler";

export default function App() {
  const Drawer = createDrawerNavigator();

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <ShakeHandler/>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={({ navigation }) => ({
            drawerPosition: "right",
            headerRight: () => (
              <Ionicons
                name="person-circle-outline"
                size={32}
                color="white"
                style={{ marginRight: 15 }}
                onPress={() => navigation.toggleDrawer()}
              />
            ),
            headerLeft: () => (
              <Pressable onPress={()=>navigation.navigate("home")}>
                <Image
                source={require("./assets/roushan-logo.png")}
                style={{ width: 108, marginLeft: 15 }}
                resizeMode="contain"
              />
              </Pressable>
            ),
            headerStyle: { backgroundColor: "#f57b00ff" },
            headerTintColor: "white",
            drawerInactiveTintColor: "#ffffff",
            drawerActiveBackgroundColor: "#f57b00ff",
            drawerActiveTintColor: "#ffffff",
            headerStatusBarHeight: 24,
            headerTitle: ({ children }) => (
              <View style={{ width: "100" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#ffffff",
                  }}
                >
                  {children}
                </Text>
              </View>
            ),
          })}
        >
          <Drawer.Screen
            name="home"
            component={Home}
            options={{
              title: "Home",
              drawerIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="projects"
            component={Projects}
            options={{
              title: "Projects",
              drawerIcon: ({ color, size }) => (
                <Ionicons name="book" color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="experience"
            component={Experience}
            options={{
              title: "Experience",
              drawerIcon: ({ color, size }) => (
                <Ionicons name="ribbon-sharp" color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="academics"
            component={Academic}
            options={{
              title: "Academic",
              drawerIcon: ({ color, size }) => (
                <Ionicons name="school" color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="contactus"
            component={ContactUs}
            options={{
              title: "Conatact Us",
              drawerIcon: ({ color, size }) => (
                <Ionicons name="call" color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="aboutus"
            component={AboutUs}
            options={{
              title: "About Us",
              drawerIcon: ({ color, size }) => (
                <Ionicons name="information-circle" color={color} size={size} />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}
