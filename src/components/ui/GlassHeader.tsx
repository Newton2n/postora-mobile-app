import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";

export default function GlassHeader({ children }: PropsWithChildren) {
  return <View className="overflow-hidden border-b border-slate-200/60 bg-white/75 dark:border-slate-700/60 dark:bg-slate-900/80"><BlurView intensity={55} tint="light" style={StyleSheet.absoluteFill} /><View className="min-h-[54px] flex-row items-center justify-between px-4 py-2">{children}</View></View>;
}

export function HeaderTitle({ children }: PropsWithChildren) {
  return <Text className="text-lg font-extrabold text-ink dark:text-white">{children}</Text>;
}
