import { Button, makeStyles, Tab, TabList, Tooltip } from "@fluentui/react-components";
import { useNavigate, Link, useLocation } from "react-router";
import { tokens, shorthands } from "@fluentui/react-components";
import SearchBar from "./SearchBar";
import { useDish } from "../context/DishContext";
import { Lightbulb16Color, Lightbulb16Filled } from "@fluentui/react-icons";
import { useThemeContext } from "../context/ThemeContext";

const useHeaderStyles = makeStyles({
  header: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr",
    alignItems: "center",
    background: tokens.colorNeutralBackground3,
    padding: "1rem",
    ...shorthands.borderWidth(tokens.borderWidthLarge),
    ...shorthands.borderColor(tokens.colorNeutralBackground1),
    boxShadow: tokens.shadow4,
    gap: tokens.spacingHorizontalL,
  },
  brand: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightBold,
    background: `linear-gradient(45deg, ${tokens.colorBrandBackground} 0%, ${tokens.colorPaletteDarkOrangeBackground3} 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    paddingBlock: "5px",
  },
  links: {
    textDecoration: "none",
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightBold,
    fontSize: tokens.fontSizeBase500,
    color: tokens.colorNeutralForeground1,
    whiteSpace: "nowrap",
    "&:hover": {
      color: tokens.colorNeutralForeground1Hover,
    },
    "&:active": {
      color: tokens.colorNeutralForeground1Active,
    },
  },
  active: {
    color: tokens.colorBrandBackground,
  },
  nav: {
    display: "flex",
    justifyContent: "flex-end",
    gap: tokens.spacingHorizontalM,
  },
  btnTooltip: {
    cursor: "pointer",
    border: "none",
    background: "transparent",
    borderRadius: "50%",
    "&:hover": {
      background: "transparent"
    },
    "&:active": {
      background: "transparent"
    }
  },
  btnDarkShadow: {
    filter: "drop-shadow(0px -2px 3px rgba(212, 226, 19, 1))"
  }
});

const Header = () => {
  const styles = useHeaderStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { dishes } = useDish();
  const { isDarkTheme, toggleTheme } = useThemeContext();

  // Determine the selected tab based on the current path
  const getSelectedValue = () => {
    if (location.pathname === "/dishes") return "tab1";
    if (location.pathname === "/suggestor") return "tab2";
    return "";
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.links}>
        <h2 className={styles.brand}>Indian Cuisine</h2>
      </Link>
      <SearchBar
        data={dishes}
        isSuggest={true}
        placeholder="Search for dishes, ingredients or region..."
      />
      <div className={styles.nav}>
        <TabList
          selectedValue={getSelectedValue()}
          color={tokens.colorBrandBackground}
        >
          <Tab value="tab1" onClick={() => navigate("/dishes")}>
            <p
              style={{
                color:
                  getSelectedValue() === "tab1"
                    ? "var(--colorBrandBackground)"
                    : "inherit",
              }}
            >
              All Dishes
            </p>
          </Tab>
          <Tab value="tab2" onClick={() => navigate("/suggestor")}>
            <p
              style={{
                color:
                  getSelectedValue() === "tab2"
                    ? "var(--colorBrandBackground)"
                    : "inherit",
              }}
            >
              Suggestor
            </p>
          </Tab>
        </TabList>
      </div>

      <Button onClick={toggleTheme} className={styles.btnTooltip} icon={isDarkTheme ? <Lightbulb16Color className={styles.btnDarkShadow} /> : <Lightbulb16Filled />} />



    </header>
  );
};

export default Header;
