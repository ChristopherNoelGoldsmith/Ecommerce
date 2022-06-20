import ProductListItem from "./ProductListItem";
import data from "../../assets/mhaCards.json";

const createFeaturedProductList = () => {
  //return featured productList with ListItem components and Json
  return data.map((card) => {
    console.log(card);
    return <ProductListItem productPrice={card.name} />;
  });
};

const FeaturedProducts = (props) => {
  const featuredProductList = createFeaturedProductList();

  return (
    <section>
      <ul>{featuredProductList}</ul>
    </section>
  );
};

export default FeaturedProducts;
