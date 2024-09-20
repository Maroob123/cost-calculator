import React, { useState, useEffect } from 'react';
import { DayTaskInputFieldset, VehicleInputFieldset, HumanResourcesInputFieldset, MaterialsInputFieldset, CostCalculationFieldset, CostTypeInputFieldset, TimeZoneFieldset } from "../components";
import axios from 'axios';

export default function HomePage({ adminData }) {
    const [data, setData] = useState({
      "tabs": [
        {
        "days":[
           {
              "date":"",
              "task":"",
              "totalVehicle": 0,
              "totalOtherCost": 0,
              "totalVehicleCost": 0,
              "totalResource": 0,
              "totalResourceCost": 0,
              "totalMaterialCost": 0,
              "drivers":[
                 {
                    "driver_name":"",
                    "driver_value": "0",
                    "miles":0,
                    "days":0,
                    "fuelcost":0,
                    "cost":0
                 }
              ],
              "resources":[
                 {
                    "resource_name":"",
                    "resource_Value": "0",
                    "days":0,
                    "overnight": false,
                    "hours":8,
                    "cost":0
                 }
              ],
              "material":[
                 {
                    "material":"",
                    "materialValue": "0",
                    "hours":0,
                    "cost":0
                 }
              ],
              "others":[
                {
                   "otherService":"",
                   "otherserviceValue": "",
                   "currency":"",
                   "currencyNotes":"",
                   "margin":0,
                   "cost":0,
                   "withmarginCost": 0
                }
              ]
           }
        ],
    
        "costCalculation": {
          "VehicleTotalCost":0,
          "HumanTotalCost":0,
          "materialTotalCost":0,
          "TotalCost":0,
          "totalFualCost":0,
          "Fixed": 0,
          "markep":20,
          "other":0,
          "Quatation":0
    
        },
        "ZonePrice": {
          "selectedZone":"",
          "pricepercubicfeed":"",
          "numberofcubicfeed":100,
          "TotalCost":0,
        }
      }]
   });
   const [currentDataIndices, setCurrentDataIndices] = useState({});
   const [currentTabIndex, setCurrentTabIndex] = useState(0)
   const emptyTabData = {
      "days":[
         {
            "date":"",
            "task":"",
            "totalVehicle": 0,
            "totalOtherCost": 0,
            "totalVehicleCost": 0,
            "totalResource": 0,
            "totalResourceCost": 0,
            "totalMaterialCost": 0,
            "drivers":[
               {
                  "driver_name":"",
                  "driver_value": "0",
                  "miles":0,
                  "days":0,
                  "fuelcost":0,
                  "cost":0
               }
            ],
            "resources":[
               {
                  "resource_name":"",
                  "resource_Value": "0",
                  "days":0,
                  "overnight": false,
                  "hours":8,
                  "cost":0
               }
            ],
            "material":[
               {
                  "material":"",
                  "materialValue": "0",
                  "hours":0,
                  "cost":0
               }
            ],
            "others":[
              {
                 "otherService":"",
                 "otherserviceValue": "",
                 "currency":"",
                 "currencyNotes":"",
                 "margin":0,
                 "cost":0,
                 "withmarginCost": 0
              }
            ]
         }
      ],
  
      "costCalculation": {
        "VehicleTotalCost":0,
        "HumanTotalCost":0,
        "materialTotalCost":0,
        "TotalCost":0,
        "totalFualCost":0,
        "Fixed": 0,
        "markep":20,
        "other":0,
        "Quatation":0
  
      },
      "ZonePrice": {
        "selectedZone":"",
        "pricepercubicfeed":"",
        "numberofcubicfeed":100,
        "TotalCost":0,
      }
    }

    useEffect(()=> {
      console.log("data", data)
    }, [data])
     useEffect(()=>{
       const params = new URLSearchParams(window.location.search);
        const dealId = params.get('DealId');
        if(!dealId){
          return;
        }
       (async () => {
          try {
             console.log("params", dealId);
             const response = await axios.post('https://apps.leadsmovinghomecompany.com/costingapp/GetFormData', { DealId: dealId});
             console.log(response.data.success);
             if(response.data.success){
                setData(response.data.data);
             }
          } catch (error) {
             console.log(error);
          }
          
        })();
    
       }, [])

      const addNewTab = () => {
         setData((prevData) => ({
           ...prevData,
           tabs: [...prevData.tabs, emptyTabData] // Add new empty tab data
         }));
         setCurrentDataIndices((prevIndices) => ({
            ...prevIndices,
            [data.tabs.length]: 0  // Initialize currentDataIndex for the new tab
        }));
      };

      const updateCurrentDataIndexForTab = (tabIndex, newIndex) => {
         setCurrentDataIndices((prevIndices) => ({
             ...prevIndices,
             [tabIndex]: newIndex
         }));
      };

    return (
        <div className="container my-4">
         <nav className='row mb-4'>
            <div className="nav nav-pills" id="nav-tab" role="tablist">
               {data.tabs.map((v, i) =>(
                  <button className={`nav-link ${i === currentTabIndex ? "active" : '' }`} onClick={()=>setCurrentTabIndex(i)} key={i}>{`Tab ${i+1}`}</button>
               ))}
              <button type="button" className="btn btn-light" onClick={addNewTab}>
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
               </svg>
              </button>
            </div>
          </nav>
            <div className="row">
                <div className="col-lg-4 col-12">
                    <DayTaskInputFieldset taskData={adminData?.taskData} data={data.tabs[currentTabIndex]} currentTabIndex={currentTabIndex} setData={setData} currentDataIndex={currentDataIndices[currentTabIndex] || 0} setCurrentDataIndex={(newIndex) => updateCurrentDataIndexForTab(currentTabIndex, newIndex)} />
                    <TimeZoneFieldset eurozoneData={adminData?.eurozoneData} data={data.tabs[currentTabIndex]} currentTabIndex={currentTabIndex} currentDataIndex={currentDataIndices[currentTabIndex] || 0} setData={setData} />
                </div>
                <div className="col-lg-5 col-12">
                    <VehicleInputFieldset vehicleData={adminData?.vehicleData} data={data.tabs[currentTabIndex]} currentTabIndex={currentTabIndex} currentDataIndex={currentDataIndices[currentTabIndex] || 0} setData={setData} />

                    <HumanResourcesInputFieldset resourceData={adminData?.resourceData} data={data.tabs[currentTabIndex]} currentTabIndex={currentTabIndex} currentDataIndex={currentDataIndices[currentTabIndex] || 0} setData={setData} />

                    <MaterialsInputFieldset materialData={adminData?.materialData} data={data.tabs[currentTabIndex]} currentTabIndex={currentTabIndex} currentDataIndex={currentDataIndices[currentTabIndex] || 0} setData={setData} />
                </div>
                <div className="col-lg-3 col-12">
                    <CostCalculationFieldset data={data.tabs[currentTabIndex]} allData={data} currentTabIndex={currentTabIndex} setData={setData} />
                </div>
                <div className="col-12">
                    <CostTypeInputFieldset otherCostData={adminData?.otherCosts} data={data.tabs[currentTabIndex]} currentTabIndex={currentTabIndex} currentDataIndex={currentDataIndices[currentTabIndex] || 0} setData={setData} />
                </div>
            </div>
        </div>
    )
}
