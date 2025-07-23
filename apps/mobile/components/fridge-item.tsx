import { exampleData } from "@/lib/constants";
import { Animated, View, Pressable } from "react-native";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useEffect, useRef } from "react";
import { Badge } from "./ui/badge";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated from "react-native-reanimated";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export const FridgeItem = ({
  item,
  index,
}: {
  item: (typeof exampleData)[0];
  index: number;
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const swipeableRef = useRef<any>(null);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const daysLeft = Math.ceil(
    (item.expirationDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  // Color coding based on README.md requirements
  const getExpirationBadgeColor = (days: number) => {
    if (days <= 1) return "bg-red-500"; // red for 1 day
    if (days <= 2) return "bg-orange-500"; // orange for 2 days
    if (days <= 3) return "bg-yellow-500"; // yellow for 3 days
    return "bg-green-500"; // green for more than 3 days
  };

  const fadeTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  // Render left actions (shown when swiping right) - Add to Shopping Cart
  const renderLeftActions = () => {
    return (
      <View className="flex-1 bg-green-500 justify-center items-center">
        <Reanimated.View>
          <Pressable
            className="flex-1 justify-center items-center px-6 py-4"
            onPress={() => {
              console.log("add to shopping cart", item.name);
              swipeableRef.current?.close();
            }}
          >
            <Text className="text-4xl mb-2">🛒</Text>
            <Text className="text-white text-sm font-semibold">
              Add to Cart
            </Text>
          </Pressable>
        </Reanimated.View>
      </View>
    );
  };

  // Render right actions (shown when swiping left) - Delete and Edit
  const renderRightActions = () => {
    return (
      <View className="flex-row">
        {/* Edit Action */}
        <View className="bg-blue-500 justify-center items-center w-20">
          <Reanimated.View>
            <Pressable
              className="flex-1 justify-center items-center px-4 py-4"
              onPress={() => {
                console.log("edit item", item.name);
                swipeableRef.current?.close();
              }}
            >
              <Text className="text-2xl mb-1">✏️</Text>
              <Text className="text-white text-xs font-semibold">Edit</Text>
            </Pressable>
          </Reanimated.View>
        </View>

        {/* Delete Action */}
        <View className="bg-red-500 justify-center items-center w-20">
          <Reanimated.View>
            <Pressable
              className="flex-1 justify-center items-center px-4 py-4"
              onPress={() => {
                console.log("delete item", item.name);
                swipeableRef.current?.close();
              }}
            >
              <Text className="text-2xl mb-1">🗑️</Text>
              <Text className="text-white text-xs font-semibold">Delete</Text>
            </Pressable>
          </Reanimated.View>
        </View>
      </View>
    );
  };

  return (
    <Animated.View
      style={{
        transform: [{ translateY: fadeTranslateY }],
        opacity,
      }}
      className="w-full mb-3"
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <ReanimatedSwipeable
            ref={swipeableRef}
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
            rightThreshold={40}
            leftThreshold={40}
          >
            <Card className="w-full">
              <CardContent className="p-4">
                <View className="flex flex-row items-center justify-between">
                  {/* Left side: Icon and Name */}
                  <View className="flex flex-row items-center flex-1">
                    <Text className="text-3xl mr-3">{item.icon}</Text>
                    <View className="flex-1">
                      <Text className="text-lg font-semibold">{item.name}</Text>
                      <Text className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </Text>
                    </View>
                  </View>

                  {/* Right side: Expiration Badge */}
                  <Badge
                    className={`${getExpirationBadgeColor(daysLeft)} px-3 py-1`}
                  >
                    <Text className="text-white text-sm font-medium">
                      {daysLeft > 0 ? `${daysLeft}d left` : "Expired"}
                    </Text>
                  </Badge>
                </View>
              </CardContent>
            </Card>
          </ReanimatedSwipeable>
        </ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuItem onPress={() => console.log("edit item", item.name)}>
            <Text>Edit Item</Text>
          </ContextMenuItem>
          <ContextMenuItem
            onPress={() => console.log("add to shopping cart", item.name)}
          >
            <Text>Add to Shopping Cart</Text>
          </ContextMenuItem>
          <ContextMenuItem
            onPress={() => console.log("delete item", item.name)}
          >
            <Text>Delete Item</Text>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </Animated.View>
  );
};
