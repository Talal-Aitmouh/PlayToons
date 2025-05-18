"use client"

import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, MessageCircle, ChevronDown, Play, ChevronUp } from "lucide-react"
import { selectedVideo, toggleCommentsModal } from "../redux/actions"

function VideoList() {
  const dispatch = useDispatch()
  const [showAll, setShowAll] = useState(false)
  const selectedPlaylist = useSelector((state) => state.selectedPlaylist)
  const data = useSelector((state) => state.data) || []
  const currentSelectedVideo = useSelector((state) => state.selectedVideo)

  const selectedData = data.find((item) => item.idPlaylist === selectedPlaylist)

  if (!selectedData || selectedData.genre === "movie") {
    return null
  }

  const handleVideoSelect = (video) => {
    dispatch(selectedVideo(video))
  }

  const handleOpenComments = (video, e) => {
    e.stopPropagation()
    dispatch(selectedVideo(video))
    dispatch(toggleCommentsModal(true))
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

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-xl bg-gray-800/30 backdrop-blur-sm p-5 border border-gray-700/50"
    >
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Play className="text-[#6B5ECD]" size={20} />
        Episodes
      </h2>

      {/* Scrollable Container */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-h-96 overflow-y-auto pr-1 space-y-3 scrollbar-thin scrollbar-thumb-[#6B5ECD]/50 scrollbar-track-gray-800/20"
      >
        <AnimatePresence>
          {(showAll ? selectedData.videos : selectedData.videos.slice(0, 2)).map((item, index) => {
            const isSelected = currentSelectedVideo && currentSelectedVideo.id === item.id

            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center rounded-lg cursor-pointer transition-all duration-200 overflow-hidden group ${
                  isSelected
                    ? "bg-[#6B5ECD]/30 border border-[#6B5ECD]/50"
                    : "bg-gray-800/50 border border-transparent hover:border-gray-700"
                }`}
                onClick={() => handleVideoSelect(item)}
              >
                {/* Video Thumbnail */}
                <div className="w-32 h-20 flex-shrink-0 relative overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    src={item.miniature || "/placeholder.svg"}
                    alt={item.titre}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play size={24} className="text-white opacity-80" />
                  </div>
                </div>

                {/* Video Details */}
                <div className="ml-4 flex flex-col justify-between p-3">
                  <h3
                    className={`text-sm font-medium ${isSelected ? "text-[#6B5ECD]" : "text-white group-hover:text-[#6B5ECD]"} transition-colors duration-200`}
                  >
                    {item.titre}
                  </h3>

                  {/* Video Stats */}
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{item.duree}</span>
                    </div>

                    <button
                      onClick={(e) => handleOpenComments(item, e)}
                      className="flex items-center gap-1 text-[#6B5ECD] hover:text-purple-300 transition-colors duration-200"
                    >
                      <MessageCircle size={14} />
                      <span>{item.commentaires.length}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* Show More Button */}
      {selectedData.videos.length > 2 && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAll(!showAll)}
          className="mt-4 w-full bg-[#6B5ECD]/80 hover:bg-[#6B5ECD] text-white py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
        >
          {showAll ? (
            <>
              Show Less <ChevronUp size={16} />
            </>
          ) : (
            <>
              Show More <ChevronDown size={16} />
            </>
          )}
        </motion.button>
      )}
    </motion.section>
  )
}

export default VideoList
