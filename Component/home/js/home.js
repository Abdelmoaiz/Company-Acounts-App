let users;
if(localStorage.allUsers != null){
    users = JSON.parse(localStorage.allUsers);
}else{
    users = []
}



let spcUser;
if(localStorage.mySpcUser != null){
    spcUser = JSON.parse(localStorage.mySpcUser);
}else{
    spcUser = []
}
let userName = localStorage.getItem('userNameView');
let userDeveloper = {user: "عبدالمعز",password:'0164342246',job:'it'};
let inputPass = document.querySelector('#inputPass');

let linkPage;
function goToPage(link) {
    document.querySelector('.divAlarm').style.display = 'flex';
    linkPage = link;
    inputPass.focus();


}

function goToPage2(link) {
   


}

function goTo2(value){
    document.querySelector('.alarm1').style.display = 'flex';
    linkPage = value;
    inputPass.focus();}


function checkPass(){
    if(inputPass.value == "0164342246"){
        window.location.href = linkPage;

    }else if(inputPass.value == "1122"){
        window.location.href = linkPage;

    }else{
        for(let x=0; x<users.length;x++){

            if((users[x].job == 'it' || users[x].job == 'مدير') && (inputPass.value == users[x].password)) {
                window.location.href = linkPage;    
            }
        }
    }
    inputPass.value = '';
}
function exitePass() {
    inputPass.value = '';
    document.querySelector('.alarm1').style.display = 'none';

}

function goTo(value){
    window.location.href = value;
}




function refresh(){
    window.location.reload();
}