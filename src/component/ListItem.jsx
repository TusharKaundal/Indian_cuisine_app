import * as React from "react";
import {
  makeStyles,
  Button,
  Text,
  TagGroup,
  Tag,
} from "@fluentui/react-components";
import {
  Clock20Regular,
  Food20Regular,
  Location20Regular,
  MoreHorizontal20Regular,
} from "@fluentui/react-icons";
import { Card, CardHeader } from "@fluentui/react-components";

const useStyles = makeStyles({
  card: {
    height: "fit-content",
  },

  text: { margin: "0" },
});

export const ListItem = ({ dishData }) => {
  const styles = useStyles();
  const onClick = React.useCallback(() => console.log("Interactive!"), []);

  return (
    <Card className={styles.card} onClick={onClick}>
      <CardHeader
        header={<Text weight="semibold">{dishData.name}</Text>}
        action={
          <Button appearance="filled" icon={<MoreHorizontal20Regular />}>
            {dishData.diet.slice(0, -7)}
          </Button>
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
