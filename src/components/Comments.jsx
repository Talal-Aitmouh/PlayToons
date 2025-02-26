import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import CommentItem from "./CommentsItem"
import { addComment, toggleCommentsModal } from "../redux/actions"

function Comments({ comments, videoId }) {
  const [newComment, setNewComment] = useState("")
  const dispatch = useDispatch()
  const userComments = useSelector((state) => state.userComments[videoId] || [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      dispatch(
        addComment(videoId, {
          id: Date.now(),
          text: newComment,
          user: "Talal", 
          avatar: "/avatar.png", 
          time: new Date().toISOString(),
        })
      )
      setNewComment("")
    }
  }

  const handleClose = () => {
    dispatch(toggleCommentsModal(false))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Comments</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-white cursor-pointer">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4 mb-6">
          {comments.map((comment, index) => (
            <CommentItem
              key={index}
              comment={{
                id: index,
                text: comment.texte,
                user: comment.utilisateur,
                avatar: comment.avatar,
                time: comment.temps,
              }}
              videoId={videoId}
              isUserComment={false}
            />
          ))}
          {userComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} videoId={videoId} isUserComment={true} />
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Post
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default Comments
