// let express = require('express')
// let app=express()
// let router = express.Router();
// let Products = require('../models/product')

// router.get('/',(req,res)=>{
//     res.send('hey')
// })
// router.get('/create',async (req,res)=>{
//     let userCreate=await Products.create({  //asynchronous
//         name:"Eyeliner",
//         description:"foreyes",
//         cost:"900",
//         image:"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRpRWaxNTsXr2J0PdwLQvSIKY7LA0xvKYRapf7JeyCVNFaismY_zVuzwz5zcgAN3SzeRi3lWCvl1H3jHe-HQiQ0e66m6Gs1uTijA0T6BS7WASJ4qAUIKBU_rg",
//         countInStock:"60",
//         rating:"5",
//         numReviews:"5"
//     })
//     res.send(userCreate)
// })

// // app.get('/read',async (req,res)=>{
// //     // let User =await userModel.find({name:"Priya"})  //to read one data
// //     let User =await Products.find()  //to read entire data

// //     res.send(User)
// // })

// app.get('/update',async (req,res)=>{
//     let updateData = await Products.findOneAndUpdate({name:"eyeliner"},{cost:"1000"},{new:true})
//     res.send(updateData)
// })

// app.get('/read',async (req,res)=>{
//     // let User =await userModel.find({name:"Priya"})  //to read one data
//     let User =await Products.find()  //to read entire data

//     res.send(User)
// })

// // app.get('/delete',async (req,res)=>{
// //     let users = await Products.findOneAndDelete({userName:"sarita"})
// //     res.send(users)
// // })


// module.exports = router



const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Create a new product
router.post('/product', async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read all products
router.get('/product', async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read a single product by ID
router.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a product by ID
router.put('/product/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a product by ID
router.delete('product/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;