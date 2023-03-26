import { useState, useEffect, useContext } from 'react';
import { Company } from '../interfaces/index'
import { OrderContext } from '../Context/OrderContext'
import { Navigate, useNavigate } from 'react-router-dom';

function CompanyProfile(props: any) {
    const [companyData, setCompanyData] = useState({} as Company);
    const { setOrders } = useContext(OrderContext);
    const Navigate = useNavigate();

    useEffect(()=>{
      const fetchData = async () => {
        let url = `/accounting/order?company__id=${props.id}`
        const res = await fetch(url)
        const data = await res.json()
        setOrders(data)
    }

      const fetchCompanyData = async () => {
        const res = await fetch(`/accounting/company/${props.id}`)
        const data = await res.json()
        setCompanyData(data)
        console.log(companyData)
      }
      fetchCompanyData()
      fetchData()
    },[])

    return (
      <div className='ml-24 p-12'>
          <div className="flex justify-center">
          <div className="w-full xl:w-380 container">
            <div className="grid grid-cols-1 gap-4 px-5 col-span-2">
            <div className='p-3 border-b flex justify-between'>
              <span className='font-bold text-4xl'>
                {companyData.name}
              </span>
              <span className='font-bold cursor-pointer' onClick={()=>{
                Navigate(`/company/edit/${props.id}`,)
              }}>
                編輯
              </span>
            </div>
              <div className="w-full bg-white rounded-lg shadow-md p-3 m-3">
                  <h6 className="mb-5 pb-2 border-b font-semibold">公司資訊</h6>
                  <div className="flex flex-wrap mb-5">
                    <div className="w-full sm:w-1/2">
                      <p className="mb-3 font-semibold">公司Email</p>
                          <span className="text-muted">{companyData.email ? companyData.email : "尚未設置" }</span>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <p className="mb-3 font-semibold">公司電話</p>
                          <span className="text-muted">{companyData.phone ? companyData.phone : "尚未設置"}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap mb-5">
                    <div className="w-full sm:w-1/2">
                      <p className="mb-3 font-semibold">公司地址</p>
                      <div className="flex mb-5 flex-wrap">
                          <div className="w-full sm:w-1/2">
                            <p className="">{companyData.address} {companyData.zip_code}</p>
                          </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <p className="mb-3 font-semibold">備註</p>
                      <span className="text-muted">{companyData.note}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap mb-5">
                    <div className="w-full sm:w-1/2">
                      <p className="mb-3 font-semibold">統一編號</p>
                      <span className="text-muted">{companyData.tax_id}</span>
                    </div>
                  </div>
              </div>
              </div>

            <div className="relative grid grid-cols-1 gap-4 px-5 col-span-2">
              <div className="w-full bg-white rounded-lg shadow-md p-3 m-3">
              <div className="mb-5 pb-2 border-b font-semibold flex justify-between"><h6 className="">聯絡人資料</h6><h6 className="font-bold cursor-pointer" onClick={()=>{
                Navigate(`/contact/create?company=${props.id}`,)
              }}>新增聯絡人</h6></div>
                {companyData && companyData.contacts && companyData.contacts.map((contact, index)=>{
                    return(
                      <div key={index} className="border-b-2 mb-5">
                        <div className="flex flex-wrap mb-5 justify-between">
                          <div className="">
                            <p className="mb-3 font-semibold">姓名</p>
                                <span className="text-muted">{contact.name}</span>
                          </div>
                            <div>
                              <div className="border-b-2 border-black text cursor-pointer" onClick={()=>{
                                Navigate(`/contact/edit/${contact.id}?company=${props.id}`,)
                              }}>編輯</div>
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-5">
                          <div className="w-full sm:w-1/2">
                            <p className="mb-3 font-semibold">電話</p>
                                <span className="text-muted">{contact.phone ? contact.phone : "尚未設置"}</span>
                          </div>
                          <div className="w-full sm:w-1/2">
                            <p className="mb-3 font-semibold">Email</p>
                                <span className="text-muted">{contact.email ? contact.email : "尚未設置"}</span>
                          </div>
                        </div>
                      </div>
                    )})}
              </div>
              </div>
          </div>
          </div>
      </div>

  );
}

export default CompanyProfile;
