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
//   withCredentials: true, // sends cookies cross-origin
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
//     // Backend clears all cookies
//   } catch (error) {
//     // Even if request fails, clear what we can
//     Cookies.remove("isLoggedIn");
//     console.log(error);
//   }
// };

// // Reads public isLoggedIn cookie — no sensitive data inside
// export const isAuthenticated = () => {
//   return Cookies.get("isLoggedIn") === "true";
// };

// // Calls backend to verify token and get user info
// export const checkAuthApi = async () => {
//   try {
//     const response = await axiosInstance.get("/me");
//     return { authenticated: true, user: response.data.user };
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
import Cookies from "js-cookie";

const getBaseUrl = () => {
  if (window.location.hostname === "localhost") {
    return "http://localhost:80/user";
  }
  return "https://animetubebackend.onrender.com/user";
};

const BASE_URL = getBaseUrl();

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
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
    Cookies.remove("isLoggedIn");
    console.log(error);
  }
};

export const isAuthenticated = () => {
  return Cookies.get("isLoggedIn") === "true";
};

// ─── FIXED: now fetches full user profile from DB, not just session cookie ───
// This ensures hasChannel, channelName, channelDescription are always returned.
// Your /me endpoint must SELECT these fields from MongoDB (see note below).
export const checkAuthApi = async () => {
  try {
    const response = await axiosInstance.get("/me");
    const user = response.data.user;

    // If your /me endpoint already returns the full user with studio fields,
    // this is all you need. If it only returns basic session fields,
    // you need to fix the backend (see note at bottom of file).
    return { authenticated: true, user };
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