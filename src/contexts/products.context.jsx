import { createContext, useEffect, useState } from "react";
import SHOP_DATA from "../shop-data.json";
export const ProductsContext = createContext({
  shopData: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setShopData] = useState(SHOP_DATA);
  // console.log(SHOP_DATA);


  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>

  )

}