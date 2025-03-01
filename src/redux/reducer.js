import data from "../data/data.json";
import { SELECTED_PLAYLIST, SELECTED_VIDEO, TOGGLE_COMMENTS_MODAL, ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT, LIKE_VIDEO, DISLIKE_VIDEO, UPDATE_SEARCH_QUERY } from "./actions";

const initialState = {
  selectedPlaylist: "",
  selectedVideo: null,
  data: data,
  commentsModalOpen: false,
  userComments: {},
  searchQuery: "", // 🔹 New state for search input
};

const youtubeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_PLAYLIST:
      return { ...state, selectedPlaylist: action.payload };
    case SELECTED_VIDEO:
      return { ...state, selectedVideo: action.payload };
    case TOGGLE_COMMENTS_MODAL:
      return { ...state, commentsModalOpen: action.payload };
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
      };
    case LIKE_VIDEO:
      return {
        ...state,
        selectedVideo: {
          ...state.selectedVideo,
          likes: state.selectedVideo.likes + (state.selectedVideo.liked ? -1 : 1),
          dislikes: state.selectedVideo.liked ? state.selectedVideo.dislikes : state.selectedVideo.dislikes - (state.selectedVideo.disliked ? 1 : 0),
          liked: !state.selectedVideo.liked,
          disliked: state.selectedVideo.liked ? false : state.selectedVideo.disliked,
        },
      };
    case DISLIKE_VIDEO:
      return {
        ...state,
        selectedVideo: {
          ...state.selectedVideo,
          dislikes: state.selectedVideo.dislikes + (state.selectedVideo.disliked ? -1 : 1),
          likes: state.selectedVideo.disliked ? state.selectedVideo.likes : state.selectedVideo.likes - (state.selectedVideo.liked ? 1 : 0),
          disliked: !state.selectedVideo.disliked,
          liked: state.selectedVideo.disliked ? false : state.selectedVideo.liked,
        },
      };
    case UPDATE_SEARCH_QUERY: // 🔹 Handle search query updates
      return { ...state, searchQuery: action.payload };

    default:
      return state;
  }
};

export default youtubeReducer;
