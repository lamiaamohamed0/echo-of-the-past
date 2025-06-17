import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { resetCart } from "../../redux/Front_Handles";
import emptyCart from "../../assets/images/emptyCart.png";
import ItemCard from "./ItemCard";

const Cart = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser")) || null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  const [totalAmt, setTotalAmt] = useState("");

  useEffect(() => {
    let price = 0;
    products.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmt(price);
  }, [products]);

  const handleLink = () => {
    if (user !== null) {
      navigate("/paymentgateway");
    } else {
      navigate("/signin");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-screen-xl mx-auto px-4 md:px-6 mb-20"
    >
      

      {/* Main Cart Content */}
      {products.length > 0 ? (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {/* Product List */}
          <motion.div className="col-span-2 flex flex-col gap-4">
            {products.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="flex bg-[#e6c78a6b] shadow-md border-t-4 border-[#10AAB2] hover:shadow-xl transition-all duration-300"
              >
                <ItemCard item={item} />
              </motion.div>
            ))}
          </motion.div>

          {/* Cart Summary */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#e6c78a67] p-8 rounded-2xl shadow-md border-t-4 border-[#10AAB2]"
          >
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl text-[#333333] font-semibold"
            >
              Reservation Summary
            </motion.h2>

            <motion.div
              className="mt-6 space-y-4 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex justify-between items-center text-lg font-semibold text-[#10AAB2]">
                <span>Total</span>
                <span className="text-2xl">${totalAmt}</span>
              </div>
            </motion.div>

            <div className="mt-8">
              <motion.button
                onClick={() => dispatch(resetCart())}
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none duration-300 w-full"
              >
                Reset Reservation
              </motion.button>
            </div>

            <div className="mt-6">
              <motion.button
                onClick={handleLink}
                whileHover={{ scale: 1.05 }}
                className="w-full py-4 text-lg bg-[#10AAB2] text-white rounded-lg shadow-lg hover:bg-[#1BB6C7] transition duration-300"
              >
                Proceed to Booking
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center gap-2 py-11"
        >
          <motion.img
            src={emptyCart}
            alt="emptyCart"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-60 object-cover"
          />

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white p-8 rounded-lg shadow-md text-center"
          >
            <h1 className="text-3xl text-[#333333] font-semibold">
              No Reservation until Now
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              It looks like you haven't selected any tours yet. Browse our
              packages to start planning your Egyptian getaway!
            </p>
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-6 px-8 py-3 bg-[#10AAB2] text-white rounded-lg shadow-md hover:bg-[#1BB6C7] duration-300"
              >
                Continue Exploring
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Cart;
