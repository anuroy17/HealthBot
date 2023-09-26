import React, { useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from './ContextProvider/Context'

const Dashboard = () => {

    const {logindata,setLoginData} = useContext(LoginContext);
    console.log(logindata);

    const history = useNavigate();

    const DashboardValid = async()=>{
        let token = localStorage.getItem("usersdatatoken");
        
        const res = await fetch("/validuser",{
            method: "GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":token
            }
        });

        const data = await res.json();
        
        if(data.status == 401 || !data){
            history("*")
        }
        else{
            console.log("User verify");
            setLoginData(data);
            history("/dash")
        }
    }

    useEffect(()=>{
        DashboardValid();
    },[])

    return (
    <>
    <div style = {{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <h1>Main Page</h1>
    </div>
    </>
  )
}

export default Dashboard