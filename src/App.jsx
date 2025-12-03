import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import {
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
import ThemeProvider from "./context/ThemeContext";

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


function App() {
  const styles = useStyles();
  return (
    <DishProvider>
      <ThemeProvider>
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
      </ThemeProvider>
    </DishProvider>
  );
}

export default App;
