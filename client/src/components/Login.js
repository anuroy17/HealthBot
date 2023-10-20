import React, { useState } from 'react'
import { NavLink,  useNavigate } from 'react-router-dom';
import "./mix.css"


const Login = () => {

    const history = useNavigate();

    const [passShow, setPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        email: "",
        password: ""
    });

    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const loginuser = async(e) => {
        e.preventDefault();

        const { email, password } = inpval;
        if(email === ""){
            alert("Please enter email");
        }else if(!email.includes("@")){
            alert("Please valid email");
        }else if(password === ""){
            alert("Please enter password");
        }else if(password.length < 6){
            alert("Please must be atleast 6 characters");
        }else{
            //console.log("User login successfully done");

            const data = await fetch("/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email, password
                })
               });
    
               const res = await data.json();
               //console.log(res);
    
               if(res.status === 201){
                localStorage.setItem("usersdatatoken",res.result.token)
                history("/dash")
                setInpval({...inpval,email:"",password:""});
               }
        }
    }

    return (
        <>
        <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi, we are glad you are back. Please login.</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={inpval.email} onChange={setVal} id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className='two'>
                            <input type = {!passShow ? "password" : "text"} name="password" value={inpval.password} onChange={setVal} id="email" placeholder='Enter Your Password'/>
                            <div className='showpass' onClick={() => setPassShow(!passShow)}>
                                {!passShow ? "Show" : "Hide"}
                            </div>
                            </div>
                        </div>
                        <button className='btn' onClick={loginuser}>Login</button>
                        <p>Don't have an Account?<NavLink to ="/register"> Sign Up</NavLink></p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login