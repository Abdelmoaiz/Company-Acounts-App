const {ipcRenderer}=   require('electron')

let dateContract = document.querySelector('#dateContract')
let nameProject = document.querySelector('#nameProject')
let phone = document.querySelector('#phone')
let address = document.querySelector('#address')
let priceProject = document.querySelector('#priceContract')
let rate = document.querySelector('#rate')
let notes = document.querySelector('#notes');
let state = document.querySelector('#state');

let newUser = document.querySelector("#newUser");
let newCustomer = document.querySelector("#newCustomer");
let newProject = document.querySelector("#newProject");
let register = document.querySelector(".register");
let tmp;
let mood = 'create';
let customer = [];
let moodBtnShow = "delete";

let date = new Date();
let dateNow;


if(date.getMonth()+1 < 10 && date.getDate() < 10) {
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
}else if(date.getMonth()+1 < 10 && date.getDate() >= 10){
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
}else if(date.getMonth()+1 >= 10 && date.getDate() < 10){
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;
}else{
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}
dateContract.value = dateNow;
let idDatabase;


function showInputs() {
    getId();
    newCustomer.focus();
    document.querySelector('.user').style.display = 'block';
    document.querySelector('#btnOpenInputs').style.display = 'none';
}

function getId(){
    ipcRenderer.send('get-customer', 'bing')
    ipcRenderer.on('get-customer',(e,args)=>{
        const myEmployees = JSON.parse(args);
        customer.push(myEmployees);
        // console.log(customer[customer.length-1].length)

        if(customer[customer.length-1].length  == 0 ){
            newCode.value = 3001;
            idDatabase = 3001;

        }else{
            myEmployees.map(mE=>{
                // console.log(mE._id)
                newCode.value = +mE._id + 1;
                idDatabase = +mE._id + 1
                
                
                // console.log(idDatabase)
            })
        }
       
        // console.log(idDatabase)
        
    })
    // console.log(idDatabase)

}

register.addEventListener('click',(e)=>{
    e.preventDefault();
    let objUsers = {
        dateContract : dateContract.value,
        code: newCode.value,
        customer: newCustomer.value,
        newProject: newProject.value,
        phone: phone.value,
        address: address.value,
        priceProject: priceProject.value,
        rate: rate.value,
        notes: notes.value,
        stateShow: "show",
        state: state.value,
        details:[]
    }
    if(mood == 'create'){
        ipcRenderer.send('newCustomer',`${idDatabase}`,objUsers)
        ipcRenderer.send('myCustomerRecoveryInsert',`${idDatabase}`,{objUsers});

    }else{
        customer[tmp] = objUsers;
        // ipcRenderer.send('update-allUsers',objUsers)

        ipcRenderer.send('update-customer',{...objUsers, tmp})
        mood= 'create';

    }
    refresh();
}) 




