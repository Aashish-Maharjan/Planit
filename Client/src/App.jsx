import Login from './pages/Login.jsx';
import { Routes,Route,Navigate,Outlet,useLocation } from 'react-router-dom';
import Dashboard from "./pages/Dashboard.jsx";
import Tasks from "./pages/Tasks.jsx"; 
import Users from "./pages/Users.jsx";
import Trash from "./pages/Trash.jsx";
import TaskDetails from "./pages/TaskDetails.jsx"; 

function App() {
  return(
  <main className="w-full min-h-screen bg-[#f3f4f6]">
    <Routes> 
      <Route element={<Layout/>}>

        <Route path='/' element={<Navigate to="/dashboard"/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>

        <Route path='/tasks' element={<Tasks/>}/>
        <Route path='/completed/:status >' element={<Tasks/>}/>
        <Route path='/in-progress/:status >' element={<Tasks/>}/>
        <Route path='/todo/:status >' element={<Tasks/>}/>

        <Route path='/team' element={<Users/>}/>

        <Route path='/trashed' element={<Trash/>}/>

        <Route path='/tasks/:id >' element={<TaskDetails/>}/>


      </Route>
    </Routes>
  </main>
  );
}

export default App;
