import * as React from "react";
import {
  makeStyles,
  Text,
  TagGroup,
  Tag,
  tokens,
  mergeClasses,
} from "@fluentui/react-components";
import {
  Clock20Regular,
  Food20Regular,
  FoodChickenLegRegular,
  Location20Regular,
  LeafOneRegular,
} from "@fluentui/react-icons";
import { Card, CardHeader } from "@fluentui/react-components";
import { useNavigate } from "react-router";

const useStyles = makeStyles({
  card: {
    height: "fit-content",
  },
  cardFooter: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  details: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    "& div": {
      display: "flex",
      gap: "5px",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  tagRed: {
    backgroundColor: tokens.colorStatusDangerBackground3,
    color: tokens.colorNeutralBackground1,
    textTransform: "capitalize",
  },
  tagGreen: {
    backgroundColor: tokens.colorPaletteLightGreenForeground3,
    color: tokens.colorNeutralBackground1,
    textTransform: "capitalize",
  },
  location: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
    "& span": {
      textTransform: "capitalize",
    },
  },
});

export const ListItem = ({ dishData }) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const onClick = React.useCallback(() => navigate(`/dish/${dishData.id}`), []);

  return (
    <Card className={styles.card} onClick={onClick}>
      <CardHeader
        header={
          <Text weight="semibold" style={{ textTransform: "capitalize" }}>
            {dishData.name}
          </Text>
        }
        action={
          <Tag
            size="small"
            shape="rounded"
            className={mergeClasses(
              dishData.diet === "vegetarian" ? styles.tagGreen : styles.tagRed
            )}
            icon={
              dishData.diet === "vegetarian" ? (
                <LeafOneRegular />
              ) : (
                <FoodChickenLegRegular />
              )
            }
          >
            {dishData.diet.slice(0, -7)}
          </Tag>
        }
      />

      <div className={styles.cardFooter}>
        <div className={styles.details}>
          <div>
            <Clock20Regular />
            <Text>Prep: {dishData.prep_time ?? 0} m</Text>
          </div>
          <div>
            <Food20Regular />
            <Text>Cook: {dishData.cook_time ?? 0} m</Text>
          </div>
        </div>
        <div className={styles.location}>
          <Location20Regular />
          <Text>{dishData.state ?? "Not Available"}</Text>
        </div>
        <TagGroup>
          {dishData.ingredients.slice(0, 4).map((item) => (
            <Tag shape="circle" size="small">
              {item}
            </Tag>
          ))}
        </TagGroup>
      </div>
    </Card>
  );
};
