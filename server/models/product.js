let mongoose=require('mongoose')
// let productSchema = mongoose.Schema({
//     name:{
//         type:String,
//         require:true
//     },
//     description:{
//         type:String,
//         require:true
//     },
//     cost:{
//         type:String,
//         require:true
//     },
//     image:{
//         type:String,
//         require:true
//     },
//    brand:{
//         type:String,
//         require:true
//     },
//     //  category: 
//     //  { 
//     //     type: mongoose.Schema.Types.ObjectId,
//     //     ref: 'Category',
//     //     required: true
//     //  },
//      countInStock: { 
//         type: Number, 
//         required: true, 
//         default: 0 
//     },
//     rating: 
//     { type: Number, 
//     default: 0 

//     },
//     numReviews:
//      { type: Number, 
//         default: 0 
//      },
      
// });
// let product = mongoose.model('User',productSchema)
// module.exports=product


/////2nd code
const productSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category',  },
    brand: { type: String },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    images: String
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;