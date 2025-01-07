import React from 'react'
import { Route, Routes } from 'react-router-dom'
import VideoGrid from './VideoGrid'
import ProfileSidebar from './Profile'
import Dashboard from './Dashboard'
import SignIn from './SignIn'
import SignUp from './SignUp'
import UploadForm from './UploadForm'
import VideoPlayerUI from './VideoPlayer'
import ProtectedRoute from '../services/protectedRoute'

const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<VideoGrid />}></Route>
        <Route path="/SignIn" element={<SignIn />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/Trending" element={<VideoGrid />}></Route>
        <Route path="/NewVideos" element={<VideoGrid />}></Route>
        <Route path="/GamingVideos" element={<VideoGrid />}></Route>
        <Route path="/Profile" element={<ProtectedRoute><ProfileSidebar /></ProtectedRoute>}></Route>
        <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}></Route>
        <Route path="/Upload" element={<ProtectedRoute><UploadForm /></ProtectedRoute>}></Route>
        <Route path="/VideoPlayer" element={<ProtectedRoute><VideoPlayerUI /></ProtectedRoute>}></Route>
      </Routes>
    </>
  );
}

export default Main
