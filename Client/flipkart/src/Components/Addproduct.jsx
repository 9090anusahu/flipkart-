// import React from 'react'

// const Addproduct = () => {
    import axios from 'axios'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Addproduct = () => {
    let [productData,SetProductdata]=useState({
        name:"",
        description:"",
        price:""
       
    })
    function fun2image(e){
        console.log(e.target.files,"hehee");
        let file = e.target.files[0]
        console.log(file);
  
      }

    function fun2(e){
      let {name,value} =   e.target
      SetProductdata({...productData,[name]:value})
        console.log(productData);

    }
    async function done(e){
        e.preventDefault();
        let res=await axios.post('http://localhost:3000/api/users',productData )
        console.log(res,"ressssssss");

    }
  return (
    <div>
         <form action=''  onSubmit={done}>  
            <label for="">Name: </label>
        <input
      type='text'   name='name'  value={productData.name}  onChange={fun2} placeholder='Enter your product'/>
        <br/>
        <br/>
        <label for="">Description: </label>
        <input    name='description'  value={productData.description}  onChange={fun2}  type='text' placeholder='Enter your description'/>

        <br/>
        <br/>
        <label for="">Price: </label>
        <input   name='price'   value={productData.category} onChange={fun2}   type='number' placeholder='Enter your price'/>
        <br/>
        <br/>
        <label for="">Image: </label>
        <input   name='image'   value={productData.image} onChange={fun2image}   type='file' placeholder='Enter your file'/>
        <br/>
        <br/>
        </form>
        <NavLink  to='/add'>Addproduct</NavLink>
    </div>
  )
}

export default Addproduct