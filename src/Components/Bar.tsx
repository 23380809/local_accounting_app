import {
    VictoryBar,
    VictoryChart,
    VictoryTheme,
    VictoryAxis
  } from "victory";
  
  function Bar(props: any) {
    return (
        <div className="w-full">
            <div className="flex justify-center">
                <h1 className="text-2xl font-bold">Bar Chartawefawefawefawefawef</h1>
            </div>

            <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={{ x: 20 }}
            animate={{
                duration: 500,
                onLoad: { duration: 200 }
            }}
            >
            <VictoryAxis/>
            <VictoryBar
                barWidth={30}
                style={{
                data: { fill: "#89CFF0" }
                }}
                data={props.data}
                labels={({ datum }) => datum.y}
                events={[
                    {
                        target: "data",
                        childName: "Bar-1",
                        eventHandlers: {
                            onClick: (event, { datum }) => {
                                console.log(datum);
                            }
                        }
                    }
                ]}
            />
            </VictoryChart>
         </div>

    );
  }
  
  export default Bar;
