import Cookies from "js-cookie";
export const setCookies = (key, value) => {
    if(!key||!value){
        console.error("something went wrong");
        return;
    }
  Cookies.set(key, value, {
    expires: 30, // 1-month expiration
    secure: true, // Ensures the cookie is sent over HTTPS
    sameSite: "Strict", // Prevent CSRF attacks
  });
};

export const getCookies = (key) => {
    const value = Cookies.get(key);
    if(value===undefined){
        return null;
    }
    return value;
}