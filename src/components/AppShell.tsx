import { PropsWithChildren, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link, usePathname } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { RootState } from "@/store/store";
import { logout, login } from "@/store/authSlice";
import { repository } from "@/lib/mock-repository";
import { colors, radius, spacing } from "@/theme/theme";

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
    <View style={styles.root}>
      {!isAuthRoute && <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <BlurView intensity={45} tint="light" style={StyleSheet.absoluteFill} />
        <Link href="/" asChild>
          <Pressable><Text style={styles.logo}>postora</Text></Pressable>
        </Link>
        <View style={styles.headerActions}>
          <Link href="/add-post" asChild><Pressable style={styles.addButton}><Text style={styles.addText}>＋ Create</Text></Pressable></Link>
          <Pressable onPress={() => dispatch(logout())}><Text style={styles.avatar}>{user?.name.charAt(0) ?? "?"}</Text></Pressable>
        </View>
      </View>}
      <View style={styles.content}>{children}</View>
      {!isAuthRoute && <View style={[styles.nav, { paddingBottom: insets.bottom + spacing.sm }]}>
        <BlurView intensity={55} tint="light" style={StyleSheet.absoluteFill} />
        <NavLink href="/" label="Home" active={pathname === "/"} />
        <NavLink href="/add-post" label="Create" active={pathname === "/add-post"} />
        <NavLink href={`/profile/${user?.id ?? "demo-user"}`} label="Profile" active={pathname.startsWith("/profile")} />
      </View>}
    </View>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return <Link href={href as never} style={[styles.navLink, active && styles.activeNav]}>{label}</Link>;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f8fafc" },
  header: { overflow: "hidden", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 12, backgroundColor: colors.light.glass, borderBottomWidth: 1, borderBottomColor: colors.light.border },
  logo: { color: colors.light.text, fontSize: 24, fontWeight: "800", letterSpacing: -1 },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 12 },
  addButton: { backgroundColor: colors.light.primary, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 8 },
  addText: { color: "#fff", fontWeight: "700" },
  avatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.light.primarySoft, color: colors.light.primary, textAlign: "center", paddingTop: 7, fontWeight: "800" },
  content: { flex: 1 },
  nav: { overflow: "hidden", flexDirection: "row", justifyContent: "space-around", paddingTop: 12, backgroundColor: colors.light.glass, borderTopWidth: 1, borderTopColor: colors.light.border },
  navLink: { color: colors.light.secondaryText, fontWeight: "700", padding: 4, minWidth: 64, textAlign: "center" },
  activeNav: { color: colors.light.primary },
});
