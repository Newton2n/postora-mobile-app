import { Stack } from "expo-router";
import ReduxProvider from "@/components/providers/ReduxProvider";
import AppShell from "@/components/AppShell";

export default function RootLayout() {
  return (
    <ReduxProvider>
      <AppShell>
        <Stack screenOptions={{ headerShown: false }} />
      </AppShell>
    </ReduxProvider>
  );
}
