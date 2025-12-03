import { createContext, useContext, useState } from 'react'
import { createDarkTheme, createLightTheme, FluentProvider } from '@fluentui/react-components';


const customTheme1 = {
    10: "#030207",
    20: "#17122F",
    30: "#221C57",
    40: "#2A237A",
    50: "#2F2B9F",
    60: "#3433C5",
    70: "#373BEC",
    80: "#4B47FF",
    90: "#6758FF",
    100: "#7C68FF",
    110: "#8F79FF",
    120: "#A08AFF",
    130: "#B09BFF",
    140: "#BFACFF",
    150: "#CEBEFF",
    160: "#DCCFFF",
};

const lightTheme = {
    ...createLightTheme(customTheme1),
};

const darkTheme = {
    ...createDarkTheme(customTheme1),
};

darkTheme.colorBrandForeground1 = customTheme1[110];
darkTheme.colorBrandForeground2 = customTheme1[120];

const ThemeContext = createContext({
    isDarkTheme: false,
    toggleTheme: () => { },
});

export const useThemeContext = () => useContext(ThemeContext);

function ThemeProvider({ children }) {

    const getSystemTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        const saved = localStorage.getItem("isDarkTheme");
        if (saved !== null) return saved === "true"; // user override
        return getSystemTheme(); // fallback to system
    });
    const currentTheme = isDarkTheme ? darkTheme : lightTheme;

    const toggleTheme = () => {
        const newValue = !isDarkTheme;
        setIsDarkTheme(newValue);

        localStorage.setItem("isDarkTheme", newValue);
    };

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            <FluentProvider theme={currentTheme}>
                {children}
            </FluentProvider>
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;