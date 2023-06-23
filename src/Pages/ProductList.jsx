import React from "react";
import { useData } from "../Contexts/DataContext";
import "./ProductList.css";

const ProductList = () => {
  const {
    snacks,
    sortByCalory,
    sortById,
    sortByIngredient,
    sortByPrice,
    sortByProductWeight,
    sortByProductName,
  } = useData();
  return (
    <div className="container">
      {snacks?.length === 0 ? (
        <h1>No Search Result Found</h1>
      ) : (
        <table>
          <tr>
            <th onClick={sortById} title="Sort By Id">
              ID
            </th>
            <th onClick={sortByProductName} title="Sort By Product Name">
              Product Name
            </th>
            <th onClick={sortByProductWeight} title="Sort By Product Weight">
              Product Weight
            </th>
            <th onClick={sortByPrice} title="Sort By Price">
              Price (INR)
            </th>
            <th onClick={sortByCalory} title="Sort By Calories">
              Calories
            </th>
            <th onClick={sortByIngredient} title="Sort By Ingredients">
              Ingredients
            </th>
          </tr>
          {snacks.map(
            ({
              id,
              product_name,
              product_weight,
              price,
              calories,
              ingredients,
            }) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{product_name}</td>
                  <td>{product_weight}</td>
                  <td>{price}</td>
                  <td>{calories}</td>
                  <td>{ingredients.map((ing) => ing + ",")}</td>
                </tr>
              );
            }
          )}
        </table>
      )}
    </div>
  );
};

export default ProductList;
