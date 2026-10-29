import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Link, router } from "expo-router";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import { repository } from "@/lib/mock-repository";
import ScreenContainer from "@/components/ui/ScreenContainer";

export default function AuthScreen({ mode }: { mode: "login" | "signup" }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const isSignup = mode === "signup";

  const submit = async () => {
    setSaving(true);
    const user = isSignup
      ? await repository.signUp(name, email)
      : await repository.signIn(email);
    dispatch(login(user));
    setSaving(false);
    router.replace("/");
  };

  return (
    <ScreenContainer scroll keyboard edges={["top", "left", "right", "bottom"]} contentStyle={styles.container}>
      <View>
      <Text style={styles.logo}>postora</Text>
      <Text style={styles.heading}>
        {isSignup ? "Join the community" : "Welcome back"}
      </Text>
      <Text style={styles.subtitle}>
        {isSignup
          ? "Share the moments that inspire you."
          : "Sign in to discover and share."}
      </Text>
      {isSignup && (
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          style={styles.input}
        />
      )}
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email address"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <Pressable onPress={submit} disabled={saving} style={styles.button}>
        <Text style={styles.buttonText}>
          {saving ? "Please wait..." : isSignup ? "Create account" : "Sign in"}
        </Text>
      </Pressable>
      <Link href={isSignup ? "/login" : "/signup"} style={styles.link}>
        {isSignup
          ? "Already have an account? Sign in"
          : "New to Postora? Create an account"}
      </Link>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f8fafc",
  },
  logo: {
    color: "#2563eb",
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 38,
  },
  heading: {
    color: "#0f172a",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    color: "#64748b",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 26,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#cbd5e1",
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontWeight: "800" },
  link: {
    color: "#2563eb",
    textAlign: "center",
    marginTop: 20,
    fontWeight: "700",
  },
});
