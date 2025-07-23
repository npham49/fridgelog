import { router } from "expo-router";
import { Text, View } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";

export default function Index() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      router.replace("/fridge-items");
    } else {
      router.replace("/sign-in");
    }
  }, [user]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-red-500 text-2xl">
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}
