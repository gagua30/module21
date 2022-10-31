import { BaseModel } from "./BaseModel";
import { getFromStorage, addToStorage } from "../utils";


export class Task extends BaseModel {
    constructor(login, textTask) {
      super();
      this.login = login;
      this.textTask = textTask;
      this.storageKey = "tasks";
      this.status = "readyTask";
      
    }
   
      static save(task) {
        try {
          addToStorage(task, task.storageKey, task.status);
          return true;
        } catch (e) {
          throw new Error(e);
        }
      }
}

/* export class TaskProgress extends BaseModel {
  constructor(login, textTask) {
    super();
    this.login = login;
    this.textTask = textTask;
    this.storageKey = "tasks";
    this.status = "ProgressTask";
  }
 
    static save(task) {
      try {
        addToStorage(task, task.storageKey, task.status);
        return true;
      } catch (e) {
        throw new Error(e);
      }
    }
} */

/* export class TaskFinish extends BaseModel {
  constructor(login, textTask) {
    super();
    this.login = login;
    this.textTask = textTask;
    this.storageKey = "tasks";
    this.status = "FinishTask";
  }
 
    static save(task) {
      try {
        addToStorage(task, task.storageKey, task.status);
        return true;
      } catch (e) {
        throw new Error(e);
      }
    }
} */