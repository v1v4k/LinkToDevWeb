import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const createCheckoutSession = async (membershipType) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/payment/create-checkout-session`,
      { membershipType },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Payment initialization failed",
    );
  }
};


