// variable
const {ipcRenderer} =   require('electron');
const { stat } = require('original-fs');


let addSalary = document.querySelector('#createSalary');
let datePayroll = document.querySelector('#datePayroll');
let paidPay = document.querySelector('#salaryPay');
let inputSalary = document.querySelector('#inputSalary');
let createEmpl = document.querySelector('.createEmpl');

let dateContract = document.querySelector('#dateContract')
let nameClient = document.querySelector('#name')
let nameProject = document.querySelector('#nameProject')
let phone = document.querySelector('#phone')
let address = document.querySelector('#address')
let priceProject = document.querySelector('#price')
let rate = document.querySelector('#rate')
let notes = document.querySelector('#notes');
let tmpId;


let date = new Date();
let dateNow;

let numReserve = document.querySelector('#numReserve');
let dateReserve = document.querySelector('#dateReserve');
let nameReserve = document.querySelector('#nameReserve');


if(date.getMonth()+1 < 10 && date.getDate() < 10) {
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
}else if(date.getMonth()+1 < 10 && date.getDate() >= 10){
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
}else if(date.getMonth()+1 >= 10 && date.getDate() < 10){
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;
}else{
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}
let monthNow;
if(date.getMonth()+1 < 10) {
    monthNow = `${date.getFullYear()}-0${date.getMonth()+1}`;
}else{
    monthNow = `${date.getFullYear()}-${date.getMonth()+1}`;
}

dateContract.value = dateNow;

// expensesDate.value = dateOtherExp.value = dateNow;
let userName = document.querySelector('.userName');
let dateAndTime = document.querySelector('.dateAndTime');
userName.innerHTML = localStorage.getItem('userNameView');
dateAndTime.innerHTML =  dateNow;

let mood = 'create';
let tmp;

let users;
if(localStorage.allUsers != null){
    users = JSON.parse(localStorage.allUsers);
}else{
    users = []
}

function openInputs(){
    document.querySelector('.addEmployee').style.display = "block";
    document.querySelector('.buttons').style.display = "none";
}

let allSalary = [];
let optionItems; 
let selectEmployeeName = document.querySelector('#selectEmployeeName');

createEmpl.addEventListener("click",(e)=>{
    e.preventDefault();
    let newClient= "";
    if((nameClient.value && nameProject.value) != '') {
        newClient = {
            user: userName.innerHTML,
            dateContract : dateContract.value,
            nameClient: nameClient.value,
            nameProject: nameProject.value,
            phone: phone.value,
            address: address.value,
            priceProject: priceProject.value,
            rate: rate.value,
            notes: notes.value,
            state: "open",
        }

        if(mood == 'create') {
           
            ipcRenderer.send('myClient',newClient);
            
            window.location.reload();


        }else{
            

            // ipcRenderer.send('myRecycleBin',newClient)
            ipcRenderer.send('update-client',{...newClient, tmp})

            // ipcRenderer.send('editData', {...newClient, tmp})
            mood = 'create';
            
            window.location.reload();

            
        }


    }

    showEmployees();
})


function updateEmployee(id) {
    for(let x=0; x<users.length;x++){
        if(userName.innerHTML == users[x].user && (users[x].job == 'it' || users[x].job == 'مدير')){
            document.querySelector('.addEmployee').style.display = "block";
            document.querySelector('.inputs').style.display = "none";
            for(let i=0;i<client[client.length-1].length; i++){
                if(client[client.length-1][i]._id === id){
                    let myClient = client[client.length-1][i].myClient;
                    dateContract.value = myClient.dateContract;
                    nameClient.value = myClient.nameClient;
                    nameProject.value = myClient.nameProject;
                    phone.value = myClient.phone;
                    address.value = myClient.address;
                    priceProject.value = myClient.priceProject;
                    rate.value = myClient.rate;
                    notes.value = myClient.notes;
                }
            nameClient.focus();
            scroll({
                top:0,
                behavior: "smooth",
            })
            mood = 'update';
            tmp = id;
            document.querySelector('.createEmpl').innerHTML = 'تحديث بيانات';
        }
        }
    }
       
 
}

