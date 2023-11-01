import axios from "axios";

export async function getData()
{
   return await axios.get("https://backenddigitalexcel.onrender.com/getAllProducts");
}
export async function deleteData(id)
{
   return await axios.delete(`https://backenddigitalexcel.onrender.com/deleteSubcontrol/${id}`);

}
export async function getDataByStandard(standard)
{
   return await axios.get(`https://backenddigitalexcel.onrender.com/getControlsByStandard/${standard}`);

}
export async function postData(data)
{
   return await axios.post("https://backenddigitalexcel.onrender.com/addProduct",data,{headers:{'Content-Type':'application/json'}}
   )
}
export async function putData(subcontrolId ,data)
{
   return await axios.put(`https://backenddigitalexcel.onrender.com/updateSubcontrol/${subcontrolId }`,data,{headers:{'Content-Type':'application/json'}}
   )
}
export async function register(data)
{
   return await axios.post("https://backenddigitalexcel.onrender.com/register",data,{headers:{'Content-Type':'application/json'}}
   )
}
export async function getStandards()
{
   return await axios.get("https://backenddigitalexcel.onrender.com/standards");

}