import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Grid, TextField } from '@material-ui/core';
import Select from 'react-select';
import { CompanyOptions } from '../interfaces';

function ContactCreateView(props: any) {
    const [ loading, setLoading ] = useState(true);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { id } = useParams();

    const [ formData, setFormData ] = useState({
        name: "",
        phone: "",
        email: "",
    });

    useEffect(()=>{
        const fetchContact = async () => {
            const res = await fetch(`/accounting/contact/${id}`)
            const data = await res.json()
            setFormData({
                ...formData,
                name: data.name ? data.name : "",
                phone: data.phone ? data.phone : "",
                email: data.email ? data.email : "",
            })
            setLoading(false)
        }
        fetchContact()
    },[])

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        fetch(`/accounting/update-contact/${id}`, {
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

    const handleDelete = (e: any) => {
        e.preventDefault();
        fetch(`/accounting/delete-contact/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                },
            })
            .then(()=>{
                navigate(`/company/${searchParams.get('company')}`)
            })
    }

    return (
        <div className="flex justify-center ml-24 my-24">
        <form className='container' id="create-order">
            {(loading? (<></>):
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
                <div className="flex justify-around w-full">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex justify-center text-3xl align-middle w-full"
                    onClick={handleSubmit}
                    >
                    儲存並繼續
                    </button>
                </div>
                </Grid>
                <Grid item xs={12}>
                <div className="flex justify-around w-full">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex justify-center text-3xl align-middle w-full"
                    onClick={handleDelete}
                    >
                    刪除
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