let tmpIdDelete1;
function deleteEmployee(id){
    for(let x=0; x<users.length;x++){
        if(userName.innerHTML == users[x].user && (users[x].job == 'it' || users[x].job == 'مدير')){
            document.querySelector('.alarm1').style.display = 'block';
            tmpIdDelete1 = id;
            document.querySelector("#inputPass").focus();
        }
    }
}


function checkPass1(){
    let data;
    
    if(document.querySelector("#inputPass").value == "100"){
        for(let i=0;i<client[client.length-1].length; i++){
            if(client[client.length-1][i]._id == tmpIdDelete1){
                
                client[client.length-1][i].myClient.state = "delete";
                data = client[client.length-1][i].myClient;
            }
    
        }
        ipcRenderer.send('update-clientDelet',{...data, tmpIdDelete1})

        // ipcRenderer.send('myRecycleBin',data)
        // ipcRenderer.send('delete-client',tmpIdDelete1)
        window.location.reload();
        showEmployees();
    }else{
        document.querySelector("#inputPass").value = "الباسوورد خطأ";
    }

    
    
}


let client = [];
function showEmployees() {
    let tableEmployees1 = '';
    let tableEmployees2 = '';

    ipcRenderer.send('get-customer', 'bing')
    ipcRenderer.on('get-customer',(e,args)=>{
        const myEmployees = JSON.parse(args);
        client.push(myEmployees);
        tableEmployees1 = '';
        tableEmployees2 = '';
        for(let i=0;i<client[client.length-1].length;i++){
            let mE = client[client.length-1][i];
            if(mE.myCustomer.state == "مفتوح"){
                tableEmployees1 += `
                    <tr class="trOpen">
                        <td>${i+1}</td>
                        <td>${mE.myCustomer.code}</td>
                        <td>${mE.myCustomer.customer}</td>
                        <td>${mE.myCustomer.newProject}</td>
                        <td>${mE.myCustomer.dateContract}</td>
                        <td>${mE.myCustomer.address}</td>
                        <td>${mE.myCustomer.phone}</td>
                        <td>${mE.myCustomer.priceProject}</td>
                        <td>${mE.myCustomer.rate}</td>
                        <td>${mE.myCustomer.state}</td>
                        <td>${mE.myCustomer.notes}</td>
                        
                    </tr>
                    `
            }else{
                tableEmployees2 += `
                    <tr class="trClose">
                        <td>${i+1}</td>
                        <td>${mE.myCustomer.code}</td>
                        <td>${mE.myCustomer.customer}</td>
                        <td>${mE.myCustomer.newProject}</td>
                        <td>${mE.myCustomer.dateContract}</td>
                        <td>${mE.myCustomer.address}</td>
                        <td>${mE.myCustomer.phone}</td>
                        <td>${mE.myCustomer.priceProject}</td>
                        <td>${mE.myCustomer.rate}</td>
                        <td>${mE.myCustomer.state}</td>
                        <td>${mE.myCustomer.notes}</td>
                        
                    </tr>
                    `
            }
        }
        // myEmployees.map(mE=>{
            
           
        // })
         
        document.querySelector('.tbodyEmployees1').innerHTML = tableEmployees1;
        document.querySelector('.tbodyEmployees2').innerHTML = tableEmployees2;
    })
}
showEmployees();

function showRecycleBin() {
    for(let x=0; x<users.length;x++){
        if(userName.innerHTML == users[x].user && (users[x].job == 'it' || users[x].job == 'مدير')){
            let tableEmployees = '';

            ipcRenderer.send('get-client', 'bing')
            ipcRenderer.on('get-client',(e,args)=>{
                const myEmployees = JSON.parse(args);
                client.push(myEmployees);
                tableEmployees = '';
                myEmployees.map(mE=>{
                    if(mE.myClient.state == "delete"){
                        tableEmployees += `
                        <tr>
                            <td>${mE.myClient.nameClient}</td>
                            <td>${mE.myClient.nameProject}</td>
                            <td>${mE.myClient.dateContract}</td>
                            <td>${mE.myClient.address}</td>
                            <td>${mE.myClient.phone}</td>
                            <td>${mE.myClient.priceProject}</td>
                            <td>${mE.myClient.rate}</td>
                            <td>${mE.myClient.notes}</td>
                            <td><button onclick="returnData('${mE._id}');">استعادة</button></td>
                            <td></td>
                        </tr>
                        `
                    }
                   
                })
                 
                document.querySelector('.tbodyEmployees').innerHTML = tableEmployees;
            })
        }
    }
    
}

