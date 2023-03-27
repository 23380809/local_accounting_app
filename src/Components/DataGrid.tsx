import React from "react";
import { useEffect } from "react";
import { Header, OrderList } from "../interfaces/index.js";
import { useContext } from "react";
import { OrderContext } from "../Context/OrderContext";
import { useNavigate } from "react-router-dom";
function DataGrid(props: any) {
  const { orders } = useContext(OrderContext);
  const Navigate = useNavigate();

  return (
    <>
        <div className="ml-24">

            <div className="flex">
            <div className="p-5 font-bold">
            總數量: {orders.length}
            </div>
            <div className="p-5 font-bold">
            總含稅金額: {orders.reduce((acc: number, order: OrderList) => {
                return acc + Number(order.taxed_total)
            }, 0)}
            </div>
            <div className="p-5 font-bold">
                總已收款金額: {orders.reduce((acc: number, order: OrderList) => {
                    return acc + Number(order.payment_amount)
                }, 0)}
            </div>
            <div className="p-5 font-bold">
                總未收款金額: {orders.reduce((acc: number, order: OrderList) => {
                    return acc + Number(order.taxed_total)
                }, 0) - orders.reduce((acc: number, order: OrderList) => {
                    return acc + Number(order.payment_amount)
                }, 0)}
            </div>
            </div>
        </div>
        <div className="flex flex-col ml-24 data-grid">
            <div className="grid grid-cols-12 bg-gray-300 font-bold h-10">
                {props.headers.map((header: Header, index: number) => {
                    return (
                        <div key={header.key} className="flex items-center justify-left px-2 col-span-1">
                            {header.name}
                        </div>
                    )
                })}
            </div>
            {orders.map((order: OrderList, index: number) => {
                const bgColorClass = index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200';
                return(
                    <div key={order.id} className={`grid grid-cols-12 h-14 ${bgColorClass} hover:bg-indigo-200 `}>
                        <div className="flex items-center justify-left px-2 font-bold cursor-pointer hover:bg-blue-300 text-blue-600" onClick={()=>{
                            Navigate(`/company/${order.company.id}`)
                        }}>
                            {order.company.name}
                        </div>
                        <div className="flex items-center justify-left px-2 font-bold cursor-pointer hover:bg-blue-300 text-blue-600" onClick={()=>{
                            Navigate(`/order/edit/${order.id}`)
                        }}>
                            {order.content}
                        </div>
                        <div className="flex items-center justify-left px-2 hover:bg-blue-300">
                            {order.untaxed_total}
                        </div>
                        <div className="flex items-center justify-left px-2 hover:bg-blue-300">
                            {order.taxed_total}
                        </div>
                        <div className="flex items-center justify-left px-2 hover:bg-blue-300">
                            {order.invoice_number ? order.invoice_number : "未開發票"}
                        </div>
                        <div className="flex items-center justify-left px-2 hover:bg-blue-300">
                            {order.order_date ? order.order_date : "未開發票"}
                        </div>
                        <div className="flex items-center justify-left px-2 hover:bg-blue-300">
                            {order.payment_received_date? order.payment_received_date : "未收款"}
                        </div>
                        <div className="flex items-center justify-left px-2 hover:bg-blue-300">
                            {order.payment_type? order.payment_type.type : "未收款"}
                        </div>
                        <div className="flex items-center justify-left px-2 hover:bg-blue-300">
                            {order.payment_amount}
                        </div>
                        <div className="flex items-center justify-left px-2 hover:bg-blue-300">
                            {order.bank_account ? order.bank_account : "無"}
                        </div>

                        <div className="flex items-center justify-left px-2 hover:bg-blue-300">
                            {order.note}
                        </div>
                    </div>
                )
            })}

        </div>
    </>
  );
}

export default DataGrid;
