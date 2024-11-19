// variable
const {ipcRenderer}=   require('electron')


let numSuppliers = document.querySelector('#numSuppliers');
let nameSuppliers = document.querySelector('#nameSuppliers');
let idPersonalSuppliers = document.querySelector('#idPersonalSuppliers');
let phoneSuppliers = document.querySelector('#phoneSuppliers');
let adress = document.querySelector('#adress');
let dateWork = document.querySelector('#dateWork');
let notes = document.querySelector('#notes');
let title = document.querySelector('#title');
// let priceDay = document.querySelector('#priceDay');
let price = document.querySelector('#price');
let statePrice = document.querySelector('#statePrice');

let dayW = document.querySelector('#dayW');



let moodSuppliers = 'create';
let tmpSuppliers;
let date = new Date();
let dateNow;

let settlmentDate = `${date.getFullYear()}-${date.getMonth()+1}-30`;


if(date.getMonth()+1 < 10 && date.getDate() < 10) {
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
    settlmentDate = `${date.getFullYear()}-0${date.getMonth()+1}-30`;
}else if(date.getMonth()+1 < 10 && date.getDate() >= 10){
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
    settlmentDate = `${date.getFullYear()}-0${date.getMonth()+1}-30`;
}else if(date.getMonth()+1 >= 10 && date.getDate() < 10){
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;
    settlmentDate = `${date.getFullYear()}-${date.getMonth()+1}-30`;
}else{
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    settlmentDate = `${date.getFullYear()}-${date.getMonth()+1}-30`;
}
// expensesDate.value = dateOtherExp.value = dateNow;
let userName = document.querySelector('.userName');
let dateAndTime = document.querySelector('.dateAndTime');
userName.innerHTML = localStorage.getItem('userNameView');
dateAndTime.innerHTML =  dateNow;
dateWork.value = dateNow;

let dayWeeks = ["الاحد","الاثنين","الثلاثاء","الاربعاء","الخميس","الجمعة","السبت"];
let lastYear = +date.getFullYear() - 3;
function getDayWeek(value){
    // for(let i=lastYear; i<+date.getFullYear();i++){
    //     // console.log(i)
    //     for(let x=0; x<=12;x++){
    //         console.log(i +"-"+ x)
    //     }
    // }
    // console.log(settlmentDate)
    // if(){

    // }
    // console.log(dayWeeks[date.getDay()])
    document.querySelector("#dayW").value = dayWeeks[date.getDay()];
}
getDayWeek();
let mood = 'create';
let tmp;

let users;
if(localStorage.allUsers != null){
    users = JSON.parse(localStorage.allUsers);
}else{
    users = [];
}

function openInputsAdd(){
    document.querySelector('.addEmployee').style.display = "block";
    document.querySelector('.inputs').style.display = "none";
}














// function calcTotal(){
//     remain.value = +price.value * - +paid.value;
// }

let suppliers =[];

function addSuplaierNew(){
    document.querySelector('.addSuppliers').style.display = 'block';
    getNumSupplier();
    nameSuppliers.focus();
}


let createSuppliers = document.querySelector('.createSuppliers');
let idSupplier;

