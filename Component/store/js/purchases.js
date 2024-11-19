const {ipcRenderer}=   require('electron')
// variable
let title = document.querySelector('#title');
let quantity = document.querySelector('#quantity');
let selectState = document.querySelector('#selectState');
let create = document.querySelector('.create');
let mood = 'create';
let tmp;
// get total
let date = new Date();

let dateNow;

if(date.getMonth()+1 < 10 && date.getDate() < 10) {
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
}else if(date.getMonth()+1 < 10 && date.getDate() > 10){
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
}else if(date.getMonth()+1 > 10 && date.getDate() < 10){
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;
}else{
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

let dateBarcode =`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`;

function openInputs(){
    document.querySelector('.inputs').style.display = 'block';
    document.querySelector('.buttons').style.display = 'none';
    item.focus()
}


let mydataPro;
if(localStorage.myData != null){
    mydataPro = JSON.parse(localStorage.myData)
}else{
    mydataPro = []
}




// create data
create.addEventListener("click",(e)=>{
    e.preventDefault();
    let newProduct;
    if(item.value != '' || quantity.value != '' ){
        newProduct = {
            dateToday:dateNow,
            item : item.value,
            quantity: +quantity.value,
            stateItems: selectState.value,
            
        }
        if(mood == 'create') {
            ipcRenderer.send('myItems', newProduct)
            window.location.reload();

        }else if (mood == 'update'){
            console.log(newProduct);
            console.log(tmp);
            ipcRenderer.send('updateItems', {...newProduct, tmp})

            create.innerHTML = 'create';
            mood = 'create';
            window.location.reload();


        }
        

    }

}) 


// read data
let totalBuy = 0;
let totalSales = 0;
let totalSalesAll = 0;

let start = 0;
let end = 100000;
function showData() {
    let tableItems= '';
    ipcRenderer.send('get-items', 'bing')
    ipcRenderer.on('get-items',(e,args)=>{
        const myData = JSON.parse(args)
        mydataPro.push(myData)
        let data = mydataPro[mydataPro.length-1][0];
        // let id = suppliers[suppliers.length-1][0]._id;
        localStorage.setItem("myStore",JSON.stringify(data))
        tableItems= '';
        for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
            
            let data = mydataPro[mydataPro.length-1];
           
            tableItems += `
            <tr>
                    <td>${i+1}</td>
                    <td>${data[i].myItems.dateToday}</td>
                    <td>${data[i].myItems.item}</td>
                    <td>${data[i].myItems.quantity}</td>
                    <td>${data[i].myItems.stateItems}</td>
                    <td><button onclick="updateData('${data[i]._id}');">تعديل</button></td>
                    <td><button onclick="deleteData('${data[i]._id}');">حذف</button></td>

            </tr>
                    
        `
            
           
        }
        tableItems += `
            <tr>
                <td colspan='3'>الاجمالي</td>

                <td colspan="2"></td>
                
            </tr>
                    
        `
        document.querySelector('.tbody').innerHTML = tableItems;
        totalBuy = 0;
        totalSales = 0;
        totalSalesAll = 0;

    })
    
}
// showData();
// 

// update data



function updateData(id) {
    for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
        if(mydataPro[mydataPro.length-1][i]._id == id){
            let data = mydataPro[mydataPro.length-1];
            item.value = data[i].myItems.item;
            quantity.value = data[i].myItems.quantity;
            selectState.value = data[i].myItems.stateItems;

            create.innerHTML = 'تحديث بيانات الصنف';
            mood = 'update';
            tmp = id;
            openInputs();
            item.focus();
            scroll({
                top:0,
                behavior: "smooth",
            })
        }
    }
    
    
   console.log(mood)
   console.log(id)
   console.log(tmp)
    
    
}
let totalCount;



let IdDelete;
function deleteData(id) {
    document.querySelector('.alarm1').style.display = 'block';
    IdDelete = id;
}

function checkPass(){
    ipcRenderer.send('delete-items',IdDelete)
    window.location.reload();
    showData();

}

let tmpIdConv;
let tmpIConv;
let tmpId2Conv;
let tmpXConv;
function convertItems(id){
    document.querySelector('.divConvert').style.display = 'block';
    for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
        let data = mydataPro[mydataPro.length-1];
        if(data[i]._id == id){
            titleConvert.value = data[i].myItems.title;
            countConvert.value = data[i].myItems.count;
            selectPlace.value = data[i].myItems.selectPlaceSaved;
            tmpIConv = i;
            tmpIdConv = id;

        }
        for(let x =0;x<mydataProShop[mydataProShop.length-1].length;x++){
            if(titleConvert.value == mydataProShop[mydataProShop.length-1][x].myItems.title){
                tmpId2Conv = mydataProShop[mydataProShop.length-1][x]._id;
                tmpXConv = x;
            }
        }

    }
    
}
let convertData = document.querySelector('#convertData')
let idCar,xCar;


let titleState = document.querySelector('#titleState');
let countBad = document.querySelector('#countBad');
let insertBad = document.querySelector('#insertBad');
let moodState = 'create';

let tmpIState,tmpIdState;
function addBadItems(id){
    document.querySelector('.divSelectBad').style.display = 'block';
    for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
        let data = mydataPro[mydataPro.length-1];
        if(data[i]._id == id){
            titleState.value = data[i].myItems.title;
            countBad.value = data[i].myItems.count;
            selectState.value = data[i].myItems.stateItems;
            tmpIState = i;
            tmpIdState = id;

        }
        

    }
    
}




function searchItems(value){
    tableItems= '';
        for(let i=0; i<mydataPro[mydataPro.length-1].length; i++){
            let data = mydataPro[mydataPro.length-1];
            if(data[i].myItems.title.includes(value)  || data[i].myItems.barcode.includes(value)){
                tableItems += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${data[i].myItems.date}</td>
                        <td>${data[i].myItems.barcode}</td>
                        <td>${data[i].myItems.title}</td>
                        <td>${data[i].myItems.count}</td>
                        <td>${data[i].myItems.priceBuy}</td>
                        <td>${data[i].myItems.priceSaleAll}</td>
                        <td>${data[i].myItems.priceSale}</td>
                        <td><button onclick="addPro('${data[i]._id}');">اضافة</button></td>
                        <td><button onclick="updateData('${data[i]._id}');">تعديل</button></td>
                        <td><button onclick="deleteData('${data[i]._id}');">حذف</button></td>
                        <td><button onclick="convertItems('${data[i]._id}');">تحويل</button></td>
                        <td><button onclick="addBadItems('${data[i]._id}');">اضافه تالف</button></td>
                    </tr>
                        
                `
            }
            
        }
        
        document.querySelector('.tbody').innerHTML = tableItems;
}


function refresh() {
    window.location.reload();
}


let titleConvert = document.querySelector('#titleConvert');
let countConvert = document.querySelector('#countConvert');
let selectPlace = document.querySelector('#selectPlace');


function addNewSaved(){
    ipcRenderer.send('newSaved')
}


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


function exportTableToExcel() {
    // get table
    var table = document.getElementById("table");
    // convert table to excel sheet
    var wb = XLSX.utils.table_to_book(table, {sheet:"المخزن"});
    // write sheet to blob
    var blob = new Blob([s2ab(XLSX.write(wb, {bookType:'xlsx', type:'binary'}))], {
        type: "application/octet-stream"
    });
    // return sheet file
    return saveAs(blob, "تقرير المخزن.xlsx");
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