import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderList, CompanyOptions } from '../interfaces';
import OrderEdit from '../Components/OrderEdit';
import CreateCompanyPopUp from '../Components/CreateCompanyPopUp';
import { CreateCompanyPopUpContext } from "../Context/CreateCompanyPopUpContext";

function OrderEditView() {
    const [order, setOrder] = useState<OrderList[]>();
    const { id } = useParams();
    const [companyPopUpStatus, setCompanyPopUpStatus] = useState({
        showPopup: false,
        companyName: "",
        companyList: [] as CompanyOptions[],
    });


    return (
        <CreateCompanyPopUpContext.Provider value={{ companyPopUpStatus, setCompanyPopUpStatus }}>
        <CreateCompanyPopUp show={companyPopUpStatus.showPopup} onClose={()=>{
          setCompanyPopUpStatus({
            ...companyPopUpStatus,
            showPopup: false
        })}}/>
        <OrderEdit id={id} />
        </CreateCompanyPopUpContext.Provider>
  );
}

export default OrderEditView;
