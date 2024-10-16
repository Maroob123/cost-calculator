import React from 'react';
import { AiOutlineClose } from "react-icons/ai";


export default function HumanResourcesInputFieldset(props) {
  const newField = { resource_name: "", resource_Value: "0", days: "",overnight: false, hours: 8, cost: 0 };
  const humanResourcesData = props.data && Array.isArray(props?.data.days[props.currentDataIndex]?.resources) ? props?.data.days[props.currentDataIndex]?.resources : [];

  const handleAddField = () => {
    props.setData((prevData) => {
      const updatedTabs = [...prevData.tabs];
      const updatedDays = updatedTabs[props.currentTabIndex].days.map((day, index) => {
        if (index === props.currentDataIndex) {
          return { ...day, resources: [...day.resources, newField] };
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

    // Function to calculate the sum of material costs for a given day
const calculateCostSum = (day) => {
  return day.resources.reduce((sum, resource) => sum + resource.cost, 0);
};

// Function to calculate the sum of material costs for all days
const calculateTotalCost = (days) => {
  return days.reduce((totalSum, day) => totalSum + calculateCostSum(day), 0);
};

const calculateTotalHuman = (day) => {
  return day.resources.reduce((sum, resource) => sum + resource.hours, 0);
};

  const handleresourceChange = (e, index) => {
    const newData = [...props.data.days];
    let overallcost = {...props.data.costCalculation}
    newData[props.currentDataIndex].resources[index].resource_Value = e.target.value;
    newData[props.currentDataIndex].resources[index].resource_name = e.target.options[e.target.selectedIndex].text;
    
    if(newData[props.currentDataIndex].resources[index].overnight){
    newData[props.currentDataIndex].resources[index].cost = (+(e.target.value) * +(newData[props.currentDataIndex].resources[index].hours)) + props.resourceData.OverNightAmount;
    
    }else{
    newData[props.currentDataIndex].resources[index].cost = +(e.target.value) * +(newData[props.currentDataIndex].resources[index].hours);
    }
    overallcost.HumanTotalCost = calculateTotalCost(newData);
    newData[props.currentDataIndex].totalResourceCost = calculateCostSum(newData[props.currentDataIndex]);
    let totatcostcalculation = props.data.ZonePrice.TotalCost + overallcost.other + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
    let totatcostcalculationwithmarup = props.data.ZonePrice.TotalCost + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
    overallcost.TotalCost = totatcostcalculation;
    overallcost.Quatation = ((totatcostcalculationwithmarup / 100) * overallcost.markep) + totatcostcalculation;

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

  const handleOvernightChange = (e, index) => {
    const newData = [...props.data.days];
    newData[props.currentDataIndex].resources[index].overnight = e.target.checked;
    let overallcost = {...props.data.costCalculation}
    
    if(newData[props.currentDataIndex].resources[index].overnight){
    // newData[props.currentDataIndex].resources[index].hours = newData[props.currentDataIndex].resources[index].hours;
    newData[props.currentDataIndex].resources[index].cost = (+(newData[props.currentDataIndex].resources[index].hours) * +(newData[props.currentDataIndex].resources[index].resource_Value)) + props.resourceData.OverNightAmount;
    newData[props.currentDataIndex].totalResource = calculateTotalHuman(newData[props.currentDataIndex]);
    overallcost.HumanTotalCost = calculateTotalCost(newData);
    newData[props.currentDataIndex].totalResourceCost = calculateCostSum(newData[props.currentDataIndex]);
    let totatcostcalculation = props.data.ZonePrice.TotalCost + overallcost.other + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
    let totatcostcalculationwithmarup = props.data.ZonePrice.TotalCost + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
    overallcost.TotalCost = totatcostcalculation;
    overallcost.Quatation = ((totatcostcalculationwithmarup / 100) * overallcost.markep) + totatcostcalculation;
    }else{
    newData[props.currentDataIndex].resources[index].cost = +(newData[props.currentDataIndex].resources[index].hours) * +(newData[props.currentDataIndex].resources[index].resource_Value);
    newData[props.currentDataIndex].totalResource = calculateTotalHuman(newData[props.currentDataIndex]);
    overallcost.HumanTotalCost = calculateTotalCost(newData);
    newData[props.currentDataIndex].totalResourceCost = calculateCostSum(newData[props.currentDataIndex]);
    let totatcostcalculation = props.data.ZonePrice.TotalCost + overallcost.other + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
    let totatcostcalculationwithmarup = props.data.ZonePrice.TotalCost + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
    overallcost.TotalCost = totatcostcalculation;
    overallcost.Quatation = ((totatcostcalculationwithmarup / 100) * overallcost.markep) + totatcostcalculation;
    }
    
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

  const handleHoursChange = (e, index) => {
    // const newData = [...props.data.days];
    // newData[props.currentDataIndex].resources[index].hours = e.target.valueAsNumber;
    // props.setData({ ...props.data, days: newData });


    const newData = [...props.data.days];
    let overallcost = {...props.data.costCalculation}
    newData[props.currentDataIndex].resources[index].hours = e.target.valueAsNumber;
    
    if(newData[props.currentDataIndex].resources[index].overnight){
      newData[props.currentDataIndex].resources[index].cost = ( +(e.target.value) * +(newData[props.currentDataIndex].resources[index].resource_Value)) + props.resourceData.OverNightAmount;
    
    }else{
      newData[props.currentDataIndex].resources[index].cost = +(e.target.value) * +(newData[props.currentDataIndex].resources[index].resource_Value);
    
    }
    
    newData[props.currentDataIndex].totalResource = calculateTotalHuman(newData[props.currentDataIndex]);
    overallcost.HumanTotalCost = calculateTotalCost(newData);
    newData[props.currentDataIndex].totalResourceCost = calculateCostSum(newData[props.currentDataIndex]);
    let totatcostcalculation = props.data.ZonePrice.TotalCost + overallcost.other + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
    let totatcostcalculationwithmarup = props.data.ZonePrice.TotalCost + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
    overallcost.TotalCost = totatcostcalculation;
    overallcost.Quatation = ((totatcostcalculationwithmarup / 100) * overallcost.markep) + totatcostcalculation;
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
          return { ...day, resources: day.resources.filter((resource, index) => index !== indexToRemove) };
        }
        return day;
      });

      let overallcost = {...props.data.costCalculation}
      updatedDays[props.currentDataIndex].totalResource = calculateTotalHuman(updatedDays[props.currentDataIndex]);
    overallcost.HumanTotalCost = calculateTotalCost(updatedDays);
    updatedDays[props.currentDataIndex].totalResourceCost = calculateCostSum(updatedDays[props.currentDataIndex]);
    let totatcostcalculation = props.data.ZonePrice.TotalCost + overallcost.other + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
    let totatcostcalculationwithmarup = props.data.ZonePrice.TotalCost + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
    overallcost.TotalCost = totatcostcalculation;
    overallcost.Quatation = ((totatcostcalculationwithmarup / 100) * overallcost.markep) + totatcostcalculation;

    updatedTabs[props.currentTabIndex] = {
      ...updatedTabs[props.currentTabIndex],
      days: updatedDays,
      costCalculation : overallcost
    };

    return { ...prevData, tabs: updatedTabs };
    });
  };

  return (
    <fieldset className='row mx-lg-1 mb-3 p-2 border border-1 rounded'>
      <div className="col-4 mb-5 px-0">
        <p className='w-100 text-start mb-1'>Human resources</p>
        {humanResourcesData.map((item, index) => (<select className="form-select mb-3" key={index} value={item.resource_Value} onChange={(e) => handleresourceChange(e, index)} aria-label="Select Human resources">
          <option disabled value="0" className='d-none'></option>
          {props.resourceData.resourceOptions.map((option, idx) => (
            <option key={idx} value={option.value}>{option.name}</option>
          ))}
        </select>))}
      </div>
      
      
      <div className="col-1 mb-5 ps-2 pe-0">
        <p className='w-100 text-start mb-1'>O/N</p>
        {humanResourcesData.map((item, index) => (
        <div className="form-check mb-3" style={{minHeight: "2.5rem"}}>
          <input type="checkbox" key={index} checked={item?.overnight} onChange={(e) => handleOvernightChange(e, index)} className="form-check-input mb-3" />
        </div>
        ))}
      </div>

      <div className="col-3 mb-5 ps-2 pe-0">
        <p className='w-100 text-start mb-1'>Hours</p>
        {humanResourcesData.map((item, index) => (
          <input type="number" min={0} key={index} value={item?.hours} onChange={(e) => handleHoursChange(e, index)} className="form-control mb-3 bg-warning bg-opacity-10" />
        ))}
      </div>
      <div className="col-3 mb-5 ps-2 pe-0">
        <p className='w-100 text-start mb-1'>Cost</p>
        {humanResourcesData.map((item, index) => (
          <input type="text" key={index} readOnly value={item?.cost} className="form-control mb-3 bg-success bg-opacity-10" />
        ))}
      </div>
      <div className="col-1 p-0">
          <p className='w-100 text-start mb-1 invisible'>Remove</p>
          {humanResourcesData.map((item, index) => (
          (humanResourcesData.length > 1) && (
            <button key={index} className="border-0 bg-transparent mb-3 form-control px-0" title='Remove This Field' onClick={() => handleRemoveField(index)}>
              <AiOutlineClose />
            </button>
          )
        ))}
      </div>
      <div className="col-4 px-0"></div>
      <div className="col-1 ps-2 pe-0"></div>
      <div className="col-3 ps-2 pe-0">
        <input type="text" readOnly className="form-control mb-3" value={props?.data.days[props.currentDataIndex]?.totalResource} />
      </div>
      <div className="col-4 ps-2 pe-0">
        <input type="text" readOnly className="form-control mb-3 bg-success bg-opacity-10" value={props?.data.days[props.currentDataIndex]?.totalResourceCost} />
      </div>
      {/* <div className="col-2 ps-2 pe-0"></div> */}
      <div className="col-12 p-0">
        <button className="btn btn-primary" onClick={handleAddField}>Add Human resource</button>
      </div>
    </fieldset>
  )
}
