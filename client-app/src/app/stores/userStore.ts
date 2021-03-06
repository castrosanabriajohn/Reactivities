import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import { history } from "../..";

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
      store.commonStore.setToken(user.token); // after login receive and store the token
      runInAction(() => (this.user = user)); // set the user
      history.push("/activities");
      store.modalStore.closeModal();
    } catch (e) {
      throw e; // Throwing the error to the component will make it avaible to bwe catched by the onSubmit on the form
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    runInAction(() => (this.user = null));
    history.push("/");
  };

  register = async (creds: UserFormValues) => {
    try {
      const user = await agent.accountRequests.register(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      history.push("/activities");
      store.modalStore.closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  getUser = async () => {
    try {
      const user = await agent.accountRequests.current();
      runInAction(() => (this.user = user));
    } catch (e) {
      console.log(e);
    }
  };
}