function getNumSupplier(){
    document.querySelector('.addSuppliers').style.display = 'block';
    ipcRenderer.send('get-workerDays', 'bing')
    ipcRenderer.on('get-workerDays',(e,args)=>{
        const mySuppliers = JSON.parse(args)
        suppliers.push(mySuppliers)
        if(suppliers[suppliers.length-1].length != 0){
            for(let i=0;i<suppliers[suppliers.length-1].length;i++){
                numSuppliers.value = +suppliers[suppliers.length-1][i]._id +1;
                idSupplier = +suppliers[suppliers.length-1][i]._id +1;
            }

        }else{
            numSuppliers.value = 2001;
            idSupplier = 2001;


        }
    })
}
getNumSupplier();
createSuppliers.addEventListener('click',e =>{
    e.preventDefault();
    let newSuppliers = '';
    let newDetails = '';
    if(nameSuppliers.value != '' && title.value != "" && price.value != "") {
        newSuppliers = {
            user: userName.innerHTML,
            date: dateNow,
            day: dayW.value,
            numSuppliers: numSuppliers.value,
            nameSuppliers: nameSuppliers.value,
            idPersonalSuppliers: idPersonalSuppliers.value,
            phoneSuppliers: phoneSuppliers.value,
            adress : adress.value,
            // priceDay:priceDay.value,
            details:[
                {
                    date:dateWork.value,
                    day: dayW.value,
                    title:title.value,
                    price:price.value,
                    statePrice:statePrice.value,
                    notes:notes.value
                },
            ],
            
        }
        newDetails={
            date:dateWork.value,
            day: dayW.value,
            title:title.value,
            price:price.value,
            statePrice:statePrice.value,
            notes:notes.value

        }
        if(mood == 'create'){
            
            ipcRenderer.send('myWorkerDays',`${idSupplier}`,newSuppliers)
            // window.location.reload();


        }else if(mood == 'update'){
            suppliers[suppliers.length-1][tmpI].mySuppliers.nameSuppliers = newSuppliers.nameSuppliers;
            suppliers[suppliers.length-1][tmpI].mySuppliers.idPersonalSuppliers = newSuppliers.idPersonalSuppliers;
            suppliers[suppliers.length-1][tmpI].mySuppliers.phoneSuppliers = newSuppliers.phoneSuppliers;
            // suppliers[suppliers.length-1][tmpI].mySuppliers.priceDay = newSuppliers.priceDay;
            suppliers[suppliers.length-1][tmpI].mySuppliers.adress = newSuppliers.adress;
            let data = suppliers[suppliers.length-1][tmpI];
            ipcRenderer.send('update-workerDays',{...data, tmp})
            // window.location.reload();

        }else if(mood == 'addItems'){
            suppliers[suppliers.length-1][tmpI].mySuppliers.details.push(newDetails);
            let data = suppliers[suppliers.length-1][tmpI];
            ipcRenderer.send('update-workerDays',{...data, tmp})
            // window.location.reload();        
        }else if(mood == "updateOneItems"){
            suppliers[suppliers.length-1][tmpI].mySuppliers.details[tmpX] = newDetails;
            let data = suppliers[suppliers.length-1][tmpI];
            ipcRenderer.send('update-workerDays',{...data, tmp})
            // window.location.reload();        

        }
        
    }
    
    refresh();
    showDetailsSuppliers();
    getNumSupplier();    
})
let tmpI;
let tmpX;

function clearInput(){
    numSuppliers.value = "";
    nameSuppliers.value = "";
    idPersonalSuppliers.value = "";
    phoneSuppliers.value = "";
    adress.value = "";
    title.value = "";
    price.value = "";
    statePrice.value = "";
    notes.value = "";
}



let tableSuppliers;
let totalPriceSuppliers = 0;
let totalPaidSuppliers = 0;
let totalRemainSuppliers = 0;

function showDetailsSuppliers(){
    tableSuppliers = '';
    ipcRenderer.send('get-workerDays', 'bing')
    ipcRenderer.on('get-workerDays',(e,args)=>{
        const mySuppliers = JSON.parse(args)
        suppliers.push(mySuppliers)
        let data = suppliers[suppliers.length-1][0];
        localStorage.setItem("mySaved",JSON.stringify(data))
        tableSuppliers = '';
        for(let i=0;i<suppliers[suppliers.length-1].length;i++){
            for(let x=0; x<suppliers[suppliers.length-1][i].mySuppliers.details.length; x++){
                if(suppliers[suppliers.length-1][i].mySuppliers.details[x].statePrice == "وارد"){
                    totalPriceSuppliers += +suppliers[suppliers.length-1][i].mySuppliers.details[x].price;
                }else if(suppliers[suppliers.length-1][i].mySuppliers.details[x].statePrice == "منصرف"){
                    totalPaidSuppliers += +suppliers[suppliers.length-1][i].mySuppliers.details[x].price;

                }
            }
            let mS = suppliers[suppliers.length-1][i];
            tableSuppliers += `
            <tr>
                <td>${i+1}</td>
                <td>${mS._id}</td>
                <td>${mS.mySuppliers.date}</td>
                <td>${mS.mySuppliers.nameSuppliers}</td>
                
                <td><img onclick="detailsSuppliers('${mS._id}');" src="../../img/19.ico" alt="add" ></td>

                <td><img onclick="addDetails('${mS._id}');" src="../../img/plus (1).png" ></td>
                <td><img onclick="updateSuppliers('${mS._id}');" src="../../img/edit.png" ></td>
                <td><img onclick="deleteSuppliers('${mS._id}');" src="../../img/delete.png" alt="delete" ></td>

            </tr>
            `
        }
        
        
        document.querySelector('.tbodySuppliers').innerHTML = tableSuppliers;
        document.querySelector('.totalImport').innerHTML = totalPriceSuppliers;
        document.querySelector('.totalExpenses').innerHTML = totalPaidSuppliers;
        document.querySelector('.totalRemain').innerHTML = +totalPriceSuppliers - +totalPaidSuppliers;

        
        totalPaidSuppliers =
        totalPriceSuppliers =
        totalRemainSuppliers = 0;
        
    })
}
showDetailsSuppliers();
let mydataPro = [];
function getPurchases(){
    ipcRenderer.send('get-Data', 'bing')
    ipcRenderer.on('get-Data',(e,args)=>{
        const myData = JSON.parse(args)
        mydataPro.push(myData)
    })
}
getPurchases();
let supplaierInvoice = [];
function getSuplaierInoice(){
    ipcRenderer.send('get-invoiceSup', 'bing')
    ipcRenderer.on('get-invoiceSup',(e,args)=>{
        const mySuppliers = JSON.parse(args)
        supplaierInvoice.push(mySuppliers)
    })
}
getSuplaierInoice();
let tableDetailsSuppliers;

