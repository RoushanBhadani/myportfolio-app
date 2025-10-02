import { LinearGradient } from "expo-linear-gradient";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { View } from "react-native";

export default function CustomDrawerContent(props) {
  return (
    <LinearGradient
      colors={["rgba(7,7,9,1)", "rgba(27,24,113,1)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </LinearGradient>
  );
}
