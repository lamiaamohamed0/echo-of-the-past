import { useState, useEffect } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../redux/Front_Handles";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const Payment = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const filteredProducts = products.map(
    (item) => `${item.quantity} x ${item.name}`
  );

  const [totalAmt, setTotalAmt] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");
  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [products]);
  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else if (totalAmt > 401) {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  // Function to format card number with spaces
  const handleCardNumberChange = (e) => {
    const { value } = e.target;

    // Remove non-digit characters
    const cleanedValue = value.replace(/\D/g, "");

    // Format the card number with spaces
    const formattedValue = cleanedValue.match(/.{1,4}/g)?.join(" ") || "";

    setCardNumber(formattedValue);
  };

  // Function to format expiry date with '/'
  const handleExpiryDateChange = (e) => {
    const { value } = e.target;

    // Remove non-digit characters
    const cleanedValue = value.replace(/\D/g, "");

    // Format the value with a slash
    const formattedValue =
      cleanedValue.length > 2
        ? `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}`
        : cleanedValue;

    setExpiryDate(formattedValue);
  };

  const handleCvvChange = (e) => {
    const { value } = e.target;

    // Remove non-digit characters
    const cleanedValue = value.replace(/\D/g, "");

    setCvv(cleanedValue);
  };

  // Function to get existing orders from localStorage
  const getOrdersFromLocalStorage = () => {
    const orders = localStorage.getItem("orders");
    return orders ? JSON.parse(orders) : [];
  };

  // Function to save orders to localStorage
  const saveOrdersToLocalStorage = (orders) => {
    localStorage.setItem("orders", JSON.stringify(orders));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceId = "service_4lomnbe";
    const templateId = "template_xrlg87l";
    const publicKey = "Cf-ud1c7Hdbr_dxnY";
    // Template Params
    const templateParams = {
      to_name: user?.clientName,
      email: user?.email,
      message: filteredProducts.join(", "),
      total_price: totalAmt,
    };
    if (cardNumber.length > 16 && expiryDate && cvv.length === 3) {
      emailjs
        .send(serviceId, templateId, templateParams, publicKey)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Email sent successfully");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      saveOrdersToLocalStorage([
        ...getOrdersFromLocalStorage(),
        {
          items: products,
          totalPrice: totalAmt,
        },
      ]);
      toast.success("Payment successful");
      dispatch(resetCart());
      navigate("/");
    } else {
      toast.error("Please enter valid card details");
    }
  };
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />
      <div className="pb-10">
        <div className="flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              {/* Payment Information */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-6">
                  Payment Information
                </h2>
                <form className="flex flex-col gap-4">
                  <label htmlFor="card-number" className="text-sm font-medium">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    name="card-number"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className="p-3 border border-gray-300 rounded-md"
                    required
                  />
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label
                        htmlFor="expiry-date"
                        className="text-sm font-medium"
                      >
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiry-date"
                        name="expiry-date"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                        className="p-3 border border-gray-300 rounded-md"
                        maxLength="7" // Limits the length to "MM/YY"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="cvv" className="text-sm font-medium">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={cvv}
                        onChange={handleCvvChange}
                        placeholder="123"
                        className="p-3 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* Order Summary */}
              <div className="flex-1 bg-[#e6c78a67] p-6 rounded-md shadow-inner">
                <h2 className="text-2xl font-semibold mb-6">Reservation Summary</h2>
                <p className="text-sm mb-2">
                  <strong>counter:</strong> {products?.length || 0}
                </p>
                <p className="text-lg font-bold mb-6">
                  <strong>Total:</strong> ${totalAmt + shippingCharge}
                </p>
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 bg-[#10AAB2] text-white rounded-md hover:bg-black"
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
