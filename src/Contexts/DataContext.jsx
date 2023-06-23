import { createContext, useContext, useState } from "react";
import { snacksData } from "../Data/Data";
import { toast } from "react-hot-toast";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [snacks, setSnacks] = useState(snacksData);

  const [sortOrder, setSortOrder] = useState({
    key: null,
    order: "ascending",
  });

  const toggleSortOrder = (key) => {
    if (sortOrder.key === key) {
      setSortOrder((prevOrder) => ({
        ...prevOrder,
        order: prevOrder.order === "ascending" ? "descending" : "ascending",
      }));
    } else {
      setSortOrder({
        key: key,
        order: "ascending",
      });
    }
  };

  const sortArray = (arr, key, order) => {
    return arr.sort((a, b) => {
      if (order === "ascending") {
        if (key === "ingredients") {
          const ingredientsA = a[key].join(", ").toLowerCase();
          const ingredientsB = b[key].join(", ").toLowerCase();
          return ingredientsA.localeCompare(ingredientsB);
        } else if (typeof a[key] === "number" && typeof b[key] === "number") {
          return a[key] - b[key];
        } else {
          return a[key].localeCompare(b[key]);
        }
      } else {
        if (key === "ingredients") {
          const ingredientsA = a[key].join(", ").toLowerCase();
          const ingredientsB = b[key].join(", ").toLowerCase();
          return ingredientsB.localeCompare(ingredientsA);
        } else if (typeof a[key] === "number" && typeof b[key] === "number") {
          return b[key] - a[key];
        } else {
          return b[key].localeCompare(a[key]);
        }
      }
    });
  };

  const sortData = (key) => {
    toggleSortOrder(key);
    const { order } = sortOrder;
    const sortedSnacks = sortArray([...snacks], key, order);
    setSnacks(sortedSnacks);
    toast.success(`Snacks Sorted in ${sortOrder.order} order by ${key}`);
  };

  const sortById = () => {
    sortData("id");
  };

  const sortByProductName = () => {
    sortData("product_name");
  };

  const sortByProductWeight = () => {
    sortData("product_weight");
  };

  const sortByPrice = () => {
    sortData("price");
  };

  const sortByCalory = () => {
    sortData("calories");
  };

  const sortByIngredient = () => {
    sortData("ingredients");
  };

  const handleSearch = (searchValue) => {
    if (searchValue) {
      const searchedArray = snacks.filter(({ product_name }) =>
        product_name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSnacks(searchedArray);
    } else {
      setSnacks(snacksData);
    }
  };

  return (
    <DataContext.Provider
      value={{
        snacks,
        sortByCalory,
        sortById,
        sortByIngredient,
        sortByPrice,
        sortByProductWeight,
        sortByProductName,
        handleSearch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
