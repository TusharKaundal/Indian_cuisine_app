import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardPreview,
  CardFooter,
  Title3,
  Body1,
  Subtitle1,
  Subtitle2,
  makeStyles,
  shorthands,
  tokens,
  TagGroup,
  Tag,
  Divider,
} from "@fluentui/react-components";
import axios from "axios";
import { useParams } from "react-router";

const useStyles = makeStyles({
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  card: {
    marginBottom: "20px",
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
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
        .get(`http://localhost:5500/api/dishes/${id}`)
        .then((res) => {
          setDish(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  if (!dish) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardHeader
          header={
            <div className={styles.header}>
              <Title3>{dish.name}</Title3>
              <Subtitle2>{dish.state || 'Indian'} Cuisine</Subtitle2>
            </div>
          }
        />

        <CardPreview>
          <div style={{ padding: "1rem" }}>
            <div className={styles.grid}>
              <div>
                <div className={styles.detailItem}>
                  <strong>Name:</strong> {dish.name}
                </div>
                <div className={styles.detailItem}>
                  <strong>Diet:</strong> {dish.diet || 'Not specified'}
                </div>
                <div className={styles.detailItem}>
                  <strong>Prep Time:</strong> {dish.prep_time || 0} minutes
                </div>
                <div className={styles.detailItem}>
                  <strong>Cook Time:</strong> {dish.cook_time || 0} minutes
                </div>
              </div>
              <div>
                <div className={styles.detailItem}>
                  <strong>Flavor Profile:</strong> {dish.flavor_profile || 'Not specified'}
                </div>
                <div className={styles.detailItem}>
                  <strong>Course:</strong> {dish.course || 'Not specified'}
                </div>
                <div className={styles.detailItem}>
                  <strong>State:</strong> {dish.state || 'Not specified'}
                </div>
                <div className={styles.detailItem}>
                  <strong>Region:</strong> {dish.region || 'Not specified'}
                </div>
              </div>
            </div>

            <Divider className={styles.divider} />

            <div className={styles.section}>
              <Subtitle1>Ingredients</Subtitle1>
              <TagGroup>
                {Array.isArray(dish.ingredients) && dish.ingredients.length > 0 ? (
                  dish.ingredients.map((ingredient, index) => (
                    <Tag key={index} appearance="outline" className={styles.tag}>
                      {ingredient}
                    </Tag>
                  ))
                ) : (
                  <Body1>No ingredients listed</Body1>
                )}
              </TagGroup>
            </div>
          </div>
        </CardPreview>
      </Card>
    </div>
  );
};

export default DishDetailsPage;
