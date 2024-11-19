// variable
const {ipcRenderer} =   require('electron');
const { stat } = require('original-fs');


let addSalary = document.querySelector('#createSalary');
let datePayroll = document.querySelector('#datePayroll');
let paidPay = document.querySelector('#salaryPay');
let inputSalary = document.querySelector('#inputSalary');
let createEmpl = document.querySelector('.createEmpl');
let codeCustomer = document.querySelector('#codeCustomer')


let dateExpenses = document.querySelector('#dateExpenses')
let nameClient = document.querySelector('#name')
let nameProject = document.querySelector('#nameProject')
let quantity = document.querySelector('#quantity')
let item = document.querySelector('#item')
let priceExpenses = document.querySelector('#priceExpenses')
// let rate = document.querySelector('#rate')
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

dateExpenses.value = dateNow;

// expensesDate.value = dateOtherExp.value = dateNow;
let userName = document.querySelector('.userName');
let dateAndTime = document.querySelector('.dateAndTime');
userName.innerHTML = localStorage.getItem('userNameView');
dateAndTime.innerHTML =  dateNow;

let mood = 'create';
let moodBtnShow = 'delete';
let tmp;

let users;
if(localStorage.allUsers != null){
    users = JSON.parse(localStorage.allUsers);
}else{
    users = []
}


let idDatabase;
let expenses = [];


function getId(){
                // console.log(idDatabase)

    ipcRenderer.send('get-expenses', 'bing')
    ipcRenderer.on('get-expenses',(e,args)=>{
                    // console.log(idDatabase)

        const myEmployees = JSON.parse(args);
        expenses.push(myEmployees);
                        // console.log(expenses[expenses.length-1].length)
        if(expenses[expenses.length-1].length != 0){

            for(let i=0;i<expenses[expenses.length-1].length;i++){
                
                    idDatabase = +expenses[expenses.length-1][i]._id +1;

                    // console.log(idDatabase)
               
    // console.log(mE._id)
            }
        }else{
            idDatabase = 1000 +1;
            // console.log(idDatabase)

            // console.log(expenses[expenses.length-1].length)
        }
        
        // console.log(idDatabase)
        
    })
    console.log(idDatabase)
    getCustomer()
}
// getId();
let tmpI;
let tmpX;
let tmpIdCustomer;

let tmpIdCustomerExp;
let tmpICustomerExp;
let tmpXCustomerExp;
let customer = [];
function getData(){
    ipcRenderer.send('get-supplier', 'bing')
    ipcRenderer.on('get-supplier',(e,args)=>{
        const myEmployees = JSON.parse(args);
        customer.push(myEmployees);
        let data = customer[customer.length-1][0];
        localStorage.setItem("mySupplier",JSON.stringify(data))
    })
}
getData();
function getCustomer(){
    

    // let tableEmployees = '';
    nameClient.value = "";
    nameProject.value = "";
    
    for(let i=0;i<customer[customer.length-1].length;i++){
        // console.log(customer[customer.length-1][i].mySupplier.code)
        // for(let x=0;x<customer[customer.length-1][i].mySupplier.details.length;x++){
            if(customer[customer.length-1][i].mySupplier.state == "مفتوح" && customer[customer.length-1][i].mySupplier.code ==  codeCustomer.value){
                nameClient.value = customer[customer.length-1][i].mySupplier.supplier;
                nameProject.value = customer[customer.length-1][i].mySupplier.newProject;
                item.focus();
                tmpIdCustomerExp = customer[customer.length-1][i]._id;
                tmpI = i;
                // tmpX = x;
   
            }
        // }

    }
   
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
            date : dateExpenses.value,
            codeCustomer: codeCustomer.value,
            nameCustomer: nameClient.value,
            nameProject: nameProject.value,
            title: item.value,
            quantity: quantity.value,
            priceOne: priceExpenses.value,
            price: +quantity.value * +priceExpenses.value,
            notes: notes.value,
            state: "open",
            typeAdd: "مصروف",
        }

        if(mood == 'create') {

            console.log(customer[customer.length-1][tmpI].mySupplier.details)
            customer[customer.length-1][tmpI].mySupplier.details.push(newClient);
            console.log(customer[customer.length-1][tmpI].mySupplier.details)
            let data = customer[customer.length-1][tmpI].mySupplier;
            
    
            ipcRenderer.send('update-supplierExpUpdate',{...data, tmpIdCustomerExp})
            window.location.reload();


        }else if(mood == 'update'){
            

            customer[customer.length-1][tmpICustomerExp].mySupplier.details[tmpXCustomerExp] = newClient;
            // console.log(customer[customer.length-1][tmpI].mySupplier.details)
            let data = customer[customer.length-1][tmpICustomerExp].mySupplier;
            
    
            ipcRenderer.send('update-supplierExpUpdate',{...data, tmpIdCustomerExp})
            window.location.reload();


            
        }


    }

    showEmployees();
})


