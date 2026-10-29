import { PropsWithChildren, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link, usePathname } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { logout, login } from "@/store/authSlice";
import { repository } from "@/lib/mock-repository";

export default function AppShell({ children }: PropsWithChildren) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.auth.userData);

  useEffect(() => {
    if (!user) repository.getCurrentUser().then((currentUser) => dispatch(login(currentUser)));
  }, [dispatch, user]);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Link href="/" asChild>
          <Pressable><Text style={styles.logo}>postora</Text></Pressable>
        </Link>
        <View style={styles.headerActions}>
          <Link href="/add-post" asChild><Pressable style={styles.addButton}><Text style={styles.addText}>＋ Create</Text></Pressable></Link>
          <Pressable onPress={() => dispatch(logout())}><Text style={styles.avatar}>{user?.name.charAt(0) ?? "?"}</Text></Pressable>
        </View>
      </View>
      <View style={styles.content}>{children}</View>
      <View style={styles.nav}>
        <NavLink href="/" label="Home" active={pathname === "/"} />
        <NavLink href="/add-post" label="Create" active={pathname === "/add-post"} />
        <NavLink href={`/profile/${user?.id ?? "demo-user"}`} label="Profile" active={pathname.startsWith("/profile")} />
      </View>
    </View>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return <Link href={href as never} style={[styles.navLink, active && styles.activeNav]}>{label}</Link>;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f8fafc" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#e2e8f0" },
  logo: { color: "#0f172a", fontSize: 24, fontWeight: "800", letterSpacing: -1 },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 12 },
  addButton: { backgroundColor: "#2563eb", borderRadius: 18, paddingHorizontal: 12, paddingVertical: 8 },
  addText: { color: "#fff", fontWeight: "700" },
  avatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: "#dbeafe", color: "#1d4ed8", textAlign: "center", paddingTop: 7, fontWeight: "800" },
  content: { flex: 1 },
  nav: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 12, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#e2e8f0" },
  navLink: { color: "#64748b", fontWeight: "700", padding: 4 },
  activeNav: { color: "#2563eb" },
});
