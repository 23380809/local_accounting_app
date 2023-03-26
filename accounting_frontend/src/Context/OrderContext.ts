import { useState, createContext } from "react";
import { OrderList } from "../interfaces/index";

type OrderContextType = {
    orders: OrderList[];
    setOrders: (orders: OrderList[]) => void;
}

export const OrderContext = createContext<OrderContextType>({} as OrderContextType);


