import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import CompanyProfile from '../Components/CompanyProfile';
import { OrderContext } from '../Context/OrderContext';
import DataGrid from '../Components/DataGrid';
import { OrderList } from '../interfaces';
import { orderColumns } from '../Static/Static';
function CompanyProfileView(props: any) {
  const [orders, setOrders] = useState<OrderList[]>([]);
  const { id } = useParams();
    return (
      <OrderContext.Provider value={{ orders, setOrders }}>
        <CompanyProfile id={id} />
        <DataGrid headers={orderColumns}/>
      </OrderContext.Provider>
  );
}

export default CompanyProfileView;
