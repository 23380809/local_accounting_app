import { OrderCreate } from "../interfaces";
export const orderColumns = [
  { key: 'company', name: '公司' },
  { key: 'content', name: '內容'},

    { key: 'untaxed_total', name: '未稅金額' },
    { key: 'taxed_total', name: '含稅金額' },
    { key: 'invoice_number', name: '發票號碼' },
    { key: 'order_date', name: '開發票日期' },
    { key: 'payment_received_date', name: '收款日' },
    { key: 'payment_type', name: '方式' },
    { key: 'payment_amount', name: '已收金額' },
    { key: 'bank_account', name: '銀行帳號' },
    { key: 'note', name: '備註' },
  ];

export const initialCreateOrderFormData = (companyId?: String) =>{
  return Object.freeze({
  company_id: companyId ? companyId : "",
  content: "",
  untaxed_total: "",
  taxed_total: "",
  payment_type: "",
  payment_amount: "",
  payment_received_date: "",
  bank_account: "",
  invoice_number: "",
  order_date: "",
  note: "",
})};



export const getDate = (first : boolean) =>{
  const date = new Date();
  const year = date.getFullYear();
  const monthWithOffset = date.getUTCMonth() + 1; 
  const month = 
  monthWithOffset.toString().length < 2 
      ? `0${monthWithOffset}`
      : monthWithOffset;
  const endDate = first ? '01' : new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate().toString();

  return `${year}-${month}-${endDate}`; 
}

export const getDaysAgo = (days : number) =>{
  const date = new Date();
  const year = date.getFullYear();
  const monthWithOffset = date.getUTCMonth() + 1; 
  const month = 
  monthWithOffset.toString().length < 2 
      ? `0${monthWithOffset}`
      : monthWithOffset;
  const day = date.getDate() - days;
  return `${year}-${month}-${day}`; 
}

