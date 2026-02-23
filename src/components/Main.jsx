// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import VideoGrid from './VideoGrid'
// import ProfileSidebar from './Profile'
// import Dashboard from './Dashboard'
// import SignIn from './SignIn'
// import SignUp from './SignUp'
// import UploadForm from './UploadForm'
// import VideoPlayerUI from './VideoPlayer'
// import ProtectedRoute from '../services/protectedRoute'
// import MainLayout from './MainLayout'

// const Main = () => {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<MainLayout><VideoGrid /></MainLayout>}></Route>
//         <Route path="/SignIn" element={<SignIn />}></Route>
//         <Route path="/SignUp" element={<SignUp />}></Route>
//         <Route path="/Trending" element={<VideoGrid />}></Route>
//         <Route path="/NewVideos" element={<VideoGrid />}></Route>
//         <Route path="/GamingVideos" element={<VideoGrid />}></Route>
//         <Route path="/Profile" element={<ProtectedRoute><MainLayout><ProfileSidebar /></MainLayout></ProtectedRoute>}></Route>
//         <Route path="/Dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>}></Route>
//         <Route path="/Upload" element={<ProtectedRoute><MainLayout><UploadForm /></MainLayout></ProtectedRoute>}></Route>
//         <Route path="/VideoPlayer" element={<ProtectedRoute><MainLayout><VideoPlayerUI /></MainLayout></ProtectedRoute>}></Route>
//       </Routes>
//     </>
//   );
// }

// export default Main

import React from "react";
import { Route, Routes } from "react-router-dom";
import VideoGrid from "./VideoGrid";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UploadForm from "./UploadForm";
import VideoPlayerUI from "./VideoPlayer";
import ProtectedRoute from "../services/protectedRoute";
import MainLayout from "./MainLayout";

// ── Library pages ──────────────────────────────────────────────────
import WatchHistory from "./WatchHistory"; // Rewind
import WatchLater from "./WatchLater"; // Queue
import LikedVideos from "./LikedVideos"; // Reels
import SavedVideos from "./SavedVideos"; // Stash
import Playlists from "./Playlists"; // Vaults
import Notifications from "./Notifications";

const Main = () => {
  return (
    <Routes>
      {/* ── Public ──────────────────────────────────────────────── */}
      <Route
        path="/"
        element={
          <MainLayout>
            <VideoGrid />
          </MainLayout>
        }
      />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />

      {/* Legacy category routes — reuse VideoGrid */}
      <Route
        path="/Trending"
        element={
          <MainLayout>
            <VideoGrid />
          </MainLayout>
        }
      />
      <Route
        path="/NewVideos"
        element={
          <MainLayout>
            <VideoGrid />
          </MainLayout>
        }
      />
      <Route
        path="/GamingVideos"
        element={
          <MainLayout>
            <VideoGrid />
          </MainLayout>
        }
      />

      {/* ── Protected ───────────────────────────────────────────── */}
      <Route
        path="/Profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Other user's profile */}
      <Route
        path="/channel/:userId"
        element={
          <MainLayout>
            <Profile />
          </MainLayout>
        }
      />

      <Route
        path="/Dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/Upload"
        element={
          <ProtectedRoute>
            <MainLayout>
              <UploadForm />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/VideoPlayer"
        element={
          <ProtectedRoute>
            <MainLayout>
              <VideoPlayerUI />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ── Library ─────────────────────────────────────────────── */}
      {/* History  → /rewind  */}
      <Route
        path="/rewind"
        element={
          <ProtectedRoute>
            <MainLayout>
              <WatchHistory />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      {/* Also keep /history for any hardcoded links */}
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <MainLayout>
              <WatchHistory />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Watch Later → /queue */}
      <Route
        path="/queue"
        element={
          <ProtectedRoute>
            <MainLayout>
              <WatchLater />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/watch-later"
        element={
          <ProtectedRoute>
            <MainLayout>
              <WatchLater />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Liked Videos → /reels */}
      <Route
        path="/reels"
        element={
          <ProtectedRoute>
            <MainLayout>
              <LikedVideos />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/liked"
        element={
          <ProtectedRoute>
            <MainLayout>
              <LikedVideos />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Saved Videos → /stash */}
      <Route
        path="/stash"
        element={
          <ProtectedRoute>
            <MainLayout>
              <SavedVideos />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/saved"
        element={
          <ProtectedRoute>
            <MainLayout>
              <SavedVideos />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Playlists → /vaults */}
      <Route
        path="/vaults"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Playlists />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/playlists"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Playlists />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Notifications */}
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Notifications />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Main;