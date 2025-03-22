import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() 
{
    const navigate = useNavigate();

    useEffect(() => 
    {
        const token = localStorage.getItem("token");
        if (!token) 
        {
            alert("Access denied. Please login first.");
            navigate("/");
        }
    }, [navigate]);

    const handleLogout = () => 
    {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold">Welcome to the Dashboard!</h1>
            <button 
                onClick={handleLogout} 
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>
    );
}

export default Dashboard;
