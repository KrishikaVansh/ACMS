import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000"; 

function Auth() 
{
    const navigate = useNavigate();
    const [form, setForm] = useState({ company_name: "", admin_name: "", email: "", password: "" });
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => 
    {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        setLoading(true);
        const endpoint = isLogin ? "/login" : "/signup";

        try 
        {
            const res = await fetch(`${API_BASE}${endpoint}`, 
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const text = await res.text();
            let data;
            try 
            {
                data = JSON.parse(text);
            } 
            catch 
            {
                throw new Error("Invalid JSON response from server");
            }

            if (res.ok) 
            {
                localStorage.setItem("token", data.token);
                alert("Success!");
                navigate("/dashboard");
            } 
            else 
            {
                alert(data.error || "Something went wrong");
            }
        } 
        catch (error) 
        {
            console.error("Error:", error);
            alert("Server error. Please try again.");
        } 
        finally 
        {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => 
    {
        window.location.href = `${API_BASE}/login_google`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-6 bg-white shadow-lg rounded-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <input 
                                type="text" 
                                name="company_name" 
                                placeholder="Company Name" 
                                value={form.company_name} 
                                onChange={handleChange} 
                                className="w-full mb-2 p-2 border rounded" 
                                required 
                            />
                            <input 
                                type="text" 
                                name="admin_name" 
                                placeholder="Admin Name" 
                                value={form.admin_name} 
                                onChange={handleChange} 
                                className="w-full mb-2 p-2 border rounded" 
                                required 
                            />
                        </>
                    )}
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={form.email} 
                        onChange={handleChange} 
                        className="w-full mb-2 p-2 border rounded" 
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={form.password} 
                        onChange={handleChange} 
                        className="w-full mb-2 p-2 border rounded" 
                        required 
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white p-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>
                <button 
                    onClick={handleGoogleLogin} 
                    className="w-full mt-2 bg-red-500 text-white p-2 rounded"
                >
                    Sign in with Google
                </button>
                <p 
                    className="text-center mt-4 cursor-pointer text-blue-500" 
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
                </p>
            </div>
        </div>
    );
}

export default Auth;
