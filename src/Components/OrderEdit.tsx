import { useState, useEffect, useContext, useRef} from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import CreateableSelect from "react-select/creatable";
import axiosInstance from "../Axios/Axios";
import { CreateCompanyPopUpContext } from "../Context/CreateCompanyPopUpContext";
import { initialCreateOrderFormData } from "../Static/Static";
import { CompanyOptions } from "../interfaces";
import { getDate } from "../Static/Static";

function OrderEdit(props: any) {
    const Navigate = useNavigate();
    const { companyPopUpStatus, setCompanyPopUpStatus } = useContext(CreateCompanyPopUpContext);
    const [formData, setFormData] = useState(initialCreateOrderFormData);
    const [paymentTypes, setPaymentTypes] = useState<CompanyOptions[]>([]);
    const [ loading, setLoading ] = useState(true);
    const formRef = useRef<HTMLFormElement | null>(null);
    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
        }

    const handleCompanyChange = (selectedOption: any) => {
        const { value } = selectedOption;
        setFormData({
            ...formData,
            company_id: value.trim(),
        });
        };
    
    const handlePaymentTypeChange = (selectedOption: any) => {
        const { value } = selectedOption;
        console.log(formData)
        setFormData({
            ...formData,
            payment_type: value.trim(),
        });
        };

    const fetchCompanies = async () => {
        const res = await fetch('/accounting/companies')
        const data = await res.json()
        const companyOptions = data.map((option:any) => ({
            value: option.id,
            label: option.name
            }));
            setCompanyPopUpStatus({
                ...companyPopUpStatus,
                companyList: companyOptions
            })
    }

    const fetchPaymentTypes = async () => {
        const res = await fetch('/accounting/payment-types')
        const data = await res.json()
        const paymentTypeOptions = data.map((option:any) => ({
            value: option.id,
            label: option.type
            }));
        setPaymentTypes(paymentTypeOptions)
    }
    const fetchOrder = async () => {
        const res = await fetch(`/accounting/order/${props.id}`)
        const data = await res.json()
        await console.log(data)
        setFormData({
            ...formData,
            company_id: data.company.id,
            content: data.content,
            untaxed_total: data.untaxed_total,
            taxed_total: data.taxed_total,
            payment_type: data.payment_type ? data.payment_type.id : null,
            payment_amount: data.payment_amount,
            payment_received_date: data.payment_received_date,
            bank_account: data.bank_account,
            invoice_number: data.invoice_number,
            order_date: data.order_date,
            note: data.note,
        })
        setLoading(false)
    }

    useEffect(() => {
        fetchCompanies()
        fetchPaymentTypes()
        fetchOrder()
    }, [])

    const handleCreateOption = (e: any) => {
        setCompanyPopUpStatus({
            ...companyPopUpStatus,
            showPopup: true,
            companyName: e.trim(),
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        axiosInstance.post(`/accounting/update-order/${props.id}`, {
            company: formData.company_id,
            content: formData.content,
            untaxed_total: formData.untaxed_total ? formData.untaxed_total : 0,
            taxed_total: formData.taxed_total ? formData.taxed_total : 0,
            payment_type: formData.payment_type ? formData.payment_type : null,
            payment_amount: formData.payment_amount ? formData.payment_amount : 0,
            payment_received_date: formData.payment_received_date ? formData.payment_received_date : null,
            bank_account: formData.bank_account ? formData.bank_account : null,
            invoice_number: formData.invoice_number ? formData.invoice_number : null,
            order_date: formData.order_date ? formData.order_date : null,
            note: formData.note,
        }).then((res) => {
            Navigate(`/order?un_paid=false&un_invoice=false`)
        }).catch((e) => {
            console.log(e)
        })
    }

    const handleDelete = (e: any) => {
        e.preventDefault();
        axiosInstance.post(`/accounting/delete-order/${props.id}`).then((res) => {
            Navigate(`/order?un_paid=false&un_invoice=false`)
        }).catch((e) => {
            console.log(e)
        })
    }

  return (
    <div className="flex justify-center ml-24 mb-24 mt-12">
        { loading ? <div>loading</div> :
        <form className='container w-152 flex' id="create-order" ref={formRef} >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <CreateableSelect 
                    options={companyPopUpStatus.companyList}
                    id="company"
                    onCreateOption={handleCreateOption}
                    onChange={handleCompanyChange}
                    menuPlacement="auto"
                    menuPortalTarget={document.body}
                    placeholder="公司名稱"
                    styles={{ 
                        control: (provided) => ({ ...provided, height: '56px' }),
                    }}
                />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    fullWidth
                    id="content"
                    label="內容"
                    name="content"
                    autoComplete="content"
                    onChange={handleChange}
                    defaultValue={formData.content}
                    error={formData.content.length > 100}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    fullWidth
                    id="untaxed_total"
                    label="未稅總額"
                    name="untaxed_total"
                    autoComplete="untaxed_total"
                    onChange={handleChange}
                    defaultValue={formData.untaxed_total}
                    error={isNaN(Number(formData.untaxed_total))}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    fullWidth
                    id="taxed_total"
                    label="稅後總額"
                    name="taxed_total"
                    autoComplete="taxed_total"
                    onChange={handleChange}
                    defaultValue={formData.taxed_total}
                    error={isNaN(Number(formData.taxed_total))}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    fullWidth
                    name="invoice_number"
                    label="發票號碼"
                    id="invoice_number"
                    autoComplete="invoice_number"
                    onChange={handleChange}
                    defaultValue={formData.invoice_number}
                    error={formData.invoice_number?.length > 20}
                    />
                </Grid>
                {formData.invoice_number &&
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    id="order_date"
                    name="order_date"
                    label="開發票日期"
                    type="date"
                    defaultValue={formData.order_date}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={handleChange}
                    error={!formData.order_date}
                />
                </Grid>}

                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    fullWidth
                    id="payment_amount"
                    label="已付款金額"
                    name="payment_amount"
                    autoComplete="payment_amount"
                    onChange={handleChange}
                    defaultValue={formData.payment_amount}
                    error={isNaN(Number(formData.payment_amount))}
                    />
                </Grid>
                { formData.payment_amount && formData.payment_amount > 0 && !isNaN(formData.payment_amount) &&
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    fullWidth
                    id="payment_received_date"
                    label="收款日期"
                    name="payment_received_date"
                    autoComplete="payment_received_date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleChange}
                    defaultValue={formData.payment_received_date}
                    error={ formData.payment_amount && !formData.payment_received_date}
                    />
                </Grid>}
                { formData.payment_amount && formData.payment_amount > 0 && !isNaN(formData.payment_amount) &&
                <Grid item xs={12}>
                <CreateableSelect 
                    options={paymentTypes}
                    onChange={handlePaymentTypeChange}
                    menuPortalTarget={document.body}
                    styles={{ 
                        control: (provided) => ({ ...provided, height: '56px' }),
                        menu: (provided) => ({ ...provided, maxHeight: '200px' }),
                      }}
                    placeholder="付款方式"
                    />
                </Grid>}

                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    fullWidth
                    name="bank_account"
                    label="銀行帳號"
                    id="bank_account"
                    autoComplete="bank_account"
                    onChange={handleChange}
                    defaultValue={formData.bank_account}
                    error={formData.bank_account?.length > 10}
                    />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    id="note"
                    name="note"
                    label="備註"
                    defaultValue={formData.note}
                    onChange={handleChange}
                />
                </Grid>
                <Grid item xs={12}>
                <div className="flex justify-around w-full">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex justify-center text-3xl align-middle w-full"
                    onClick={handleSubmit}
                    >
                    儲存並繼續
                    </button>
                </div>
                </Grid>
            </Grid>

        </form>
        })
    </div>
  );
}

export default OrderEdit;
