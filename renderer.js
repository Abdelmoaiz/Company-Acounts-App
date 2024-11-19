let username = document.querySelector("#username");
let password = document.querySelector("#password");
let btnSignIn = document.querySelector(".btn-signIn");
const {ipcRenderer}=   require('electron')

let date = new Date();
let dateEnd;
let dateNow;
let day,month,year,dayEnd;
if(date.getMonth()+1 < 10 && date.getDate() < 10) {
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
    year = `${date.getFullYear()}`;
    month = `0${date.getMonth()+1}`;
    day = `0${date.getDate()}`;
    if(date.getDate()+3 < 10){
        dayEnd = `0${date.getDate()+3}`;
        console.log("1")
    }else{
        dayEnd = `${date.getDate()+3}`;
        console.log("2")

    }

}else if(date.getMonth()+1 < 10 && date.getDate() > 10){
    dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
    year = `${date.getFullYear()}`;
    month = `0${date.getMonth()+1}`;
    day = `${date.getDate()}`;
    dayEnd = `${date.getDate()+3}`;

}else if(date.getMonth()+1 > 10 && date.getDate() < 10){
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;
    year = `${date.getFullYear()}`;
    month = `${date.getMonth()+1}`;
    day = `0${date.getDate()}`;
    if(date.getDate()+3 < 10){
        dayEnd = `0${date.getDate()+3}`;
        console.log("1")
    }else{
        dayEnd = `${date.getDate()+3}`;
        console.log("2")

    }

}else{
    dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    year = `${date.getFullYear()}`;
    month = `${date.getMonth()+1}`;
    day = `${date.getDate()}`;
}

let timeNow = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

// let dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

let users;
if(localStorage.allUsers != null){
    users = JSON.parse(localStorage.allUsers);
}else{
    users = []
}

// if(localStorage.dateEnd != null){
//     dateEnd = localStorage.dateEnd;
// }

let userNameView ;
let job;


let login = [];
setTimeout(() => {
    getLogin();
}, 1);

function getLogin(){
    ipcRenderer.send('get-login', 'bing')
    ipcRenderer.on('get-login',(e,args)=>{
        const myLogin = JSON.parse(args)
        login.push(myLogin)
        if(login != "" && login[login.length-1].length != 0 && login[login.length-1][0] != ""){
            document.querySelector(".user").style.display = "block";
            document.querySelector(".registeUser").style.display = "none";
            document.querySelector(".alarm").style.display = "none";
            // console.log(login[login.length-1][0].dateEnd);
            dateEnd = login[login.length-1][0].dateEnd;
        }

        // console.log(login[login.length-1])
})}
// getLogin()

// console.log(login)
// if(localStorage.userNameView != null){
//     userNameView = JSON.parse(localStorage.userNameView);
// }else{
//     userNameView = []
// }

function ActiveApp(){
 document.querySelector(".registeUser").style.display = "block";
 document.querySelector(".alarm").style.display = "none";
}

let btnRegiste = document.querySelector(".btn-registe");

let usernameReg = document.querySelector("#usernameReg");
// let emailReg = document.querySelector("#emailReg");
let phoneReg = document.querySelector("#phoneReg");
let passwordReg = document.querySelector("#passwordReg");

let infoRegist = [];
btnRegiste.addEventListener("click",(e)=>{
    e.preventDefault();
    if((usernameReg.value && phoneReg.value && passwordReg.value) != "" ){
        let infoReg = {
            user : usernameReg.value,
            phone : phoneReg.value,
            password : passwordReg.value,
            dateNow : dateNow,
            dateEnd :`${year}-${month}-${dayEnd}`
        }
        infoRegist.push(infoReg)
        ipcRenderer.send('infoRegist',infoReg)
        document.querySelector(".registeUser").style.display = "none";
        setTimeout(() => {
            document.querySelector(".alarm2").style.display = "block";
        }, 1000);
        setTimeout(() => {
            document.querySelector(".alarm2").style.display = "none";
        }, 2000);
        setTimeout(() => {
            document.querySelector(".user").style.display = "block";

        }, 3000);
    }
    // refresh();
})

btnSignIn.addEventListener("click",(e)=>{
    e.preventDefault();
    // if(dateEnd == dateNow || dateEnd <= dateNow){
        
    // }else{
        if(username.value == 'عبدالمعز' && password.value == '0164342246'){
            window.location.href = "./Component/home/home.html";
            userNameView = username.value;
            job = 'it';

        }else if(username.value == 'demo' && password.value == '2'){
            window.location.href = "./Component/home/home.html";
            userNameView = username.value;
            job = 'demo';

        }else if(username.value == 'admin' && password.value == '1122'){
            window.location.href = "./Component/home/home.html";
            userNameView = username.value;
            job = 'it';

        }else{
            for(let i=0; i<users.length;i++){
                if(username.value === users[i].user && password.value === users[i].password ){
                
                    window.location.href = "./Component/home/home.html";
                    userNameView = username.value;
                    
            
                }
            }
        }
        localStorage.setItem('userNameView',userNameView);
        // localStorage.setItem('dateNow',dateNow);
        
        if(localStorage.dateEnd != null){
            dateEnd = localStorage.dateEnd;
        }else{
            // localStorage.setItem('dateEnd',`${year}-${month}-${dayEnd}`);
            // dateEnd = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+1}`;;
        }
        let dataSignIn = {"state":"open","username": userNameView,"date" :dateNow,'dateEnd':`${year}-${month}-${dayEnd}`}
        
        ipcRenderer.send('userNameView',dataSignIn)

        if(login[login.length-1][0].state = "open" || login == ""){

        }else{
            ipcRenderer.send('userNameView',dataSignIn)

        }
        


    // e.preventDefault();
    // }
}) 

function refresh(){
    window.location.reload();
}