import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";

type Props = PropsWithChildren<{ style?: StyleProp<ViewStyle>; intensity?: number }>;

export default function GlassCard({ children, style, intensity = 24 }: Props) {
  return (
    <View className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/75" style={style}>
      <BlurView intensity={intensity} tint="light" style={StyleSheet.absoluteFill} />
      <View className="flex-1 bg-white/20 dark:bg-slate-950/20">{children}</View>
    </View>
  );
}
