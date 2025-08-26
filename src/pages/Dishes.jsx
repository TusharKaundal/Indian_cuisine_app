import DishesTable from '../component/DishesTable';

const DishesPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h1 style={{ color: "var(--colorBrandBackground)" }}>Our Dishes</h1>
      <p>Explore our collection of authentic Indian dishes. From spicy curries to sweet desserts, we have it all!</p>
      <DishesTable />
    </div>
  );
};

export default DishesPage;