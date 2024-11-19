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

function getCustomer(value){
    totalSupply = 0;
    paidSupply = 0;
    remainSupply = 0;

    let tableEmployees = '';
    let tableEmployees2 = '';

    nameClient.value = "";
    // nameProject.value = "";
    ipcRenderer.send('get-clientSupply', 'bing')
    ipcRenderer.on('get-clientSupply',(e,args)=>{
        const myEmployees = JSON.parse(args);
        client.push(myEmployees);

        tableEmployees = '';
        tableEmployees2 = '';

        let data = client[client.length-1];
        for(let i=0;i<data.length;i++){
            if(codeCustomer.value == data[i].myClient.codeCustomer){
                remainReport2 += +client[client.length-1][i].myClient.priceSupply - +client[client.length-1][i].myClient.paid;
                nameSupply = data[i].myClient.nameProject;
                dateSupply = data[i].myClient.dateContract;
                nameClient.value = data[i].myClient.nameClient;
                totalSupply += +client[client.length-1][i].myClient.priceSupply;
                paidSupply += +client[client.length-1][i].myClient.paid;
                remainSupply = totalSupply - paidSupply;
                
                
            }
        }

        
        document.querySelector('.nameProjectTab').innerHTML = nameSupply;
        document.querySelector('.totalPrice').innerHTML = totalSupply;

        // myEmployees.map(mE=>{
        //     if(mE.myCustomer.code ==  codeCustomer.value){
                
   
        //     }

        // })
          
       
       
        totalSupply = 0;
        paidSupply = 0;
        remainSupply = 0;
    })
    showDetails(value)
}

let customer = [];
function showProjects() {
    let tableEmployees1 = '';
    let tableEmployees2 = '';

    ipcRenderer.send('get-customer', 'bing')
    ipcRenderer.on('get-customer',(e,args)=>{
        const myEmployees = JSON.parse(args);
        customer.push(myEmployees);
        
        tableEmployees1 = '';
        tableEmployees2 = '';
        
         
       
    })
}
showProjects();




let totalExpenses = 0;



