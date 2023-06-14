import Layout from "@/Components/Layout";
import React from "react";

import OrdersTable from "@/Components/order/OrdersTable";
function Dashboard() {
  return (
    <div className="flex gap-0">
      <Layout>
        <OrdersTable />
      </Layout>
   
    </div>
  );
}

export default Dashboard;
