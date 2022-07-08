import { makeAutoObservable } from "mobx";

export default class ActivityStore {
  title = "Hello from MobX!";
  constructor() {
    // No need to specify the properties and methods to make them observable
    makeAutoObservable(this);
  }
  // Arrow function automatically binds the action to the class to make use of this keyword in the function
  setTitle = () => {
    this.title = this.title + "!";
  };
}
