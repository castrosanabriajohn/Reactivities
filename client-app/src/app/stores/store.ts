import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";

interface Store {
  activityStore: ActivityStore; // classes can be used as types
  commonStore: CommonStore;
}
// This is what is going to be contained by the context
// As new stores instaces are created, they'll be added into the store object to be available to the context
export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
};
// Creating and exporting the context store
export const StoreContext = createContext(store);
// Creating custom hook for using stores inside of components
export function useStore() {
  return useContext(StoreContext);
}
