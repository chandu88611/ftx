import Layout from "@/Components/Layout";
import React from "react";

import OrderDetail from "@/Components/card/OrderDetail";
function ordercancelled() {
  return (
    <div className="w-full">
      <Layout>
        <OrderDetail />
      </Layout>
    
    </div>
  );
}

export default ordercancelled;