function returnData(id){
    for(let i=0;i<client[client.length-1].length; i++){
        if(client[client.length-1][i]._id == id){
            
            client[client.length-1][i].myClient.state = "open";
            data = client[client.length-1][i].myClient;
        }

    }
    ipcRenderer.send('update-clientOpen',{...data, id})
    refresh();
}

function returnpageEmployees(){
    document.querySelector('.tableDetailsEmployee').style.display = 'none';
    document.querySelector('.tableAllEmployees').style.display = 'block';
}

function printThisPage() {
    document.querySelector('header').style.display = 'none';
    document.querySelector('aside').style.display = 'none';
    document.querySelector('.content').style.width = '100%';
    document.querySelector('#addSalary').style.display = 'none';
    window.print();
    window.location.reload();
}
function exiteTable(){
    document.querySelector('.tablePrint').style.display = 'none';
    document.querySelector('.app').style.display = 'block';
}




function searchData(value) {
    let tableEmployees1 = '';
    let tableEmployees2 = '';
    ipcRenderer.send('get-customer', 'bing')
    ipcRenderer.on('get-customer',(e,args)=>{
        const myEmployees = JSON.parse(args);
        client.push(myEmployees);
        tableEmployees1 = '';
        tableEmployees2 = '';
        for(let i=0;i<client[client.length-1].length;i++){
            let mE = client[client.length-1][i];
            if(value != ""){
                if(mE.myCustomer.newProject.includes(value) ||  mE.myCustomer.customer.includes(value) || mE.myCustomer.code.includes(value) ){
                    if(mE.myCustomer.state == "مفتوح"){
                        tableEmployees1 += `
                            <tr class="trOpen">
                                <td>${i+1}</td>
                                <td>${mE.myCustomer.code}</td>
                                <td>${mE.myCustomer.customer}</td>
                                <td>${mE.myCustomer.newProject}</td>
                                <td>${mE.myCustomer.dateContract}</td>
                                <td>${mE.myCustomer.address}</td>
                                <td>${mE.myCustomer.phone}</td>
                                <td>${mE.myCustomer.priceProject}</td>
                                <td>${mE.myCustomer.rate}</td>
                                <td>${mE.myCustomer.state}</td>
                                <td>${mE.myCustomer.notes}</td>
                                
                            </tr>
                            `
                    }else if(mE.myCustomer.state == "مغلق" ){
                        tableEmployees2 += `
                            <tr class="trClose">
                                <td>${i+1}</td>
                                <td>${mE.myCustomer.code}</td>
                                <td>${mE.myCustomer.customer}</td>
                                <td>${mE.myCustomer.newProject}</td>
                                <td>${mE.myCustomer.dateContract}</td>
                                <td>${mE.myCustomer.address}</td>
                                <td>${mE.myCustomer.phone}</td>
                                <td>${mE.myCustomer.priceProject}</td>
                                <td>${mE.myCustomer.rate}</td>
                                <td>${mE.myCustomer.state}</td>
                                <td>${mE.myCustomer.notes}</td>
                                
                            </tr>
                            `
                    }
                   
                }
            }else{
                
            }
        }
        document.querySelector('.tbodyEmployees1').innerHTML = tableEmployees1;
        document.querySelector('.tbodyEmployees2').innerHTML = tableEmployees2;

           
      
    })
}







function refresh(){
    window.location.reload();
}


function exitePass(){
    window.location.reload();
}



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

