import { createContext, ReactNode, useContext, useState } from 'react';

type ThemeContextValue = {
  dark: boolean;
  toggleDark: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  dark: false,
  toggleDark: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const toggleDark = () => setDark((d) => !d);
  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
