// variable
const {ipcRenderer} =   require('electron');
const { stat } = require('original-fs');



let createEmpl = document.querySelector('.createEmpl');

let dateContract = document.querySelector('#dateContract')
let codeCustomer = document.querySelector('#codeCustomer')
let nameClient = document.querySelector('#name')
let nameProject = document.querySelector('#nameProject')
let title = document.querySelector('#title')
let priceSupply = document.querySelector('#price')
let paid = document.querySelector('#paid')
let notes = document.querySelector('#notes');
let tmpId;


let date = new Date();
let dateNow;

let numReserve = document.querySelector('#numReserve');
let dateReserve = document.querySelector('#dateReserve');
let nameReserve = document.querySelector('#nameReserve');

let searchFrom = document.querySelector('#searchFrom');
let searchTo = document.querySelector('#searchTo');
let dateReport = document.querySelector('.dateReport');


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

dateContract.value = searchFrom.value = searchTo.value = dateReport.innerHTML = dateNow;

// expensesDate.value = dateOtherExp.value = dateNow;
let userName = document.querySelector('.userName');
let userReport = document.querySelector('.userReport');
let timeReport = document.querySelector('.timeReport');
timeReport .innerHTML = `${date.getHours()}:${date.getMinutes()+1}:${date.getSeconds()}`;

let dateAndTime = document.querySelector('.dateAndTime');
userName.innerHTML= userReport.innerHTML = localStorage.getItem('userNameView');
dateAndTime.innerHTML =  dateNow;

let client = [];

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
function openInputsSearch(){
    document.querySelector('.inputsSearch').style.display = "flex";
    // document.querySelector('.buttons').style.display = "none";
}


let idDatabase;
let allSalary = [];
let optionItems; 
let selectEmployeeName = document.querySelector('#selectEmployeeName');

function getId(){
    ipcRenderer.send('get-clientSupply', 'bing')
    ipcRenderer.on('get-clientSupply',(e,args)=>{
        const myEmployees = JSON.parse(args);
        client.push(myEmployees);
        myEmployees.map(mE=>{
            if(mE._id != undefined && mE._id != null){

                idDatabase = +mE._id +1

            }else{
                idDatabase = 1000 + +mE._id +1;

            }
            // console.log(mE._id)
            // console.log(idDatabase)
        })
        // console.log(idDatabase)
        
    })
    // console.log(idDatabase)

}
getId();

let customer = [];
let tmpCustomer;
let tmpICustomer;
function getData(){
    ipcRenderer.send('get-customer', 'bing')
    ipcRenderer.on('get-customer',(e,args)=>{
        const myEmployees = JSON.parse(args);
        customer.push(myEmployees);
        let data = customer[customer.length-1][0];
        localStorage.setItem("myCustomer",JSON.stringify(data))
    })
}



setInterval(() => {
    sendDataRecovery();
}, 36000000);

function sendDataRecovery(){
    if(customer.length != 0 && customer[customer.length-1].length !=0){
        for(let i=0; i< customer[customer.length-1].length;i++){
            let id = customer[customer.length-1][i]._id;
            let data = customer[customer.length-1][i].myCustomer;
            // ipcRenderer.send('myCustomerRecoveryUpdate',`${id}`,{data});
            ipcRenderer.send('myCustomerRecoveryUpdate',{...data, id})

        }

    }
    console.log("hhhh")
}

getData();
function getCustomer(value){
    // getId();
    // let tableEmployees = '';
    nameClient.value = "";
    nameProject.value = "";
    // ipcRenderer.send('get-customer', 'bing')
    // ipcRenderer.on('get-customer',(e,args)=>{
    //     const myEmployees = JSON.parse(args);
    //     customer.push(myEmployees);
    //     // tableEmployees = '';

       
        
       
       
    // })
    for(let i=0; i<customer[customer.length-1].length;i++){
        let mE = customer[customer.length-1][i];
        if(customer[customer.length-1][i].myCustomer.state == "مفتوح" && customer[customer.length-1][i].myCustomer.code ==  codeCustomer.value){
            nameClient.value = customer[customer.length-1][i].myCustomer.customer;
            nameProject.value = customer[customer.length-1][i].myCustomer.newProject;
            tmpCustomer = customer[customer.length-1][i]._id;
            tmpICustomer = i;
            
            
        }
    }
}

