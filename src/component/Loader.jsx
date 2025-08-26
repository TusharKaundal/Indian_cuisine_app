import * as React from "react";
import { Text } from "@fluentui/react-text";
import { makeStyles, tokens, Spinner } from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  card: {
    width: "200px",
    height: "200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
  },
  text: {
    color: tokens.colorBrandForeground1,
  },
});

const Loader = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Text className={styles.text}>Loading dishes..</Text>
        <Spinner size="large" labelPosition="below" />
      </div>
    </div>
  );
};

export default Loader;
