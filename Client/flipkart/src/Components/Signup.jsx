import axios from 'axios'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Signup.css'

const Signup = () => {
    let [input,SetInput]=useState({
        name:"",
        email:"",
        password:""
    })

    function fun1(e){
      let {name,value} =   e.target
        SetInput({...input,[name]:value})
        console.log(input);

    }
    async function done(e){
        e.preventDefault();
        let res=await axios.post('http://localhost:3000/api/users',input )
        console.log(res,"ressssssss");

    }
  return (
    <div>
        <form action=''  onSubmit={done}>  
        <input
      type='text'   name='name'  value={input.name}  onChange={fun1} placeholder='Enter your name'/>
        <br/>
        <br/>

        <input    name='email'  value={input.email}  onChange={fun1}  type='email' placeholder='Enter your email'/>

        <br/>
        <br/>
        <input   name='password'   value={input.password} onChange={fun1}   type='password' placeholder='Enter your password'/>
        <br/>
        <br/>
        <button  type='submit'> Signup</button>
        

        </form>
        <NavLink  to='/login'> Login</NavLink>
    </div>

)
}

export default Signup