import React, { useState, useEffect, useContext } from "react";
import { Grid, TextField, IconButton } from "@material-ui/core";
import { Close } from '@material-ui/icons';
import { Transition } from "@headlessui/react";
import axiosInstance from "../Axios/Axios";
import { CreateCompanyPopUpContext } from "../Context/CreateCompanyPopUpContext";

function CreateCompanyPopUp(props: any) {
  const { companyPopUpStatus, setCompanyPopUpStatus } = useContext(CreateCompanyPopUpContext);
  const [errMsg, setErrMsg] = useState("");

  const fetchCompanies = async () => {
    const res = await fetch('/accounting/companies')
    const data = await res.json()
    const companyOptions = data.map((option:any) => ({
        value: option.id,
        label: option.name
        }));
        setCompanyPopUpStatus({
          ...companyPopUpStatus,
          companyList: companyOptions,
          showPopup: false
        })
}

  const handleSubmit = () => {
    axiosInstance.post('/accounting/create-company', {
        name: companyPopUpStatus.companyName
    }).then((res) => {
        setErrMsg("")
        fetchCompanies()
    }).catch(
        (err) => {
          setErrMsg(err.response.data.name[0])
          console.log(err.response.data.name[0])
        }
    )
  };

  return (
    <Transition
        show={props.show}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
    >
      <div
        className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="bg-white rounded-lg p-8">
            <div className="flex justify-between items-center mb-4">
                <div className="text-2xl font-bold">新增公司</div>
                <IconButton onClick={()=>{
                  setCompanyPopUpStatus({
                    ...companyPopUpStatus,
                    showPopup: false
                })  
                }}>
                <Close />
                </IconButton>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    fullWidth
                    label="公司名稱"
                    autoComplete="content"
                    defaultValue={companyPopUpStatus.companyName}
                    onChange={(e) => setCompanyPopUpStatus({
                      ...companyPopUpStatus,
                      companyName: e.target.value
                    })}
                    helperText={errMsg}
                />
                </Grid>
                <Grid item xs={12}>
                <div className="flex justify-around w-full">
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex justify-center text-3xl align-middle w-full"
                    onClick={handleSubmit}
                    >
                    新增
                    </button>
                </div>
                </Grid>
            </Grid>
            </div>
      </div>
      </Transition>
  )
}

export default CreateCompanyPopUp;

