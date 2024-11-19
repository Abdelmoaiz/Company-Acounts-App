// variable
const {ipcRenderer} =   require('electron');
const { stat } = require('original-fs');


let addSalary = document.querySelector('#createSalary');
let datePayroll = document.querySelector('#datePayroll');
let paidPay = document.querySelector('#salaryPay');
let inputSalary = document.querySelector('#inputSalary');
let createEmpl = document.querySelector('.createEmpl');
let codeCustomer = document.querySelector('#codeCustomer')


let searchFrom = document.querySelector('#searchFrom');
let searchTo = document.querySelector('#searchTo');
let dateReport = document.querySelector('.dateReport');

let search = document.querySelector('#search')
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
let labelDate = document.querySelector('.labelDate');

if(date.getMonth()+1 < 10 && date.getDate() < 10) {
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
}else if(date.getMonth()+1 < 10 && date.getDate() >= 10){
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
}else if(date.getMonth()+1 >= 10 && date.getDate() < 10){
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;
}else{
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}
dateReport.innerHTML= searchTo.value = dateNow;
let monthNow;
if(date.getMonth()+1 < 10) {
    monthNow = `${date.getFullYear()}-0${date.getMonth()+1}`;
}else{
    monthNow = `${date.getFullYear()}-${date.getMonth()+1}`;
}
let userReport = document.querySelector('.userReport');
let timeReport = document.querySelector('.timeReport');
timeReport .innerHTML = `${date.getHours()}:${date.getMinutes()+1}:${date.getSeconds()}`;



// expensesDate.value = dateOtherExp.value = dateNow;
let userName = document.querySelector('.userName');
let dateAndTime = document.querySelector('.dateAndTime');
userName.innerHTML = userReport.innerHTML = localStorage.getItem('userNameView');
dateAndTime.innerHTML =  dateNow;

let mood = 'create';
let tmp;

let users;
if(localStorage.allUsers != null){
    users = JSON.parse(localStorage.allUsers);
}else{
    users = []
}

let allData = [];


let idDatabase;
let expenses = [];

function openInputsSearch(){
    document.querySelector('.inputsSearch2').style.display = "flex";
    // document.querySelector('.buttons').style.display = "none";
}

// getId();
let nameSupply = '' ;
let dateSupply = '';
let totalSupply = "";
let paidSupply = "";
let remainSupply = "";
let remainReport2 = 0;
let client = [];
let allProject = [];
let y;

function getSupplier(){
    totalSupply = 0;
    paidSupply = 0;
    remainSupply = 0;

    let tableEmployees = '';
    let tableEmployees2 = '';

    // nameClient.value = "";
    // nameProject.value = "";
    ipcRenderer.send('get-supplier', 'bing')
    ipcRenderer.on('get-supplier',(e,args)=>{
        const myEmployees = JSON.parse(args);
        client.push(myEmployees);

        tableEmployees = '';
        tableEmployees2 = '';

        // let data = client[client.length-1];
        // for(let i=0;i<data.length;i++){
        //     if(codeCustomer.value == data[i].mySupplier.codeSupplier){
        //         remainReport2 += +client[client.length-1][i].mySupplier.priceSupply - +client[client.length-1][i].mySupplier.paid;
        //         nameSupply = data[i].myClient.nameProject;
        //         dateSupply = data[i].myClient.dateContract;
        //         nameClient.value = data[i].myClient.nameClient;
        //         totalSupply += +client[client.length-1][i].myClient.priceSupply;
        //         paidSupply += +client[client.length-1][i].myClient.paid;
        //         remainSupply = totalSupply - paidSupply;
                
                
        //     }
        // }

        
        // document.querySelector('.nameProjectTab').innerHTML = nameSupply;
        // document.querySelector('.totalPrice').innerHTML = totalSupply;

        // myEmployees.map(mE=>{
        //     if(mE.myCustomer.code ==  codeCustomer.value){
                
   
        //     }

        // })
          
       
       
        totalSupply = 0;
        paidSupply = 0;
        remainSupply = 0;
    })
    // showDetails(value)
}
getSupplier();

