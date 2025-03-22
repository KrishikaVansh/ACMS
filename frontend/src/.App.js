import { Route, Routes } from "react-router-dom";
import Auth from "./.Auth";
import Dashboard from "./.Dashboard";

function App() 
{
    return (
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}

export default App;
