import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import { colors, radius, shadow } from "@/theme/theme";

type Props = PropsWithChildren<{ style?: StyleProp<ViewStyle>; intensity?: number }>;

export default function GlassCard({ children, style, intensity = 24 }: Props) {
  return (
    <View style={[styles.wrapper, style]}>
      <BlurView intensity={intensity} tint="light" style={StyleSheet.absoluteFill} />
      <View style={styles.fallback}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { overflow: "hidden", borderRadius: radius.md, borderWidth: 1, borderColor: colors.light.border, backgroundColor: colors.light.glass, ...shadow },
  fallback: { flex: 1, backgroundColor: "rgba(255,255,255,0.18)" },
});
