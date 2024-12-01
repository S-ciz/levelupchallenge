import { wait } from "@testing-library/user-event/dist/utils";

const GLOBAL_URL =  "http://localhost:5219/graduate";


let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
   }

export async function getGraduates()
{
    let response = await fetch(GLOBAL_URL, { 
        method: "GET",
       
        headers: headersList
      });
      
      let data = await response.json();

      return data;

}

export function randomId()
{
    let letters = "abcdefghijklmnopqrstuvwxyz";
    let numbers = '0123456789';
    let combined = letters + letters.toUpperCase() + numbers;
    let new_id = " ";
    let maxChar = 10
  
    for(let i = 0; i < maxChar; i++)
    {  
        let random_index = Math.floor( Math.random()*combined.length);
        new_id +=  combined[random_index ];
    }

    return new_id;

}

export async function getGraduate(id)
{
    let res = await fetch(GLOBAL_URL + '/' + id);
    let data = await res.json();

    return data;
}

export async function postGraduate(bodyContent) 
{
        bodyContent = JSON.stringify(bodyContent);
    
       let response = await fetch(GLOBAL_URL, { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.json();
     
       
}

export async function putGraduate(id, bodyContent) {

    bodyContent = JSON.stringify(bodyContent);
    
    let response = await fetch(GLOBAL_URL + '/' + id, 
        {
            method: "PUT", 
            body: bodyContent, 
            headers: headersList
        });
    
   let data = await response.text();
   console.log(data)
}

export async function removeGraduate(id)
{


    let response = await fetch(GLOBAL_URL + '/' + id, 
        {
            method: "DELETE", 
            headers: headersList
        }
    )
    let data = await response.text();
    

}