import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  activityList: Activity[] = [];
  currentActivity: Activity | undefined = undefined;
  formFlag: boolean = false;
  isLoadingFlag: boolean = false;
  initialLoadingState: boolean = false;
  constructor() {
    // No need to specify the properties and methods to make them observable
    makeAutoObservable(this);
  }
  // Create action to load the list of activities
  loadActivityList = async () => {
    // Non async operations should be placed outside the scope of the try catch block
    this.initialLoadingState = true;
    // Async operations should be placed inside the scope of the try catch block
    try {
      // The List operation is going to return the list of activities through the agent
      // as an async operation it's going to await the result before executing any additional code that follows
      // Any steps following the await aren't in the same tick (point in time) thus require action wrapping
      const activityList = await agent.activitiesRequests.list();
      // Perform date formatting to be displayed in the list and form
      activityList.forEach((item) => {
        item.date = item.date.split("T")[0]; // splits date and grabs first section
        // Populate the observable directly adding each iterable item with the date property updated to the list
        this.activityList.push(item);
      });
      // Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed.
      // Setting this property's value without using an action is not allowed so wrapping is required
      runInAction(() => (this.initialLoadingState = false));
    } catch (e) {
      console.log(e);
      runInAction(() => (this.initialLoadingState = false));
    }
  };

  setCurrentActivity = (id: string) =>
    (this.currentActivity = this.activityList.find((a) => a.id === id));

  dropCurrentActivity = () => (this.currentActivity = undefined);

  toggleFormFlag = () => (this.formFlag = !this.formFlag);

  toggleLoadingFlag = () => (this.isLoadingFlag = !this.isLoadingFlag);

  openForm = (id?: string) => {
    // Checks the presence id to decide whether to edit or create
    id
      ? (this.currentActivity = this.setCurrentActivity(id)) // if present set the current activity to match the parameter
      : this.dropCurrentActivity(); // Otherwise drop the current activity to create new activity with the form
    this.toggleFormFlag();
  };
  createActivity = async (activity: Activity) => {
    this.toggleLoadingFlag();
    // As we're creating a new activity, we must set it with an id in order for it to be sent
    activity.id = uuid();
    try {
      await agent.activitiesRequests.create(activity);
      // In case of success, the store's list of activities is updated
      this.activityList.push(activity);
      this.setCurrentActivity(activity.id);
      this.toggleFormFlag();
    } catch (e) {
      console.log(e);
      this.toggleFormFlag();
    }
  };
  updateActivity = async (activity: Activity) => {
    this.toggleLoadingFlag();
    try {
      await agent.activitiesRequests.update(activity).then(() => {
        this.activityList = [
          ...this.activityList.filter((a) => a.id === activity.id),
          activity,
        ];
        this.setCurrentActivity(activity.id);
        this.toggleFormFlag();
        this.toggleLoadingFlag();
      });
    } catch (e) {
      console.log(e);
      this.toggleLoadingFlag();
    }
  };
}
