import { useState } from 'react';
import '../App.css';

import { OrderList } from '../interfaces';
import 'react-data-grid/lib/styles.css';
import DataGrid from '../Components/DataGrid';
import Search from '../Components/Search';
import { OrderContext } from "../Context/OrderContext";
import { orderColumns } from '../Static/Static';

function OrderView() {
    const [orders, setOrders] = useState<OrderList[]>([]);

    return (
        <OrderContext.Provider value={{ orders, setOrders }}>
            <Search />
            <DataGrid  headers={orderColumns}/>
        </OrderContext.Provider>
  );
}

export default OrderView;
