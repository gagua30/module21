import { BaseModel } from "./models/BaseModel";
import adminPanel from "./templates/adminPanel.html";

export const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
};
export const addToStorage = function (obj, key) {
  const storageData = getFromStorage(key);
  storageData.push(obj);
  localStorage.setItem(key, JSON.stringify(storageData));
};
export const generateTestUser = function (User) {
  let nameNewUser = document.querySelector('.nameUser').value;
  let passNewUser = document.querySelector('.passUser').value;
  const testUser = new User(nameNewUser, passNewUser);
  User.save(testUser);
};


export const newReadyTask = function (login, Task){  //ДОБАВЛЕНИЕ НОВЫХ ЗАДАЧ
  let ul = document.querySelector('.readyTaskUl');
  let addButton = document.querySelector('.newTask');
  if(addButton.value == 'saveTask'){  //Сохранение задачи
    console.log('Сохранение задачи');
    let input = document.querySelector('.newAdd');
      if(input.value == ""){          //если поле input пустое то убираю его 
        addButton.value = 'addTask';
        addButton.textContent = 'Добавить задачу';
        addButton.classList.add('button');
        addButton.classList.remove('button1');
        input.remove();
      }else{                                // само добавление задачи
        let li = document.createElement('li');
        let textTask = input.value;
        li.textContent = input.value;
        const testTask = new Task(login, textTask);
        Task.save(testTask);
        let nameUser = login;
        input.remove();
        ul.append(li);
        addButton.value = 'addTask';
        addButton.textContent = 'Добавить задачу';
        addButton.classList.add('button');
        addButton.classList.remove('button1');
        let task = JSON.parse(localStorage.getItem("tasks"));
        task.forEach((a) => {
          if(a.status == 'readyTask' && a.login == nameUser){
            li.id = a.id;    
          } 
          
        });
      }
  }else{
    let input = document.createElement('input'); //Добовление задачи
    input.classList.add('newAdd');
    ul.append(input);
    addButton.value = 'saveTask';
    addButton.textContent = 'Сохранить задачу';
    addButton.classList.add('button1');
    addButton.classList.remove('button');
  }
};

export const newProgressTask = function(login, TaskProgress){

  
  let nameUser = login;
  let task = JSON.parse(localStorage.getItem("tasks"));
  
  let selectTask = document.createElement("select");
  let buttonAddTask = document.querySelector('.progressTaskAdd');
  buttonAddTask.replaceWith(selectTask);
  let option = document.createElement('option');
  option.textContent = 'Выберите задачу из списка';
  selectTask.appendChild(option);    
  task.forEach((a) => {
    if(a.status == 'readyTask' && a.login == nameUser){
      let newOption = new Option(a.textTask);
      newOption.value = a.id;
      selectTask.appendChild(newOption); 
           
    } 
  });
  selectTask.addEventListener('change', () =>{
    selectTask.replaceWith(buttonAddTask);
    let li = document.createElement("li");  
    let readyLi = document.getElementById(`${selectTask.value}`)  
    let id = selectTask.value;      
    li = readyLi;
    let newTaskProgress = li.textContent;
    let index = task.findIndex(el => el.textTask == newTaskProgress);                                          
    task.splice(index, 1)   
    localStorage.setItem('tasks', JSON.stringify(task)); 
    const progress = new TaskProgress(login, newTaskProgress, id);
    TaskProgress.save(progress);
    selectTask.remove();
    
    function setNewEntry(entry) {
      $('.progressTaskUl').append(entry); 
    }
    setNewEntry(li)
    
  })

}


