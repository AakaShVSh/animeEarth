// import axios from "axios";
// import Cookies from "js-cookie";

// const getBaseUrl = () => {
//   if (window.location.hostname === "localhost") {
//     return "http://localhost:80/user";
//   }
//   return "https://animetubebackend.onrender.com/user";
// };

// const BASE_URL = getBaseUrl();

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
//   timeout: 10000,
// });

// export const userSignupApi = async (data) => {
//   try {
//     const response = await axiosInstance.post("/signup", data);
//     return { success: true, data: response.data };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.response?.data?.message || "Signup failed",
//     };
//   }
// };

// export const userSigninApi = async (data) => {
//   try {
//     const response = await axiosInstance.post("/signin", data);
//     return { success: true, data: response.data };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.response?.data?.message || "Signin failed",
//     };
//   }
// };

// export const SignoutApi = async () => {
//   try {
//     await axiosInstance.post("/signout");
//   } catch (error) {
//     Cookies.remove("isLoggedIn");
//     console.log(error);
//   }
// };

// export const isAuthenticated = () => {
//   return Cookies.get("isLoggedIn") === "true";
// };

// // ─── FIXED: now fetches full user profile from DB, not just session cookie ───
// // This ensures hasChannel, channelName, channelDescription are always returned.
// // Your /me endpoint must SELECT these fields from MongoDB (see note below).
// export const checkAuthApi = async () => {
//   try {
//     const response = await axiosInstance.get("/me");
//     const user = response.data.user;

//     // If your /me endpoint already returns the full user with studio fields,
//     // this is all you need. If it only returns basic session fields,
//     // you need to fix the backend (see note at bottom of file).
//     return { authenticated: true, user };
//   } catch {
//     return { authenticated: false, user: null };
//   }
// };

// export const forgotPasswordApi = async (data) => {
//   try {
//     const response = await axiosInstance.post("/forgot-password", data);
//     return { success: true, data: response.data };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.response?.data?.message || "Request failed",
//     };
//   }
// };

// export const changePasswordApi = async (id, data) => {
//   try {
//     const response = await axiosInstance.patch(`/change-password/${id}`, data);
//     return { success: true, data: response.data };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.response?.data?.message || "Failed to update password",
//     };
//   }
// };

// export const googleAuthApi = () => {
//   window.location.href = `${BASE_URL}/google`;
// };

// import axios from "axios";
// import Cookies from "js-cookie";

// const getBaseUrl = () => {
//   if (window.location.hostname === "localhost") {
//     return "http://localhost:80/user";
//   }
//   return "https://animetubebackend.onrender.com/user";
// };

// const BASE_URL = getBaseUrl();

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
//   timeout: 10000,
// });

// export const userSignupApi = async (data) => {
//   try {
//     const response = await axiosInstance.post("/signup", data);
//     return { success: true, data: response.data };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.response?.data?.message || "Signup failed",
//     };
//   }
// };

// export const userSigninApi = async (data) => {
//   try {
//     const response = await axiosInstance.post("/signin", data);
//     return { success: true, data: response.data };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.response?.data?.message || "Signin failed",
//     };
//   }
// };

// export const SignoutApi = async () => {
//   try {
//     await axiosInstance.post("/signout");
//   } catch (error) {
//     Cookies.remove("isLoggedIn");
//     console.log(error);
//   }
// };

// export const isAuthenticated = () => {
//   console.log(Cookies.get("isLoggedIn"));

//   return Cookies.get("isLoggedIn") === "true";
// };

// // ─── checkAuthApi: returns full user profile from /me endpoint ───────────────
// // The /me endpoint MUST return these fields for the UI to work correctly:
// //   { _id, username, email, profilePicture, hasChannel, channelName,
// //     channelDescription, subscribers, createdAt }
// //
// // If your /me controller only returns session data, update it like this:
// //
// //   const user = await User.findById(req.user._id).select(
// //     "_id username email profilePicture hasChannel channelName channelDescription subscribers createdAt"
// //   );
// //   res.json({ user });
// //
// // Google OAuth users: profilePicture is populated from Google at signup.
// // Email-only users: profilePicture is "" — TopBar shows first letter of email instead.
// export const checkAuthApi = async () => {
//   try {
//     const response = await axiosInstance.get("/me");
//     const user = response.data.user;

//     // If your /me endpoint already returns the full user with studio fields,
//     // this is all you need. If it only returns basic session fields,
//     // you need to fix the backend (see note at bottom of file).
//     return { authenticated: true, user };
//   } catch {
//     return { authenticated: false, user: null };
//   }
// };

// export const forgotPasswordApi = async (data) => {
//   try {
//     const response = await axiosInstance.post("/forgot-password", data);
//     return { success: true, data: response.data };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.response?.data?.message || "Request failed",
//     };
//   }
// };

// export const changePasswordApi = async (id, data) => {
//   try {
//     const response = await axiosInstance.patch(`/change-password/${id}`, data);
//     return { success: true, data: response.data };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.response?.data?.message || "Failed to update password",
//     };
//   }
// };

// export const googleAuthApi = () => {
//   window.location.href = `${BASE_URL}/google`;
// };

import axios from "axios";

const getBaseUrl = () => {
  if (window.location.hostname === "localhost") {
    return "http://localhost:80/user";
  }
  return "https://animetubebackend.onrender.com/user";
};

const BASE_URL = getBaseUrl();

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // still needed so session cookie is sent to /me
  timeout: 10000,
});

export const userSignupApi = async (data) => {
  try {
    const response = await axiosInstance.post("/signup", data);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Signup failed",
    };
  }
};

export const userSigninApi = async (data) => {
  try {
    const response = await axiosInstance.post("/signin", data);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Signin failed",
    };
  }
};

export const SignoutApi = async () => {
  try {
    await axiosInstance.post("/signout");
  } catch (error) {
    console.log(error);
  }
};

export const checkAuthApi = async () => {
  try {
    const response = await axiosInstance.get("/me");
    return { authenticated: true, user: response.data.user };
  } catch {
    return { authenticated: false, user: null };
  }
};

export const forgotPasswordApi = async (data) => {
  try {
    const response = await axiosInstance.post("/forgot-password", data);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Request failed",
    };
  }
};

export const changePasswordApi = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/change-password/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update password",
    };
  }
};

export const googleAuthApi = () => {
  window.location.href = `${BASE_URL}/google`;
};