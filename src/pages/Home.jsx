import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { Card, CardHeader, Button, Text } from "@fluentui/react-components";
import { useNavigate } from "react-router";

const useStyles = makeStyles({
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: tokens.spacingHorizontalXXL,
  },
  hero: {
    textAlign: "center",
    marginBottom: tokens.spacingVerticalXXL,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingVerticalXXL,
  },
  title: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightBold,
    background: `linear-gradient(45deg, ${tokens.colorBrandBackground} 0%, ${tokens.colorPaletteDarkOrangeBackground3} 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    paddingBottom:"10px"
  },
  subtitle: {
    fontSize: tokens.fontSizeBase500,
    color: tokens.colorNeutralForeground3,
    maxWidth: "800px",
    margin: "0 auto",
    marginBottom: tokens.spacingVerticalXXL,
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 300px)",
    justifyContent: "center",
    alignContent: "center",
    gap: tokens.spacingHorizontalXXL,
    marginTop: tokens.spacingVerticalXXL,
    "@media (max-width: 768px)": {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
  card: {
    height: "100%",
    transition: "transform 0.2s ease-in-out",
    padding: tokens.spacingHorizontalXL,
    ":hover": {
      transform: "translateY(-5px)",
      boxShadow: tokens.shadow16,
    },
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  cardTitle: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalS,
  },
  cardDescription: {
    color: tokens.colorNeutralForeground3,
    marginBottom: tokens.spacingVerticalL,
    flexGrow: 1,
  },
  button: {
    width: "100%",
    marginTop: "auto",
  },
});

const cards = [
  {
    title: "Find Your Perfect Dish",
    description:
      "Let us suggest dishes based on the ingredients you have on hand. Our smart algorithm will find the best recipes for you!",
    buttonText: "Get Dish Suggestions",
    href: "/suggestor",
  },
  {
    title: "Explore All Dishes",
    description:
      "Browse through our extensive collection of authentic Indian recipes. From appetizers to desserts, we have it all!",
    buttonText: "Browse All Dishes",
    href: "/dishes",
  },
];

const Home = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Discover the Rich Flavors of India</h1>
        <p className={styles.subtitle}>
          Embark on a culinary journey through India's diverse regional
          cuisines. From the spicy curries of the South to the rich, creamy
          dishes of the North, explore authentic recipes that bring the taste of
          India to your kitchen.
        </p>
      </div>

      <div className={styles.cardsContainer}>
        {cards.map((card, index) => (
          <Card key={index} className={styles.card}>
            <CardHeader
              header={<Text className={styles.cardTitle}>{card.title}</Text>}
            />
            <div className={styles.cardContent}>
              <p className={styles.cardDescription}>{card.description}</p>
              <Button
                appearance="primary"
                className={styles.button}
                onClick={() => navigate(card.href)}
              >
                {card.buttonText}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
