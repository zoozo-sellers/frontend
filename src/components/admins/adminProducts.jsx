import React from "react";
import "../../styles/adminProducts.css";
import ProductsTable from "./allProducts";
import CreateProductForm from "./createProduct";
import NavBar from "../header";

function AdminProducts() {
  return (
    <>
      <NavBar />
      <section style={{ display: "flex", height: "100%" }}>
        <div style={{ flex: 1, padding: "20px" }}>
          <CreateProductForm />
        </div>
        <div style={{ flex: 2, padding: "20px", marginLeft:"-250px", marginRight:"140px" }}>
          <ProductsTable />
        </div>
      </section>
    </>
  );
}

export default AdminProducts;
