import { PropsWithChildren, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link, usePathname } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { RootState } from "@/store/store";
import { logout, login } from "@/store/authSlice";
import { repository } from "@/lib/mock-repository";
import { spacing } from "@/theme/theme";

export default function AppShell({ children }: PropsWithChildren) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.auth.userData);
  const insets = useSafeAreaInsets();
  const isAuthRoute = pathname === "/login" || pathname === "/signup";

  useEffect(() => {
    if (!user) repository.getCurrentUser().then((currentUser) => dispatch(login(currentUser)));
  }, [dispatch, user]);

  return (
    <View className="flex-1 bg-canvas dark:bg-slate-950">
      {!isAuthRoute && <View className="overflow-hidden flex-row items-center justify-between border-b border-slate-200/60 bg-white/75 px-5 pb-3 dark:border-slate-700/60 dark:bg-slate-900/80" style={{ paddingTop: insets.top + spacing.sm }}>
        <BlurView intensity={45} tint="light" style={StyleSheet.absoluteFill} />
        <Link href="/" asChild>
          <Pressable accessibilityRole="button" accessibilityLabel="Go to home"><Text className="text-2xl font-extrabold tracking-tight text-ink dark:text-white">postora</Text></Pressable>
        </Link>
        <View className="flex-row items-center gap-3">
          <Link href="/add-post" asChild><Pressable className="rounded-full bg-brand px-3 py-2 active:opacity-80" accessibilityRole="button"><Text className="font-bold text-white">＋ Create</Text></Pressable></Link>
          <Pressable onPress={() => dispatch(logout())} accessibilityRole="button" accessibilityLabel="Sign out"><Text className="h-9 w-9 rounded-full bg-blue-100 pt-2 text-center font-extrabold text-blue-700 dark:bg-blue-950 dark:text-blue-300">{user?.name.charAt(0) ?? "?"}</Text></Pressable>
        </View>
      </View>}
      <View className="flex-1">{children}</View>
      {!isAuthRoute && <View className="overflow-hidden flex-row justify-around border-t border-slate-200/60 bg-white/75 pt-3 dark:border-slate-700/60 dark:bg-slate-900/80" style={{ paddingBottom: insets.bottom + spacing.sm }}>
        <BlurView intensity={55} tint="light" style={StyleSheet.absoluteFill} />
        <NavLink href="/" label="Home" active={pathname === "/"} />
        <NavLink href="/add-post" label="Create" active={pathname === "/add-post"} />
        <NavLink href={`/profile/${user?.id ?? "demo-user"}`} label="Profile" active={pathname.startsWith("/profile")} />
      </View>}
    </View>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return <Link href={href as never} className={active ? "min-w-16 px-1 text-center font-bold text-brand" : "min-w-16 px-1 text-center font-bold text-muted dark:text-slate-400"}>{label}</Link>;
}
