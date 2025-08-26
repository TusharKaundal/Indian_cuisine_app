import React from "react";
import { Button, makeStyles, mergeClasses, shorthands, tokens } from "@fluentui/react-components";
import { generatePageNumber } from "../utils/pagination";
import { ChevronLeftFilled, ChevronRightFilled } from "@fluentui/react-icons";

const usePaginationStyles = makeStyles({
    container: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        borderRadius: tokens.borderRadiusLarge,
        "@media (min-width: 768px)": {
            gap: "16px",
        }
    },
    pageSmallDisplay: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "40px",
        width: "40px",
        height: "40px",
        backgroundColor: tokens.colorBrandBackground,
        color: tokens.colorNeutralBackground,
        borderRadius: tokens.borderRadiusLarge,
        "@media (min-width: 768px)": {
            display: "none",
        }
    },
    pageLargeDisplay: {
        display: "none",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: tokens.borderRadiusLarge,
        ...shorthands.borderWidth("1px"),
        ...shorthands.borderColor(tokens.colorNeutralStroke1),
        ...shorthands.borderStyle("solid"),
        "@media (min-width: 768px)": {
            display: "flex",
        },
        '& button+button': {
            borderLeftWidth: "1px",
            borderLeftColor: tokens.colorNeutralStroke1,
            borderLeftStyle: "solid",
        }
    },
    paginationNumber: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "40px",
        width: "40px",
        height: "40px",
        cursor: "pointer",
        border: "none",
        backgroundColor: tokens.colorNeutralBackground1,
        "&:hover": {
            backgroundColor: tokens.colorBrandBackground,
            color: tokens.colorNeutralBackground1,
        }
    },
    active: {
        backgroundColor: tokens.colorBrandBackground,
        color: "white",
    },
    button: {
        borderRadius: tokens.borderRadiusLarge,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        maxWidth: "40px",
        height: "40px",
    }
})

const Pagination = React.memo(({ currentPage, totalPages, updateCurrentPage }) => {
    const pages = generatePageNumber(currentPage, totalPages);
    const styles = usePaginationStyles();

    return (
        <div className={styles.container} >
            <Button icon={<ChevronLeftFilled />} onClick={() => updateCurrentPage(currentPage - 1)} disabled={currentPage <= 1} className={styles.button}></Button>
            <div className={styles.pageSmallDisplay}>
                {currentPage}
            </div>
            <div className={styles.pageLargeDisplay}>
                {pages.map((page) => (
                    <PaginationNumber
                        key={page}
                        page={page}
                        isActive={page === currentPage}
                        updateCurrentPage={updateCurrentPage}
                    />
                ))}
            </div>
            <Button icon={<ChevronRightFilled />} onClick={() => updateCurrentPage(currentPage + 1)} disabled={currentPage >= totalPages} className={styles.button}></Button>
        </div>
    )
})

export default Pagination;

const PaginationNumber = ({ page, isActive, updateCurrentPage }) => {
    const styles = usePaginationStyles();
    return (
        <button
            className={mergeClasses(styles.paginationNumber, isActive && styles.active)}
            onClick={() => updateCurrentPage(page)}
        >
            {page}
        </button>
    );
};
