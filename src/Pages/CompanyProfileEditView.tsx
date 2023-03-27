import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Grid, TextField } from '@material-ui/core';
import CreateableSelect from 'react-select/creatable';

function CompanyProfileEditView(props: any) {
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    const [ formData, setFormData ] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        tax_id: "",
        note: "",
        zip_code: "",
    });

    useEffect(()=>{
        fetch(`/accounting/company/${id}`)
        .then(res => res.json())
        .then(data => {
            setFormData({
                name: data.name ? data.name : "",
                address: data.address ? data.address : "",
                phone: data.phone ? data.phone : "",
                email: data.email ? data.email : "",
                tax_id: data.tax_id ? data.tax_id : "",
                note: data.note ? data.note : "",
                zip_code: data.zip_code ? data.zip_code : "",
            })
            setLoading(false)
        })
    },[])

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        fetch(`/accounting/update-company/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(()=>{
                navigate(`/company/${id}`)
            })
    }
    return (
        <div className="flex justify-center ml-24 my-24">
        <form className='container' id="create-order">
            {loading? (<></>) : (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    fullWidth
                    id="name"
                    label="公司名稱"
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
                    id="address"
                    label="地址"
                    name="address"
                    autoComplete="address"
                    onChange={handleChange}
                    defaultValue={formData.address}
                    error={formData.address.length > 30}
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
                    <TextField
                    variant="outlined"
                    fullWidth
                    id="tax_id"
                    label="統一編號"
                    name="tax_id"
                    autoComplete="tax_id"
                    onChange={handleChange}
                    defaultValue={formData.tax_id}
                    error={formData.tax_id.length > 30}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    fullWidth
                    id="zip_code"
                    label="郵遞區號"
                    name="zip_code"
                    autoComplete="zip_code"
                    onChange={handleChange}
                    defaultValue={formData.zip_code}
                    error={formData.zip_code.length > 30}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    variant="outlined"
                    fullWidth
                    id="note"
                    label="備註"
                    name="note"
                    autoComplete="note"
                    onChange={handleChange}
                    defaultValue={formData.note}
                    error={formData.note.length > 30}
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
            )}
        </form>
    </div>
  );  
}

export default CompanyProfileEditView;

              {/* <Grid item xs={4}>
                <CreateableSelect 
                    options={companyPopUpStatus.companyList}
                    onCreateOption={handleCreateOption}
                    onChange={handleCompanyChange}
                    menuPlacement="auto"
                    menuPortalTarget={document.body}
                    styles={{ 
                        control: (provided) => ({ ...provided, height: '56px' }),
                    }}
                />
                </Grid> */}
