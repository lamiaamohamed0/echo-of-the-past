// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Signphoto from "../../assets/images/logo.png";
// import GoogleLogin from "react-google-login";
// import { gsap } from "gsap";
// import 'font-awesome/css/font-awesome.min.css';
// import './Signin.css';

// const SignIn = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errEmail, setErrEmail] = useState("");
//   const [errPassword, setErrPassword] = useState("");

//   useEffect(() => {
//     gsap.fromTo(".left-section", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1 });
//   }, []);

//   const parseJwt = (token) => {
//     try {
//       const base64Url = token.split('.')[1];
//       const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//       const jsonPayload = decodeURIComponent(
//         atob(base64).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join('')
//       );
//       return JSON.parse(jsonPayload);
//     } catch (e) {
//       return null;
//     }
//   };

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     setErrEmail("");
//     setErrPassword("");

//     if (!email) {
//       setErrEmail("Enter your username or email");
//       return;
//     }
//     if (!password) {
//       setErrPassword("Enter your password");
//       return;
//     }

//     try {
//       const response = await fetch("http://echoesofthepast.runasp.net/api/User/Account/Login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userName: email, password }),
//       });

//       if (!response.ok) throw new Error("Invalid username or password");

//       const data = await response.json();

//       if (data?.token) {
//         localStorage.setItem("loggedInUser", JSON.stringify({ token: data.token }));

//         const payload = parseJwt(data.token);
//         const userRole = payload?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

//         if (userRole === "Admin") {
//           navigate("/Dashboard");
//         } else {
//           navigate("/Home");
//         }
//       } else {
//         throw new Error("Token not found");
//       }

//     } catch (error) {
//       console.error("Login failed:", error.message);
//       setErrPassword("Invalid username or password");
//     }
//   };

//   const handleGoogleLogin = (response) => {
//     if (response?.profileObj) {
//       localStorage.setItem("loggedInUser", JSON.stringify(response.profileObj));
//       navigate("/user-home");
//     }
//   };

//   return (
//     <div className="w-full h-screen flex items-center justify-center" style={{ backgroundColor: "#fdfaf4" }}>
//       {/* Left Section */}
//       <div className="w-1/3 hidden lgl:inline-flex h-full text-white relative left-section">
//         <div className="w-[550px] h-full bg-[#E6C78A] px-10 flex flex-col items-center justify-center">
//           <div className="w-[350px] h-[450px] bg-[#46A29F] flex justify-center items-center rounded-3xl mb-6">
//             <div className="absolute top-20 left-70 flex flex-col items-center text-center">
//               <h1 className="font-titleFont text-5xl font-medium text-white ml-80 mb-2" style={{ textShadow: "2px 3px 5px rgba(0, 0, 0, 0.4)" }}>
//                 Unlock The Secrets Of Egypt!
//               </h1>
//             </div>
//             <div className="absolute bottom-0 right-10">
//               <Link to="/"><img src={Signphoto} alt="logo" className="w-70 h-70" /></Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="w-full lgl:w-1/2 h-full flex items-center justify-center">
//         <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
//           <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll">
//             <h1 className="font-titleFont text-4xl mb-4 ml-36" style={{ fontFamily: 'Poppins, sans-serif' }}>LOGIN</h1>

//             <div className="flex flex-col gap-3">
//               <div>
//                 <p className="font-titleFont text-base font-semibold">Username or Email</p>
//                 <div className="relative">
//                   <i className="fa fa-user absolute left-3 top-2" style={{ color: '#46A29F' }}></i>
//                   <input
//                     onChange={(e) => { setEmail(e.target.value); setErrEmail(""); }}
//                     value={email}
//                     className="w-full h-8 pl-10 border rounded-md"
//                     type="text"
//                     placeholder="User_Name or User@gmail.com"
//                     style={{ backgroundColor: '#e4d1aee0' }}
//                   />
//                 </div>
//                 {errEmail && <p className="text-sm text-red-500">{errEmail}</p>}
//               </div>

//               <div>
//                 <p className="font-titleFont text-base font-semibold">Password</p>
//                 <div className="relative">
//                   <i className="fa fa-lock absolute left-3 top-2" style={{ color: '#46A29F' }}></i>
//                   <input
//                     onChange={(e) => { setPassword(e.target.value); setErrPassword(""); }}
//                     value={password}
//                     className="w-full h-8 pl-10 border rounded-md"
//                     type="password"
//                     placeholder="password"
//                     style={{ backgroundColor: '#e4d1aee0' }}
//                   />
//                 </div>
//                 {errPassword && <p className="text-sm text-red-500">{errPassword}</p>}
//               </div>

//               <button onClick={handleSignIn} className="bg-gradient-to-r from-[#A79277] to-[#E6C78A] hover:bg-black text-white w-full h-10 rounded-md">
//                 Login Now
//               </button>

//               <p className="text-sm text-center">
//                 Don't have an Account? <Link to="/signup" className="text-black hover:underline">Sign up</Link>
//               </p>

