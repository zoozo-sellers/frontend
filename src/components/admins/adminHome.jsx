import React from "react";
import OrdersTable from "./allOrders";
import NavBar from "../header";
import TopSellers from "../users/topSellers";

function AdminDashboard() {
  return (
    <>
      <NavBar />
      <section style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1, padding: "10px" }}>
          <OrdersTable />
        </div>
        <div style={{ flex: 1, padding: "10px" ,marginLeft:"-250px" ,marginRight:"150px", marginTop:"40px"}}>
          <TopSellers />
        </div>
      </section>
    </>
  );
}

export default AdminDashboard;
