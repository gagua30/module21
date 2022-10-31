import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
import taskFieldTemplate from "./templates/taskField.html";
import noAccessTemplate from "./templates/noAccess.html";

import dropMenu from "./templates/dropMenu.html";
import { User } from "./models/User";
import { generateTestUser } from "./utils";
import { newReadyTask } from "./utils";
import { State } from "./state";
import { authUser } from "./services/auth";
import { Task } from "./models/Task";
import { TaskProgress } from "./models/TaskAdd";
import { taskInWork } from "./utils";
import { newProgressTask } from "./utils"
import { newFinishTask } from "./utils"
import { TaskFinish } from "./models/TaskAdd";



export const appState = new State();

const loginForm = document.querySelector("#app-login-form");

const newUser = document.querySelector('.newUser');
const form = document.querySelector('#blablabla');
const popup = document.querySelector('.popup');

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");
  
  let fieldHTMLContent = authUser(login, password)
    ? taskFieldTemplate
    : noAccessTemplate;

  let contentTask = document.querySelector("#content");
  
  contentTask.innerHTML = fieldHTMLContent;
  
  let addNewReadyTask = document.querySelector('.newTask');
  let addProgressTask = document.querySelector('.progressTaskAdd');
  let addFinishTask = document.querySelector('.finishedTaskAdd');

  addProgressTask.onmouseover = overMouse; 
  addProgressTask.onmouseout = outMouse; 
  addFinishTask.onmouseout = outMouseFinish;
  addFinishTask.onmouseover = overMouseFinish; 
  addNewReadyTask.onmouseout = outMouseReady;
  addNewReadyTask.onmouseover = overMouseReady; 


  function overMouseReady (event){
    if(event.type == 'mouseover'){
      addNewReadyTask.style.background = '#0dcaf0';
      addNewReadyTask.style.color = 'rgba(41, 39, 39, 0.966)';
    }
  }
  
  function outMouseReady (event){
    if(event.type == 'mouseout'){
      addNewReadyTask.style.background = 'rgba(41, 39, 39, 0.966)';
      addNewReadyTask.style.color = '#0dcaf0';
    }
  }

function overMouse (event){
  if(event.type == 'mouseover'){
    let nameUser = login;
    let task = JSON.parse(localStorage.getItem("tasks"));  
    let even = (element) => element.status == 'readyTask' && element.login == nameUser;
      if(task.some(even)){
        addProgressTask.style.background = '#0dcaf0';
        addProgressTask.style.color = 'rgba(41, 39, 39, 0.966)';
      }
  }
}

function outMouse (event){
  if(event.type == 'mouseout'){
      addProgressTask.style.background = 'rgba(41, 39, 39, 0.966)';
      addProgressTask.style.color = '#0dcaf0';
  }
}


function overMouseFinish (event){
  if(event.type == 'mouseover'){
    let nameUser = login;
    let task = JSON.parse(localStorage.getItem("tasks"));  
    let even = (element) => element.status == 'ProgressTask' && element.login == nameUser;
      if(task.some(even)){
        addFinishTask.style.background = '#0dcaf0';
        addFinishTask.style.color = 'rgba(41, 39, 39, 0.966)';
      }
  }
}

function outMouseFinish (event){
  if(event.type == 'mouseout'){
    addFinishTask.style.background = 'rgba(41, 39, 39, 0.966)';
    addFinishTask.style.color = '#0dcaf0';
  }
}



  addNewReadyTask.addEventListener('click', () => {
    newReadyTask(login, Task);
    
  })

  addProgressTask.addEventListener('click', () => {
    let nameUser = login;
    let task = JSON.parse(localStorage.getItem("tasks"));  
    let even = (element) => element.status == 'readyTask' && element.login == nameUser;
    if(task.some(even)){
      newProgressTask(login, TaskProgress);
    }else{
      console.log('Нету задач')
    }
  })

  addFinishTask.addEventListener('click', () => { 
    let nameUser = login;
    let task = JSON.parse(localStorage.getItem("tasks"));
    let even = (element) => element.status == 'ProgressTask' && element.login == nameUser;
    if(task.some(even)){
      newFinishTask(login, TaskFinish);
    }else{
      console.log('Нету задач')
    }
  })
  
  
  if(JSON.parse(localStorage.getItem("tasks"))){
    taskInWork(login);
    
  };

  if(contentTask){
    let lol = document.querySelector('#app-login-form');
    let registration = document.querySelector('.newUser');
    registration.remove();
    lol.innerHTML = dropMenu;
    let buttonDropMenu = document.querySelector('.btnDrop');

    let outButton = document.querySelector('.out')
    outButton.addEventListener('click',  () =>{
      window.location.href = 'http://localhost:3000';
    })

    let clearButton = document.querySelector('.clear')
    clearButton.addEventListener('click',  () =>{
      console.log('Задачи очищены')
    })

    buttonDropMenu.addEventListener('click', () =>{
      let menu = document.getElementById('dropmenu');
      if(menu.className == "openMenu") {
        menu.className = "drop";
        buttonDropMenu.style.transform = "rotate(360deg)";

      } else {
        menu.className = "openMenu"
        buttonDropMenu.style.transform = "rotate(90deg)";


      }
      
    })

   }
 
});

    
newUser.addEventListener('click', () => {
  form.classList.add('open');
  popup.classList.add('popup_open');  
});

const regNewUser = document.querySelector('.regNewUser');
  regNewUser.addEventListener('click', () => {
   generateTestUser(User);
});

