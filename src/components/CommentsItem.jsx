"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { MoreVertical, Edit, Trash, Check, X } from "lucide-react"
import { deleteComment, editComment } from "../redux/actions"
import { motion, AnimatePresence } from "framer-motion"

function CommentItem({ comment, videoId, isUserComment }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(comment.text)
  const [showMenu, setShowMenu] = useState(false)
  const dispatch = useDispatch()

  const handleEdit = () => {
    dispatch(editComment(videoId, comment.id, editedText))
    setIsEditing(false)
    setShowMenu(false)
  }

  const handleDelete = () => {
    dispatch(deleteComment(videoId, comment.id))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <AnimatePresence mode="wait">
      {isEditing ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700"
        >
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-[#6B5ECD] transition-colors duration-200 min-h-[100px] resize-none"
            autoFocus
          />
          <div className="mt-3 flex justify-end space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors duration-200 bg-gray-700 px-3 py-1 rounded-lg"
            >
              <X size={16} />
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEdit}
              className="flex items-center gap-1 text-white bg-[#6B5ECD] hover:bg-[#5C558D] transition-colors duration-200 px-3 py-1 rounded-lg"
            >
              <Check size={16} />
              Save
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg relative flex items-start space-x-3 ${
            isUserComment ? "border border-[#6B5ECD]/30" : "border border-gray-700/50"
          }`}
        >
          <img
            src={comment.avatar || "/placeholder.svg"}
            alt={comment.user}
            className={`w-10 h-10 object-cover rounded-full ${isUserComment ? "ring-2 ring-[#6B5ECD]/50" : ""}`}
          />
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h4 className={`font-semibold ${isUserComment ? "text-[#6B5ECD]" : "text-white"}`}>
                  {comment.user}{" "}
                  {isUserComment && (
                    <span className="text-xs bg-[#6B5ECD]/20 text-[#6B5ECD] px-2 py-0.5 rounded-full ml-2">You</span>
                  )}
                </h4>
                <p className="text-gray-400 text-xs">{formatDate(comment.time)}</p>
              </div>
              {isUserComment && (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowMenu(!showMenu)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-gray-700"
                  >
                    <MoreVertical size={16} />
                  </motion.button>
                  <AnimatePresence>
                    {showMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-36 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10 border border-gray-700"
                      >
                        <motion.button
                          whileHover={{ x: 5 }}
                          onClick={() => {
                            setIsEditing(true)
                            setShowMenu(false)
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-[#6B5ECD] transition-colors duration-200"
                        >
                          <Edit size={14} className="mr-2" /> Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ x: 5 }}
                          onClick={handleDelete}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors duration-200"
                        >
                          <Trash size={14} className="mr-2" /> Delete
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
            <p className="text-white mt-2 leading-relaxed">{comment.text}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CommentItem