function showEmployees() {
    let tableEmployees = '';
    // totalItem = 0;
    ipcRenderer.send('get-supplier', 'bing')
    ipcRenderer.on('get-supplier',(e,args)=>{
        const myEmployees = JSON.parse(args);
        customer.push(myEmployees);
        tableEmployees = '';
        for(let i=0;i<customer[customer.length-1].length;i++){
            for(let x=0;x<customer[customer.length-1][i].mySupplier.details.length;x++){
                let data = customer[customer.length-1][i].mySupplier.details[x];
                if(customer[customer.length-1][i].mySupplier.details[x].state == "open" && customer[customer.length-1][i].mySupplier.details[x].typeAdd == "مصروف" ){
                    // totalItem = +data.myExpenses.quantity * +data.myExpenses.priceExpenses;
                    tableEmployees += `
                    <tr>
                        <td>${data.codeCustomer}</td>
                        <td>${data.nameCustomer}</td>
                        <td>${data.nameProject}</td>
                        <td>${data.date}</td>
                        <td>${data.title}</td>
                        <td>${data.quantity}</td>
                        <td>${data.priceOne}</td>
                        <td>${data.price}</td>
                        <td>${data.notes}</td>
                        <td><button onclick="updateEmployee('${customer[customer.length-1][i]._id}','${i}','${x}');">تعديل</button></td>
                        <td><button onclick="deleteEmployee('${customer[customer.length-1][i]._id}','${i}','${x}');">حذف</button></td>
                    </tr>
                    `
                }

            }
        }
       
         
        document.querySelector('.tbodyEmployees').innerHTML = tableEmployees;
    })
}
showEmployees();


function updateEmployee(id,y,z) {
    for(let x=0; x<users.length;x++){
        if(userName.innerHTML == users[x].user && (users[x].job == 'it' || users[x].job == 'مدير')){
            document.querySelector('.addEmployee').style.display = "block";
            document.querySelector('.inputs').style.display = "none";

            for(let i=0;i<customer[customer.length-1].length; i++){
                if(customer[customer.length-1][i]._id == id){
                    let data = customer[customer.length-1][i].mySupplier.details[z];
                    codeCustomer.value = data.codeCustomer;
                    dateExpenses.value = data.date;
                    nameClient.value = data.nameCustomer;
                    nameProject.value = data.nameProject;
                    item.value = data.title;
                    quantity.value = data.quantity;
                    priceExpenses.value = data.priceOne;
                    notes.value = data.notes;
                    nameClient.focus();
                    scroll({
                        top:0,
                        behavior: "smooth",
                    })
                    mood = 'update';
                    tmpIdCustomerExp = id;
                    tmpICustomerExp = i;
                    tmpXCustomerExp = z;
                    document.querySelector('.createEmpl').innerHTML = 'تحديث بيانات';
                }
        }
        }
    }
       
 
}

let tmpIdDeleteExp;
let tmpIDeleteExp;
let tmpXDeleteExp;
function deleteEmployee(id,i,z){
    for(let x=0; x<users.length;x++){
        if(userName.innerHTML == users[x].user && (users[x].job == 'it' || users[x].job == 'مدير')){
            document.querySelector('.alarm1').style.display = 'block';
            tmpIdDeleteExp = id;
            tmpXDeleteExp = z;
            document.querySelector("#inputPass").focus();
        }
    }
}


function checkPass1(){
    let data;
    
    if(document.querySelector("#inputPass").value == "100"){
        for(let i=0;i<customer[customer.length-1].length; i++){
            // console.log(tmpXDeleteExp)
            // console.log(customer[customer.length-1][i].mySupplier.details[tmpXDeleteExp])
            // console.log(customer[customer.length-1][i]._id)
            // console.log(tmpIdDeleteExp)
            if(customer[customer.length-1][i]._id == tmpIdDeleteExp){
                // console.log(customer[customer.length-1][i].mySupplier.details[tmpXDeleteExp])

                // console.log(customer[customer.length-1][i].mySupplier.details[tmpXDeleteExp])
                customer[customer.length-1][i].mySupplier.details[tmpXDeleteExp].state = "delete";
                // console.log(customer[customer.length-1][i].mySupplier.details[tmpXDeleteExp])
                data = customer[customer.length-1][i].mySupplier;
                ipcRenderer.send('update-supplierExpUpdate',{...data, tmpIdDeleteExp})
        
                // ipcRenderer.send('myRecycleBin',data)
                // ipcRenderer.send('delete-client',tmpIdDelete1)
                window.location.reload();
            }
    
        }
        showEmployees();
    }else{
        document.querySelector("#inputPass").value = "الباسوورد خطأ";
    }

    
    
}


