import React, { useState } from "react";

import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  useTableFeatures,
  useTableSort,
  TableCellLayout,
  createTableColumn,
  makeStyles,
  tokens,
  Caption2Strong,
  TagGroup,
  Tag,
} from "@fluentui/react-components";
import { useDish } from "../context/DishContext";
import { Link } from "react-router";
import { getPaginateData } from "../utils/pagination";
import Pagination from "./Pagination";
import Loader from "./Loader";

const itemsPerPage = 10;
const columns = [
  createTableColumn({
    columnId: "name",
    compare: (a, b) => {
      return a.name.localeCompare(b.name);
    },
  }),
  createTableColumn({
    columnId: "ingredients",
  }),
  createTableColumn({
    columnId: "diet",
  }),
  createTableColumn({
    columnId: "prep_time",
    compare: (a, b) => {
      return a.prep_time - b.prep_time;
    },
  }),
  createTableColumn({
    columnId: "cook_time",
    compare: (a, b) => {
      return a.cook_time - b.cook_time;
    },
  }),
  createTableColumn({
    columnId: "flavor_profile",
  }),
  createTableColumn({
    columnId: "course",
  }),
  createTableColumn({
    columnId: "state",
  }),
  createTableColumn({
    columnId: "region",
  }),
];

const useStyles = makeStyles({
  tableContainer: {
    minWidth: "500px",
    borderRadius: "10px",
    boxShadow: tokens.shadow4,
    padding: "20px",
    overflowX: "auto",
  },
  tableHeader: {
    "& th": {
      height: "64px",
      fontWeight: tokens.fontWeightSemibold,
      color: tokens.colorNeutralForeground1,
      backgroundColor: tokens.colorNeutralBackground3,
      "&:hover": {
        backgroundColor: tokens.colorNeutralBackground3Hover,
      },
    },
    "& th:first-child": {
      borderTopLeftRadius: "10px",
    },
  },
  tableRow: {
    textTransform: "capitalize",
    "& td": {
      height: "100px",
    },
  },
  tagGroup1: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBlock: "10px",
  },
  paginationContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "12px",
    width: "100%",
    justifyContent: "center",
  },
  links: {
    textDecoration: "none",
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
    "&:hover": {
      textDecoration: "underline",
      color: tokens.colorNeutralForeground1Hover,
    },
  },
});

const filterDishTag = (ingredients) => {
  if (ingredients.length > 3) {
    return [...ingredients.slice(0, 3), "+4 more"];
  }
  return ingredients;
};

const DishesTable = () => {
  const styles = useStyles();
  const { dishes, loading } = useDish();
  const [currentPage, setCurrentPage] = useState(1);

  const [sortState, setSortState] = useState({
    sortDirection: "ascending",
    sortColumn: "",
  });

  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTableFeatures(
    {
      columns,
      items: dishes,
    },
    [
      useTableSort({
        sortState,
        onSortChange: (e, nextSortState) => setSortState(nextSortState),
      }),
    ]
  );

  if (loading) {
    return <Loader />;
  }

  const headerSortProps = (columnId) => ({
    onClick: (e) => toggleColumnSort(e, columnId),
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(getRows());

  const totalPages = Math.ceil(rows.length / itemsPerPage);
  const paginatedData = getPaginateData(rows, currentPage, itemsPerPage);

  return (
    <>
      <Table
        sortable
        aria-label="Table with controlled sort"
        className={styles.tableContainer}
      >
        <TableHeader className={styles.tableHeader}>
          <TableRow>
            <TableHeaderCell {...headerSortProps("name")}>Name</TableHeaderCell>
            <TableHeaderCell>Ingredients</TableHeaderCell>
            <TableHeaderCell>Diet</TableHeaderCell>
            <TableHeaderCell {...headerSortProps("prep_time")}>
              Prep time
            </TableHeaderCell>
            <TableHeaderCell {...headerSortProps("cook_time")}>
              Cook time
            </TableHeaderCell>
            <TableHeaderCell>Flavor profile</TableHeaderCell>
            <TableHeaderCell>Course</TableHeaderCell>
            <TableHeaderCell>State</TableHeaderCell>
            <TableHeaderCell>Region</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map(({ item }) => (
            <TableRow className={styles.tableRow} key={item.id}>
              <TableCell>
                <TableCellLayout>
                  <Link className={styles.links} to={`/dish/${item.id}`}>
                    {item.name}
                  </Link>
                </TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>
                  <TagGroup className={styles.tagGroup1}>
                    {filterDishTag(item.ingredients).map((item) => (
                      <Tag shape="circle" size="small">
                        {item}
                      </Tag>
                    ))}
                  </TagGroup>
                </TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>{item.diet}</TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>{item.prep_time ?? "0"}</TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>{item.cook_time ?? "0"}</TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>
                  {item.flavor_profile ?? "not available"}
                </TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>
                  {item.course ?? "not available"}
                </TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>
                  {item.state ?? "not available"}
                </TableCellLayout>
              </TableCell>
              <TableCell>
                <TableCellLayout>
                  {item.region ?? "not available"}
                </TableCellLayout>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            updateCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default DishesTable;
