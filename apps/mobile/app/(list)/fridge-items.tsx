import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/clerk-expo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { Redirect } from "expo-router";
import { View, Animated } from "react-native";
import { Button } from "@/components/ui/button";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useRef } from "react";
import { exampleData } from "@/lib/constants";
import { FridgeItem } from "@/components/fridge-item";

export default function FridgeItems() {
  const { user } = useUser();
  const headerAnimationValue = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Animated.timing(headerAnimationValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  const headerOpacity = headerAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const headerTranslateY = headerAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0],
  });

  // Blur effect based on scroll position
  const headerBackgroundOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0.95],
    extrapolate: "clamp",
  });

  const headerHeight = 80 + insets.top; // Header content + safe area

  return (
    <View className="flex-1 bg-background">
      {/* Fixed Header with Safe Area */}
      <Animated.View
        style={{
          opacity: headerOpacity,
          transform: [{ translateY: headerTranslateY }],
          backgroundColor: `rgba(255, 255, 255, ${headerBackgroundOpacity})`,
          paddingTop: insets.top,
          height: headerHeight,
          zIndex: 10,
        }}
        className="px-4 border-b border-border absolute top-0 left-0 right-0"
      >
        <View className="flex-1 justify-center">
          <View className="flex flex-row justify-between items-center">
            {/* Left: Avatar */}
            <Avatar alt={user?.fullName ?? ""}>
              <AvatarImage source={{ uri: user.imageUrl }} />
              <AvatarFallback>
                <Text>{user.fullName?.charAt(0)}</Text>
              </AvatarFallback>
            </Avatar>

            {/* Center: Fridge Title */}
            <View className="flex-1 mx-4">
              <Text className="text-xl font-bold text-center">🧊 Fridge</Text>
            </View>

            {/* Right: Shopping Icon */}
            <Text className="text-2xl">🛍️</Text>
          </View>
        </View>
      </Animated.View>

      {/* Content List with proper safe area spacing */}
      <View className="flex-1" style={{ paddingTop: headerHeight }}>
        <FlatList
          onRefresh={() => {
            Animated.timing(headerAnimationValue, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }).start();
          }}
          refreshing={false}
          data={exampleData}
          renderItem={({ item, index }) => (
            <FridgeItem item={item} index={index} />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 100 + insets.bottom, // Space for floating button + safe area
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        />
      </View>

      {/* Floating Action Button with Safe Area */}
      <Animated.View
        style={{
          opacity: headerOpacity,
          bottom: 64,
          zIndex: 1,
        }}
        className="absolute left-0 right-0 flex items-center"
      >
        <Button
          className="bg-green-500 rounded-full px-6 py-4 shadow-lg"
          onPress={() => {
            console.log("add item");
          }}
        >
          <Text className="text-white text-lg font-semibold">+ Add Item</Text>
        </Button>
      </Animated.View>
    </View>
  );
}
