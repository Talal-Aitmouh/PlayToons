import { useState } from "react"
import { useDispatch } from "react-redux"
import { MoreVertical, Edit, Trash } from "lucide-react"
import { deleteComment, editComment } from "../redux/actions"

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
  
  

  if (isEditing) {
    return (
      <div className="bg-gray-700 p-4 rounded-lg">
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="w-full p-3 bg-gray-600 text-white rounded border border-gray-500 focus:outline-none focus:border-purple-500"
        />
        <div className="mt-3 flex justify-end space-x-3">
          <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white">
            Cancel
          </button>
          <button onClick={handleEdit} className="text-purple-400 hover:text-purple-300">
            Save
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-700 p-4 rounded-lg relative">
      <p className="text-white">{comment.text}</p>
      {isUserComment && (
        <div className="absolute top-4 right-4">
          <button onClick={() => setShowMenu(!showMenu)} className="text-gray-400 hover:text-white">
            <MoreVertical size={16} />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10">
              <button
                onClick={() => {
                  setIsEditing(true)
                  setShowMenu(false)
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                <Edit size={16} className="mr-2" /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
              >
                <Trash size={16} className="mr-2" /> Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CommentItem