function showUsers(){
    let tableUsers = '';
    ipcRenderer.send('get-customer', 'bing')
    ipcRenderer.on('get-customer',(e,args)=>{
        const myCustomer = JSON.parse(args);
        customer.push(myCustomer);
        tableUsers = '';
        for(let i = 0; i<customer[customer.length-1].length; i++){
            if(customer[customer.length-1][i].myCustomer.stateShow == "show"){
                
                tableUsers += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${customer[customer.length-1][i].myCustomer.code}</td>
                        <td>${customer[customer.length-1][i].myCustomer.customer}</td>
                        <td>${customer[customer.length-1][i].myCustomer.newProject}</td>
                        <td onclick="updateUser('${customer[customer.length-1][i]._id}');"><button>تعديل</button></td>
                        <td class="btnTbDelete" onclick="deleteUser('${customer[customer.length-1][i]._id}');"><button>حذف</button></td>
                    </tr>
                `
            }
        }
        
        document.querySelector('.tbodyUsers').innerHTML = tableUsers;
    })
    
}
showUsers();

function showProjectDelete(){
    let tableUsers = '';
    ipcRenderer.send('get-customer', 'bing')
    ipcRenderer.on('get-customer',(e,args)=>{
        const myCustomer = JSON.parse(args);
        customer.push(myCustomer);
        tableUsers = '';
        if(moodBtnShow == "delete"){
            for(let i = 0; i<customer[customer.length-1].length; i++){
                if(customer[customer.length-1][i].myCustomer.stateShow == "delete"){
                
                    tableUsers += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${customer[customer.length-1][i].myCustomer.code}</td>
                            <td>${customer[customer.length-1][i].myCustomer.customer}</td>
                            <td>${customer[customer.length-1][i].myCustomer.newProject}</td>
                            <td ></td>
                            <td class="btnTbDelete" onclick="restoreUser('${customer[customer.length-1][i]._id}');"><button>استعادة</button></td>
                        </tr>
                    `
                }
                
                
            }
            moodBtnShow = "delete";
            document.querySelector('.btnShow').innerHTML = "عرض المشاريع";
            document.querySelector('.headTable').innerHTML = "المشاريع المحذوفة";

        }else{
            for(let i = 0; i<customer[customer.length-1].length; i++){
                if(customer[customer.length-1][i].myCustomer.stateShow == "show"){
                
                    tableUsers += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${customer[customer.length-1][i].myCustomer.code}</td>
                            <td>${customer[customer.length-1][i].myCustomer.customer}</td>
                            <td>${customer[customer.length-1][i].myCustomer.newProject}</td>
                            <td onclick="updateUser('${customer[customer.length-1][i]._id}');"><button>تعديل</button></td>
                            <td class="btnTbDelete" onclick="deleteUser('${customer[customer.length-1][i]._id}');"><button>حذف</button></td>
                        </tr>
                    `
                    
                }
                
                
            }
            moodBtnShow = "show";
            document.querySelector('.btnShow').innerHTML = "المشاريع المحذوفة";
        }
        
        document.querySelector('.tbodyUsers').innerHTML = tableUsers;
    })
}

function clearInputs() {
    newUser.value =
    newpassword.value = "";
}

function addProject(id){
    console.log(id)
    // if(){

    // }
}

let tmpI;
function updateUser(id){
    document.querySelector('.user').style.display = 'block';
    document.querySelector('#btnOpenInputs').style.display = 'none';
    for(let i = 0; i<customer[customer.length-1].length; i++){
        if(customer[customer.length-1][i]._id == id){
            console.log(customer[customer.length-1][i].myCustomer.code);
            newCode.value = customer[customer.length-1][i].myCustomer.code;
            newCustomer.value = customer[customer.length-1][i].myCustomer.customer;
            newProject.value = customer[customer.length-1][i].myCustomer.newProject;
            address.value = customer[customer.length-1][i].myCustomer.address;
            phone.value = customer[customer.length-1][i].myCustomer.phone;
            priceContract.value = customer[customer.length-1][i].myCustomer.priceProject;
            rate.value = customer[customer.length-1][i].myCustomer.rate;
            state.value = customer[customer.length-1][i].myCustomer.state;
            notes.value = customer[customer.length-1][i].myCustomer.notes;
            mood = 'update';
            register.innerHTML = "تحديث بيانات"
            tmp = id;
            tmpI = i;
            // newUser.focus();
            scroll({
                top:0,
                behavior: "smooth",
            })
            document.querySelector('.alarm').style.display = 'none';
        
        }
    }
   
    
        
    

}

let tmpIdDelete;
function deleteUser(id){
    tmpIdDelete = id;
    for(let i = 0; i<customer[customer.length-1].length; i++){
        if(customer[customer.length-1][i]._id == id){
            customer[customer.length-1][i].myCustomer.stateShow = "delete";
            let data ;
            data = customer[customer.length-1][i].myCustomer;
            // customer[tmpIdDelete] = objUsers;
            // ipcRenderer.send('update-allUsers',objUsers)
    
            ipcRenderer.send('update-customer',{...data, id})
            mood= 'create';
        }
        refresh();
    }
    
}
function restoreUser(id){
    tmpIdDelete = id;
    for(let i = 0; i<customer[customer.length-1].length; i++){
        if(customer[customer.length-1][i]._id == id){
            customer[customer.length-1][i].myCustomer.stateShow = "show";
            let data ;
            data = customer[customer.length-1][i].myCustomer;
            // customer[tmpIdDelete] = objUsers;
            // ipcRenderer.send('update-allUsers',objUsers)
    
            ipcRenderer.send('update-customer',{...data, id})
            mood= 'create';
        }
        refresh();
    }
    
}




let inpuCheckPass = document.querySelector('#passCheck');

// function checkPass(){
//         // users.splice(tmpIdDelete,1);        
//         ipcRenderer.send('deleteUser',tmpIdDelete)
//         localStorage.setItem('allUsers',JSON.stringify(users));
//         window.location.reload();
// }

function exitePass(i) {
    inpuCheckPass.value = '';
    document.querySelector('.alarm').style.display = 'none';

}


function refresh(){
    window.location.reload();
}


///////////////////

function exportTableToExcel() {
    // get table
    var table = document.getElementById("table");
    // convert table to excel sheet
    var wb = XLSX.utils.table_to_book(table, {sheet:"بيانات العميل"});
    // write sheet to blob
    var blob = new Blob([s2ab(XLSX.write(wb, {bookType:'xlsx', type:'binary'}))], {
        type: "application/octet-stream"
    });
    // return sheet file
    return saveAs(blob, "العملاء والمشاريع.xlsx");
}

function s2ab(s) {
var buf = new ArrayBuffer(s.length);
var view = new Uint8Array(buf);
for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
return buf;
}