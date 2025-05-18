import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { List, ChevronDown, ChevronUp } from "lucide-react"
import { setselectedPlaylist } from "../redux/actions"
import { useState } from "react"

function Playlist() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)
  const selectedPlaylist = useSelector((state) => state.selectedPlaylist)
  const [showAll, setShowAll] = useState(false);

  function handleOnClick(id) {
    dispatch(setselectedPlaylist(id));
    // navigate(`/play/${id}`); // Remove or implement navigation as needed
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
        <List className="text-[#6B5ECD]" size={20} />
        More Toons
      </h2>

      {/* Scrollable Container */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-h-96 overflow-y-auto pr-1 space-y-3 scrollbar-thin scrollbar-thumb-[#6B5ECD]/50 scrollbar-track-gray-800/20"
      >
        <AnimatePresence>
          {(showAll ? data : data.slice(0, 2)).map((item, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOnClick(item.idPlaylist)}
              className={`flex items-center rounded-lg cursor-pointer transition-all duration-200 overflow-hidden group ${
                selectedPlaylist === item.idPlaylist
                  ? "bg-[#6B5ECD]/30 border border-[#6B5ECD]/50"
                  : "bg-gray-800/50 border border-transparent hover:border-gray-700"
              }`}
            >
              <div className="w-32 h-20 flex-shrink-0 relative overflow-hidden">
                <img
                  src={item.miniature}
                  alt={item.titre}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" />
              </div>
              <div className="ml-4 flex flex-col justify-between p-3">
                <h3 className={`text-sm font-medium ${selectedPlaylist === item.idPlaylist ? "text-[#6B5ECD]" : "text-white group-hover:text-[#6B5ECD]"} transition-colors duration-200`}>
                  {item.titre}
                </h3>
                <p className="text-xs text-gray-400 mt-2">
                  {item.genre === "movie" ? "Movie" : `${item.videos.length} Episodes`}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Show More Button */}
      {data.length > 2 && (
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
  );
}

export default Playlist