//               <p className="text-sm text-center text-gray-500">ــــــــــ OR ــــــــــ</p>

//               <div className="flex justify-center mt-4">
//                 <GoogleLogin
//                   clientId="YOUR_GOOGLE_CLIENT_ID"
//                   onSuccess={handleGoogleLogin}
//                   onFailure={(error) => console.log(error)}
//                   buttonText="Login with Google"
//                   className="google-login-button"
//                 />
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Signphoto from "../../assets/images/logo.png";
import GoogleLogin from "react-google-login";
import { gsap } from "gsap";
import 'font-awesome/css/font-awesome.min.css';
import './Signin.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  useEffect(() => {
    gsap.fromTo(".left-section", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1 });
  }, []);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrEmail("");
    setErrPassword("");

    if (!email) {
      setErrEmail("Enter your username or email");
      return;
    }
    if (!password) {
      setErrPassword("Enter your password");
      return;
    }

    try {
      const response = await fetch("http://echoesofthepast.runasp.net/api/User/Account/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: email, password }),
      });

      if (!response.ok) throw new Error("Invalid username or password");

      const data = await response.json();

      if (data?.token) {
        localStorage.setItem("loggedInUser", JSON.stringify({ token: data.token }));

        const payload = parseJwt(data.token);
        const userRole = payload?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        if (userRole === "Admin" || userRole === "User") {
          navigate("/");
        } else {
          navigate("/");
        }
      } else {
        throw new Error("Token not found");
      }

    } catch (error) {
      console.error("Login failed:", error.message);
      setErrPassword("Invalid username or password");
    }
  };

  const handleGoogleLogin = (response) => {
    if (response?.profileObj) {
      localStorage.setItem("loggedInUser", JSON.stringify(response.profileObj));
      navigate("/");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center" style={{ backgroundColor: "#fdfaf4" }}>
      {/* Left Section */}
      <div className="w-1/3 hidden lgl:inline-flex h-full text-white relative left-section">
        <div className="w-[550px] h-full bg-[#E6C78A] px-10 flex flex-col items-center justify-center">
          <div className="w-[350px] h-[450px] bg-[#46A29F] flex justify-center items-center rounded-3xl mb-6">
            <div className="absolute top-20 left-70 flex flex-col items-center text-center">
              <h1 className="font-titleFont text-5xl font-medium text-white ml-80 mb-2" style={{ textShadow: "2px 3px 5px rgba(0, 0, 0, 0.4)" }}>
                Unlock The Secrets Of Egypt!
              </h1>
            </div>
            <div className="absolute bottom-0 right-10">
              <Link to="/"><img src={Signphoto} alt="logo" className="w-70 h-70" /></Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lgl:w-1/2 h-full flex items-center justify-center">
        <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
          <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll">
            <h1 className="font-titleFont text-4xl mb-4 ml-36" style={{ fontFamily: 'Poppins, sans-serif' }}>LOGIN</h1>

            <div className="flex flex-col gap-3">
              <div>
                <p className="font-titleFont text-base font-semibold">Username or Email</p>
                <div className="relative">
                  <i className="fa fa-user absolute left-3 top-2" style={{ color: '#46A29F' }}></i>
                  <input
                    onChange={(e) => { setEmail(e.target.value); setErrEmail(""); }}
                    value={email}
                    className="w-full h-8 pl-10 border rounded-md"
                    type="text"
                    placeholder="User_Name or User@gmail.com"
                    style={{ backgroundColor: '#e4d1aee0' }}
                  />
                </div>
                {errEmail && <p className="text-sm text-red-500">{errEmail}</p>}
              </div>

              <div>
                <p className="font-titleFont text-base font-semibold">Password</p>
                <div className="relative">
                  <i className="fa fa-lock absolute left-3 top-2" style={{ color: '#46A29F' }}></i>
                  <input
                    onChange={(e) => { setPassword(e.target.value); setErrPassword(""); }}
                    value={password}
                    className="w-full h-8 pl-10 border rounded-md"
                    type="password"
                    placeholder="password"
                    style={{ backgroundColor: '#e4d1aee0' }}
                  />
                </div>
                {errPassword && <p className="text-sm text-red-500">{errPassword}</p>}
              </div>

              <button onClick={handleSignIn} className="bg-gradient-to-r from-[#A79277] to-[#E6C78A] hover:bg-black text-white w-full h-10 rounded-md">
                Login Now
              </button>

              <p className="text-sm text-center">
                Don't have an Account? <Link to="/signup" className="text-black hover:underline">Sign up</Link>
              </p>

              <p className="text-sm text-center text-gray-500">ــــــــــ OR ــــــــــ</p>

              <div className="flex justify-center mt-4">
                <GoogleLogin
                  clientId="YOUR_GOOGLE_CLIENT_ID"
                  onSuccess={handleGoogleLogin}
                  onFailure={(error) => console.log(error)}
                  buttonText="Login with Google"
                  className="google-login-button"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
