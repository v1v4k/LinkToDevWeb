import { useState } from "react";
import { useSelector } from "react-redux";

import { MEMBERSHIP_PLANS } from "../../utils/constants";
import { createCheckoutSession } from "../../services/payment";
import PremiumCard from "./PremiumCard";

const Premium = () => {
  const user = useSelector((store) => store.user);
  const [loadingId, setLoadingId] = useState(null);

  const handleBuy = async (planId) => {
    if (!user) return alert("Please login first!");

    setLoadingId(planId);
    try {
      const order = await createCheckoutSession(planId);
      if (order?.url) {
        window.location.href = order.url; // Redirect to Stripe
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-base-100 py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-base-content">
          Upgrade your Plan
        </h1>
        <p className="mt-4 text-lg text-base-content/60">
          Unlock exclusive features today.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-3xl mx-auto">
        <PremiumCard
          plan={MEMBERSHIP_PLANS.SILVER}
          onBuy={handleBuy}
          loading={loadingId === "silver"}
          isCurrentPlan={user?.membershipType === "silver"}
        />
        <PremiumCard
          plan={MEMBERSHIP_PLANS.GOLD}
          onBuy={handleBuy}
          loading={loadingId === "gold"}
          isCurrentPlan={user?.membershipType === "gold"}
        />
      </div>
    </div>
  );
};

export default Premium;
