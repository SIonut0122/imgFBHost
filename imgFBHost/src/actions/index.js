import { ADD_IMAGE } from "../constants/action-types";
 
export function addImage(payload) {
  return { type: ADD_IMAGE, payload };
}
 