function calcPriceDay(){

    price.value = priceDay.value;
}

function detailsSuppliers(id){
    document.querySelector('.tableAllSuppliers').style.display = 'none';
    document.querySelector('.detailsSuppliers').style.display = 'block';
    showDetailsSuppliers();
    getPurchases();
    tableDetailsSuppliers = '';
    for(let i=0; i<suppliers[suppliers.length-1].length; i++){
        for(let x=0; x<suppliers[suppliers.length-1][i].mySuppliers.details.length; x++){

            if(id == suppliers[suppliers.length-1][i]._id){
           
                let data = suppliers[suppliers.length-1][i].mySuppliers.details;
                    totalPriceSuppliers += (+data[x].price);
                    tableDetailsSuppliers += `
                    <tr>
                        <td>${x+1}</td>
                        <td>${data[x].date}</td>
                        <td>${data[x].day}</td>
                        <td>${data[x].title}</td>
                        <td>${data[x].price}</td>
                        <td>${data[x].statePrice}</td>
                        <td>${data[x].notes}</td>
                        <td><img onclick="updateOneSuppliers('${suppliers[suppliers.length-1][i]._id}','${i}','${x}');" src="../../img/edit.png" ></td>
                        <td><img onclick="deleteOneSuppliers('${suppliers[suppliers.length-1][i]._id}','${i}','${x}');" src="../../img/delete.png" alt="delete" ></td>

                    </tr>
                    `
        
                
            }
        }
    }
    tableDetailsSuppliers += `
        <tr>
            <td colspan='4'>الاجمالي</td>
            <td>${totalPriceSuppliers}</td>
            
        </tr>
            `
    document.querySelector('.tbodyDetailsSuppliers').innerHTML = tableDetailsSuppliers;
    totalPriceSuppliers = 0;
    totalPaidSuppliers = 0;
    totalRemainSuppliers = 0;

    
}

function showWorkSuppliers(id){
    document.querySelector('.tableAllSuppliers').style.display = 'none';
    document.querySelector('.detailsSuppliers').style.display = 'block';
    showDetailsSuppliers();
    getPurchases();
    tableDetailsSuppliers = '';
    for(let i=0; i<suppliers[suppliers.length-1].length; i++){
        for(let x=0; x<suppliers[suppliers.length-1][i].mySuppliers.details.length; x++){
            if(suppliers[suppliers.length-1][i].mySuppliers.details[x].quantity != 0 || suppliers[suppliers.length-1][i].mySuppliers.details[x].quantity != ""){
                if(id == suppliers[suppliers.length-1][i]._id){
           
                    let data = suppliers[suppliers.length-1][i].mySuppliers.details;
                        totalPriceSuppliers += (+data[x].price);
                        tableDetailsSuppliers += `
                        <tr>
                            <td>${x+1}</td>
                            <td>${data[x].date}</td>
                            <td>${data[x].day}</td>
                            <td>${data[x].title}</td>
                            <td>${data[x].price}</td>
                            <td>${+data[x].statePrice}</td>
                            <td>${+data[x].notes}</td>
                           
    
                        </tr>
                        `
            
                    
                }
            }
            
        }
    }
    tableDetailsSuppliers += `
        <tr>
            <td colspan='4'>الاجمالي</td>
            <td>${totalPriceSuppliers}</td>
            
        </tr>
            `
    document.querySelector('.tbodyDetailsSuppliers').innerHTML = tableDetailsSuppliers;
    totalPriceSuppliers = 0;
    totalPaidSuppliers = 0;
    totalRemainSuppliers = 0;

}

