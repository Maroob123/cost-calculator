import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";


export default function DayTaskInputFieldset(props) {
const [newField, setNewField] = useState({
  date:"",
  task:"",
  totalVehicle: 0,
  totalOtherCost: 0,
  totalVehicleCost: 0,
  totalResource: 0,
  totalResourceCost: 0,
  totalMaterialCost: 0,
  drivers:[
     {
        driver_name:"",
        driver_value: "0",
        miles:0,
        days:0,
        fuelcost:0,
        cost:0
     }
  ],
  resources:[
     {
        resource_name:"",
        resource_Value: "0",
        days:0,
        overnight: false,
        hours:8,
        cost:0
     }
  ],
  material:[
     {
        material:"",
        materialValue: "0",
        hours:0,
        cost:0
     }
  ],
  others:[
    {
       otherService:"",
       otherserviceValue: "",
       currency:"",
       currencyNotes:"",
       margin:0,
       cost:0,
       withmarginCost: 0
    }
  ]
});

  const daysData = props?.data && Array.isArray(props?.data?.days) ? props?.data?.days : [];


  const handleAddField = () => {
    props.setData((prevData) => {
      const updatedTabs = [...prevData.tabs];
      const updatedDays = [...updatedTabs[props.currentTabIndex].days, newField];
  
      updatedTabs[props.currentTabIndex] = {
        ...updatedTabs[props.currentTabIndex],
        days: updatedDays,
      };
  
      return {
        ...prevData,
        tabs: updatedTabs,
      };
    });
    setNewField({
        date:"",
        task:"",
        totalVehicle: 0,
        totalOtherCost: 0,
        totalVehicleCost: 0,
        totalResource: 0,
        totalResourceCost: 0,
        totalMaterialCost: 0,
        drivers:[
           {
              driver_name:"",
              driver_value: "0",
              miles:0,
              days:0,
              fuelcost:0,
              cost:0
           }
        ],
        resources:[
           {
              resource_name:"",
              resource_Value: "0",
              days:0,
              overnight: false,
              hours:8,
              cost:0
           }
        ],
        material:[
           {
              material:"",
              materialValue: "0",
              hours:0,
              cost:0
           }
        ],
        others:[
          {
             otherService:"",
             otherserviceValue: "",
             currency:"",
             currencyNotes:"",
             margin:0,
             cost:0,
             withmarginCost: 0
          }
        ]
     });
  };

  const calculatefuelCostSum = (day) => {
    return day.drivers.reduce((sum, driver) => sum + driver.fuelcost, 0);
  };

  const handleDateChange = (e, index) => {
    const newDate = e.target.value;
    props.setData((prevData) => {
        const updatedTabs = [...prevData.tabs];
        const updatedDays = [...updatedTabs[props.currentTabIndex].days];

        updatedDays[index] = { ...updatedDays[index], date: newDate };

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

  const handleTaskChange = (e, index) => {
    const newTask = e.target.value;
    props.setData((prevData) => {
        const updatedTabs = [...prevData.tabs];
        const updatedDays = [...updatedTabs[props.currentTabIndex].days];

        updatedDays[index] = { ...updatedDays[index], task: newTask };

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

  const handleRemoveField = (e, indexToRemove) => {
    e.stopPropagation(); // Prevent event propagation
   if (daysData.length <= 1) {
      return; // Prevent removing the last field
    }
    const newData = [...props.data.days];
    let overallcost = {...props.data.costCalculation}
    overallcost.other = overallcost.other - newData[indexToRemove].totalOtherCost
    overallcost.VehicleTotalCost = overallcost.VehicleTotalCost - newData[indexToRemove].totalVehicleCost
    overallcost.HumanTotalCost = overallcost.HumanTotalCost - newData[indexToRemove].totalResourceCost
    overallcost.materialTotalCost =  overallcost.materialTotalCost - newData[indexToRemove].totalMaterialCost
    overallcost.totalFualCost = overallcost.totalFualCost - calculatefuelCostSum(newData[indexToRemove]) 
    let totatcostcalculation = props.data.ZonePrice.TotalCost + overallcost.other + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
    let totatcostcalculationwithmarup = overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
    overallcost.TotalCost = totatcostcalculation;
    overallcost.Quatation = ((totatcostcalculationwithmarup / 100) * overallcost.markep) + totatcostcalculation; 

    props.setCurrentDataIndex(indexToRemove - 1)
    props.setData((prevData) => {
      const updatedTabs = [...prevData.tabs];
      const updatedDays = updatedTabs[props.currentTabIndex].days.filter((day, index) => index !== indexToRemove);
      updatedTabs[props.currentTabIndex] = {
        ...updatedTabs[props.currentTabIndex],
        days: updatedDays,
        costCalculation: overallcost
      };
      return { ...prevData, tabs: updatedTabs };
    });
  };

  return (
    <>
      {daysData.map((item, index) => (
        <fieldset key={index} className={`row position-relative cursor-pointer p-2 mb-3 border border-1 rounded ${props.currentDataIndex === index ? "border-primary" : ""}`} onClick={() =>{
          props.setCurrentDataIndex(index)
          }}>
          <div className="col-4 pe-0">
            <p className='w-100 text-start mb-1'>Day</p>
            <select className="form-select mb-3" aria-label="Select Day" value={item.date} onChange={(e) => handleDateChange(e, index)}>
              <option disabled value="" className='d-none'></option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Weekend">Weekend</option>
            </select>
          </div>
          <div className="col-7 pe-0">
            <p className='w-100 text-start mb-1'>Task</p>
            <select className="form-select mb-3" aria-label="Select Task" value={item.task} onChange={(e) => handleTaskChange(e, index)}>
              <option disabled value="" className='d-none'></option>
              {props?.taskData?.taskDataOptions.map((item, innerIndex)=>(
                <option style={{whiteSpace: "initial"}} value={item.name} index={innerIndex}>{item.name}</option>
              ))}
            </select>
            {/* <input type="text" className="form-control mb-3" value={item.task} onChange={(e) => handleTaskChange(e, index)} /> */}
          </div>
          <div className="col-1 p-0">
          <p className='w-100 text-start mb-1 invisible'>Remove</p>
          {(daysData.length > 1) && (
              <button className="border-0 bg-transparent form-control px-0" title='Remove This Field' onClick={(e) => handleRemoveField(e, index)}><AiOutlineClose /></button>
            )}
          </div>
        </fieldset>
      ))}
      <div className="row">
        <button className="btn btn-primary" onClick={handleAddField}>Add Day</button>
      </div>
    </>
  );
}
