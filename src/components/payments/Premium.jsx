import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";

const Premium = () => {
  const stripe = useStripe();
  const user = useSelector((store) => store?.user);
  const userId = user ? user._id : null;

  const handleSubscribe = async (priceId) => {
    if (!stripe || !userId) {
      console.error(`Stripe.js has not loaded or user is not authenticated.`);
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_URL}/payment/create-checkout-session`,
        {
          priceId,
          userId,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="flex w-full flex-col lg:flex-row lg:justify-center mt-[8%]">
        <div className="card bg-base-300 rounded-box grid h-48 w-96 place-items-center p-3">
          <h1 className="font-bold text-2xl">Silver Membership</h1>
          <ul>
            <li>Chat with other people</li>
            <li>100 requests per day</li>
            <li>3 months</li>
          </ul>
          <button
            className="btn btn-soft btn-primary "
            onClick={() =>
              handleSubscribe(import.meta.env.VITE_STRIPE_SILVER_PRICE_ID)
            }
          >
            Subscribe Silver
          </button>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="card bg-base-300 rounded-box grid h-48 w-96  place-items-center p-3">
          <h1 className="font-bold text-2xl">Gold Membership</h1>
          <ul>
            <li>Chat with other people</li>
            <li>Unlimited requests per day</li>
            <li>6 months</li>
          </ul>
          <button
            className="btn btn-soft btn-secondary "
            onClick={() =>
              handleSubscribe(import.meta.env.VITE_STRIPE_GOLD_PRICE_ID)
            }
          >
            Subscribe Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