createEmpl.addEventListener("click",(e)=>{
    e.preventDefault();
    let newClient= "";
    if((nameClient.value && nameProject.value) != '') {
        newClient = {
            user: userName.innerHTML,
            date : dateContract.value,
            codeCustomer: codeCustomer.value,
            nameCustomer: nameClient.value,
            nameProject: nameProject.value,
            title:title.value,
            price: priceSupply.value,
            // paid: paid.value,
            notes: notes.value,
            state: "open",
            typeAdd: "توريد",
        }

        if(mood == 'create') {
            customer[customer.length-1][tmpICustomer].myCustomer.details.push(newClient);
            let data = customer[customer.length-1][tmpICustomer].myCustomer;
            // customer[tmpIdDelete] = objUsers;
            // ipcRenderer.send('update-allUsers',objUsers)
            // console.log(data)
            // console.log(tmpCustomer)
            // console.log(tmpICustomer)

            ipcRenderer.send('update-customerSupply',{...data, tmpCustomer})
            window.location.reload();


        }else{
            // console.log(client[client.length-1][tmpI].myCustomer.details[tmpX])
            client[client.length-1][tmpI].myCustomer.details[tmpX] = newClient;
            // console.log(client[client.length-1][tmpI].myCustomer.details[tmpX])
            let data = client[client.length-1][tmpI].myCustomer;

            // ipcRenderer.send('myRecycleBin',newClient)
            ipcRenderer.send('update2-customerSuppUpdate',{...data, tmp})

            // ipcRenderer.send('editData', {...newClient, tmp})
            mood = 'create';
            
            window.location.reload();

            
        }


    }

    showEmployees();
})


// let numIndex = [];


let totalSupply = 0;
let paidSupply = 0;
let remainSupply = 0;
let remainReport2 = 0;
function showEmployees() {
    let tableEmployees = '';
    let tableReport = '';
    totalSupply = 0;
    ipcRenderer.send('get-customer', 'bing')
    ipcRenderer.on('get-customer',(e,args)=>{
        const myEmployees = JSON.parse(args);
        client.push(myEmployees);
        tableEmployees = '';
        tableReport = '';

        for(let i=0; i<client[client.length-1].length;i++){
            if(client[client.length-1][i].myCustomer.state == "مفتوح" ){
                for(let x=0; x<client[client.length-1][i].myCustomer.details.length;x++){
                    if(client[client.length-1][i].myCustomer.details[x].state == "open" && client[client.length-1][i].myCustomer.details[x].typeAdd == "توريد" ){
        
                        document.querySelector('.priceReport1').innerHTML = totalSupply;
                        remainReport2 += +client[client.length-1][i].myCustomer.details[x].price - +client[client.length-1][i].myCustomer.details[x].paid;
                        totalSupply += +client[client.length-1][i].myCustomer.details[x].price;
                        paidSupply += +client[client.length-1][i].myCustomer.details[x].paid;
                        remainSupply = totalSupply - paidSupply;
        
                        tableEmployees += `
                            <tr>
                                <td>${client[client.length-1][i].myCustomer.details[x].date}</td>
                                <td>${client[client.length-1][i].myCustomer.details[x].codeCustomer}</td>
                                <td>${client[client.length-1][i].myCustomer.details[x].nameCustomer}</td>
                                <td>${client[client.length-1][i].myCustomer.details[x].nameProject}</td>
                                <td>${client[client.length-1][i].myCustomer.details[x].title}</td>
                                <td>${client[client.length-1][i].myCustomer.details[x].price}</td>
                                <td>${client[client.length-1][i].myCustomer.details[x].notes}</td>
                                <td><button onclick="updateEmployee('${client[client.length-1][i]._id}','${i}','${x}');">تعديل</button></td>
                                <td><button onclick="deleteEmployee('${client[client.length-1][i]._id}','${i}','${x}');">حذف</button></td>
                            </tr>
                            `
                        tableReport += `
                            <tr>
                                <td>${client[client.length-1][i].myCustomer.details[x].date}</td>
                                <td>${client[client.length-1][i].myCustomer.details[x].codeCustomer}</td>
                                <td>${client[client.length-1][i].myCustomer.details[x].nameCustomer}</td>
                                <td>${client[client.length-1][i].myCustomer.details[x].nameProject}</td>
                                <td>${client[client.length-1][i].myCustomer.details[x].title}</td>
                                <td>${client[client.length-1][i].myCustomer.details[x].price}</td>
                            </tr>
                            `
                    }        
                }
              
               
               
            }
            
            
            
        }
        
        tableEmployees += `
            <tr>
                <td colspan="5">الاجمالي</td>
                <td>${totalSupply}</td>
                
                
            </tr>
            `
        tableReport += `
            <tr>
                <td colspan="6">الاجمالي</td>
                <td>${totalSupply}</td>
                
                
            </tr>
            `
        document.querySelector('.tbodyEmployees').innerHTML = tableEmployees;
        document.querySelector('.tbodyReport').innerHTML = tableReport;
        document.querySelector('.totalSupply').innerHTML = totalSupply;
        document.querySelector('.totalReport1').innerHTML = totalSupply;
        document.querySelector('.paidReport1').innerHTML = paidSupply;
        document.querySelector('.remainReport1').innerHTML = remainSupply;
        totalSupply = 0;
        remainReport2 = 0;
        paidSupply = 0;
        remainSupply = 0;
    })
}
showEmployees();


