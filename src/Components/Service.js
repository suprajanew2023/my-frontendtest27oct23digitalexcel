import axios from "axios";

export async function getData()
{
   return await axios.get("https://digitalexcelbackend.onrender.com/getAllProducts");
}
export async function deleteData(id)
{
   return await axios.delete(`https://digitalexcelbackend.onrender.com/deleteSubcontrol/${id}`);

}
export async function getDataByStandard(standard)
{
   return await axios.get(`https://digitalexcelbackend.onrender.com/getControlsByStandard/${standard}`);

}
export async function postData(data)
{
   return await axios.post("https://digitalexcelbackend.onrender.com/addProduct",data,{headers:{'Content-Type':'application/json'}}
   )
}
export async function putData(subcontrolId ,data)
{
   return await axios.put(`https://digitalexcelbackend.onrender.com/updateSubcontrol/${subcontrolId }`,data,{headers:{'Content-Type':'application/json'}}
   )
}
export async function register(data)
{
   return await axios.post("https://digitalexcelbackend.onrender.com/register",data,{headers:{'Content-Type':'application/json'}}
   )
}
export async function getStandards()
{
   return await axios.get("https://digitalexcelbackend.onrender.com/standards");

}
