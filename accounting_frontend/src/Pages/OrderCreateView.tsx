import { useState } from "react";
import OrderCreate from "../Components/OrderCreate";
import DataGrid from '../Components/DataGrid';
import OnSuccessPopUp from "../Components/OnSuccessPopUp";
import CreateCompanyPopUp from "../Components/CreateCompanyPopUp";
import { orderColumns } from "../Static/Static";
import { OrderContext } from "../Context/OrderContext";
import { PopUpContext } from "../Context/PopUpContext";
import { CreateCompanyPopUpContext } from "../Context/CreateCompanyPopUpContext";
import { CompanyOptions, OrderList } from "../interfaces";


function OrderReateView() {
    const [orders, setOrders] = useState<OrderList[]>([]);
    const [popUpStatus, setPopUpStatus] = useState({
        showPopup: false,
        message: "",
        status: true,
        errorMessages: [] as string[],
    });
    const [companyPopUpStatus, setCompanyPopUpStatus] = useState({
        showPopup: false,
        companyName: "",
        companyList: [] as CompanyOptions[],
    });


    return (
    <OrderContext.Provider value={{ orders, setOrders }}>
      <PopUpContext.Provider value={{ popUpStatus, setPopUpStatus }}>
      <CreateCompanyPopUpContext.Provider value={{ companyPopUpStatus, setCompanyPopUpStatus }}>
        <OnSuccessPopUp show={popUpStatus.showPopup} onClose={()=>{setPopUpStatus({
          message: "",
          showPopup: false,
          status: true,
          errorMessages: [] 
        })}} message={popUpStatus.message} status={popUpStatus.status} errorMessages={popUpStatus.errorMessages}/>
        <CreateCompanyPopUp show={companyPopUpStatus.showPopup} onClose={()=>{
          setCompanyPopUpStatus({
            ...companyPopUpStatus,
            showPopup: false
        })}}/>
          <OrderCreate />
          <div className="ml-24 text-4xl font-bold">最近新增</div>
        <DataGrid headers={orderColumns}/>
        </CreateCompanyPopUpContext.Provider>
      </PopUpContext.Provider>
    </OrderContext.Provider>
  );
}

export default OrderReateView;
