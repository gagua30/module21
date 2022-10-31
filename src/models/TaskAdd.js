import { getFromStorage, addToStorage } from "../utils";

export class TaskProgress  {
    constructor(login, textTask, id) {
      this.id = id;
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
  }

  export class TaskFinish   {
    constructor(login, textTask, id) {
      this.id = id;
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
  }