// let customer = [];
// function showProjects() {
//     let tableEmployees1 = '';
//     let tableEmployees2 = '';

//     ipcRenderer.send('get-customer', 'bing')
//     ipcRenderer.on('get-customer',(e,args)=>{
//         const myEmployees = JSON.parse(args);
//         customer.push(myEmployees);
        
//         tableEmployees1 = '';
//         tableEmployees2 = '';
        
         
       
//     })
// }
// showProjects();



// function showContarcts() {
//     let tableEmployees = '';
//     let tableReport = '';
//     totalSupply = 0;
//     ipcRenderer.send('get-clientSupply', 'bing')
//     ipcRenderer.on('get-clientSupply',(e,args)=>{
//         const myEmployees = JSON.parse(args);
//         client.push(myEmployees);
//         allData.push(myEmployees)
//         tableEmployees = '';
//         tableReport = '';

//         for(let i=0; i<client[client.length-1].length;i++){
//             fff(i,y)
//             if(client[client.length-1][i].myClient.state == "open"){
                
//                 // document.querySelector('.priceReport1').innerHTML = totalSupply;
//                 remainReport2 += +client[client.length-1][i].myClient.priceSupply - +client[client.length-1][i].myClient.paid;
//                 totalSupply += +client[client.length-1][i].myClient.priceSupply;
//                 paidSupply += +client[client.length-1][i].myClient.paid;
//                 remainSupply = totalSupply - paidSupply;

//                 tableEmployees += `
//                     <tr>
//                         <td>${i+1}</td>
//                         <td>${client[client.length-1][i].myClient.dateContract}</td>
//                         <td>${client[client.length-1][i].myClient.codeCustomer}</td>
//                         <td>${client[client.length-1][i].myClient.nameClient}</td>
//                         <td>${client[client.length-1][i].myClient.nameProject}</td>
//                         <td>${client[client.length-1][i].myClient.title}</td>
//                         <td>${client[client.length-1][i].myClient.priceSupply}</td>
                        
//                     </tr>
//                     `
//                 // tableReport += `
//                 //     <tr>
//                 //         <td>${i+1}</td>
//                 //         <td>${client[client.length-1][i].myClient.dateContract}</td>
//                 //         <td>${client[client.length-1][i].myClient.codeCustomer}</td>
//                 //         <td>${client[client.length-1][i].myClient.nameClient}</td>
//                 //         <td>${client[client.length-1][i].myClient.nameProject}</td>
//                 //         <td>${client[client.length-1][i].myClient.title}</td>
//                 //         <td>${client[client.length-1][i].myClient.priceSupply}</td>
                        
//                 //     </tr>
//                 //     `
//             }       
//         }
        
//         tableEmployees += `
//             <tr>
//                 <td colspan="6">الاجمالي</td>
//                 <td>${totalSupply}</td>
               
                
//             </tr>
//             `
//         tableReport += `
//             <tr>
//                 <td colspan="6">الاجمالي</td>
//                 <td>${totalSupply}</td>
                
                
//             </tr>
//             `
         
//         // document.querySelector('.tbodyAllContract').innerHTML = tableEmployees;
//         // document.querySelector('.tbodyReport').innerHTML = tableReport;
//         // document.querySelector('.totalSupply').innerHTML = totalSupply;
//         // document.querySelector('.totalReport1').innerHTML = totalSupply;
//         // document.querySelector('.paidReport1').innerHTML = paidSupply;
//         // document.querySelector('.remainReport1').innerHTML = remainSupply;
//         totalSupply = 0;
//         remainReport2 = 0;
//         paidSupply = 0;
//         remainSupply = 0;
//     })
    
// }
// showContarcts();
// function fff(y){
//     // console.log(y)

// }
// fff();


// let totalExpenses = 0;
// function showSupplier() {
//     let tableEmployees2 = '';
//     totalItem = 0;
//     totalExpenses = 0;
//     ipcRenderer.send('get-expenses', 'bing')
//     ipcRenderer.on('get-expenses',(e,args)=>{
//         const myEmployees = JSON.parse(args);
//         expenses.push(myEmployees);
//         allData.push(myEmployees)

