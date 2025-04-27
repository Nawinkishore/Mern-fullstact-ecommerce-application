import ProductFilter from "@/components/shopping-view/Filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "../../../store/shop/products-slice/index.js";
import ShoppingProductTile from "./product-tile.jsx";

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { isLoading, productList } = useSelector((state) => state.shopProducts);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState(null);
  // console.log(productList);
  // fetch list of products from the server
  console.log(filter ,"Product Listing Filter");

  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, []);
  
  function handleSort(value) {
    setSort(value);
  }
  function handleFilter(getSectionId, getCurrentOption) {
    console.log(getSectionId, getCurrentOption);
    let cpyFilters = { ...filter };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        cpyFilters[getSectionId].push(getCurrentOption);
      } else {
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }
    setFilter(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
    
  }
  useEffect(()=>{
    setSort("price-lowtohigh")
    setFilter(JSON.parse(sessionStorage.getItem("filters")) || {});
  },[])
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6  p-4 md:p-6">
      <ProductFilter filters={filter} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold ">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground ">
              {productList?.length}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"outline"}
                  size={"sm"}
                  className="flex items-center gap-2"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={"w-[200px]"}>
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  product={productItem}
                  key={productItem._id}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
