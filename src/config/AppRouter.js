import React, { useState , useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { HomePage, Admin, Schedular } from '../pages';

export default function AppRouter() { 
    const [adminData, setAdminData] = useState(null);
    const [isgetData, setIsGetData] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://apps.leadsmovinghomecompany.com/costingapp/getAdminFormData');
                setAdminData(response.data.data);
                setIsGetData(true);
                
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    useEffect(()=>{
        console.log("adminData", adminData);
    }, [adminData])

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!isgetData) {
        // You can return a loading indicator here if you want
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
            {isgetData && <Route path='/costing_app_staging/' exact element={<HomePage adminData={adminData}/>}  />}
            {/* {isgetData && <Route path='/costing_app/' exact element={<HomePage adminData={adminData}/>}  />} */}
            {isgetData && <Route path='/costing_admin_app/' exact element={<Admin adminData={adminData} setAdminData={setAdminData}/>}  />}
            {isgetData &&<Route path='/costing_schedular_app/' exact element={<Schedular adminData={adminData} />}/> }
            </Routes>
        </Router>
    );
}
