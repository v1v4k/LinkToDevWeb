export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:4444" : "/api";

export const MEMBERSHIP_PLANS = {
  SILVER: {
    id: "silver",
    name: "Silver Membership",
    price: "$10.00",
    features: ["Chat with 10 people/day", "Basic Support"],
    style: "bg-base-100 border-gray-300",
    buttonStyle: "btn-primary",
  },
  GOLD: {
    id: "gold",
    name: "Gold Membership",
    price: "$20.00",
    features: ["Unlimited Chats", "Profile Boost", "Priority Support"],
    style: "bg-base-100 border-yellow-400 border-2 shadow-xl",
    buttonStyle: "btn-warning",
    isBestValue: true,
  },
};