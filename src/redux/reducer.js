import data from "../data/data.json";
import { SELECTED_PLAYLIST , SELECTED_VIDEO , TOGGLE_COMMENTS_MODAL , ADD_COMMENT , DELETE_COMMENT , EDIT_COMMENT } from "./actions";

const initialState = {
  selectedPlaylist: "",
  selectedVideo: null,
  data: data,
  commentsModalOpen: false,
  userComments: {}, // This will store user comments for each video
}
console.log(data);

const youtubeReducer = (state = initialState, action) => {
switch (action.type) {
  case SELECTED_PLAYLIST:
    return {
      ...state,
      selectedPlaylist: action.payload,
    };
  case SELECTED_VIDEO:
    return {
      ...state,
      selectedVideo: action.payload,
    };
  case TOGGLE_COMMENTS_MODAL:
    return {
      ...state,
      commentsModalOpen: action.payload,
    };
  case ADD_COMMENT:
    return {
      ...state,
      userComments: {
        ...state.userComments,
        [action.payload.videoId]: [
          ...(state.userComments[action.payload.videoId] || []),
          action.payload.comment,
        ],
      },
    };
    case DELETE_COMMENT:
      return {
        ...state,
        userComments: {
          ...state.userComments,
          [action.payload.videoId]: state.userComments[action.payload.videoId].filter(
            (comment) => comment.id !== action.payload.commentId
          ),
        },
      };
    case EDIT_COMMENT:
      return {  
        ...state,
        userComments: {
          ...state.userComments,
          [action.payload.videoId]: state.userComments[action.payload.videoId].map((comment) =>
            comment.id === action.payload.commentId ? { ...comment, text: action.payload.newText } : comment
          ),
        },
        }
  default:
      return state;
}
}

export default youtubeReducer;
