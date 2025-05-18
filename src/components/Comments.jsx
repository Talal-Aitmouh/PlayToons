"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, MessageCircle } from "lucide-react"
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
        }),
      )
      setNewComment("")
    }
  }

  const handleClose = () => {
    dispatch(toggleCommentsModal(false))
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-gray-900 rounded-xl p-6 w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col shadow-[0_0_30px_rgba(107,94,205,0.3)] border border-[#6B5ECD]/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-800">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageCircle className="text-[#6B5ECD]" size={20} />
            Comments
          </h3>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClose}
            className="text-gray-400 hover:text-white cursor-pointer bg-gray-800 p-2 rounded-full"
          >
            <X size={20} />
          </motion.button>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4 mb-6 overflow-y-auto pr-2 flex-grow scrollbar-thin scrollbar-thumb-[#6B5ECD]/50 scrollbar-track-gray-800/20"
        >
          <AnimatePresence>
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
          </AnimatePresence>
        </motion.div>

        <form onSubmit={handleSubmit} className="flex gap-2 mt-auto">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-[#6B5ECD] transition-colors duration-200"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-6 py-3 bg-[#6B5ECD] text-white rounded-lg hover:bg-[#5C558D] transition-colors duration-200 flex items-center gap-2"
            disabled={!newComment.trim()}
          >
            <Send size={18} />
            Post
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default Comments