function addDetails(id){
    document.querySelector('.addSuppliers').style.display = 'block';
    document.querySelector('.inputDetails').style.display = 'flex';
    document.querySelector('.infoPersonal').style.display = 'none';
    for(let i=0; i<suppliers[suppliers.length-1].length;i++){
        if(suppliers[suppliers.length-1][i]._id == id){
            let data = suppliers[suppliers.length-1][i].mySuppliers;
            nameSuppliers.value = data.nameSuppliers;
            numSuppliers.value = data.numSuppliers;
            idPersonalSuppliers.value = data.idPersonalSuppliers;
            phoneSuppliers.value = data.phoneSuppliers;
            adress.value = data.adress;
            // priceDay.value = data.priceDay;
            mood = "addItems"
            title.focus();
            scroll({
                top:0,
                behavior: "smooth",
            })
            tmp = id;
            tmpI = i;
        }
    }
    // calcPriceDay();
}
function updateSuppliers(id){
    for(let z=0; z<users.length;z++){
        if(users[z].user == userName.innerHTML && users[z].job == ("مدير" || "it")){
            document.querySelector('.addSuppliers').style.display = 'block';
            for(let i=0; i<suppliers[suppliers.length-1].length;i++){
                if(suppliers[suppliers.length-1][i]._id == id){
                    let data = suppliers[suppliers.length-1][i].mySuppliers;
                    nameSuppliers.value = data.nameSuppliers;
                    numSuppliers.value = data.numSuppliers;
                    idPersonalSuppliers.value = data.idPersonalSuppliers;
                    phoneSuppliers.value = data.phoneSuppliers;
                    adress.value = data.adress;
                    // priceDay.value = data.priceDay;
        
                    mood = 'update';
                    nameSuppliers.focus();
                    scroll({
                        top:0,
                        behavior: "smooth",
                    })
                    tmp = id;
                    tmpI = i;
                }
            }
        }
    }
    

   
   

}
let tmpIdDelete;
function deleteSuppliers(id){
    if(userName.innerHTML == 'عبدالمعز'){
        document.querySelector('.alarm1').style.display = 'block';
        tmpIdDelete = id;
    }else{
        for(let x=0; x<users.length;x++){
            if(userName.innerHTML == users[x].user && (users[x].job == 'it' || users[x].job == 'مدير')){
                document.querySelector('.alarm1').style.display = 'block';
                tmpIdDelete = id;
            }
        }
    }
    
}
function checkPass1(){
    ipcRenderer.send('delete-workerDays',tmpIdDelete)
    window.location.reload();
    showDetailsSuppliers();
}

function exitePass(){
    window.location.reload();
}

function updateOneSuppliers(id,i,x){
    for(let z=0; z<users.length;z++){
        if(users[z].user == userName.innerHTML && users[z].job == ("مدير" || "it")){
      
            document.querySelector('.addSuppliers').style.display = 'block';
            document.querySelector('.inputDetails').style.display = 'flex';
            document.querySelector('.infoPersonal').style.display = 'none';
            if(suppliers[suppliers.length-1][i]._id == id){
                let data = suppliers[suppliers.length-1][i].mySuppliers;
                dateWork.value = data.details[x].date;
                dayW.value = data.details[x].day;
                nameSuppliers.value = data.nameSuppliers;
                numSuppliers.value = data.numSuppliers;
                idPersonalSuppliers.value = data.idPersonalSuppliers;
                phoneSuppliers.value = data.phoneSuppliers;
                adress.value = data.adress;
                title.value = data.details[x].title;
                price.value = data.details[x].price;
                
                statePrice.value = data.details[x].statePrice
                
                mood = 'updateOneItems';
                nameSuppliers.focus();
                scroll({
                    top:0,
                    behavior: "smooth",
                })
                tmp = id;
                tmpI = i;
                tmpX = x;
            }
        }
    }
}
let tmpDeleteI;
let tmpDeleteX;
function deleteOneSuppliers(id,i,x){
    if(userName.innerHTML == 'عبدالمعز'){
        document.querySelector('.alarm').style.display = 'block';
        tmp = id;
        tmpDeleteI = i;
        tmpDeleteX = x;
    }else{
        for(let z=0; z<users.length;z++){
            if(userName.innerHTML == users[z].user && (users[z].job == 'it' || users[z].job == 'مدير')){
                document.querySelector('.alarm2').style.display = 'block';
                tmp = id;
                tmpDeleteI = i;
                tmpDeleteX = x;
                
            }
        }
    }
    
}

function checkPass2(){

    suppliers[suppliers.length-1][tmpDeleteI].mySuppliers.details.splice(tmpDeleteX,1);

    let data = suppliers[suppliers.length-1][tmpDeleteI];
    ipcRenderer.send('update-workerDays',{...data, tmp})
    window.location.reload();
    showDetailsSuppliers();
}