//         tableEmployees2 = '';
//         for(let i=0;i<expenses[expenses.length-1].length;i++){
//             let data = expenses[expenses.length-1][i];
//             // if(value == data.myExpenses.codeCustomer){

//                 if(data.myExpenses.nameClient != ""){
//                     totalItem = +data.myExpenses.quantity * +data.myExpenses.priceExpenses;
//                     totalExpenses += +totalItem;
//                     tableEmployees2 += `
//                     <tr>
//                         <td>${i+1}</td>
//                         <td>${data.myExpenses.codeCustomer}</td>
//                         <td>${data.myExpenses.nameClient}</td>
//                         <td>${data.myExpenses.nameProject}</td>
//                         <td>${data.myExpenses.dateExpenses}</td>
//                         <td>${data.myExpenses.item}</td>
//                         <td>${data.myExpenses.quantity}</td>
//                         <td>${data.myExpenses.priceExpenses}</td>
//                         <td>${totalItem}</td>
                        
//                     </tr>
//                     `
//                 }
//             // }
//         }
//         // document.querySelector('.totalPaid').innerHTML = totalExpenses;
//         // document.querySelector('.totalRemain').innerHTML = +document.querySelector('.totalPrice').innerHTML - +totalExpenses;

//         // document.querySelector('.tbodyExpenses').innerHTML = tableEmployees2;
//         totalExpenses = 0;
//         totalItem = 0;
//     })

// }
// showExpenses();




