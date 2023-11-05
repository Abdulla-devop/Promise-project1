console.log("working")

const API ="https://api.thecatapi.com/v1/images/search?limit=10"


const allData = document.querySelector("#datalist")
function ReadAllData(){
    fetch(API, {
        method: "GET",
    })
    .then ((res) => res.json())
    .then ((data) => renderAllData(data))
    .catch ((err) => console.log("Error",err));
}
ReadAllData()

function renderingData(Data){
    const dataDev = document.createElement("div")
    dataDev.className = "card";
    dataDev.innerHTML += `
   <img src ="${Data.url}"/>
<button data-id=${Data.id} id=del-btn>Delete</button>`;
allData.append(dataDev)
}


function renderAllData(newdatas){
    newdatas.forEach((newdata) => {
    renderingData(newdata);
    });
}

function deleteData(id, parent){
    fetch(`${API}/${id}`,{
        method:"DELETE",
        headers: {
            "Content-Type":"application/json",
        },  
    })
    .then(() => parent.remove())
    .catch((err) => console.log(err));
}


allData.addEventListener("click",(event) =>{
 if(event.target.id === "del-btn"){
    const id = event.target.dataset.id;
    const parent = event.target.parentNode;
    deleteData(id,parent);
 }
})