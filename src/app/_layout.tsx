import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import ReduxProvider from "@/components/providers/ReduxProvider";
import AppShell from "@/components/AppShell";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ReduxProvider>
        <StatusBar style="dark" />
        <AppShell>
          <Stack screenOptions={{ headerShown: false }} />
        </AppShell>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}
