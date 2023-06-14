import Layout from "@/Components/Layout";
import React from "react";

import OrdersTable from "@/Components/order/OrdersTable";
function ordercancelled() {
  return (
    <div className="flex gap-0">
      <Layout>
        <OrdersTable />
      </Layout>
      
    </div>
  );
}

export default ordercancelled;
