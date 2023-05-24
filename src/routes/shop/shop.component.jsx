import { ProductsContext } from "../../contexts/products.context";
import { useContext } from "react";

const Shop = () => {
  const { products } = useContext(ProductsContext);
  // console.log(products);
  return (
    <div>
      {products.map(({ id, name }) => (
        <div key={id}>
          <h1>{name}</h1>
        </div>
      ))}
    </div>
  );
};

export default Shop;