function returnBack(){
    document.querySelector('.tableAllSuppliers').style.display = 'block';
    document.querySelector('.detailsSuppliers').style.display = 'none';
}

function colorRemainSuppliers(){
    let textRemainSuppliers = document.querySelectorAll('.remainSuppliers');
    for(let i=0;i<textRemainSuppliers.length; i++){
        if(textRemainSuppliers[i].innerHTML < 0 ){
            textRemainSuppliers[i].style.color = 'red';
        }else if(textRemainSuppliers[i].innerHTML > 0 ){
            textRemainSuppliers[i].style.color = 'green';

        }
    }
    
}
colorRemainSuppliers();





function printPage(){
    document.querySelector('.addSuppliers').style.display = 'none';
    document.querySelector('.searchSuppliers').style.display = 'none';
    document.querySelector('aside').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    document.querySelector('.cruds').style.width = '100%';
    window.print();
    window.location.reload();
}


let wordSearchSuppliers = document.querySelector('#wordSearchSuppliers');

function searchSuppliers(value){
    document.querySelector('.tableAllSuppliers').style.display = 'none';
    document.querySelector('.detailsSuppliers').style.display = 'block';
    showDetailsSuppliers();
    getPurchases();
    tableDetailsSuppliers = '';

    if(value != ''){
        for(let i=0; i<suppliers[suppliers.length-1].length; i++){
            let data = suppliers[suppliers.length-1];
            if(suppliers[suppliers.length-1][i].mySuppliers.nameSuppliers.includes(value)){
                console.log(value)
                console.log(suppliers[suppliers.length-1][i].mySuppliers)
                tableDetailsSuppliers += `
                <tr>
                    <td>${data[i].mySuppliers.date}</td>
                    <td>${data[i].mySuppliers.nameSuplaier}</td>
                    <td>${data[i].mySuppliers.phoneSuppliers}</td>
                    <td>${+data[i].mySuppliers.idPersonalSuppliers}</td>
                    
                    <td>${data[i].mySuppliers[x].myItems.remainPrice}</td>
                    
                </tr>
                `
            for(let x=0; x<suppliers[suppliers.length-1][i].mySuppliers.length; x++){

                }
                // for(let x=0; x<mydataPro[mydataPro.length-1].length; x++){
                //     let data = mydataPro[mydataPro.length-1];
                    
                //     if(data[x].myItems.nameSuplaier == suppliers[suppliers.length-1][i].mySuppliers.nameSuppliers){
                //         totalPriceSuppliers += (+data[x].myItems.count * +data[x].myItems.priceBuy);
                //         totalPaidSuppliers += +data[x].myItems.paidPrice;
                //         totalRemainSuppliers = +totalPriceSuppliers - +totalPaidSuppliers;
                       
            
                //     }
                // }
            }
        }
        tableDetailsSuppliers += `
            <tr>
                <td colspan='5'>الاجمالي</td>
                <td>${totalPriceSuppliers}</td>
                <td>${totalPaidSuppliers}</td>
                <td class='remainMakeUp'>${totalRemainSuppliers}</td>
                <td colspan='3'></td>
            </tr>
                `
        document.querySelector('.tbodyDetailsSuppliers').innerHTML = tableDetailsSuppliers;
        totalPriceSuppliers = 0;
        totalPaidSuppliers = 0;
        totalRemainSuppliers = 0;
    }else{
        tableDetailsSuppliers = '';
    }
    
    
        
        
        
    
    
}


function refresh(){
    window.location.reload();
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


function exportTableToExcel() {
    // get table
    var table = document.getElementById("table");
    // convert table to excel sheet
    var wb = XLSX.utils.table_to_book(table, {sheet:"العهدة"});
    // write sheet to blob
    var blob = new Blob([s2ab(XLSX.write(wb, {bookType:'xlsx', type:'binary'}))], {
        type: "application/octet-stream"
    });
    // return sheet file
    return saveAs(blob, "تقرير العهدة.xlsx");
}

function exportTableToExcel2() {
    // get table
    var table = document.getElementById("table2");
    // convert table to excel sheet
    var wb = XLSX.utils.table_to_book(table, {sheet:"تفاصيل العهدة"});
    // write sheet to blob
    var blob = new Blob([s2ab(XLSX.write(wb, {bookType:'xlsx', type:'binary'}))], {
        type: "application/octet-stream"
    });
    // return sheet file
    return saveAs(blob, "تقرير تفاصيل العهدة.xlsx");
}

function s2ab(s) {
var buf = new ArrayBuffer(s.length);
var view = new Uint8Array(buf);
for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
return buf;
}