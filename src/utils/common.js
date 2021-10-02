import storage from "store";
import {
  ACTIVE_FIRST_ROUTE_INDEX,
  ACTIVE_SECOND_ROUTE_INDEX,
  ACTIVE_SECOND_ROUTE
} from "@/store/mutation-types";

export const storageFunc = {
  setActiveFirstRouteIndex(activeIndex) {
    storage.set(ACTIVE_FIRST_ROUTE_INDEX, activeIndex);
  },
  getActiveFirstRouteIndex() {
    return storage.get(ACTIVE_FIRST_ROUTE_INDEX);
  },
  setActiveSecondRoute(list) {
    storage.set(ACTIVE_SECOND_ROUTE, list);
  },
  getActiveSecondRoute(list) {
    storage.get(ACTIVE_SECOND_ROUTE);
  },
  setActiveSecondRouteIndex(activeIndex) {
    storage.set(ACTIVE_SECOND_ROUTE_INDEX, activeIndex);
  },
  getActiveSecondRouteIndex() {
    return storage.get(ACTIVE_SECOND_ROUTE_INDEX);
  }
};