let client = [];
let totalItem = 0;

function showRecycleBin() {
    for(let x=0; x<users.length;x++){
        if(userName.innerHTML == users[x].user && (users[x].job == 'it' || users[x].job == 'مدير')){
            let tableEmployees = '';
            ipcRenderer.send('get-supplier', 'bing')
            ipcRenderer.on('get-supplier',(e,args)=>{
                const myEmployees = JSON.parse(args);
                customer.push(myEmployees);
                tableEmployees = '';
                if(moodBtnShow == "delete"){

                    for(let i=0;i<customer[customer.length-1].length;i++){
                        for(let x=0;x<customer[customer.length-1][i].mySupplier.details.length;x++){
                            let data = customer[customer.length-1][i].mySupplier.details[x];
                            if(customer[customer.length-1][i].mySupplier.details[x].state == "delete" && customer[customer.length-1][i].mySupplier.details[x].typeAdd == "مصروف" ){
                                // totalItem = +data.myExpenses.quantity * +data.myExpenses.priceExpenses;
                                tableEmployees += `
                                <tr>
                                    <td>${data.codeCustomer}</td>
                                    <td>${data.nameCustomer}</td>
                                    <td>${data.nameProject}</td>
                                    <td>${data.date}</td>
                                    <td>${data.title}</td>
                                    <td>${data.quantity}</td>
                                    <td>${data.priceOne}</td>
                                    <td>${data.price}</td>
                                    <td>${data.notes}</td>
                                    <td><button onclick="returnData('${customer[customer.length-1][i]._id}','${i}','${x}');">استعادة</button></td>
                                    <td></td>
                                </tr>
                                `
                            }
            
                        }
                    }
                    moodBtnShow = "show";
                    document.querySelector(".btnShowData").innerHTML = "عرض الصاريف";
                }else{
                    for(let i=0;i<customer[customer.length-1].length;i++){
                        for(let x=0;x<customer[customer.length-1][i].mySupplier.details.length;x++){
                            let data = customer[customer.length-1][i].mySupplier.details[x];
                            if(customer[customer.length-1][i].mySupplier.details[x].state == "open" && customer[customer.length-1][i].mySupplier.details[x].typeAdd == "مصروف" ){
                                // totalItem = +data.myExpenses.quantity * +data.myExpenses.priceExpenses;
                                tableEmployees += `
                                <tr>
                                    <td>${data.nameCustomer}</td>
                                    <td>${data.nameProject}</td>
                                    <td>${data.date}</td>
                                    <td>${data.title}</td>
                                    <td>${data.quantity}</td>
                                    <td>${data.priceOne}</td>
                                    <td>${data.price}</td>
                                    <td>${data.notes}</td>
                                    <td><button onclick="updateEmployee('${customer[customer.length-1][i]._id}','${i}','${x}');">تعديل</button></td>
                                    <td><button onclick="deleteEmployee('${customer[customer.length-1][i]._id}','${i}','${x}');">حذف</button></td>
                                </tr>
                                `
                            }
            
                        }
                    }
                    moodBtnShow = "delete";
                    document.querySelector(".btnShowData").innerHTML = "المحذوفات";
                }
               
                 
                document.querySelector('.tbodyEmployees').innerHTML = tableEmployees;
            })
            // ipcRenderer.send('get-expenses', 'bing')
            // ipcRenderer.on('get-expenses',(e,args)=>{
            //     const myEmployees = JSON.parse(args);
            //     expenses.push(myEmployees);
            //     tableEmployees = '';
            //     for(let i=0;i<expenses[expenses.length-1].length;i++){
            //         let data = expenses[expenses.length-1][i];
            //         if(data.myExpenses.state == "delete"){
            //             tableEmployees += `
            //             <tr>
            //                 <td>${i+1}</td>
            //                 <td>${data.myExpenses.nameClient}</td>
            //                 <td>${data.myExpenses.nameProject}</td>
            //                 <td>${data.myExpenses.dateExpenses}</td>
            //                 <td>${data.myExpenses.item}</td>
            //                 <td>${data.myExpenses.quantity}</td>
            //                 <td>${data.myExpenses.priceExpenses}</td>
            //                 <td>${totalItem}</td>
            //                 <td>${data.myExpenses.notes}</td>
            //                 <td><button onclick="returnData('${data._id}');">استعادة</button></td>
            //                 <td></td>
            //             </tr>
            //             `
            //         }
            //     }
            //     // myEmployees.map(mE=>{
                   
                   
            //     // })
                 
            //     document.querySelector('.tbodyEmployees').innerHTML = tableEmployees;
            // })
        }
    }
    
}

