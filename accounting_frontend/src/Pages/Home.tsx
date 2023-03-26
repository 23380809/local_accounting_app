import { useState, useEffect } from 'react';
import { useContext } from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from "victory";
interface SummaryData{
  payment_amount: number;
  order_date: string;
  orders?: SummaryData[];
  type?: string;
}


function Home() {

    const [index, setindex] = useState(0);
    const [range, setRange] = useState("");
    const [ summaryData, setSummaryData ] = useState<SummaryData[]>()
    const [ historySummary, setHistorySummary ] = useState<SummaryData[][]>([]);
    const getAllyears = (data: SummaryData[]) => {
      const years = data.map((order) => {
        return order.order_date.split("-")[0];
      });
      const uniqueYears = [...new Set(years)];
      return uniqueYears;
    };

    const groupYearOrders = (data: SummaryData[]) => {
      console.log(data)
      const years = getAllyears(data);
      const reversedYears = years.reverse();
      const groupedOrders = years.map((reversedYears) => {
        var total = 0;
        const orders = data.filter((order) => {
          if(order.order_date.includes(reversedYears)){
            total += Number(order.payment_amount)
            return true
          }
          return false;
        });
        return {"orders": orders,
                "payment_amount": total,
                "order_date": reversedYears,
                "type" : "year"}
      });
      return groupedOrders;
    }

    const groupMonthOrders = (data: SummaryData[]) => {
      console.log(data)
      const months = ['01','02','03','04','05','06','07','08','09','10','11','12']
      const groupedOrders = months.map((month) => {
        var total = 0;
        const orders = data.filter((order) => {
          if(order.order_date.split('-')[1].includes(month)){
            total += Number(order.payment_amount)
            return true
          }
          return false;
        });
        return {"orders": orders,
                "payment_amount": total,
                "order_date": month,
                "type" : "month"}
      });
      return groupedOrders;
    }

    const groupDayOrders = (data: SummaryData[]) => {
      console.log(data)
      const days = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
      const groupedOrders = days.map((day) => {
        var total = 0;
        const orders = data.filter((order) => {
          if(order.order_date.split('-')[2].includes(day)){
            total += Number(order.payment_amount)
            return true
          }
          return false;
        });
        return {"orders": orders,
                "payment_amount": total,
                "order_date": day,
                "type" : "day"}
      });
      return groupedOrders;
    }


    useEffect(()=>{
      const fetchSummaryData = async () => {
        const res = await fetch(`accounting/get-orders-summary`)
        const data = await res.json()
        const yearData = groupYearOrders(data)
        setSummaryData(yearData)
      }
      fetchSummaryData()
    },[])

    return (
      <div className='ml-36'>
        <div className="w-full h-152">
        {summaryData && 
        <>
        <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={{ x: 20 }}
            width={900}
            >
              <VictoryLabel
                text={`已開發票總覽 - ${summaryData[0].type === "year" ? "Year" : range}`}
                x={140}
                y={30}
                textAnchor="middle"
                style={{ fontSize: 18, fontWeight: 'bold'  }}
              />

              <VictoryLabel
                text={`${summaryData[0].type === "year" ? "" : "back"}`}
                x={800}
                y={30}
                textAnchor="middle"
                style={{ fontSize: 18, fontWeight: 'bold'  }}
                events={{onClick: (evt) => {
                  if (summaryData[0].type === "month"){
                    const updatedHistroySummary = [...historySummary]
                    const historyData = updatedHistroySummary.pop()
                    setSummaryData(historyData)
                    setHistorySummary(updatedHistroySummary)
                    setRange("")
                  }
                  else if (summaryData[0].type === "day"){
                    const updatedHistroySummary = [...historySummary]
                    const historyData = updatedHistroySummary.pop()
                    setSummaryData(historyData)
                    setHistorySummary(updatedHistroySummary)
                    setRange(range.split("-")[0])
                  }

                }}}
              />
            <VictoryBar
                barWidth={summaryData.length > 12 ? 15 : 30}
                cornerRadius={3}
                style={{
                data: { fill: "#89CFF0" }
                }}
                data={summaryData?.map((data) => {
                  return {x: data.order_date, y: data.payment_amount, orders: data.orders, type: data.type}
                })}
                labels={({ datum }) => {
                  if(datum.y > 0 && datum.x === index){
                      return datum.y
                    }
                  }}
                events={[
                    {
                        target: "data",
                        childName: "Bar-1",
                        eventHandlers: {
                            onClick: (event, { datum }) => {
                                if(datum.type === "year"){
                                  setHistorySummary([...historySummary, summaryData])
                                  const data = groupMonthOrders(datum.orders);
                                  setSummaryData(data)
                                  console.log(datum.xName)
                                  setRange(datum.xName)
                                  // console.log(historySummary)
                                }
                                else if (datum.type === "month"){
                                  setHistorySummary([...historySummary, summaryData])
                                  const data = groupDayOrders(datum.orders);
                                  setSummaryData(data)
                                  console.log(datum.xName)
                                  setRange(`${range} - ${datum.xName}`)
                                  // console.log(historySummary)
                                }
                              },
                              onMouseOver: (event, { datum }) => {
                                setindex(datum.x)
                              },
                              onMouseOut: (event, { datum }) => {
                                setindex(0)
                              }
                        }
                    }
                ]}
            />
            </VictoryChart>
            </>
            }
        </div>
      </div>

    );
}

export default Home;
