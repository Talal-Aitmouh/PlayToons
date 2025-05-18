"use client"

import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, ThumbsUp, ThumbsDown, MessageCircle, Share2 } from "lucide-react"
import { toggleCommentsModal } from "../redux/actions"
import Comments from "./Comments" // Declare the Comments component

function VideoPlayer() {
  const dispatch = useDispatch()
  const selectedVideo = useSelector((state) => state.selectedVideo)
  const selectedPlaylistId = useSelector((state) => state.selectedPlaylist)
  const playlists = useSelector((state) => state.data)
  const commentsModalOpen = useSelector((state) => state.commentsModalOpen)

  const selectedPlaylist = playlists.find((playlist) => playlist.idPlaylist === selectedPlaylistId)

  const videoToShow = selectedVideo || (selectedPlaylist?.videos.length ? selectedPlaylist.videos[0] : null)

  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [likes, setLikes] = useState(videoToShow?.likes || 0)
  const [dislikes, setDislikes] = useState(videoToShow?.dislikes || 0)

  useEffect(() => {
    if (videoToShow) {
      setLikes(videoToShow.likes)
      setDislikes(videoToShow.dislikes)
      setLiked(false)
      setDisliked(false)
    }
  }, [videoToShow])

  const handleOpenComments = () => {
    dispatch(toggleCommentsModal(true))
  }

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1)
      setLiked(false)
    } else {
      setLikes(likes + 1)
      setLiked(true)
      if (disliked) {
        setDislikes(dislikes - 1)
        setDisliked(false)
      }
    }
  }

  const handleDislike = () => {
    if (disliked) {
      setDislikes(dislikes - 1)
      setDisliked(false)
    } else {
      setDislikes(dislikes + 1)
      setDisliked(true)
      if (liked) {
        setLikes(likes - 1)
        setLiked(false)
      }
    }
  }

  if (!videoToShow) {
    return (
      <div className="aspect-video bg-gradient-to-br from-[#6B5ECD]/30 to-gray-900 flex items-center justify-center rounded-xl shadow-lg border border-[#6B5ECD]/30">
        <motion.div
          initial={{ opacity: 0.5, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Play size={64} className="text-white opacity-80" />
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full"
      >
        <div className="relative rounded-xl overflow-hidden shadow-[0_0_30px_rgba(107,94,205,0.3)] border border-[#6B5ECD]/30">
          <div className="pb-[56.25%]">
            <iframe
              src={`${videoToShow.lien.replace("watch?v=", "embed/").split("&")[0]}?autoplay=1&controls=0&rel=0&modestbranding=1&showinfo=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
              key={videoToShow.lien}
            />
          </div>
        </div>
      </motion.section>

      <section>
        <div className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white group">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6B5ECD] to-purple-300">
                  {selectedPlaylist.titre}
                </span>
                <span className="mx-2">—</span>
                {videoToShow.titre}
              </h2>
              <p className="text-gray-400 mt-2 leading-relaxed">{videoToShow.description}</p>
            </div>

            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenComments}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/80 backdrop-blur-sm rounded-lg hover:bg-gray-700 transition-all duration-200"
              >
                <MessageCircle size={18} className="text-[#6B5ECD]" />
                <span>{videoToShow.commentaires.length}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  liked ? "bg-[#6B5ECD] text-white" : "bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700"
                }`}
              >
                <ThumbsUp size={18} className={liked ? "text-white" : "text-[#6B5ECD]"} />
                <span>{likes}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDislike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  disliked ? "bg-[#6B5ECD] text-white" : "bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700"
                }`}
              >
                <ThumbsDown size={18} className={disliked ? "text-white" : "text-[#6B5ECD]"} />
                <span>{dislikes}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/80 backdrop-blur-sm rounded-lg hover:bg-gray-700 transition-all duration-200 sm:ml-2"
              >
                <Share2 size={18} className="text-[#6B5ECD]" />
              </motion.button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-400 p-3 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/50">
            <img
              src={videoToShow.auteur.photo || "/placeholder.svg"}
              alt={videoToShow.auteur.nom}
              className="w-12 h-12 rounded-full border-2 border-[#6B5ECD]/50 object-cover"
            />
            <div>
              <span className="font-medium text-white text-base">
                {videoToShow.auteur.prenom} {videoToShow.auteur.nom}
              </span>
              <p className="text-gray-400 text-sm mt-1">Creator</p>
            </div>
          </div>
        </div>
      </section>

      {commentsModalOpen && <Comments comments={videoToShow.commentaires} videoId={videoToShow.id} />}
    </>
  )
}

export default VideoPlayer
