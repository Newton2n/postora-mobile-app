import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { colors, spacing } from "@/theme/theme";
import { RootState } from "@/store/store";

type Props = PropsWithChildren<{
  edges?: ("top" | "right" | "bottom" | "left")[];
  scroll?: boolean;
  keyboard?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}>;

export default function ScreenContainer({ children, edges = ["left", "right"], scroll = false, keyboard = false, contentStyle }: Props) {
  const mood = useSelector((state: RootState) => state.theme.mood);
  const palette = colors[mood];
  const content = scroll ? (
    <ScrollView contentContainerStyle={[styles.scroll, contentStyle]} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  ) : <View style={[styles.content, contentStyle]}>{children}</View>;
  const keyboardContent = keyboard ? <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.flex}>{content}</KeyboardAvoidingView> : content;
  return <SafeAreaView edges={edges} style={[styles.safe, { backgroundColor: palette.background }]}>{keyboardContent}</SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.light.background },
  flex: { flex: 1 },
  content: { flex: 1, paddingHorizontal: spacing.lg },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
});
