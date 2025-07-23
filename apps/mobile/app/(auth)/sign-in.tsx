import React, { useCallback, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useSSO, useUser } from "@clerk/clerk-expo";
import { View, StatusBar } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { OAuthStrategy } from "@clerk/types";
import { router } from "expo-router";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function Page() {
  useWarmUpBrowser();
  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO();
  const { user } = useUser();
  const onPress = useCallback(async (strategy: OAuthStrategy) => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: strategy,
          // For web, defaults to current path
          // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
          // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.replace("/fridge-items");
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
        console.log(signIn, signUp);
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      if (JSON.stringify(err, null, 2).includes("You're already signed in.")) {
        router.replace("/fridge-items");
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      router.replace("/fridge-items");
    }
  }, [user]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Main Content Container */}
      <View className="flex-1 justify-center px-8 pb-20">
        {/* Header Section */}
        <View className="items-center mb-16">
          {/* App Icon/Logo Placeholder */}
          <View className="w-20 h-20 bg-primary rounded-2xl items-center justify-center mb-6">
            <Text className="text-primary-foreground text-2xl font-bold">
              🥗
            </Text>
          </View>

          {/* App Title */}
          <Text className="text-3xl font-bold text-foreground mb-3 text-center">
            FridgeLog
          </Text>

          {/* Subtitle */}
          <Text className="text-muted-foreground text-center text-base leading-6 max-w-sm">
            Track your groceries, reduce waste, and never forget what&apos;s in
            your fridge
          </Text>
        </View>

        {/* Authentication Section */}
        <View className="space-y-6 flex flex-col gap-2">
          <View className="items-center mb-8">
            <Text className="text-lg font-medium mb-2">Welcome</Text>
            <Text className="text-muted-foreground text-center text-sm">
              Sign in to start organizing your fridge
            </Text>
          </View>

          {/* Google Sign In Button */}
          <Button
            onPress={() => onPress("oauth_google")}
            className="w-full h-12 shadow-sm"
            variant="outline"
          >
            <View className="flex-row items-center justify-center space-x-3">
              <Text className="font-medium">Continue with Google</Text>
            </View>
          </Button>
          <Button
            onPress={() => onPress("oauth_github")}
            className="w-full h-12 shadow-sm"
            variant="outline"
          >
            <View className="flex-row items-center justify-center space-x-3">
              <Text className="font-medium">Continue with GitHub</Text>
            </View>
          </Button>
          <Button
            onPress={() => onPress("oauth_apple")}
            className="w-full h-12 shadow-sm"
            variant="outline"
          >
            <View className="flex-row items-center justify-center space-x-3">
              <Text className="font-medium">Continue with Apple</Text>
            </View>
          </Button>
        </View>

        {/* Footer */}
        <View className="items-center mt-16">
          <Text className="text-muted-foreground text-xs text-center leading-5">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
