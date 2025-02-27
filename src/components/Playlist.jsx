import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { List } from "lucide-react"
import { setselectedPlaylist } from "../redux/actions"
import { useState } from "react"

function Playlist() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)
  const selectedPlaylist = useSelector((state) => state.selectedPlaylist)
  const [showAll, setShowAll] = useState(false);

  function handleOnClick(id) {
    dispatch(setselectedPlaylist(id));
    navigate(`/play/${id}`);  // Use the correct action creator
  }

  return (

    <motion.section
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg "
    >
      <h2 className="text-xl text-white font-bold mb-6">More Toons</h2>

      {/* Unified Div for Playlists */}
      <div className={`mt-4 max-h-96 overflow-y-auto space-y-2 scrollbar-hidden overflow-x-hidden p-4 bg-[#6B5ECD]/20 rounded-lg`}>
        {(showAll ? data : data.slice(0, 2)).map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleOnClick(item.idPlaylist)}
            className={`p-2 rounded-lg cursor-pointer transition-colors  flex ${selectedPlaylist === item.idPlaylist
              ? "bg-[#5B577B] "
              : ""
              }`}
          >
            <img
              src={item.miniature}
              alt=""
              className="w-32 h-20 rounded-lg mr-4 object-cover"
            />
            <div>
              <h3 className="font-medium text-white">{item.titre}</h3>
              <p className="text-sm text-gray-400 mt-1">{item.videos.length} Episodes</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show More Button */}
      {data.length > 2 && !showAll && (
        <button
          className="mt-4 w-full bg-[#6B5ECD] text-white py-3  text-sm font-medium transition hover:bg-[#5C558D]"
          onClick={() => setShowAll(true)}
        >
          Show More
        </button>
      )}
    </motion.section>
  );
}

export default Playlist

