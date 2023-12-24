

export const createProduct=(req,res)=>{
try {
res.json(req.body);    
} catch (error) {
    console.log(error.message);
}
} 
export const getProduct=(req,res)=>{
try {
res.json(req.body);    
    
} catch (error) {
    console.log(error.message);
}
} 

export const updateProduct=(req,res)=>{
try {
res.json(req.body);    
} catch (error) {
    console.log(error.message);
}
} 

export const deleteProduct=(req,res)=>{
try {
res.json(req.body);    
} catch (error) {
    console.log(error.message);  
}
} 