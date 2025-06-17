import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import Header from "./components/home/Header/Header";

import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Home from "./pages/Home/Home";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Trip from "./pages/Trips_page/Trips_page";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

import Dashboard from "./pages/Dashboard/Dashboard";
import User from "./pages/Dashboard/User/User";
import Hotels from "./pages/Dashboard/Hotels_dash/Hotels_dash";

import Trips from "./pages/Dashboard/Trips_dash/Trips_dash";
import"./index.css"


const Layout = () => {
  return (
    <div>
      <ToastContainer
  position="top-right"
  autoClose={1000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"  
 />
      <Header />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />} />
        <Route path="/shop" element={<Trip />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/News" element={<News />} />
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/category/:category" element={<Offer />} />
        <Route path="/product/:_id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/paymentgateway" element={<Payment />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/user" element={<User />} />
        <Route path="/dashboard/Hotels" element={<Hotels />} />
        
        <Route path="/dashboard/Trips" element={<Trips />} />
 
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
