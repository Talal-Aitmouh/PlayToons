import { createStore } from "redux";
import youtubeReducer from "./reducer";

const store = createStore(youtubeReducer);

export default store;
