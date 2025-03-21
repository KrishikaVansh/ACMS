import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login"); // Redirect if not logged in
            return;
        }

        fetch("http://localhost:5000/user", {
            method: "GET",
            headers: { "Authorization": token }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                localStorage.removeItem("token");
                navigate("/login"); // Redirect if unauthorized
            } else {
                setUser(data);
            }
        })
        .catch(error => console.error("Error fetching user:", error));
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center">Dashboard</h2>
                {user ? (
                    <p className="text-center mt-2">Welcome, <strong>{user.name}</strong>!</p>
                ) : (
                    <p className="text-center mt-2">Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
