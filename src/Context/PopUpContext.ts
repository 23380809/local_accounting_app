import { createContext } from "react";
interface popUpStatus{
    showPopup: boolean;
    message: string;
    status: boolean;
    errorMessages: string[];
}

type PopUpContextType = {
    popUpStatus: popUpStatus;
    setPopUpStatus: (popUpStatus: popUpStatus) => void;
}

export const PopUpContext = createContext<PopUpContextType>({} as PopUpContextType);