export const newFinishTask = function(login, FinishTask){
  let nameUser = login;
  let task = JSON.parse(localStorage.getItem("tasks"));
  
  let selectTask = document.createElement("select");
  let buttonAddTask = document.querySelector('.finishedTaskAdd');
  buttonAddTask.replaceWith(selectTask);
  let option = document.createElement('option');
  option.textContent = 'Выберите задачу из списка';
  selectTask.appendChild(option);    
  task.forEach((a) => {
    if(a.status == 'ProgressTask' && a.login == nameUser){
      let newOption = new Option(a.textTask);
      newOption.value = a.id;
      selectTask.appendChild(newOption); 
           
    } 
  });
  selectTask.addEventListener('change', () =>{
    selectTask.replaceWith(buttonAddTask);
    let li = document.createElement("li");  
    let readyLi = document.getElementById(`${selectTask.value}`)       
    li = readyLi;
    let newTaskFinished = li.textContent;
    let id = selectTask.value;
    let index = task.findIndex(el => el.textTask == newTaskFinished);                                          
    task.splice(index, 1)   
    localStorage.setItem('tasks', JSON.stringify(task)); 
    const progress = new FinishTask(login, newTaskFinished, id);
    FinishTask.save(progress);
    selectTask.remove();
    
    function setNewEntry(entry) {
      $('.finishUl').append(entry);

    }
    setNewEntry(li)
    
  })

}


export const taskInWork = function(login){        //ОБНОВЛЕНИЕ ЗАДАНИЙ ПРИ ЗАГРУЗКЕ
  let nameUser = login;
  let task = JSON.parse(localStorage.getItem("tasks"));
  let users = JSON.parse(localStorage.getItem("users"));

  
  if(login == 'admin'){
    let contentTask = document.querySelector("#content");
    contentTask.innerHTML = adminPanel;

    let contentAdmin = document.querySelector('.containter_admin')//админ панель

    let divName = document.createElement('div');
    let divTasks = document.createElement('div');
    
    contentAdmin.classList.add('contentAdmin'); 

    users.forEach((a) => {
     
        let divUserConteiner = document.createElement('div');// создание для каждого юзера контейрента контейнер
        divUserConteiner.classList.add('divUserConteiner'); 
        let divReadyTask = document.createElement('div');
        let divProgressTask = document.createElement('div');
        let divFinishask = document.createElement('div');
        divReadyTask.textContent = 'Готовые задачи: ';
        divProgressTask.textContent = 'Задачи в работе: ';
        divFinishask.textContent = 'Выполненые задачи: ';

        
        let name = a.login;
        divUserConteiner.textContent = 'Имя пользователя: ' + name;
        contentAdmin.append(divUserConteiner)
        divUserConteiner.append(divReadyTask);
        divUserConteiner.append(divProgressTask);

        divUserConteiner.append(divFinishask);


        task.forEach((b) => {
          let nameUsers = b.login;
          let text = b.textTask;

          if(b.status == 'readyTask' && name == nameUsers){
            
            let li = document.createElement('li');
            li.textContent = text;
            divReadyTask.append(li)
          }
          else if(b.status == 'ProgressTask' && name == nameUsers){
            
            let li = document.createElement('li');
            li.textContent = text;
            divProgressTask.append(li)
          }
          else if(b.status == 'FinishTask' && name == nameUsers){
            
            let li = document.createElement('li');
            li.textContent = text;
            divFinishask.append(li)
          }
          

        })
    })
    
    

  }else{
    task.forEach((a) => {
      if(a.status == 'readyTask' && a.login == nameUser){
        let ul = document.querySelector('.readyTaskUl');
        let li = document.createElement("li");
        li.textContent = a.textTask;
        li.id = a.id;
        ul.append(li);
      }
      if(a.status == 'ProgressTask' && a.login == nameUser){
        let ul = document.querySelector('.progressTaskUl');
        let li = document.createElement("li");
        li.textContent = a.textTask;
        li.id = a.id;
        ul.append(li);
      }
      if(a.status == 'FinishTask' && a.login == nameUser){
        let ul = document.querySelector('.finishUl');
        let li = document.createElement("li");
        li.textContent = a.textTask;
        li.id = a.id;
        ul.append(li);
      }
  
    });


  }

  

  
  
  
}