function searchData() {
    let tableEmployees = '';
    let tableEmployees2 = '';
    totalSupply = 0;
    remainReport2 = 0;
    paidSupply = 0;
    remainSupply = 0;    // ipcRenderer.send('get-clientSupply', 'bing')
    // ipcRenderer.on('get-clientSupply',(e,args)=>{
    //     const myEmployees = JSON.parse(args);
    //     client.push(myEmployees);
        tableEmployees = '';
        tableEmployees2 = '';
        tableReport = '';
        // console.log(client[client.length-1][0].myClient.dateContract)
        // console.log(client[client.length-1][0].myClient.state)

        let z;
        let y;
        if(search.value != ""){

            for(let i=0; i<customer[customer.length-1].length;i++){
                for(let x=0; x<customer[customer.length-1][i].myCustomer.details.length;x++){
                    if(customer[customer.length-1][i].myCustomer.details[x].state != "delete"){
                        if(customer[customer.length-1][i].myCustomer.details[x].date < searchFrom.value){
                            if(customer[customer.length-1][i].myCustomer.details[x].typeAdd == "توريد"){
                                totalSupply += +customer[customer.length-1][i].myCustomer.details[x].price;
                            }else{
                                totalExpenses += +customer[customer.length-1][i].myCustomer.details[x].price;
                            }
    
                            document.querySelector('.priceBack').innerHTML = +totalSupply - +totalExpenses;
    
                        }
                        if((customer[customer.length-1][i].myCustomer.code.includes(search.value) &&  customer[customer.length-1][i].myCustomer.details[x].date >= searchFrom.value && customer[customer.length-1][i].myCustomer.details[x].date <= searchTo.value) ){
                            // allData.push(client[client.length-1][i])
                            z= x
    
                            document.querySelector('.nameSupply').innerHTML = customer[customer.length-1][i].myCustomer.customer;
                            document.querySelector('.nameProject').innerHTML = customer[customer.length-1][i].myCustomer.newProject;
                            document.querySelector('.resultDateFrom').innerHTML = searchFrom.value;
                            document.querySelector('.resultDateTo').innerHTML = searchTo.value;
                            document.querySelector('.codeCustomer').innerHTML = customer[customer.length-1][i].myCustomer.code;
                            document.querySelector('.priceProject').innerHTML = customer[customer.length-1][i].myCustomer.priceProject;
                            
                            // remainReport2 += +customer[customer.length-1][i].myCustomer.details[x].price - +client[client.length-1][i].myClient.paid;
                            // totalSupply += ++customer[customer.length-1][i].myCustomer.details[x].price;
                            // paidSupply += +client[client.length-1][i].myClient.paid;
                            // remainSupply = totalSupply - paidSupply;
                            document.querySelector('.totalPaidTop').innerHTML = totalSupply;
                            
                            if(customer[customer.length-1][i].myCustomer.details[x].typeAdd == "توريد"){
                                totalSupply += +customer[customer.length-1][i].myCustomer.details[x].price;
    
                                tableReport += `
                                <tr>
                                    <td>${x+1}</td>
            
                                    <td>${customer[customer.length-1][i].myCustomer.details[x].date}</td>
                                    
                                    <td colspan="5">${customer[customer.length-1][i].myCustomer.details[x].title}</td>
                                    <td></td>
                                    <td>${customer[customer.length-1][i].myCustomer.details[x].price}</td>
                                    <td>${+totalSupply - +totalExpenses}</td>
            
                                    
                                    
                                </tr>
                                `
                            }else{
                                totalExpenses += +customer[customer.length-1][i].myCustomer.details[x].price;
                                tableReport += `
                                <tr>
                                    <td>${x+1}</td>
            
                                    <td>${customer[customer.length-1][i].myCustomer.details[x].date}</td>
                                    
                                    <td colspan="5">${customer[customer.length-1][i].myCustomer.details[x].title}</td>
                                    <td>${customer[customer.length-1][i].myCustomer.details[x].price}</td>
                                    <td></td>
                                    <td>${+totalSupply - +totalExpenses}</td>
            
                                    
                                    
                                </tr>
                                `
    
                            }
                            
                            
                           
                        }else {
                        }
                    }else{
                        
                        continue;

                    }
                    
                }
                     
                    
            }
        }
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
                <td colspan="5" class="tdNoBorder"></td>
                <td>${totalExpenses}</td>
                <td>${totalSupply}</td>
                <td>${+totalSupply - +totalExpenses}</td>
                
                
            </tr>
            `

        document.querySelector('.totalExpensesTop').innerHTML = totalExpenses;
        document.querySelector('.totalPaidTop').innerHTML = totalSupply;
        document.querySelector('.totalRemainTop').innerHTML = +totalSupply - +totalExpenses;
        document.querySelector('.tbodyReport').innerHTML = tableReport;
        totalSupply = 0;
        remainReport2 = 0;
        totalExpenses = 0;
        remainSupply = 0;
        // document.querySelector('.tbodyReport').innerHTML = tableEmployees;
        // document.querySelector('.tbodyReport').innerHTML = tableReport;
        // document.querySelector('.totalSupply').innerHTML = totalSupply;
        // document.querySelector('.totalReport1').innerHTML = totalSupply;
        // document.querySelector('.paidReport1').innerHTML = paidSupply;
        // document.querySelector('.remainReport1').innerHTML = remainSupply;
        
    // })
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

    // document.querySelector('.allProject').style.display = 'none';
    // document.querySelector('.allDetails').style.display = 'none';
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


function exportTableToExcel() {
    // get table
    var table = document.getElementById("table");
    // convert table to excel sheet
    var wb = XLSX.utils.table_to_book(table, {sheet:"تقرير العميل"});
    // write sheet to blob
    var blob = new Blob([s2ab(XLSX.write(wb, {bookType:'xlsx', type:'binary'}))], {
        type: "application/octet-stream"
    });
    // return sheet file
    return saveAs(blob, "تقرير العميل.xlsx");
}

function s2ab(s) {
var buf = new ArrayBuffer(s.length);
var view = new Uint8Array(buf);
for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
return buf;
}