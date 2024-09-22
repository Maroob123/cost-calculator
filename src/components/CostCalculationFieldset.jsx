import React, { useState } from 'react'
import axios from 'axios';
import Swal from "sweetalert2";
export default function CostCalculationFieldset(props) {
const [loader, setLoader] = useState(false);

async function submitForm(){

setLoader(true);
  try {
    const params = new URLSearchParams(window.location.search);
    const dealId = params.get('DealId');
    if(!dealId){
      setLoader(false);
      Swal.fire({
        title: 'error',
        text: "DealId not found",
        icon: "error",
      });
    
      return;
    }
    const response = await axios.post('https://apps.leadsmovinghomecompany.com/costingAppStaging/insertFormData', { DealId: dealId, tabs: props.allData.tabs });
    if(response.data){
      
      Swal.fire({
        title: 'success',
        text: "Sucessfuly submit your form",
        icon: "success",
      });
    }
    setLoader(false);
 } catch (error) {
  setLoader(false);
  Swal.fire({
    title: 'error',
    text: "Something went wrong",
    icon: "error",
  });
 }
}

function handlechangeMarkup(e){
  let overallcost = {...props.data.costCalculation}
  overallcost.markep = e.target.valueAsNumber;
  let totatcostcalculation = props.data.ZonePrice.TotalCost + overallcost.other + overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
  let totatcostcalculationwithmarup = overallcost.VehicleTotalCost + overallcost.HumanTotalCost + overallcost.materialTotalCost + overallcost.totalFualCost;
  overallcost.TotalCost = totatcostcalculation;
  overallcost.Quatation = ((totatcostcalculationwithmarup / 100) * overallcost.markep) + totatcostcalculation;

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
  return (
    <fieldset className='row p-2 border border-1 rounded'>
      <div className="col-12">
        <div className="mb-3 row">
          <label htmlFor="Vehicle-Total-cost" className="col-3 col-form-label">Vehicle</label>
          <div className="col-9">
            <input type="text" readOnly id='Vehicle-Total-cost' className="form-control" value={props.data.costCalculation?.VehicleTotalCost}  />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="Fuel-Total-cost" className="col-3 col-form-label">Fuel</label>
          <div className="col-9">
            <input type="text" readOnly id='Fuel-Total-cost' className="form-control" value={props.data.costCalculation?.totalFualCost ? props.data.costCalculation.totalFualCost.toFixed(2) : ''} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="Human-Total-cost" className="col-3 col-form-label">Human</label>
          <div className="col-9">
            <input type="text" readOnly id='Human-Total-cost' className="form-control" value={props.data?.costCalculation?.HumanTotalCost} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="Material-Total-cost" className="col-3 col-form-label">Material</label>
          <div className="col-9">
            <input type="text" readOnly id='Material-Total-cost' className="form-control" value={props.data.costCalculation?.materialTotalCost} />
          </div>
        </div>
        <hr />
        <div className="mb-3 row">
          <label htmlFor="Fixed-Total-cost" className="col-3 col-form-label">Fixed</label>
          <div className="col-9">
            <input type="text" readOnly id='Fixed-Total-cost' className="form-control" value={props.data.costCalculation.Fixed} />
          </div>
        </div>
        <hr />
        <div className="mb-3 row">
          <label htmlFor="Cost-Total-cost" className="col-3 col-form-label">Cost</label>
          <div className="col-9">
            <input type="text" readOnly id='Cost-Total-cost' className="form-control" value={props.data.costCalculation.TotalCost ? props.data.costCalculation.TotalCost.toFixed(2) : ""} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="Markup-Total-cost" className="col-3 col-form-label">Markup</label>
          <div className="col-9">
            <input min={0} max={100} type="number" id='Markup-Total-cost' className="form-control" onChange={(e) => handlechangeMarkup(e)}  value={props.data.costCalculation.markep} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="Other-Total-cost" className="col-3 col-form-label">Other</label>
          <div className="col-9">
            <input type="text" readOnly id='Other-Total-cost' className="form-control" value={props.data.costCalculation.other} />
          </div>
        </div>
        <hr />
        <div className="mb-3 row">
          <label htmlFor="Quote-Total-cost" className="col-3 col-form-label">Quote</label>
          <div className="col-9">
            <input type="text" readOnly id='Quote-Total-cost' className="form-control" value={(props.data.costCalculation.Quatation ? props.data.costCalculation.Quatation.toFixed(2) : "")} />
          </div>
        </div>
        <div className="actions my-4 d-flex justify-content-between">
          <button type="button" className="btn btn-primary fs-4 fw-bolder">Σ</button>
          <button type="button" onClick={submitForm} className="btn btn-secondary px-5 fw-bold">
          
          {loader ?  <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span> : <span role="status">Accept</span>}
            
            </button>
        </div>
        
      </div>
    </fieldset>
  )
}
