import React from 'react';
import { AiOutlineClose } from "react-icons/ai";


export default function MaterialsInputFieldset(props) {
  const newField = { material: "", materialValue: "0", hours: 0, cost: 0 };
  const MaterialData = props.data && Array.isArray(props?.data.days[props.currentDataIndex]?.material) ? props?.data.days[props.currentDataIndex]?.material : [];
  const handleAddField = () => {
    props.setData((prevData) => {
      const updatedTabs = [...prevData.tabs];
      const updatedDays = updatedTabs[props.currentTabIndex].days.map((day, index) => {
        if (index === props.currentDataIndex) {
          return { ...day, material: [...day.material, newField] };
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
  return day.material.reduce((sum, material) => sum + material.cost, 0);
};

// Function to calculate the sum of material costs for all days
const calculateTotalCost = (days) => {
  return days.reduce((totalSum, day) => totalSum + calculateCostSum(day), 0);
};

  const handleMaterialChange = (e, index) => {
    const newData = [...props.data.days];
    let overallcost = {...props.data.costCalculation}
    newData[props.currentDataIndex].material[index].material = e.target.options[e.target.selectedIndex].text;
    newData[props.currentDataIndex].material[index].materialValue = e.target.value;
    newData[props.currentDataIndex].material[index].cost = +(e.target.value) * newData[props.currentDataIndex].material[index].hours 
    newData[props.currentDataIndex].totalMaterialCost = calculateCostSum(newData[props.currentDataIndex])
    overallcost.materialTotalCost = overallcost.materialTotalCost = calculateTotalCost(newData);
    let totatcostcalculation = props.data.ZonePrice.TotalCost + overallcost.other + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
    let totatcostcalculationwithmarup = overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
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

  const handleHoursChange = (e, index) => {
    const newData = [...props.data.days];
    let overallcost = {...props.data.costCalculation}
    newData[props.currentDataIndex].material[index].hours = e.target.valueAsNumber;
    newData[props.currentDataIndex].material[index].cost = e.target.valueAsNumber * +(newData[props.currentDataIndex].material[index].materialValue) || 0;
    newData[props.currentDataIndex].totalMaterialCost = calculateCostSum(newData[props.currentDataIndex])
    overallcost.materialTotalCost = calculateTotalCost(newData);
    let totatcostcalculation = props.data.ZonePrice.TotalCost + overallcost.other + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
    let totatcostcalculationwithmarup = overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
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
          return { ...day, material: day.material.filter((material, index) => index !== indexToRemove) };
        }
        return day;
      });

      let overallcost = {...props.data.costCalculation}
      updatedDays[props.currentDataIndex].totalMaterialCost = calculateCostSum(updatedDays[props.currentDataIndex])
      overallcost.materialTotalCost = calculateTotalCost(updatedDays);
      let totatcostcalculation = props.data.ZonePrice.TotalCost + overallcost.other + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
      let totatcostcalculationwithmarup = overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
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
    <>
      <fieldset className='row mx-lg-1 mb-3 p-2 border border-1 rounded'>
        <div className="col-4 mb-5 px-0">
          <p className='w-100 text-start mb-1'>Materials</p>
          {MaterialData.map((item, index) => (
          <select className="form-select mb-3" key={index} value={item.materialValue} onChange={(e) => {handleMaterialChange(e, index)}} aria-label="Select Material">
            <option disabled value="0" className='d-none'></option>
            {props.materialData.materialOptions.map((option, idx) => (
            <option key={idx} value={option.value}>{option.name}</option>
          ))}
          </select>
          ))}
        </div>
        <div className="col-1 mb-5 ps-2 pe-0">
        </div>

        <div className="col-3 mb-5 ps-2 pe-0">
          <p className='w-100 text-start mb-1'>QTY</p>
          {MaterialData.map((item, index) => (
            <input type="number" min={0} className="form-control mb-3 bg-warning bg-opacity-10" value={item?.hours} onChange={(e) => {handleHoursChange(e, index)}} key={index} />
          ))}
        </div>
        <div className="col-3 mb-5 ps-2 pe-0">
          <p className='w-100 text-start mb-1'>Cost</p>
          {MaterialData.map((item, index) => (
          <input type="text" key={index} readOnly value={item?.cost} className="form-control mb-3 bg-success bg-opacity-10" />
          ))}
        </div>
        <div className="col-1 p-0">
          <p className='w-100 text-start mb-1 invisible'>Remove</p>
          {MaterialData.map((item, index) => (
            (MaterialData.length > 1) && (
              <button key={index} className="border-0 bg-transparent mb-3 form-control px-0" title='Remove This Field' onClick={() => handleRemoveField(index)}>
                <AiOutlineClose />
              </button>
            )
          ))}
        </div>
        <div className="col-4 px-0"></div>
        <div className="col-1 ps-2 pe-0">
        </div>
        <div className="col-3 ps-2 pe-0"></div>
        <div className="col-4 ps-2 pe-0">
          <input type="text" readOnly className="form-control mb-3 bg-success bg-opacity-10" value={props?.data.days[props.currentDataIndex]?.totalMaterialCost} />
        </div>
        <div className="col-12 p-0">
          <button className="btn btn-primary" onClick={handleAddField}>Add Material</button>
        </div>
      </fieldset>
    </>
  )
}
