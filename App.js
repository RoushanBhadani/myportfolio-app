import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable} from "react-native";
import Home from "./screens/home";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Projects from "./screens/projects";
import Experience from "./screens/Experience";
import CustomDrawerContent from "./components/DrawerContent";
import Academic from "./screens/Academics";
import ContactUs from "./screens/ContactUs";
import AboutUs from "./screens/AboutUs";
import ChatWithUs from "./components/ChatWithUs";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdminChat from "./components/AdminChat";
import AdminMode from "./components/AdminMode";
const ADMIN_ID = "02ffeb1d-8066-40f1-b6c1-a139f25db665";

export default function App() {
  const Drawer = createDrawerNavigator();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
    };
    fetchUserId();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      {userId !== ADMIN_ID && (<AdminMode/>)}
      <NavigationContainer>
        
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={({ navigation }) => ({
            drawerPosition: "right",
            headerRight: () => (
              <Ionicons
                name="person-circle-outline"
                size={40}
                color="white"
                style={{ marginRight: 15 }}
                onPress={() => navigation.toggleDrawer()}
              />
            ),
            headerLeft: () => (
              <Pressable onPress={() => navigation.navigate("home")}>
                <Image
                  source={require("./assets/roushan-logo.png")}
                  style={{ width: 108, height: 45, marginLeft: 15 }}
                  resizeMode="contain"
                />
              </Pressable>
            ),
            headerStyle: { backgroundColor: "#f57b00ff" },
            headerTintColor: "white",
            drawerInactiveTintColor: "#ffffff",
            drawerActiveBackgroundColor: "#f57b00ff",
            drawerActiveTintColor: "#ffffff",
            // headerStatusBarHeight: 24,
            headerTitle: "",
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

      {userId === ADMIN_ID ? <AdminChat /> : <ChatWithUs />}
    </>
  );
}
