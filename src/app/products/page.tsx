"use server";
import ProductTable from "@/components/ProductTable";
import { IProducts } from "@/interfaces/interfaces";
import { getProducts } from "@/services/products";

const Products = async () => {
  let response: any = await getProducts();
  response = await response.json() as {products: IProducts[]};
  return <ProductTable data={response.products}/>
};

export default Products;
