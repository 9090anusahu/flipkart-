// import React from 'react'

// const Addproduct = () => {
    import axios from 'axios'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {createClient} from '@supabase/supabase-js'
const supabaseUrl='https://rvrydvsuwmfwhboouzvl.supabase.co'
const supabaseKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2cnlkdnN1d21md2hib291enZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3NzM5NTIsImV4cCI6MjAzODM0OTk1Mn0.ZjguhM7h9MDEszo4D4YthXsfOuWsHkxo10YV_4mTqpw'
const supabase = createClient(supabaseUrl, supabaseKey);


const Addproduct = () => {
    let [productData,SetProductdata]=useState({
        name:"",
        description:"",
        image:"",
        price:""
       
    })
    function fun2image(e){
        console.log(e.target.files,"hehee");
        let file = e.target.files[0]
        console.log(file);
        SetProductdata({ ...productData, image: file });
  
      }

    function fun2(e){
      let {name,value} =   e.target
      SetProductdata({...productData,[name]:value})
        console.log(productData);

    }



    const handleSubmit = async (e) => {
      console.log('heheheh');
      
      e.preventDefault();
      try {
        // Upload image to Supabase
        const { data, error } = await supabase.storage.from('flipkartpj').upload('product_images/' + productData.image.name, productData.image);
        if (error) {
          throw error;
        }
        // https://fzdfcdjjbsnwmdvxhfrh.supabase.co/storage/v1/object/public/zomato/restaurant_images/india-flag.jpg
        // Get the URL of the uploaded image
        const imageUrl = `${supabaseUrl}/storage/v1/object/public/flipkartpj/product_images/${productData.image.name}`;
        console.log(imageUrl,"blocking zzzzzzz");
    
        // Save restaurant data to MongoDB with image URL
        const response = await axios.post('http://localhost:3000/api/product', { ...productData, image:imageUrl});
        if (response) {
          alert('Restaurant added successfully');
          // Reset form fields
       
        } else {
          alert('Failed to add restaurant');
        }
      } catch (error) {
        console.error('Error adding restaurant:', error);
        alert('Failed to add restaurant');
      }
    };







    // async function handleSubmit(e){
    //     e.preventDefault();
    //     let res=await axios.post('http://localhost:3000/api/users',productData )
    //     console.log(res,"ressssssss");

    // }
  return (
    <div>
       <h2>Add Products</h2>
         <form action=''  onSubmit={handleSubmit}>  
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
        <input    onChange={fun2image}   type='file' placeholder='Enter your file'/>
        <br/>
        <br/>
        <button  type='submit'>Add</button>
        </form>
       
    </div>
  )
}

export default Addproduct