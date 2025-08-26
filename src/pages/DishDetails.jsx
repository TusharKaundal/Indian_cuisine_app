import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardPreview,
  Title3,
  Body1,
  Subtitle1,
  Subtitle2,
  makeStyles,
  tokens,
  TagGroup,
  Tag,
  Divider,
} from "@fluentui/react-components";
import axios from "axios";
import { useParams } from "react-router";
import Loader from "../component/Loader";

const useStyles = makeStyles({
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  card: {
    marginBottom: "20px",
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow4,
  },
  header: {
    marginBottom: "12px",
  },
  section: {
    marginBottom: "24px",
  },
  tag: {
    marginRight: "8px",
    marginBottom: "8px",
  },
  divider: {
    margin: "16px 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  detailItem: {
    marginBottom: "12px",
  },
});

const DishDetailsPage = () => {
  const styles = useStyles();
  const { id } = useParams();
  const [dish, setDish] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/dishes/${id}`)
        .then((res) => {
          setDish(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  if (!dish) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardHeader
          header={
            <div className={styles.header}>
              <Title3>{dish.name}</Title3>
              <Subtitle2>{dish.state || "Indian"} Cuisine</Subtitle2>
            </div>
          }
        />
        <CardPreview>
          
        </CardPreview>
      </Card>
    </div>
  );
};

export default DishDetailsPage;
