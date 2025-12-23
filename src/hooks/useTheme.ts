import { useThemeStore } from '../store/themeStore';

export const useTheme = () => {
  const theme = useThemeStore(state => state.theme);
  const colors = useThemeStore(state => state.colors);
  const toggleTheme = useThemeStore(state => state.toggleTheme);
  const setTheme = useThemeStore(state => state.setTheme);

  return { theme, colors, toggleTheme, setTheme };
};
