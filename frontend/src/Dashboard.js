import React from "react";

function Dashboard() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
            <p className="mt-2 text-gray-700">You are successfully logged in.</p>
            <button 
                onClick={() => { localStorage.removeItem("token"); window.location.href = "/"; }} 
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>
    );
}

export default Dashboard;
