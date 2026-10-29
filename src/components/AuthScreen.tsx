import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
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
    const user = isSignup ? await repository.signUp(name, email) : await repository.signIn(email);
    dispatch(login(user));
    setSaving(false);
    router.replace("/");
  };

  return (
    <ScreenContainer scroll keyboard edges={["top", "left", "right", "bottom"]}>
      <View className="flex-1 justify-center">
        <Text className="mb-9 text-center text-3xl font-black text-brand">postora</Text>
        <Text className="text-center text-3xl font-extrabold text-ink dark:text-white">{isSignup ? "Join the community" : "Welcome back"}</Text>
        <Text className="mb-6 mt-2 text-center text-muted dark:text-slate-400">{isSignup ? "Share the moments that inspire you." : "Sign in to discover and share."}</Text>
        {isSignup && <TextInput value={name} onChangeText={setName} placeholder="Your name" placeholderTextColor="#94a3b8" className="mb-3 rounded-xl border border-slate-300 bg-white p-3.5 text-ink dark:border-slate-700 dark:bg-slate-900 dark:text-white" />}
        <TextInput value={email} onChangeText={setEmail} placeholder="Email address" placeholderTextColor="#94a3b8" autoCapitalize="none" keyboardType="email-address" className="mb-3 rounded-xl border border-slate-300 bg-white p-3.5 text-ink dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
        <Pressable onPress={submit} disabled={saving} className="mt-2 items-center rounded-xl bg-brand p-4 active:opacity-80" accessibilityRole="button">
          <Text className="font-extrabold text-white">{saving ? "Please wait..." : isSignup ? "Create account" : "Sign in"}</Text>
        </Pressable>
        <Link href={isSignup ? "/login" : "/signup"} className="mt-5 text-center font-bold text-brand">{isSignup ? "Already have an account? Sign in" : "New to Postora? Create an account"}</Link>
      </View>
    </ScreenContainer>
  );
}
