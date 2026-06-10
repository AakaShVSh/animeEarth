// import axios from "axios";

// const getBaseUrl = () => {
//   if (window.location.hostname === "localhost") return "http://localhost:80"; // ← fix your port
//   return "https://animetubebackend.onrender.com";
// };

// const api = axios.create({ baseURL: getBaseUrl(), withCredentials: true });

// // ── Videos ────────────────────────────────────────────────
// export const getVideosApi = async ({
//   page = 1,
//   limit = 12,
//   search = "",
//   category = "all",
//   sort = "latest",
// } = {}) => {
//   const params = new URLSearchParams({ page, limit, sort });
//   if (search) params.append("search", search);
//   if (category !== "all") params.append("category", category);
//   const res = await api.get(`/videos?${params}`);
//   return res.data;
// };

// export const getUserVideosApi = async (id, { page = 1, limit = 12 } = {}) => {
//   const res = await api.get(
//     `/videos/user-videos/${id}?page=${page}&limit=${limit}`,
//   );
//   return res.data;
// };

// export const getVideoByIdApi = async (id, userId = null) => {
//   const params = userId ? `?userId=${userId}` : "";
//   const res = await api.get(`/videos/${id}${params}`);
//   return res.data;
// };

// // ── Like / Dislike ────────────────────────────────────────
// export const likeVideoApi = async (videoId, userId, action) => {
//   const res = await api.patch(`/videos/${videoId}/like`, { userId, action });
//   return res.data;
// };

// // ── Save ──────────────────────────────────────────────────
// export const saveVideoApi = async (videoId, userId) => {
//   const res = await api.patch(`/videos/${videoId}/save`, { userId });
//   return res.data;
// };

// // ── Subscribe ─────────────────────────────────────────────
// export const subscribeApi = async (channelId, userId) => {
//   const res = await api.patch(`/videos/subscribe/${channelId}`, { userId });
//   return res.data;
// };

// // ── Comments ──────────────────────────────────────────────
// export const addCommentApi = async (videoId, userId, text) => {
//   const res = await api.post(`/videos/${videoId}/comment`, { userId, text });
//   return res.data;
// };

// export const deleteCommentApi = async (videoId, commentId, userId) => {
//   const res = await api.delete(`/videos/${videoId}/comment/${commentId}`, {
//     data: { userId },
//   });
//   return res.data;
// };

// export const replyCommentApi = async (videoId, commentId, userId, text) => {
//   const res = await api.post(`/videos/${videoId}/comment/${commentId}/reply`, {
//     userId,
//     text,
//   });
//   return res.data;
// };

// export const likeCommentApi = async (videoId, commentId, userId) => {
//   const res = await api.patch(`/videos/${videoId}/comment/${commentId}/like`, {
//     userId,
//   });
//   return res.data;
// };

// // ── Watch History ─────────────────────────────────────────
// export const getWatchHistoryApi = async (
//   userId,
//   { page = 1, limit = 12 } = {},
// ) => {
//   const res = await api.get(
//     `/videos/user/history/${userId}?page=${page}&limit=${limit}`,
//   );
//   return res.data;
// };

// // ── Saved Videos ──────────────────────────────────────────
// export const getSavedVideosApi = async (
//   userId,
//   { page = 1, limit = 12 } = {},
// ) => {
//   const res = await api.get(
//     `/videos/user/saved/${userId}?page=${page}&limit=${limit}`,
//   );
//   return res.data;
// };

// // ── Playlists ─────────────────────────────────────────────
// export const createOrAddToPlaylistApi = async (
//   userId,
//   name,
//   videoId = null,
// ) => {
//   const res = await api.post(`/videos/user/playlist/${userId}`, {
//     name,
//     videoId,
//   });
//   return res.data;
// };

// export const getPlaylistsApi = async (userId) => {
//   const res = await api.get(`/videos/user/playlists/${userId}`);
//   return res.data;
// };

// // ── Upload ────────────────────────────────────────────────
// export const posVideosApi = async (data, onProgress) => {
//   const res = await api.post("/videos/upload", data, {
//     headers: { "Content-Type": "multipart/form-data" },
//     onUploadProgress: (e) => {
//       if (onProgress) onProgress(Math.round((e.loaded * 100) / e.total));
//     },
//   });
//   return res.data;
// };

// export const updateVideosApi = async (id, data) => {
//   const res = await api.patch(`/videos/updating-product/${id}`, data);
//   return res.data;
// };

// export const deleteVideosApi = async (id) => {
//   const res = await api.delete(`/videos/delete-product/${id}`);
//   return res.data;
// };

import axios from "axios";

const getBaseUrl = () => {
  if (window.location.hostname === "localhost") 
    return "http://localhost:80";
  
  return "https://animetubebackend.onrender.com";
};

const api = axios.create({ baseURL: getBaseUrl(), withCredentials: true });

