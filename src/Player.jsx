import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoPlayer from "./components/Video";
import VideoList from "./components/ListVideo";
import Playlist from "./components/Playlist";
import Comments from "./components/Comments";

function Player() {
  const { playlistId } = useParams();  // Get playlistId from URL
  const commentsModalOpen = useSelector((state) => state.commentsModalOpen);
  const selectedVideo = useSelector((state) => state.selectedVideo);
  const playlists = useSelector((state) => state.data);

  // Find the selected playlist
  const selectedPlaylist = playlists.find((playlist) => playlist.idPlaylist === parseInt(playlistId));

  return (
    <div className="min-h-screen text-white px-4" >
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Video Player Section */}
          <div className="lg:col-span-3">
          <h2 className="text-3xl font-semibold mb-3">{selectedPlaylist.titre}</h2>
            <VideoPlayer />
          </div>

          {/* Playlist & Video List Section */}
          <div className="lg:col-span-1">
            {selectedPlaylist ? (
              <>
                
                <VideoList videos={selectedPlaylist.videos} />
                <Playlist playlist={selectedPlaylist} />
              </>
            ) : (
              <p className="text-gray-400">No playlist selected</p>
            )}
          </div>
        </div>
      </main>

      {/* Comments Modal */}
      {commentsModalOpen && selectedVideo && (
        <Comments comments={selectedVideo.commentaires} videoId={selectedVideo.id} />
      )}
    </div>
  );
}

export default Player;
