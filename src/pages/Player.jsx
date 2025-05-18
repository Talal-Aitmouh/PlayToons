"use client"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import VideoPlayer from "../components/Video"
import VideoList from "../components/ListVideo"
import Playlist from "../components/Playlist"
import Comments from "../components/Comments"

function Player() {
  const { playlistId } = useParams()
  const commentsModalOpen = useSelector((state) => state.commentsModalOpen)
  const selectedVideo = useSelector((state) => state.selectedVideo)
  const playlists = useSelector((state) => state.data)

  const selectedPlaylist = playlists.find((playlist) => playlist.idPlaylist === Number.parseInt(playlistId))

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <main className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player Section */}
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer />
          </div>

          <div className="lg:col-span-1 space-y-8">
            {selectedPlaylist ? (
              <>
                <VideoList videos={selectedPlaylist.videos} />
                <Playlist playlist={selectedPlaylist} />
              </>
            ) : (
              <div className="rounded-xl bg-gray-800/50 p-8 text-center">
                <p className="text-gray-400">No playlist selected</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {commentsModalOpen && selectedVideo && (
        <Comments comments={selectedVideo.commentaires} videoId={selectedVideo.id} />
      )}
    </div>
  )
}

export default Player
