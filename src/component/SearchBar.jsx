import React, { useEffect, useState, useRef } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { Input, Button, mergeClasses } from "@fluentui/react-components";
import { useDish } from "../context/DishContext";
import { searchDishes } from "../utils/filterSearch";
import { useNavigate } from "react-router";
import { SearchRegular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  searchContainer: {
    position: "relative",
    width: "100%",
    maxWidth: "500px",
  },
  searchInput: {
    display: "none",
    width: "100%",
    paddingBlock: "10px",
    "@media (min-width: 768px)": {
      display: "flex",
    },
  },
  inputMargin: {
    margin: "0px auto",
  },
  searchIngredients: {
    width: "100%",
    paddingBlock: "5px",
    marginBottom: "10px",
  },
  suggestionsList: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow16,
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
    zIndex: 10,
    marginTop: "5px",
    maxHeight: "300px",
    overflowY: "auto",
    transition: "all 1s ease-in-out",
    opacity: 0,
    transform: "translateY(-10px)",
    pointerEvents: "none",
  },
  visible: {
    opacity: 1,
    transform: "translateY(0)",
    pointerEvents: "auto",
  },
  suggestionItem: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    cursor: "pointer",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
});

const SearchBar = ({ isSuggest = false, placeholder, handleIngredients }) => {
  const { dishes, ingredients } = useDish();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const styles = useStyles();

  useEffect(() => {
    if (searchQuery.length > 0) {
      if (!isSuggest) {
        const results = ingredients.filter((ingredient) =>
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        );
        handleIngredients(results);
      } else {
        const results = searchDishes(dishes, searchQuery).slice(0, 5);
        setSuggestions(results);
      }
    } else {
      if (!isSuggest) {
        handleIngredients([]);
      } else {
        setSuggestions([]);
      }
    }
  }, [searchQuery]);

  const handleSuggestionClick = (dish) => {
    setSearchQuery("");
    navigate(`/dish/${dish.id}`);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const showSuggestions = isFocused && suggestions.length > 0;

  return (
    <div
      className={mergeClasses(
        styles.searchContainer,
        isSuggest && styles.inputMargin
      )}
      ref={searchRef}
    >
      <Input
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        placeholder={placeholder}
        className={mergeClasses(
          isSuggest ? styles.searchInput : styles.searchIngredients
        )}
        contentAfter={
          isSuggest && (
            <Button
              aria-label="Search"
              appearance="transparent"
              icon={<SearchRegular />}
              size="small"
            />
          )
        }
      />
      {showSuggestions && isSuggest && (
        <div
          className={mergeClasses(
            styles.suggestionsList,
            showSuggestions && styles.visible
          )}
        >
          {suggestions.map((dish) => (
            <div
              key={dish.id}
              className={styles.suggestionItem}
              onMouseDown={() => handleSuggestionClick(dish)}
            >
              {dish.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
