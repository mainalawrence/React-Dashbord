import fs from 'fs';

export const imagetoUrl=(image)=>{

  //return image;
 
 return fs.readFileSync(`${image}`, 'base64');
}


export const imagestoUrl=(images)=>{
   let urls=[];
  urls= images.map(image=>{
       return fs.readFileSync(`${image}`, 'base64');
  })
}