function returnData(id,i,x){
    let data;
    for(let i=0;i<customer[customer.length-1].length; i++){
        if(customer[customer.length-1][i]._id == id){
            
            customer[customer.length-1][i].mySupplier.details[x].state = "open";
            data = customer[customer.length-1][i].mySupplier;
            ipcRenderer.send('update-supplierRestoreExp',{...data, id})
            refresh();
        }

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
    document.querySelector('.buttons').style.display = 'none';
    window.print();
    window.location.reload();
}
function exiteTable(){
    document.querySelector('.tablePrint').style.display = 'none';
    document.querySelector('.app').style.display = 'block';
}




function searchData(value) {
    let tableEmployees = '';

    ipcRenderer.send('get-supplier', 'bing')
    ipcRenderer.on('get-supplier',(e,args)=>{
        const myEmployees = JSON.parse(args);
        client.push(myEmployees);
        tableEmployees = '';
        for(let i=0;i<customer[customer.length-1].length;i++){
            for(let x=0;x<customer[customer.length-1][i].mySupplier.details.length;x++){
                let data = customer[customer.length-1][i].mySupplier.details[x];
                if(customer[customer.length-1][i].mySupplier.state == "مفتوح" && data.typeAdd == "مصروف" &&(data.nameProject.includes(value) ||  data.nameCustomer.includes(value) || data.codeCustomer.includes(value))){
                    // totalItem = +data.myExpenses.quantity * +data.myExpenses.priceExpenses;
                    tableEmployees += `
                    <tr>
                        <td>${data.codeCustomer}</td>
                        <td>${data.nameCustomer}</td>
                        <td>${data.nameProject}</td>
                        <td>${data.date}</td>
                        <td>${data.title}</td>
                        <td>${data.quantity}</td>
                        <td>${data.priceOne}</td>
                        <td>${data.price}</td>
                        <td>${data.notes}</td>
                        <td><button onclick="updateEmployee('${customer[customer.length-1][i]._id}','${i}','${x}');">تعديل</button></td>
                        <td><button onclick="deleteEmployee('${customer[customer.length-1][i]._id}','${i}','${x}');">حذف</button></td>                        <td></td>
                    </tr>
                    `
                }

            }
        }
        // myEmployees.map(mE=>{
        //     if(mE.myClient.state == "open" && mE.myClient.nameProject.includes(value) ||  mE.myClient.nameClient.includes(value) ){
        //         tableEmployees += `
        //         <tr>
        //             <td>${mE.myClient.nameClient}</td>
        //             <td>${mE.myClient.nameProject}</td>
        //             <td>${mE.myClient.dateContract}</td>
        //             <td>${mE.myClient.address}</td>
        //             <td>${mE.myClient.phone}</td>
        //             <td>${mE.myClient.priceProject}</td>
        //             <td>${mE.myClient.rate}</td>
        //             <td>${mE.myClient.notes}</td>
        //             <td><button onclick="updateEmployee('${mE._id}');">تعديل</button></td>
        //             <td><button onclick="deleteEmployee('${mE._id}');">حذف</button></td>
        //         </tr>
        //         `
        //     }else{

        //     }
           
        // })
         
        document.querySelector('.tbodyEmployees').innerHTML = tableEmployees;
    })
}







function refresh(){
    window.location.reload();
}


function exitePass(){
    window.location.reload();
}



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


function exportTableToExcel() {
    // get table
    var table = document.getElementById("table");
    // convert table to excel sheet
    var wb = XLSX.utils.table_to_book(table, {sheet:"صرف الموردين"});
    // write sheet to blob
    var blob = new Blob([s2ab(XLSX.write(wb, {bookType:'xlsx', type:'binary'}))], {
        type: "application/octet-stream"
    });
    // return sheet file
    return saveAs(blob, "تقرير صرف الموردين.xlsx");
}

// function exportTableToExcel2() {
//     // get table
//     var table = document.getElementById("table2");
//     // convert table to excel sheet
//     var wb = XLSX.utils.table_to_book(table, {sheet:"Customer Report"});
//     // write sheet to blob
//     var blob = new Blob([s2ab(XLSX.write(wb, {bookType:'xlsx', type:'binary'}))], {
//         type: "application/octet-stream"
//     });
//     // return sheet file
//     return saveAs(blob, "تقرير تفاصيل العهدة.xlsx");
// }

function s2ab(s) {
var buf = new ArrayBuffer(s.length);
var view = new Uint8Array(buf);
for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
return buf;
}