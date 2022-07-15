import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { makeAutoObservable } from "mobx";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.accountRequests.login(creds);
      console.log(user);
    } catch (e) {
      throw e;
    }
  };
}
