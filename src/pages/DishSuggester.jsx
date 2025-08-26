import React, { useState } from "react";
import { FixedSizeList as List } from "react-window";

import {
  useScrollbarWidth,
  useFluent,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  createTableColumn,
  useTableFeatures,
  useTableSelection,
  TableSelectionCell,
  makeStyles,
  tokens,
  TagGroup,
  Tag,
} from "@fluentui/react-components";
import { useDish } from "../context/DishContext";
import SearchBar from "../component/SearchBar";
import { Search24Regular } from "@fluentui/react-icons";

const columns = [
  createTableColumn({
    columnId: "Ingredients",
  }),
];
const useSuggestStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    "& h1": {
      color: tokens.colorBrandBackground,
    },
  },
  suggestcontainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px",
    borderRadius: "10px",
    background: tokens.colorNeutralBackground3,
    boxShadow: tokens.shadow4,
  },
  suggestheader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: tokens.colorBrandBackground,
  },
  rows: {
    display: "flex",
    gap: "10px",
  },
  tag2: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexWrap: "wrap",
    color: tokens.colorNeutralBackground1,
    backgroundColor: tokens.colorBrandBackground,
    "&:hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
    borderRadius: tokens.borderRadiusLarge,
    padding: "5px",
  },
});

const RenderRow = ({ index, style, data }) => {
  const styles = useSuggestStyles();
  const { item, selected, rowId, onClick, onKeyDown } = data[index];
  return (
    <TableRow
      aria-rowindex={index + 2}
      style={style}
      key={rowId}
      onKeyDown={onKeyDown}
      onClick={onClick}
    >
      <TableCell className={styles.rows}>
        <TableSelectionCell checked={selected} />
        <TableCellLayout>{item}</TableCellLayout>
      </TableCell>
    </TableRow>
  );
};

const DishSuggesterPage = () => {
  const styles = useSuggestStyles();
  const { targetDocument } = useFluent();
  const { ingredients } = useDish();
  const scrollbarWidth = useScrollbarWidth({ targetDocument });
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchIngredients, setSearchIngredients] = useState([]);

  const handleIngredients = (ingredients) => {
    setSearchIngredients(ingredients);
  };

  const {
    getRows,
    selection: { toggleRow },
  } = useTableFeatures(
    {
      columns,
      items: searchIngredients.length ? searchIngredients : ingredients,
    },
    [
      useTableSelection({
        selectionMode: "multiselect",
        defaultSelectedItems: new Set([]),
      }),
    ]
  );

  function handleIngredientSelection(ingredient) {
    console.log(ingredient, selectedIngredients.includes(ingredient));

    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients((prev) => [...prev, ingredient]);
    } else {
      const filterdata = selectedIngredients.filter(
        (item) => item !== ingredient
      );
      setSelectedIngredients(filterdata);
    }
  }

  const rows = getRows((row) => {
    const selected = selectedIngredients.includes(row.item);
    return {
      ...row,
      onClick: (e) => {
        toggleRow(e, row.rowId);
        handleIngredientSelection(row.item);
      },
      onKeyDown: (e) => {
        if (e.key === " ") {
          e.preventDefault();
          toggleRow(e, row.rowId);
          handleIngredientSelection(row.item);
        }
      },
      selected,
    };
  });

  return (
    <div className={styles.container}>
      <h1>Dish Suggester</h1>
      <p>
        Select amongst ingredients you have and we'll suggest dishes you can
        make
      </p>
      <div>
        <div className={styles.suggestcontainer}>
          <div className={styles.suggestheader}>
            <Search24Regular />
            <h2>Select Ingredients</h2>
          </div>
          <TagGroup>
            {selectedIngredients.length ? (
              selectedIngredients.map((ingredient) => (
                <Tag className={styles.tag2} key={ingredient}>
                  {ingredient}
                </Tag>
              ))
            ) : (
              <p>No ingredients selected</p>
            )}{" "}
          </TagGroup>
          <p>
            Choose from{" "}
            {searchIngredients.length
              ? searchIngredients.length
              : ingredients.length}{" "}
            available ingredients
          </p>
          <Table
            noNativeElements
            aria-label="Table with selection"
            aria-rowcount={rows.length}
            style={{ minWidth: "650px" }}
          >
            <TableHeader>
              <TableRow>
                <TableHeaderCell>
                  <SearchBar
                    placeholder="Search Ingredients..."
                    handleIngredients={handleIngredients}
                  />
                </TableHeaderCell>
                {/** Scrollbar alignment for the header */}
                <div role="presentation" style={{ width: scrollbarWidth }} />
              </TableRow>
            </TableHeader>
            <TableBody>
              <List
                height={400}
                itemCount={
                  searchIngredients.length
                    ? searchIngredients.length
                    : ingredients.length
                }
                itemSize={45}
                width="100%"
                itemData={rows}
              >
                {RenderRow}
              </List>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DishSuggesterPage;
