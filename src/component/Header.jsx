import { makeStyles, Tab, TabList } from "@fluentui/react-components";
import { useNavigate, Link, useLocation } from "react-router";
import { tokens, shorthands } from "@fluentui/react-components";
import SearchBar from "./SearchBar";
import { useDish } from "../context/DishContext";

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
    paddingBlock: "5px"
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
});

const Header = () => {
  const styles = useHeaderStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { dishes } = useDish();

  // Determine the selected tab based on the current path
  const getSelectedValue = () => {
    if (location.pathname === "/dishes") return "tab1";
    if (location.pathname === "/suggestor") return "tab2";
    return "";
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.links}>
        <h2 className={styles.brand} >Indian Cuisine</h2>
      </Link>
      <SearchBar
        data={dishes}
        isSuggest={true}
        placeholder="Search for dishes, ingredients or region..."
      />
      <div className={styles.nav}>
        <TabList defaultSelectedValue={getSelectedValue()} color={tokens.colorBrandBackground}>
          <Tab value="tab1" onClick={() => navigate("/dishes")}>
            All Dishes
          </Tab>
          <Tab value="tab2" onClick={() => navigate("/suggestor")}>
            Suggestor
          </Tab>
        </TabList>
      </div>
    </header>
  );
};

export default Header;
