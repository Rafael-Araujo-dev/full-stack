import React, { createContext, useState } from "react";

const ThemeContext = createContext<any>(null);

interface Properties {
  children?: React.ReactNode;
  value?: {
    theme?: string;
    themeSwitcher?: () => void;
  };
}

const ThemeProvider = ({ children }: Properties) => {
  const [theme, setTheme] = useState<string | null>(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "Light"
  );

  const themeSwitcher = () => {
    if (localStorage && localStorage.getItem("theme")) {
      const currentTheme = localStorage.getItem("theme");

      if (currentTheme === "Light") {
        localStorage.setItem("theme", "Dark");
        setTheme("Dark");
      } else {
        localStorage.setItem("theme", "Light");
        setTheme("Light");
      }
    } else {
      localStorage.setItem("theme", "Dark");
      setTheme("Dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, themeSwitcher }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
