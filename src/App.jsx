import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import {
  FluentProvider,
  createDarkTheme,
  createLightTheme,
  makeStyles,
} from "@fluentui/react-components";
import { DishProvider } from "./context/DishContext";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import Dishes from "./pages/Dishes";
import DishSuggester from "./pages/DishSuggester";
import DishDetails from "./pages/DishDetails";
import "./App.css";

const useStyles = makeStyles({
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flex: '1 0 auto',
    padding: "1rem", 
  },
});

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

darkTheme.colorBrandForeground1 = customTheme1[110]; // use brand[110] instead of brand[100]
darkTheme.colorBrandForeground2 = customTheme1[120];
console.log(lightTheme);
function App() {
  const styles = useStyles();

  return (
    <DishProvider>
      <FluentProvider theme={lightTheme}>
        <BrowserRouter>
          <div className={styles.app}>
            <Header />
            <main className={styles.content}>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/dishes" element={<Dishes />} />
                <Route path="/dish/:id" element={<DishDetails />} />
                <Route path="/suggestor" element={<DishSuggester />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </FluentProvider>
    </DishProvider>
  );
}

export default App;
