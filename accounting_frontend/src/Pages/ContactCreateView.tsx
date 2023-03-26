import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { Grid, TextField } from '@material-ui/core';
import Select from 'react-select';
import { CompanyOptions } from '../interfaces';

function ContactCreateView(props: any) {
    const [searchParams] = useSearchParams();
    const [ companies, setCompanies ] = useState<CompanyOptions[]>([]);
    const navigate = useNavigate();
    const [ formData, setFormData ] = useState({
        name: "",
        phone: "",
        email: "",
        company: searchParams.get('company') ? searchParams.get('company') : "",
    });

    useEffect(()=>{
        const fetchCompanies = async () => {
            const res = await fetch('/accounting/companies')
            const data = await res.json()
            const companyOptions = data.map((option:any) => ({
                value: option.id,
                label: option.name
            }));
            setCompanies(companyOptions)
        }
        fetchCompanies()
    },[])

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        fetch(`/accounting/create-contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(()=>{
                navigate(`/company/${searchParams.get('company')}`)
            })
    }
    return (
        <div className="flex justify-center ml-24 my-24">
        <form className='container' id="create-order">
            {(
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    fullWidth
                    id="name"
                    label="聯絡人名稱"
                    name="name"
                    autoComplete="name"
                    onChange={handleChange}
                    defaultValue={formData.name}
                    error={formData.name.length > 30}
                    />
                </Grid>
                
             
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    fullWidth
                    id="phone"
                    label="電話"
                    name="phone"
                    autoComplete="phone"
                    onChange={handleChange}
                    defaultValue={formData.phone}
                    error={formData.phone.length > 30}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="電子郵件"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                    defaultValue={formData.email}
                    error={formData.email.length > 30}
                    />
                </Grid>
                <Grid item xs={12}>
                {companies.length > 0 && (
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={companies[companies.findIndex((c) => c.value === searchParams.get('company'))]}
                    isSearchable={true}
                    name="color"
                    options={companies}
                    styles={{ 
                        control: (provided) => ({ ...provided, height: '56px' }),
                    }}
                    onChange={(e: any) => {
                        setFormData({
                            ...formData,
                            company: e.value,
                        });
                        console.log(formData)
                    }}

                />
                )}
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
            )}
        </form>
    </div>
  );  
}

export default ContactCreateView;
