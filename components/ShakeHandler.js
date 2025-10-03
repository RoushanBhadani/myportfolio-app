import { useEffect, useState } from "react";
import { Accelerometer } from "expo-sensors";
import { useNavigation } from "@react-navigation/native";

export default function ShakeHandler() {
  const navigation = useNavigation();
  const [lastShake, setLastShake] = useState(0);

  useEffect(() => {
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);

      if (acceleration > 2.2) {
        const now = Date.now();
        if (now - lastShake > 1500) {
          setLastShake(now);
          navigation.navigate("contactus");
        }
      }
    });

    Accelerometer.setUpdateInterval(300);

    return () => subscription && subscription.remove();
  }, [lastShake, navigation]);

  return null;
}
