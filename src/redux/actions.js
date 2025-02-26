export const SELECTED_PLAYLIST = "SELECTED_PLAYLIST";
export const SELECTED_VIDEO = "SELECTED_VIDEO";
export const TOGGLE_COMMENTS_MODAL = "TOGGLE_COMMENTS_MODAL";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const LIKE_VIDEO = "LIKE_VIDEO";
export const DISLIKE_VIDEO = "DISLIKE_VIDEO";


export const setselectedPlaylist = (id) => {
  return {
    type: SELECTED_PLAYLIST,
    payload: id,
  };
}

export const selectedVideo = (video) => {
  return {
    type: SELECTED_VIDEO,
    payload: video,
  };
}

export const toggleCommentsModal = (isOpen) => {
  return {
    type: TOGGLE_COMMENTS_MODAL,
    payload: isOpen,
  };
}   

export const addComment = (videoId, comment) => {
  return {
    type: ADD_COMMENT,
    payload: { videoId, comment },
  };
}

export const deleteComment = (videoId, commentId) => {
  return {
    type: DELETE_COMMENT,
    payload: { videoId, commentId },
  };
}

export const editComment = (videoId, commentId, newText) => {
    return {
      type: EDIT_COMMENT,
      payload: { videoId, commentId, newText },
    };
}

export const likeVideo = (videoId) => ({
  type: LIKE_VIDEO,
  payload: videoId,
});

export const dislikeVideo = (videoId) => ({
  type: DISLIKE_VIDEO,
  payload: videoId,
});