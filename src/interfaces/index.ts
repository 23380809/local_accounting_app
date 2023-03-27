export interface Contact {
    id : string;
    name : string;
    phone?: string | null;
    email?: string | null;

}
export interface Company {
    id : string;
    name : string;
    address? : string | null;
    zip_code? : string | null;
    tax_id? : string | null;
    phone? : string | null;
    email? : string | null;
    contacts : Contact[];
    note : string;
}

export interface PaymentType{
    id : string;
    type : string;
}

export interface Order{
    id : string;
    content : string;
    company : Company;
    untaxed_total : number;
    taxed_total : number;
    payment_type : PaymentType;
    payment_amount? : number | null;
    payment_received_date? : string | null;
    bank_account? : string | null;
    invoice_number? : string | null;
    order_date : string;
    note? : string | null;
}

export interface Header{
    key: string,
    name: string
}

export interface OrderList{
    id : string;
    content : string;
    company : OrderCompany;
    untaxed_total : number;
    taxed_total : number;
    payment_type : PaymentType;
    payment_amount? : number | null;
    payment_received_date? : string | null;
    bank_account? : string | null;
    invoice_number? : string | null;
    order_date : string;
    note? : string | null;
}

export interface OrderCreate{
    content : string;
    company : string;
    untaxed_total : string;
    taxed_total : string;
    payment_type : string;
    payment_amount? : number | null;
    payment_received_date? : string | null;
    bank_account? : string | null;
    invoice_number? : string | null;
    order_date : string;
    note? : string | null;
}

export interface OrderCompany{
    id : string;
    name : string;
}
export interface CompanyOptions{
    value : string;
    label : string;
}