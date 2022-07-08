import { action, makeObservable, observable } from "mobx";

export default class ActivityStore {
  title = "Hello from MobX!";
  constructor() {
    makeObservable(this, {
      title: observable,
      setTitle: action,
    });
  }
  // Arrow function automatically binds the action to the class to make use of this keyword in the function
  setTitle = () => {
    this.title = this.title + "!";
  };
}
