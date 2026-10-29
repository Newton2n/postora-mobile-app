import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import { colors, spacing } from "@/theme/theme";

export default function GlassHeader({ children }: PropsWithChildren) {
  return <View style={styles.container}><BlurView intensity={55} tint="light" style={StyleSheet.absoluteFill} /><View style={styles.content}>{children}</View></View>;
}

export function HeaderTitle({ children }: PropsWithChildren) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  container: { overflow: "hidden", borderBottomWidth: 1, borderBottomColor: colors.light.border, backgroundColor: colors.light.glass },
  content: { minHeight: 54, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  title: { color: colors.light.text, fontSize: 18, fontWeight: "800" },
});