// get Id to data

let tmpI;
let tmpX;
function updateEmployee(id,y,z) {
    for(let x=0; x<users.length;x++){
        if(userName.innerHTML == users[x].user && (users[x].job == 'it' || users[x].job == 'مدير')){
            document.querySelector('.addEmployee').style.display = "block";
            // document.querySelector('.inputs').style.display = "none";
            for(let i=0;i<client[client.length-1].length; i++){
                if(client[client.length-1][i]._id == id){
                    let myClient = client[client.length-1][i].myCustomer.details[z];
                    dateContract.value = myClient.date;
                    codeCustomer.value = myClient.codeCustomer;
                    nameClient.value = myClient.nameCustomer;
                    nameProject.value = myClient.nameProject;
                    title.value = myClient.title;
                    priceSupply.value = myClient.price;
                    paid.value = myClient.paid;
                    notes.value = myClient.notes;

                    nameClient.focus();
                    scroll({
                        top:0,
                        behavior: "smooth",
                    })
                    mood = 'update';
                    tmpI = i;
                    tmpX = z;
                    tmp = id;
                    console.log(tmp)
                    document.querySelector('.createEmpl').innerHTML = 'تحديث بيانات';
                }    
            }
        }
    }
       
 
}

let tmpIdDelete1;
let tmpIDelete1;
let tmpXDelete1;
function deleteEmployee(id,i,z){
    for(let x=0; x<users.length;x++){
        if(userName.innerHTML == users[x].user && (users[x].job == 'it' || users[x].job == 'مدير')){
            document.querySelector('.alarm1').style.display = 'block';
            tmpIdDelete1 = id;
            tmpIDelete1 = i;
            tmpXDelete1 = z;
            document.querySelector("#inputPass").focus();
        }
    }
}

let moodBtn = "open";
function checkPass1(){
    let data;
    // console.log(client[client.length-1])
    if(document.querySelector("#inputPass").value == "100"){
        
        for(let i=0;i<client[client.length-1].length; i++){
            if(client[client.length-1][i]._id == tmpIdDelete1){   
                console.log(client[client.length-1][i].myCustomer.details[tmpXDelete1].state)             
                client[client.length-1][i].myCustomer.details[tmpXDelete1].state = "delete";
                console.log(client[client.length-1][i].myCustomer.details[tmpXDelete1].state)             
                data = client[client.length-1][i].myCustomer;
                console.log(client[client.length-1][i].myCustomer)             
                ipcRenderer.send('update2-customerSuppDelete',{...data, tmpIdDelete1})
                window.location.reload();
            }
    
        }

        // ipcRenderer.send('myRecycleBin',data)
        // ipcRenderer.send('delete-client',tmpIdDelete1)
        // showEmployees();
    }else{
        document.querySelector("#inputPass").value = "الباسوورد خطأ";
    }

    
    
}


function showRecycleBin() {
    for(let x=0; x<users.length;x++){
        if(userName.innerHTML == users[x].user && (users[x].job == 'it' || users[x].job == 'مدير')){
            let tableEmployees = '';
            totalSupply = 0;
            ipcRenderer.send('get-customer', 'bing')
            ipcRenderer.on('get-customer',(e,args)=>{
                const myEmployees = JSON.parse(args);
                client.push(myEmployees);
                tableEmployees = '';
                
                for(let i=0; i<client[client.length-1].length;i++){
                    for(let x=0; x<client[client.length-1][i].myCustomer.details.length;x++){
                        if(client[client.length-1][i].myCustomer.details[x].state == "delete"){
                            totalSupply += +client[client.length-1][i].myCustomer.details[x].price;
                            tableEmployees += `
                                <tr>
                                    <td>${client[client.length-1][i].myCustomer.details[x].date}</td>
                                    <td>${client[client.length-1][i].myCustomer.details[x].codeCustomer}</td>
                                    <td>${client[client.length-1][i].myCustomer.details[x].nameCustomer}</td>
                                    <td>${client[client.length-1][i].myCustomer.details[x].nameProject}</td>
                                    <td>${client[client.length-1][i].myCustomer.details[x].title}</td>
                                    <td>${client[client.length-1][i].myCustomer.details[x].price}</td>
                                    <td>${client[client.length-1][i].myCustomer.details[x].notes}</td>
                                    <td><button onclick="returnData('${client[client.length-1][i]._id}','${i}','${x}');">استعادة</button></td>
                                    <td></td>
                                </tr>
                                `
                        }
                        
                    }

                }
               
                 
                document.querySelector('.tbodyEmployees').innerHTML = tableEmployees;
                document.querySelector('.totalSupply').innerHTML = totalSupply;
                // document.querySelector('.btnRecyleBin').innerHTML = "جميع التوريدات";

                totalSupply = 0;
            })
        }
    }
    
}

