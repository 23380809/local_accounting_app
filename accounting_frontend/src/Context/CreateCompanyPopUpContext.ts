import { useState, createContext } from "react";
import { CompanyOptions, OrderList } from "../interfaces/index";

interface CompanyPopUpStatus{
    showPopup: boolean;
    companyName : string;
    companyList : CompanyOptions[];
}

type CreateCompanyPopUpContextType = {
    companyPopUpStatus: CompanyPopUpStatus;
    setCompanyPopUpStatus: (companyPopUpStatus: CompanyPopUpStatus) => void;
}

export const CreateCompanyPopUpContext = createContext<CreateCompanyPopUpContextType>({} as CreateCompanyPopUpContextType);


