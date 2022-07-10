import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  currentActivity: Activity | undefined = undefined;
  formFlag: boolean = false;
  isLoadingFlag: boolean = false;
  initialLoadingState: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  loadActivityList = async () => {
    this.initialLoadingState = true;
    try {
      const list = await agent.activitiesRequests.list();
      list.forEach((item) => {
        item.date = item.date.split("T")[0];
        runInAction(() => this.activityRegistry.set(item.id, item));
      });
      runInAction(() => (this.initialLoadingState = false));
    } catch (e) {
      console.log(e);
      runInAction(() => (this.initialLoadingState = false));
    }
  };

  setCurrentActivity = (id: string) =>
    (this.currentActivity = this.activityRegistry.get(id));

  dropCurrentActivity = () => (this.currentActivity = undefined);

  toggleFormFlag = () => (this.formFlag = !this.formFlag);

  toggleLoadingFlag = () => (this.isLoadingFlag = !this.isLoadingFlag);

  openForm = (id?: string) => {
    id
      ? (this.currentActivity = this.setCurrentActivity(id))
      : this.dropCurrentActivity();
    this.toggleFormFlag();
  };

  createActivity = async (activity: Activity) => {
    this.toggleLoadingFlag();
    activity.id = uuid();
    try {
      await agent.activitiesRequests.create(activity);
      this.activityRegistry.set(activity.id, activity);
      this.setCurrentActivity(activity.id);
      this.toggleFormFlag();
      this.toggleLoadingFlag();
    } catch (e) {
      this.toggleFormFlag();
      this.toggleLoadingFlag();
    }
  };

  updateActivity = async (activity: Activity) => {
    this.toggleLoadingFlag();
    try {
      await agent.activitiesRequests.update(activity).then(() => {
        this.activityRegistry.set(activity.id, activity);
        this.setCurrentActivity(activity.id);
        this.toggleFormFlag();
        this.toggleLoadingFlag();
      });
    } catch (e) {
      console.log(e);
      this.toggleLoadingFlag();
    }
  };

  deleteActivity = async (id: string) => {
    this.toggleLoadingFlag();
    try {
      await agent.activitiesRequests.delete(id).then(() => {
        this.activityRegistry.delete(id);
        if (this.currentActivity?.id === id) this.dropCurrentActivity();
        this.toggleLoadingFlag();
      });
    } catch (e) {
      console.log(e);
      this.toggleLoadingFlag();
    }
  };
}
