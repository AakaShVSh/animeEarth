import axios from "axios";

// export const getVideosApi = async (sv) => {
//   axios
//     .get("http://localhost:80/videos")
//     .then((r) => {
//       console.log(r);
//       sv(r.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };


export const userSignupApi = async (data) => {
  try {
    console.log(data);

    const response = await axios.post(
      "http://localhost:80/user/signup",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    // return response; // Return the response if needed
  } catch (error) {
    console.log(error);
  }
};

export const userSigninApi = async () => {
  axios
    .patch(`http://localhost:80/user/signin`)
    .then((r) => {
      console.log(r);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const forgotPasswordApi = async () => {
  axios
    .delete(`http://localhost:80/user/forgot-password`)
    .then((r) => {
      console.log(r);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const changePasswordApi = async (id) => {
  axios
    .delete(`http://localhost:80/user/change-password/${id}`)
    .then((r) => {
      console.log(r);
    })
    .catch((error) => {
      console.log(error);
    });
};
