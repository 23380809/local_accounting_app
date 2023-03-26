import { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import { OrderContext } from "../Context/OrderContext";
import Checkbox from "@material-ui/core/Checkbox";

function Search(props: any) {
    const { setOrders } = useContext(OrderContext);
    const Navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const getCurrentDate = () =>{
        const dateNow = new Date();
        const year = dateNow.getFullYear();
        const monthWithOffset = dateNow.getUTCMonth() + 1; 
        const month = 
        monthWithOffset.toString().length < 2 
            ? `0${monthWithOffset}`
            : monthWithOffset;
        const date =
        dateNow.getUTCDate().toString().length < 2 
            ? `0${dateNow.getUTCDate()}`
            : dateNow.getUTCDate();
        return `${year}-${month}-${date}`; 
    }

    const initialFormData = Object.freeze({
        ...(searchParams.get("company__name") && {company__name: searchParams.get("company__name")}),
        ...(searchParams.get("search") && {content: searchParams.get("search")}),
        ...(searchParams.get("invoice_number") && {invoice_number: searchParams.get("invoice_number")}),
        ...(searchParams.get("bank_account") && {bank_account: searchParams.get("bank_account")}),
        ...(searchParams.get("start_date") && {start_date: searchParams.get("start_date")}),
        ...(searchParams.get("end_date") && {end_date: searchParams.get("end_date")}),
        ...(searchParams.get("created_from") && {created_from: searchParams.get("created_from")}),
        ...(searchParams.get("created_to") && {created_to: searchParams.get("created_to")}),
        un_paid: searchParams.get("un_paid") === "true" ? true : false,
        un_invoice: searchParams.get("un_invoice") === "true" ? true : false,
        });

    const [formData, updateFormData] = useState(initialFormData);
    const handleChange = (e: any) => {
        if (e.target.name === "un_paid" || e.target.name === "un_invoice") {
            updateFormData({
                ...formData,
                [e.target.name]: e.target.checked,
            });
            return;
        }

        const value = e.target.value.trim();
        updateFormData({
          ...formData,
          [e.target.name]: value !== "undefined" ? value : undefined,
        });
      };


      const NavigateWithFormData = () => {
        const urlParams = Object.entries(formData)
        .filter(([key, value]) => value !== undefined && value !== "")
        .map(([key, value]) => {
          if (key === "content") {
            key = "search";
          }
          return `${key}=${encodeURIComponent(value as string)}`;
        })
        .join("&");


        const url = `/order?${urlParams}`;
        console.log(url)
        Navigate(url);
        window.location.reload();
      };

    useEffect( () =>{
        const fetchData = async () => {
            let url = "/accounting/order?"
            for (const entry of Array.from(searchParams.entries())) {
                url = url.concat(entry[0], "=", entry[1], "&")
            }
            const res = await fetch(url)
            const data = await res.json()
            setOrders(data)
        }
        fetchData()
    }, [])
    console.log(formData)

  return (
    <div className=" h-full ml-24 p-8 flex justify-center">
        <div  className="flex w-152">
            <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                variant="outlined"
                fullWidth
                id="company__name"
                label="公司名稱"
                name="company__name"
                autoComplete="company__name"
                onChange={handleChange}
                defaultValue={formData.company__name}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                variant="outlined"
                fullWidth
                id="content"
                label="內容"
                name="content"
                autoComplete="content"
                onChange={handleChange}
                defaultValue={formData.content}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                variant="outlined"
                fullWidth
                name="invoice_number"
                label="發票號碼"
                id="invoice_number"
                autoComplete="invoice_number"
                onChange={handleChange}
                defaultValue={formData.invoice_number}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                variant="outlined"
                fullWidth
                name="bank_account"
                label="銀行帳號"
                id="bank_account"
                autoComplete="bank_account"
                onChange={handleChange}
                defaultValue={formData.bank_account}
                />
            </Grid>

            <Grid item xs={6}>

            <TextField
                fullWidth
                variant='outlined'
                id="start_date"
                name="start_date"
                label="開發票日從"
                type="date"
                defaultValue={formData.start_date}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={handleChange}
            />

            </Grid>
            <Grid item xs={6}>
            <TextField
                fullWidth
                variant='outlined'
                id="end_date"
                name="end_date"
                label="開發票日到"
                type="date"
                defaultValue={formData.end_date}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={handleChange}
            />
            </Grid>
            <Grid item xs={6}>

            <TextField
                fullWidth
                variant='outlined'
                id="created_from"
                name="created_from"
                label="建立從"
                type="date"
                defaultValue={formData.created_from}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={handleChange}
            />

            </Grid>
            <Grid item xs={6}>
            <TextField
                fullWidth
                variant='outlined'
                id="created_to"
                name="created_to"
                label="建立到"
                type="date"
                defaultValue={formData.created_to}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={handleChange}
            />
            </Grid>

            <Grid item xs={6}>
            <Checkbox
                checked={formData.un_paid}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
                name="un_paid"
            />
            <span className='font-bold text-2xl align-middle'>
            未收款
            </span>
            </Grid>
            <Grid item xs={6}>
            <Checkbox
                checked={formData.un_invoice}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
                name="un_invoice"
            />
            <span className='font-bold text-2xl align-middle'>
            未開發票
            </span>
            </Grid>
            <Grid item xs={12}>
                <div className='flex justify-between'>
                    <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 mx-2 rounded-full w-full flex justify-center text-3xl align-middle"
                    onClick={()=>{
                        Navigate('/order/create')
                    }}
                    >
                    新增
                    </button>
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded-full w-full flex justify-center text-3xl align-middle"
                    onClick={()=>{
                        NavigateWithFormData()
                    }}
                    >
                    搜尋
                    </button>

                </div>
            </Grid>
            </Grid>
        </div>
    </div>

  );
}

export default Search;
