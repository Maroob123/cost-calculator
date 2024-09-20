import React from 'react'

export default function TimeZoneFieldset(props) {


    const handleChangeCurrency = (e) => {
        //const newData = [...props.data.days];
         let cost = {...props.data.ZonePrice}
         let overallcost = {...props.data.costCalculation}
         //newData[props.currentDataIndex].others[index].currency = e.target.value
        // newData[props.currentDataIndex].drivers[index].cost = +(e.target.value) * +(newData[props.currentDataIndex].drivers[index].days);
        // let totalVehicleCost = calculateTotalCost(newData);
        // newData[props.currentDataIndex].totalVehicleCost = calculateCostSum(newData[props.currentDataIndex])
         cost.pricepercubicfeed = e.target.value;
         cost.TotalCost = cost.numberofcubicfeed * +(cost.pricepercubicfeed);
         let totatcostcalculation = cost.TotalCost + overallcost.other + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
         let totatcostcalculationwithmarup = overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
        overallcost.TotalCost = totatcostcalculation;
        overallcost.Quatation = ((totatcostcalculationwithmarup / 100) * overallcost.markep) + totatcostcalculation;
        props.setData((prevData)=>{
            const updatedTabs = [...prevData.tabs];
            const updatedDays = [...updatedTabs[props.currentTabIndex].days];

            updatedTabs[props.currentTabIndex] = {
                ...updatedTabs[props.currentTabIndex],
                days: updatedDays,
                ZonePrice: cost,
                costCalculation: overallcost 
            };
            return { ...prevData, tabs: updatedTabs };
        });
    };

      const handleChangeCost = (e) => {
        //const newData = [...props.data.days];
         let cost = {...props.data.ZonePrice}
         let overallcost = {...props.data.costCalculation}
         //newData[props.currentDataIndex].others[index].currency = e.target.valueAsNumber
        // newData[props.currentDataIndex].drivers[index].cost = +(e.target.value) * +(newData[props.currentDataIndex].drivers[index].days);
        // let totalVehicleCost = calculateTotalCost(newData);
        // newData[props.currentDataIndex].totalVehicleCost = calculateCostSum(newData[props.currentDataIndex])
        cost.numberofcubicfeed = e.target.valueAsNumber 
        cost.TotalCost = e.target.valueAsNumber * +(cost.pricepercubicfeed);
          
         let totatcostcalculation = cost.TotalCost + overallcost.other + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
         let totatcostcalculationwithmarup = overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
        overallcost.TotalCost = totatcostcalculation;
        overallcost.Quatation = ((totatcostcalculationwithmarup / 100) * overallcost.markep) + totatcostcalculation;
        props.setData((prevData)=>{
            const updatedTabs = [...prevData.tabs];
            const updatedDays = [...updatedTabs[props.currentTabIndex].days];

            updatedTabs[props.currentTabIndex] = {
                ...updatedTabs[props.currentTabIndex],
                days: updatedDays,
                ZonePrice: cost,
                costCalculation: overallcost 
            };
            return { ...prevData, tabs: updatedTabs };
        });
    };

    return (
        <fieldset className='row mt-5 mb-3 p-2 border border-1 rounded'>
            <div className="col-3 mb-4 px-0">
                <p className='w-100 text-start mb-1'>Eurozone</p>
                <select className="form-select" value={props.data.ZonePrice.pricepercubicfeed} aria-label="Select TimeZone" onChange={(e) => handleChangeCurrency(e)} >
                    <option disabled value="" className='d-none'></option>
                    {props.eurozoneData.eurozoneOptions.map((option, idx) => (
                        <option key={idx} value={option.value}>{option.name}</option>
                    ))}
                </select>
            </div>
            <div className="col-3 mb-4 ps-2 pe-0">
                <p className='w-100 text-start mb-1'>CuFt Price</p>
                <input type="number" readOnly className="form-control" value={+(props.data.ZonePrice.pricepercubicfeed) || 0} />
            </div>
            <div className="col-3 mb-4 ps-2 pe-0">
                <p className='w-100 text-start mb-1'>Cubic ft.</p>
                <input type="number" className="form-control" value={props.data.ZonePrice.numberofcubicfeed}  onChange={(e) => handleChangeCost(e)} />
            </div>
            <div className="col-3 mb-4 ps-2 pe-0">
                <p className='w-100 text-start mb-1'>Price</p>
                <input type="number" readOnly className="form-control" value={props.data.ZonePrice.TotalCost} />
            </div>
        </fieldset>
    )
}
