import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeState = { mood: "light" | "dark" };
const themeSlice = createSlice({
  name: "theme",
  initialState: { mood: "light" } as ThemeState,
  reducers: {
    themeToggler: (state) => {
      state.mood = state.mood === "light" ? "dark" : "light";
    },
    setTheme: (state, action: PayloadAction<ThemeState["mood"]>) => {
      state.mood = action.payload;
    },
  },
});

export const { themeToggler, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