function returnData(id,i,x){
    
    
    if(client[client.length-1][i]._id == id){
        // console.log(client[client.length-1][i].myCustomer.details[x].state)
        client[client.length-1][i].myCustomer.details[x].state = "open";
        // console.log(client[client.length-1][i].myCustomer.details[x].state)
        data = client[client.length-1][i].myCustomer;
        // console.log(client[client.length-1][i].myCustomer)
        ipcRenderer.send('update-customerRestoreSupp',{...data, id})
        refresh();
    }

    
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


let search = document.querySelector("#search");
function searchData(value) {
    let tableEmployees = '';
    totalSupply = 0;

    ipcRenderer.send('get-customer', 'bing')
    ipcRenderer.on('get-customer',(e,args)=>{
        const myEmployees = JSON.parse(args);
        client.push(myEmployees);
        tableEmployees = '';
        tableReport = '';
        for(let i=0; i<client[client.length-1].length;i++){
            for(let x=0; x<client[client.length-1][i].myCustomer.details.length;x++){
                if(search.value == ""){
                    // console.log("kkk")typeAdd
                    if(client[client.length-1][i].myCustomer.state == "مفتوح" && client[client.length-1][i].myCustomer.details[x].typeAdd == "توريد" &&  client[client.length-1][i].myCustomer.details[x].date >= searchFrom.value && client[client.length-1][i].myCustomer.details[x].date <= searchTo.value){
                        document.querySelector('.priceReport1').innerHTML = totalSupply;
                        document.querySelector('.resultDateFrom').innerHTML = searchFrom.value;
                        document.querySelector('.resultDateTo').innerHTML = searchTo.value;
                        // document.querySelector('.codeCustomer').innerHTML = client[client.length-1][i].myClient.codeCustomer;;
    
                        // remainReport2 += +client[client.length-1][i].myCustomer.details[x].price - +client[client.length-1][i].myCustomer.details[x].paid;
                        totalSupply += +client[client.length-1][i].myCustomer.details[x].price;
                        // paidSupply += +client[client.length-1][i].myClient.paid;
                        // remainSupply = totalSupply - paidSupply;
    
                        tableEmployees +=
                            `
                            <tr>
                                <td>${client[client.length-1][i].myCustomer.details[x].date}</td>
                                <td>${client[client.length-1][i].myCustomer.details[x].codeCustomer}</td>
                                <td>${client[client.length-1][i].myCustomer.details[x].nameCustomer}</td>
                                <td>${client[client.length-1][i].myCustomer.details[x].nameProject}</td>
                                <td>${client[client.length-1][i].myCustomer.details[x].title}</td>
                                <td>${client[client.length-1][i].myCustomer.details[x].price}</td>
                                
                                <td>${client[client.length-1][i].myCustomer.details[x].notes}</td>
                                <td><button onclick="updateEmployee('${client[client.length-1][i]._id}');">تعديل</button></td>
                                <td><button onclick="deleteEmployee('${client[client.length-1][i]._id}');">حذف</button></td>
                            </tr>
                            `
                        tableReport += `
                        <tr>
                            <td>${client[client.length-1][i].myCustomer.details[x].nameCustomer}</td>
                            <td>${client[client.length-1][i].myCustomer.details[x].date}</td>
                            <td>${client[client.length-1][i].myCustomer.details[x].nameProject}</td>
                            <td>${client[client.length-1][i].myCustomer.details[x].title}</td>
                            <td>${client[client.length-1][i].myCustomer.details[x].price}</td>
                            
                            
                        </tr>
                        `
                    }else{
        
                    }
                   
                }else{
                    if(client[client.length-1][i].myCustomer.state == "مفتوح" && client[client.length-1][i].myCustomer.details[x].typeAdd == "توريد"  && (client[client.length-1][i].myCustomer.code.includes(search.value) &&  client[client.length-1][i].myCustomer.details[x].date >= searchFrom.value && client[client.length-1][i].myCustomer.details[x].date <= searchTo.value)){
                        document.querySelector('.priceReport1').innerHTML = totalSupply;
                        document.querySelector('.nameSupply').innerHTML = client[client.length-1][i].myCustomer.customer;
                        document.querySelector('.resultDateFrom').innerHTML = searchFrom.value;
                        document.querySelector('.resultDateTo').innerHTML = searchTo.value;
                        document.querySelector('.codeCustomer').innerHTML = client[client.length-1][i].myCustomer.code;;
                        // console.log("jjjj")
                        // remainReport2 += +client[client.length-1][i].myClient.priceSupply - +client[client.length-1][i].myClient.paid;
                        totalSupply += +client[client.length-1][i].myCustomer.details[x].price;
                        // paidSupply += +client[client.length-1][i].myClient.paid;
                        // remainSupply = totalSupply - paidSupply;
    
                        tableEmployees += `
                        <tr>
                            <td>${client[client.length-1][i].myCustomer.details[x].date}</td>
                            <td>${client[client.length-1][i].myCustomer.details[x].codeCustomer}</td>
                            <td>${client[client.length-1][i].myCustomer.details[x].nameCustomer}</td>
                            <td>${client[client.length-1][i].myCustomer.details[x].nameProject}</td>
                            <td>${client[client.length-1][i].myCustomer.details[x].title}</td>
                            <td>${client[client.length-1][i].myCustomer.details[x].price}</td>
                           
                            <td>${client[client.length-1][i].myCustomer.details[x].notes}</td>
                            <td><button onclick="updateEmployee('${client[client.length-1][i]._id}');">تعديل</button></td>
                            <td><button onclick="deleteEmployee('${client[client.length-1][i]._id}');">حذف</button></td>
                        </tr>
                        `
                        tableReport += `
                        <tr>
    
                            <td>${client[client.length-1][i].myCustomer.details[x].date}</td>
                            <td>${client[client.length-1][i].myCustomer.details[x].codeCustomer}</td>
                            <td>${client[client.length-1][i].myCustomer.details[x].nameCustomer}</td>
                            <td>${client[client.length-1][i].myCustomer.details[x].nameProject}</td>
                            <td>${client[client.length-1][i].myCustomer.details[x].title}</td>
                            <td>${client[client.length-1][i].myCustomer.details[x].price}</td>
                            
                            
                        </tr>
                        `
                    }else{
        
                    }
                   
                }
            }
           
        }
        
        tableEmployees += `
            <tr>
                <td colspan="5">الاجمالي</td>
                <td>${totalSupply}</td>
                
                
            </tr>
            `
        tableReport += `
            <tr>
                <td colspan="5">الاجمالي</td>
                <td>${totalSupply}</td>
                
                
            </tr>
            `
         
         
        document.querySelector('.tbodyEmployees').innerHTML = tableEmployees;
        document.querySelector('.tbodyReport').innerHTML = tableReport;
        document.querySelector('.totalSupply').innerHTML = totalSupply;
        document.querySelector('.totalReport1').innerHTML = totalSupply;
        document.querySelector('.paidReport1').innerHTML = paidSupply;
        document.querySelector('.remainReport1').innerHTML = remainSupply;
        totalSupply = 0;
        remainReport2 = 0;
        paidSupply = 0;
        remainSupply = 0;
    })
}







function refresh(){
    window.location.reload();
}


function exitePass(){
    window.location.reload();
}

function printReport(){
    document.querySelector("header").style.display = "none";
    document.querySelector('.content').style.width = '100%';
    document.querySelector('aside').style.display = 'none';
    window.print();
    refresh();
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


function exportTableToExcel() {
    // get table
    var table = document.getElementById("table");
    // convert table to excel sheet
    var wb = XLSX.utils.table_to_book(table, {sheet:"التوريدات"});
    // write sheet to blob
    var blob = new Blob([s2ab(XLSX.write(wb, {bookType:'xlsx', type:'binary'}))], {
        type: "application/octet-stream"
    });
    // return sheet file
    return saveAs(blob, "توريدات المشاريع.xlsx");
}

function s2ab(s) {
var buf = new ArrayBuffer(s.length);
var view = new Uint8Array(buf);
for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
return buf;
}