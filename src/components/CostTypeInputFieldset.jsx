import React from 'react';
import { AiOutlineClose } from "react-icons/ai";

export default function CostTypeInputFieldset(props) {

  const newField = { otherService:"", otherserviceValue: "", currency:"", currencyNotes:"", margin:0, cost:0, withmarginCost: 0};

  const OtherData = props.data && Array.isArray(props?.data.days[props.currentDataIndex]?.others) ? props?.data.days[props.currentDataIndex]?.others : [];


  const calculateTotalCost = (days) => {
    return days.reduce((totalSum, day) => totalSum + calculateCostSum(day), 0);
  };
  const calculateCostSum = (day) => {
    return day.others.reduce((sum, other) => sum + other.withmarginCost, 0);
  };

  const handleAddField = () => {
    props.setData((prevData) => {
      const updatedTabs = [...prevData.tabs];
      const updatedDays = updatedTabs[props.currentTabIndex].days.map((day, index) => {
        if (index === props.currentDataIndex) {
          return { ...day, others: [...day.others, newField] };
        }
        return day;
      });
  
      updatedTabs[props.currentTabIndex] = {
        ...updatedTabs[props.currentTabIndex],
        days: updatedDays,
      };

      return { ...prevData, tabs: updatedTabs };
    });
  
  };

  // const handleOtherserviceChange = (e, index) => {
  //   const newData = [...props.data.days];
  //    newData[props.currentDataIndex].others[index].otherService = e.target.options[e.target.selectedIndex].text;
  //    newData[props.currentDataIndex].others[index].otherserviceValue = e.target.value
  //    props.setData({ ...props.data, days: newData });
  // };

  const handleOtherserviceChange = (e, index) => {
    const newData = [...props.data.days];
    let overallcost = {...props.data.costCalculation}
    
    const selectedOption = e.target.value;
    const selectedOptionData = props.otherCostData.otherCostsOptions.find(option => option.name === selectedOption);
  
    if (selectedOptionData) {
      newData[props.currentDataIndex].others[index].otherService = selectedOption;
      newData[props.currentDataIndex].others[index].otherserviceValue = selectedOptionData.value;
      newData[props.currentDataIndex].others[index].cost = +selectedOptionData.value;
  
      let margintpercentage = ((+(selectedOptionData.value) / 100) * newData[props.currentDataIndex].others[index].margin )
    
      newData[props.currentDataIndex].others[index].withmarginCost = +(selectedOptionData.value) + margintpercentage
    newData[props.currentDataIndex].totalOtherCost = calculateCostSum(newData[props.currentDataIndex])
    overallcost.other = calculateTotalCost(newData);
    
    let totatcostcalculation = props.data.ZonePrice.TotalCost + overallcost.other + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
    // let totatcostcalculationwithmarup = overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
    overallcost.TotalCost = totatcostcalculation;
    overallcost.Quatation = ((totatcostcalculation / 100) * overallcost.markep) + totatcostcalculation;
    props.setData((prevData)=>{
      const updatedTabs = [...prevData.tabs];
      const updatedDays = [...updatedTabs[props.currentTabIndex].days];
  
  
      updatedTabs[props.currentTabIndex] = {
        ...updatedTabs[props.currentTabIndex],
        days: updatedDays,
        costCalculation : overallcost
      };
  
      return {
        ...prevData,
        tabs: updatedTabs,
      };
    });

    }

  };
  

  const handleChangeCurrency = (e, index) => {
    const newData = e.target.value;

    props.setData((prevData) => {
      const updatedTabs = [...prevData.tabs];
      const updatedDays = [...updatedTabs[props.currentTabIndex].days];

      updatedDays[props.currentDataIndex].others[index].currency = newData;

      updatedTabs[props.currentTabIndex] = {
          ...updatedTabs[props.currentTabIndex],
          days: updatedDays,
      };

      return {
          ...prevData,
          tabs: updatedTabs,
      };
    });
  };

  const handleChangeCurrencyNotes = (e, index) => {
    const newData = e.target.value;

    props.setData((prevData) => {
      const updatedTabs = [...prevData.tabs];
      const updatedDays = [...updatedTabs[props.currentTabIndex].days];

      updatedDays[props.currentDataIndex].others[index].currencyNotes = newData;

      updatedTabs[props.currentTabIndex] = {
          ...updatedTabs[props.currentTabIndex],
          days: updatedDays,
      };

      return {
          ...prevData,
          tabs: updatedTabs,
      };
    });
  };

  const handleChangeCost = (e, index) => {
    const newData = [...props.data.days];
    let overallcost = {...props.data.costCalculation}
    newData[props.currentDataIndex].others[index].cost = +(e.target.value)
    let margintpercentage = ((+(e.target.value) / 100) * newData[props.currentDataIndex].others[index].margin )
    
    newData[props.currentDataIndex].others[index].withmarginCost = +(e.target.value) + margintpercentage
    newData[props.currentDataIndex].totalOtherCost = calculateCostSum(newData[props.currentDataIndex])
    
    overallcost.other = calculateTotalCost(newData);
    
    let totatcostcalculation = props.data.ZonePrice.TotalCost + overallcost.other + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
    // let totatcostcalculationwithmarup = overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
    overallcost.TotalCost = totatcostcalculation;
    overallcost.Quatation = ((totatcostcalculation / 100) * overallcost.markep) + totatcostcalculation;
    props.setData((prevData)=>{
      const updatedTabs = [...prevData.tabs];

      updatedTabs[props.currentTabIndex] = {
        ...updatedTabs[props.currentTabIndex],
        days: newData,
        costCalculation : overallcost
      };

      return {
        ...prevData,
        tabs: updatedTabs,
      };
    });
  };

  const handleChangeMargin = (e, index) => {
    const newData = [...props.data.days];
    let overallcost = {...props.data.costCalculation}
     
    newData[props.currentDataIndex].others[index].margin = e.target.valueAsNumber
    
    
     let margintpercentage = ((+(newData[props.currentDataIndex].others[index].cost) / 100) * newData[props.currentDataIndex].others[index].margin )
     
     newData[props.currentDataIndex].others[index].withmarginCost = +(newData[props.currentDataIndex].others[index].cost) + margintpercentage
     newData[props.currentDataIndex].totalOtherCost = calculateCostSum(newData[props.currentDataIndex])
     
     overallcost.other = calculateTotalCost(newData);
     
     let totatcostcalculation = props.data.ZonePrice.TotalCost + overallcost.other + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
    //  let totatcostcalculationwithmarup = overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
     overallcost.TotalCost = totatcostcalculation;
     overallcost.Quatation = ((totatcostcalculation / 100) * overallcost.markep) + totatcostcalculation;
     props.setData((prevData)=>{
      const updatedTabs = [...prevData.tabs];

      updatedTabs[props.currentTabIndex] = {
        ...updatedTabs[props.currentTabIndex],
        days: newData,
        costCalculation : overallcost
      };

      return {
        ...prevData,
        tabs: updatedTabs,
      };
    });
  };

  const handleRemoveField = (indexToRemove) => {
    props.setData((prevData) => {
      const updatedTabs = [...prevData.tabs];
      const updatedDays = updatedTabs[props.currentTabIndex].days.map((day, index) => {
        if (index === props.currentDataIndex) {
          return { ...day, others: day.others.filter((other, index) => index !== indexToRemove) };
        }
        return day;
      });
      let overallcost = {...props.data.costCalculation}
      updatedDays[props.currentDataIndex].totalOtherCost = calculateCostSum(updatedDays[props.currentDataIndex])
     
      overallcost.other = calculateTotalCost(updatedDays);
      
      let totatcostcalculation = props.data.ZonePrice.TotalCost + overallcost.other + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
      // let totatcostcalculationwithmarup = overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
      overallcost.TotalCost = totatcostcalculation;
      overallcost.Quatation = ((totatcostcalculation / 100) * overallcost.markep) + totatcostcalculation;

      updatedTabs[props.currentTabIndex] = {
        ...updatedTabs[props.currentTabIndex],
        days: updatedDays,
        costCalculation : overallcost
      };

      return { ...prevData, tabs: updatedTabs };
    });
  };

    return (
        <fieldset className='row my-3 p-2 px-lg-3 border border-1 rounded'>
            <div className="col-3 mb-5 px-0">
                <p className='w-100 text-start mb-1'>Cost Type</p>
                {OtherData.map((item, index) => (
                <select className="form-select mb-3" aria-label="Select Vehicle" key={index} value={item?.otherService} onChange={(e) => handleOtherserviceChange(e, index)}>
                    <option disabled value="" className='d-none'></option>
                    {props?.otherCostData?.otherCostsOptions.map((item, innerIndex)=> (
                      <option value={item.name} index={innerIndex}>{item.name}</option>
                    ))}
                </select>
                 ))}
            </div>
            
            <div className="col-2 mb-5 ps-2 pe-0">
                <p className='w-100 text-start mb-1'>Currency</p>
                {OtherData.map((item, index) => ( <input type="text" value={item?.currency} onChange={(e) => handleChangeCurrency(e, index)} className="form-control mb-3" />))}
            </div>
            <div className="col-2 mb-5 ps-2 pe-0">
                <p className='w-100 text-start mb-1'>Cost</p>
                {OtherData.map((item, index) => ( <input type="number" min={0} value={item?.cost} onChange={(e) => handleChangeCost(e, index)} className="form-control mb-3" />))}
            </div>
            <div className="col-2 mb-5 ps-2 pe-0">
                <p className='w-100 text-start mb-1'>Cost Notes</p>
                {OtherData.map((item, index) => ( <input type="text" value={item?.currencyNotes} onChange={(e) => handleChangeCurrencyNotes(e, index)} className="form-control mb-3" />))}
            </div>
            <div className="col-2 mb-5 ps-2 pe-0">
                <p className='w-100 text-start mb-1'>Margin</p>
                {OtherData.map((item, index) => ( <input type="number" min={0} max={100} value={item?.margin} onChange={(e) => handleChangeMargin(e, index)} className="form-control mb-3" />))}
            </div>
            <div className="col-1 p-0">
          <p className='w-100 text-start mb-1 invisible'>Remove</p>
          {OtherData.map((item, index) => (
          (OtherData.length > 1) && (
            <button key={index} className="border-0 bg-transparent form-control mb-3 px-0" title='Remove This Field' onClick={() => handleRemoveField(index)}>
                <AiOutlineClose />
              </button>
            )
          ))}          
           </div>
            <div className="col-3 px-0"></div>
            
            <div className="col-2 ps-2 pe-0"></div>
            <div className="col-2 ps-2 pe-0">
            </div>
            <div className="col-2 ps-2 pe-0"></div>
            <div className="col-2 ps-2 pe-0">
            <p className='w-100 text-start mb-1'>Total Other Cost</p>
                <input type="text" readOnly className="form-control mb-3" value={props?.data.days[props.currentDataIndex]?.totalOtherCost} />
            </div>
            <div className="col-12 p-0">
        <button className="btn btn-primary" onClick={handleAddField}>Add Other Cost</button>
      </div>
        </fieldset>
    )
}