function searchData() {
    let tableEmployees = '';
    let tableEmployees2 = '';
    totalSupply = 0;
    remainReport2 = 0;
    paidSupply = 0;
    remainSupply = 0;
    ipcRenderer.send('get-supplier', 'bing')
    ipcRenderer.on('get-supplier',(e,args)=>{
        const myEmployees = JSON.parse(args);
        client.push(myEmployees);
        tableEmployees = '';
        tableEmployees2 = '';
        tableReport = '';
        // console.log(client[client.length-1][0].myClient.dateContract)
        // console.log(client[client.length-1][0].myClient.state)

        let z;
        let y;
        if(search.value != ""){

            for(let i=0; i<client[client.length-1].length;i++){
                for(let x=0; x<client[client.length-1][i].mySupplier.details.length;x++){

                    if(client[client.length-1][i].mySupplier.details[x].date < searchFrom.value){
                        totalSupply += +client[client.length-1][i].mySupplier.details[x].price;
                        console.log(client[client.length-1][i].mySupplier.details[x].date)
                        // // if(client[client.length-1][i].mySupplier.details[x].typeAdd == "توريد"){
                        // }else{
                        //     totalExpenses += +client[client.length-1][i].mySupplier.details[x].price;
                        // }

                        // document.querySelector('.priceBack').innerHTML = +totalSupply - +totalExpenses;

                    }
                    if((client[client.length-1][i].mySupplier.code.includes(search.value) &&  client[client.length-1][i].mySupplier.details[x].date >= searchFrom.value && client[client.length-1][i].mySupplier.details[x].date <= searchTo.value) ){
                        // allData.push(client[client.length-1][i])
                        totalSupply += +client[client.length-1][i].mySupplier.details[x].price;

                        document.querySelector('.nameSupply').innerHTML = client[client.length-1][i].mySupplier.supplier;
                        document.querySelector('.nameProject').innerHTML = client[client.length-1][i].mySupplier.newProject;
                        document.querySelector('.resultDateFrom').innerHTML = searchFrom.value;
                        document.querySelector('.resultDateTo').innerHTML = searchTo.value;
                        document.querySelector('.codeCustomer').innerHTML = client[client.length-1][i].mySupplier.code;
                        document.querySelector('.typeSupplier').innerHTML = client[client.length-1][i].mySupplier.typeSupplier;
                        document.querySelector('.totalSupplierTop').innerHTML = totalSupply;
                        
                        // remainReport2 += +customer[customer.length-1][i].myCustomer.details[x].price - +client[client.length-1][i].myClient.paid;
                        // totalSupply += ++customer[customer.length-1][i].myCustomer.details[x].price;
                        // paidSupply += +client[client.length-1][i].myClient.paid;
                        // remainSupply = totalSupply - paidSupply;
                        // document.querySelector('.totalPaidTop').innerHTML = totalSupply;
                        
                        if(client[client.length-1][i].mySupplier.details[x].state == "مفتوح"){
                            totalSupply += +client[client.length-1][i].mySupplier.details[x].price;

                            tableReport += `
                            <tr>
                                <td>${x+1}</td>
        
                                <td>${client[client.length-1][i].mySupplier.details[x].date}</td>
                                
                                <td>${client[client.length-1][i].mySupplier.details[x].title}</td>
                                <td></td>
                                <td>${client[client.length-1][i].mySupplier.details[x].price}</td>
                                <td>${+totalSupply }</td>
        
                                
                                
                            </tr>
                            `
                        }else{
                            // totalExpenses += +client[client.length-1][i].mySupplier.details[x].price;
                            tableReport += `
                            <tr>
                                <td>${x+1}</td>
        
                                <td>${client[client.length-1][i].mySupplier.details[x].date}</td>
                                
                                <td>${client[client.length-1][i].mySupplier.details[x].title}</td>
                                <td>${client[client.length-1][i].mySupplier.details[x].price}</td>
                                <td>${+totalSupply}</td>
        
                                
                                
                            </tr>
                            `

                        }
                        
                        
                       
                    }else {
                    }
                    z=x;
                }
                     
                    
            }
        }
        else{
            console.log(client[client.length-1][0].mySupplier.details[0])

        }
        // console.log(client[client.length-1])

                // console.log(customer[customer.length-1][0].myCustomer.details)

           
           
           
        

        
        // tableEmployees += `
        //     <tr>
        //         <td colspan="7">الاجمالي</td>
        //         <td>${totalSupply}</td>
                
                
        //     </tr>
        //     `
        // tableEmployees2 += `
        //     <tr>
        //         <td colspan="8">الاجمالي</td>
        //         <td>${totalExpenses}</td>
                
                
        //     </tr>
        //     `
        tableReport += `
            <tr>
                <td class="tdNoBorder"></td>
                <td>${z+1}</td>
                <td class="tdNoBorder"></td>
            
                <td>${totalSupply}</td>
                <td>${+totalSupply}</td>
                
                
            </tr>
            `

        // document.querySelector('.totalExpensesTop').innerHTML = totalExpenses;
        document.querySelector('.totalRemainTop').innerHTML = +totalSupply;
        document.querySelector('.tbodyReport').innerHTML = tableReport;
        totalSupply = 0;
        remainReport2 = 0;
        remainSupply = 0;
        // document.querySelector('.tbodyReport').innerHTML = tableEmployees;
        // document.querySelector('.tbodyReport').innerHTML = tableReport;
        // document.querySelector('.totalSupply').innerHTML = totalSupply;
        // document.querySelector('.totalReport1').innerHTML = totalSupply;
        // document.querySelector('.paidReport1').innerHTML = paidSupply;
        // document.querySelector('.remainReport1').innerHTML = remainSupply;
        
    })
}


function openInputs(){
    document.querySelector('.addEmployee').style.display = "block";
    document.querySelector('.buttons').style.display = "none";
}

let allSalary = [];
let optionItems; 
let selectEmployeeName = document.querySelector('#selectEmployeeName');









function printReport() {
    document.querySelector('.report').style.display = "block";

    document.querySelector('.allProject').style.display = 'none';
    document.querySelector('.allDetails').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    document.querySelector('.buttons').style.display = 'none';
    window.print();
    window.location.reload();
}
function exiteTable(){
    document.querySelector('.tablePrint').style.display = 'none';
    document.querySelector('.app').style.display = 'block';
}









function refresh(){
    window.location.reload();
}


function exitePass(){
    window.location.reload();
}



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

