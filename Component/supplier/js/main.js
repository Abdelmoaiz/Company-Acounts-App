const {ipcRenderer}=   require('electron')

let dateRegist = document.querySelector('#date')
let nameProject = document.querySelector('#nameProject')
let phone = document.querySelector('#phone')
let address = document.querySelector('#address');
let typeSupplier = document.querySelector('#typeSupplier');
// let rate = document.querySelector('#rate')
let notes = document.querySelector('#notes');
let state = document.querySelector('#state');

let newUser = document.querySelector("#newUser");
let newSupplier = document.querySelector("#newSupplier");
let newProject = document.querySelector("#newProject");
let register = document.querySelector(".register");
let tmp;
let mood = 'create';
let supplier = [];
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
dateRegist.value = dateNow;
let idDatabase;


function showInputs() {
    getId();
    newSupplier.focus();
    document.querySelector('.user').style.display = 'block';
    document.querySelector('#btnOpenInputs').style.display = 'none';
}

function getId(){
    ipcRenderer.send('get-supplier', 'bing')
    ipcRenderer.on('get-supplier',(e,args)=>{
        const myEmployees = JSON.parse(args);
        supplier.push(myEmployees);
        // console.log(customer[customer.length-1].length)

        if(supplier[supplier.length-1].length  == 0 ){
            newCode.value = 2001;
            idDatabase = 2001;

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
        date : dateRegist.value,
        code: newCode.value,
        supplier: newSupplier.value,
        newProject: newProject.value,
        phone: phone.value,
        address: address.value,
        // priceProject: priceProject.value,
        typeSupplier: typeSupplier.value,
        notes: notes.value,
        stateShow: "show",
        state: state.value,
        details:[]
    }
    if(mood == 'create'){
        ipcRenderer.send('newSupplier',`${idDatabase}`,objUsers)
                console.log(idDatabase)

    }else{
        supplier[tmp] = objUsers;
        // ipcRenderer.send('update-allUsers',objUsers)

        ipcRenderer.send('update-supplier',{...objUsers, tmp})
        mood= 'create';

    }
    refresh();
}) 




function showSupplier(){
    let tableUsers = '';
    ipcRenderer.send('get-supplier', 'bing')
    ipcRenderer.on('get-supplier',(e,args)=>{
        const mySupplier = JSON.parse(args);
        supplier.push(mySupplier);
        tableUsers = '';
        for(let i = 0; i<supplier[supplier.length-1].length; i++){
            if(supplier[supplier.length-1][i].mySupplier.stateShow == "show"){
                
                tableUsers += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${supplier[supplier.length-1][i].mySupplier.code}</td>
                        <td>${supplier[supplier.length-1][i].mySupplier.supplier}</td>
                        <td>${supplier[supplier.length-1][i].mySupplier.newProject}</td>
                        <td>${supplier[supplier.length-1][i].mySupplier.state}</td>
                        <td>${supplier[supplier.length-1][i].mySupplier.typeSupplier}</td>
                        <td onclick="updateUser('${supplier[supplier.length-1][i]._id}');"><button>تعديل</button></td>
                        <td class="btnTbDelete" onclick="deleteUser('${supplier[supplier.length-1][i]._id}');"><button>حذف</button></td>
                    </tr>
                `
            }
        }
        
        document.querySelector('.tbodySupplier').innerHTML = tableUsers;
    })
    
}
showSupplier();

function showProjectDelete(){
    let tableUsers = '';
    ipcRenderer.send('get-supplier', 'bing')
    ipcRenderer.on('get-supplier',(e,args)=>{
        const myCustomer = JSON.parse(args);
        supplier.push(myCustomer);
        tableUsers = '';
        if(moodBtnShow == "delete"){
            for(let i = 0; i<supplier[supplier.length-1].length; i++){
                if(supplier[supplier.length-1][i].mySupplier.stateShow == "delete"){
                
                    tableUsers += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${supplier[supplier.length-1][i].mySupplier.code}</td>
                            <td>${supplier[supplier.length-1][i].mySupplier.supplier}</td>
                            <td>${supplier[supplier.length-1][i].mySupplier.newProject}</td>
                            <td ></td>
                            <td class="btnTbDelete" onclick="restoreUser('${supplier[supplier.length-1][i]._id}');"><button>استعادة</button></td>
                        </tr>
                    `
                }
                
                
            }
            moodBtnShow = "delete";
            document.querySelector('.btnShow').innerHTML = "عرض المشاريع";
            document.querySelector('.headTable').innerHTML = "المشاريع المحذوفة";

        }else{
            for(let i = 0; i<supplier[supplier.length-1].length; i++){
                if(supplier[supplier.length-1][i].mySupplier.stateShow == "show"){
                
                    tableUsers += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${supplier[supplier.length-1][i].mySupplier.code}</td>
                            <td>${supplier[supplier.length-1][i].mySupplier.supplier}</td>
                            <td>${supplier[supplier.length-1][i].mySupplier.newProject}</td>
                            <td onclick="updateUser('${supplier[supplier.length-1][i]._id}');"><button>تعديل</button></td>
                            <td class="btnTbDelete" onclick="deleteUser('${supplier[supplier.length-1][i]._id}');"><button>حذف</button></td>
                        </tr>
                    `
                    
                }
                
                
            }
            moodBtnShow = "show";
            document.querySelector('.btnShow').innerHTML = "المشاريع المحذوفة";
        }
        
        document.querySelector('.tbodySupplier').innerHTML = tableUsers;
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
    for(let i = 0; i<supplier[supplier.length-1].length; i++){
        if(supplier[supplier.length-1][i]._id == id){
            console.log(supplier[supplier.length-1][i].mySupplier.code);
            newCode.value = supplier[supplier.length-1][i].mySupplier.code;
            newSupplier.value = supplier[supplier.length-1][i].mySupplier.supplier;
            newProject.value = supplier[supplier.length-1][i].mySupplier.newProject;
            address.value = supplier[supplier.length-1][i].mySupplier.address;
            phone.value = supplier[supplier.length-1][i].mySupplier.phone;
            
            state.value = supplier[supplier.length-1][i].mySupplier.state;
            notes.value = supplier[supplier.length-1][i].mySupplier.notes;
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
    for(let i = 0; i<supplier[supplier.length-1].length; i++){
        if(supplier[supplier.length-1][i]._id == id){
            supplier[supplier.length-1][i].mySupplier.stateShow = "delete";
            let data ;
            data = supplier[supplier.length-1][i].mySupplier;
            // customer[tmpIdDelete] = objUsers;
            // ipcRenderer.send('update-allUsers',objUsers)
    
            ipcRenderer.send('update-supplier',{...data, id})
            mood= 'create';
        }
        refresh();
    }
    
}
function restoreUser(id){
    tmpIdDelete = id;
    for(let i = 0; i<supplier[supplier.length-1].length; i++){
        if(supplier[supplier.length-1][i]._id == id){
            supplier[supplier.length-1][i].mySupplier.stateShow = "show";
            let data ;
            data = supplier[supplier.length-1][i].mySupplier;
            // customer[tmpIdDelete] = objUsers;
            // ipcRenderer.send('update-allUsers',objUsers)
    
            ipcRenderer.send('update-supplier',{...data, id})
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