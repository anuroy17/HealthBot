import React,{useContext} from 'react'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './ContextProvider/Context'
import "./header.css"

const Header = () => {

    const {logindata,setLoginData} = useContext(LoginContext);
    
    return (
        <>
        <header>
            <nav><h1>HealthBot</h1>

                 <div className="avtar">
                    {
                            logindata.ValidUserOne  ? <><Avatar style={{background: "#53A57D"}}>{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar><span>{logindata.ValidUserOne.fname}</span></>:
                        <Avatar style={{background: "#53A57D"}}/>
                    }
                </div>
            </nav>
        </header>
        </>
    )
}

export default Header