import React, { Fragment, useState } from "react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = ({setAuth})=>{

    const [inputs, setInputs] = useState({ 
        email: "",
        password: ""
    })

    const { email, password } = inputs

    const onChange = (e) =>{
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    };

    const onSubmitForm = async (e) =>{
        e.preventDefault();

        try {

            const body = { email, password }

            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });

            //Parse/convert the json data so it can be used
            const parseRes = await response.json()
            
            if(parseRes.token){

                //Saves token to local storage (sets value of token to parseRes)
                localStorage.setItem('token', parseRes.token);

                //Toggles 'setAuth' according to routes in 'App.js'
                setAuth(true);
                //If true, this notification will appear
                toast.success('Login successful!');
            }else{
                setAuth(false);
                //If false, error message from server will appear
                toast.error(parseRes);
            }
            
        }  catch (err){
            console.error(err.message)
        }
        
    }

    return (
        <Fragment>
            <h1 className="text-center my-5">Login</h1>
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" placeholder="email" className="form-control my-3" value={email} onChange={e => onChange(e)} />
                <input type="password" name="password" placeholder="password" className="form-control my-3" value={password} onChange={e => onChange(e)} />
                <button className="btn btn-success">Submit</button>
            </form>
            <Link to='/register'>Register</Link>
        </Fragment>
    );
};

export default Login;