import { useNavigate } from "react-router-dom";
import { getDate } from "../Static/Static";


function Navbar(props: any) {
  const Navigate = useNavigate();
  const tags = [
    {
        tag: "訂單",
        categories: [
            {
                category: "查詢訂單"
            },
            {
                category: "查詢公司"
            },
        ]
    },

];

  return (
    <div className="fixed top-0 left-0 h-screen w-24 py-2 flex flex-col
                  bg-blue-300 dark:bg-gray-900 shadow-lg">
        <div className="mx-auto font-bold text-2xl text-white" onClick={()=>{
          Navigate(`/`)
        }}>
          總表
        </div>

        <button className="mx-auto font-bold text-2xl text-white" onClick={()=>{
          Navigate(`/order?un_paid=false&un_invoice=false`)
          window.location.reload();
        }}>
          訂單
        </button>
    </div>
  );
}

export default Navbar;
