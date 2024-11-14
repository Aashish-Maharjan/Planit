import Login from './pages/Login.jsx';
import { Routes,Route,Navigate,Outlet,useLocation } from 'react-router-dom';
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  return(
  <main className="w-full min-h-screen bg-[#f3f4f6]">
    <Routes> 
      <Route element={<Layout/>}>
        <Route path='/' element={<Navigate to="/dashboard"/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Route>
    </Routes>
  </main>
  );
}

export default App;
