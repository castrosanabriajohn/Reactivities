import agent from "../api/agent";
import { Activity, ActivityFormValues } from "../models/activity";
import { Profile } from "../models/profile";
import { store } from "./store";
import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";

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
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  get activitiesGrouped() {
    return Object.entries(
      this.activitiesByDate.reduce((array, item) => {
        const date = format(item.date!, "dd MMM yyyy");
        array[date] = array[date] ? [...array[date], item] : [item];
        return array;
      }, {} as { [key: string]: Activity[] })
    );
  }

  loadActivityList = async () => {
    this.initialLoadingState = true;
    try {
      const list = await agent.activitiesRequests.list();
      list.forEach((item) => this.helperSetActivity(item));
      runInAction(() => (this.initialLoadingState = false));
    } catch (e) {
      console.log(e);
      runInAction(() => (this.initialLoadingState = false));
    }
  };

  loadSingleActivity = async (id: string) => {
    let activity = this.helperGetSingleActivity(id);
    if (activity) {
      runInAction(() => (this.currentActivity = activity));
      return activity;
    } else {
      this.toggleInitialLoadingState();
      try {
        activity = await agent.activitiesRequests.details(id); // call API
        this.helperSetActivity(activity); // Set date & update registry
        runInAction(() => (this.currentActivity = activity));
        this.toggleInitialLoadingState();
        return activity;
      } catch (err) {
        console.log(err);
        this.toggleInitialLoadingState();
      }
    }
  };

  private helperGetSingleActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  private helperSetActivity = (activity: Activity) => {
    // get reference to user object from the user store
    const u = store.userStore.user!;
    console.log(u.userName);
    // check for user object to if is authenticated
    if (u) {
      activity.isGoing = activity.attendees!.some(
        (p) => p.userName === u.userName // if an user is going then set is going to true
      );
      // set the host property to true if the activity hostUsername is equal to the current user
      activity.isHost = activity.hostUserName === u.userName;
      // set the host property
      activity.host = activity.attendees?.find(
        (p) => p.userName === activity.hostUserName
      );
    }
    activity.date = new Date(activity.date!);
    runInAction(() => this.activityRegistry.set(activity.id, activity));
  };

  toggleInitialLoadingState = () =>
    (this.initialLoadingState = !this.initialLoadingState);

  toggleFormFlag = () => (this.formFlag = !this.formFlag);

  toggleLoadingFlag = () => (this.isLoadingFlag = !this.isLoadingFlag);

  createActivity = async (activity: ActivityFormValues) => {
    const u = store.userStore.user;
    const att = new Profile(u!);
    try {
      await agent.activitiesRequests.create(activity);
      const newActivity = new Activity(activity);
      newActivity.hostUserName = u!.userName;
      newActivity.attendees = [att];
      this.helperSetActivity(newActivity);
      this.currentActivity = newActivity;
    } catch (e) {
      console.log(e);
    }
  };

  updateActivity = async (activity: ActivityFormValues) => {
    try {
      await agent.activitiesRequests.update(activity);
      runInAction(() => {
        if (activity.id) {
          let updatedActivity = {
            ...this.helperGetSingleActivity(activity.id),
            ...activity,
          };
          this.activityRegistry.set(activity.id, updatedActivity as Activity);
          this.currentActivity = updatedActivity as Activity;
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  deleteActivity = async (id: string) => {
    this.toggleLoadingFlag();
    try {
      await agent.activitiesRequests.delete(id).then(() => {
        this.activityRegistry.delete(id);
        this.toggleLoadingFlag();
      });
    } catch (e) {
      console.log(e);
      this.toggleLoadingFlag();
    }
  };

  updateAttendance = async () => {
    const u = store.userStore.user;
    this.toggleLoadingFlag();
    try {
      await agent.activitiesRequests.attend(this.currentActivity!.id);
      runInAction(() => {
        if (this.currentActivity?.isGoing) {
          this.currentActivity.attendees =
            this.currentActivity.attendees?.filter(
              (a) => a.userName === u?.userName
            );
          this.currentActivity!.isGoing = false;
        } else {
          const newAttendee = new Profile(u!);
          this.currentActivity?.attendees?.push(newAttendee);
          this.currentActivity!.isGoing = true;
        }
        this.activityRegistry.set(
          this.currentActivity!.id,
          this.currentActivity!
        );
      });
    } catch (e) {
      console.log(e);
    } finally {
      runInAction(() => this.toggleLoadingFlag());
    }
  };

  cancelActivityToggle = async () => {
    this.toggleLoadingFlag();
    try {
      await agent.activitiesRequests.attend(this.currentActivity!.id);
      runInAction(() => {
        this.currentActivity!.isCancelled = !this.currentActivity?.isCancelled;
        this.activityRegistry.set(
          this.currentActivity!.id,
          this.currentActivity!
        );
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.toggleLoadingFlag();
    }
  };
}