// ── Videos ────────────────────────────────────────────────────────────────
export const getVideosApi = async ({
  page = 1,
  limit = 12,
  search = "",
  category = "all",
  sort = "latest",
} = {}) => {
  const params = new URLSearchParams({ page, limit, sort });
  if (search) params.append("search", search);
  if (category !== "all") params.append("category", category);
  const res = await api.get(`/videos?${params}`);
  return res.data; // { videos, pagination }
};

export const getUserVideosApi = async (id, { page = 1, limit = 12 } = {}) => {
  const res = await api.get(
    `/videos/user-videos/${id}?page=${page}&limit=${limit}`,
  );
  return res.data;
};

export const getVideoByIdApi = async (id, userId = null) => {
  const qs = userId ? `?userId=${userId}` : "";
  const res = await api.get(`/videos/${id}${qs}`);
  return res.data;
};

// ── Studio ────────────────────────────────────────────────────────────────
export const activateStudioApi = async (
  userId,
  channelName,
  channelDescription = "",
) => {
  const res = await api.post("/videos/studio/activate", {
    userId,
    channelName,
    channelDescription,
  });
  return res.data;
};

// ── Like / Dislike ────────────────────────────────────────────────────────
export const likeVideoApi = async (videoId, userId, action) => {
  const res = await api.patch(`/videos/${videoId}/like`, { userId, action });
  return res.data; // { likes, dislikes, likedBy, dislikedBy }
};

// ── Save ──────────────────────────────────────────────────────────────────
export const saveVideoApi = async (videoId, userId) => {
  const res = await api.patch(`/videos/${videoId}/save`, { userId });
  return res.data; // { saved, savedCount }
};

// ── Subscribe ─────────────────────────────────────────────────────────────
export const subscribeApi = async (channelId, userId) => {
  const res = await api.patch(`/videos/subscribe/${channelId}`, { userId });
  return res.data; // { subscribed, subscriberCount }
};

// ── Comments ──────────────────────────────────────────────────────────────
export const addCommentApi = async (videoId, userId, text) => {
  const res = await api.post(`/videos/${videoId}/comment`, { userId, text });
  return res.data;
};

export const deleteCommentApi = async (videoId, commentId, userId) => {
  const res = await api.delete(`/videos/${videoId}/comment/${commentId}`, {
    data: { userId },
  });
  return res.data;
};

export const replyCommentApi = async (videoId, commentId, userId, text) => {
  const res = await api.post(`/videos/${videoId}/comment/${commentId}/reply`, {
    userId,
    text,
  });
  return res.data;
};

export const likeCommentApi = async (videoId, commentId, userId) => {
  const res = await api.patch(`/videos/${videoId}/comment/${commentId}/like`, {
    userId,
  });
  return res.data;
};

// ── Watch History ─────────────────────────────────────────────────────────
export const getWatchHistoryApi = async (
  userId,
  { page = 1, limit = 20 } = {},
) => {
  const res = await api.get(
    `/videos/user/history/${userId}?page=${page}&limit=${limit}`,
  );
  return res.data; // { history, pagination }
};

export const clearWatchHistoryApi = async (userId) => {
  const res = await api.delete(`/videos/user/history/${userId}`);
  return res.data;
};

// ── Saved Videos ──────────────────────────────────────────────────────────
export const getSavedVideosApi = async (
  userId,
  { page = 1, limit = 12 } = {},
) => {
  const res = await api.get(
    `/videos/user/saved/${userId}?page=${page}&limit=${limit}`,
  );
  return res.data; // { videos, pagination }
};

// ── Liked Videos ──────────────────────────────────────────────────────────
export const getLikedVideosApi = async (
  userId,
  { page = 1, limit = 12 } = {},
) => {
  const res = await api.get(
    `/videos/user/liked/${userId}?page=${page}&limit=${limit}`,
  );
  return res.data; // { videos, pagination }
};

// ── Playlists ─────────────────────────────────────────────────────────────
export const createOrAddToPlaylistApi = async (
  userId,
  name,
  videoId = null,
) => {
  const res = await api.post(`/videos/user/playlist/${userId}`, {
    name,
    videoId,
  });
  return res.data; // { playlists }
};

export const getPlaylistsApi = async (userId) => {
  const res = await api.get(`/videos/user/playlists/${userId}`);
  return res.data; // { playlists }
};

// ── Upload ────────────────────────────────────────────────────────────────
export const posVideosApi = async (data, onProgress) => {
  const res = await api.post("/videos/upload", data, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (onProgress) onProgress(Math.round((e.loaded * 100) / e.total));
    },
  });
  console.log(data);
  
  return res.data;
};

export const updateVideosApi = async (id, data) => {
  const res = await api.patch(`/videos/updating-product/${id}`, data);
  return res.data;
};

export const deleteVideosApi = async (id) => {
  const res = await api.delete(`/videos/delete-product/${id}`);
  return res.data;
};