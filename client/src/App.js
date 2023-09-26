import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard"
import Error from "./components/Error"
import Chat from "./components/Chat";
import {Routes,Route} from "react-router-dom"
function App() {
  return (
   <>
   <Header/>

   <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dash" element={<Dashboard/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="*" element={<Error/>}/>

   </Routes>
   </>
  );
}

export default App;
