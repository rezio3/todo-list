import { atom } from "recoil";

export const tasksListAtom = atom({
  key: "tasks",
  default: [],
});
export const formSignsCounter = atom({
  key: "signsCounter",
  default: 0,
});
export const completedTaskCounter = atom({
  key: "completedTask",
  default: 1,
});
