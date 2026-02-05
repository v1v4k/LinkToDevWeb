
const PremiumCard = ({ plan, onBuy, loading }) => {
  return (
    <div className={`p-10 rounded-xl border relative ${plan.style}`}>
      {plan.isBestValue && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-black px-3 py-1 text-xs font-bold rounded-bl-lg">
          BEST VALUE
        </div>
      )}
      
      <h2 className="text-2xl font-bold">{plan.name}</h2>
      
      <ul className="my-6 space-y-2">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <span>✔️</span> {feature}
          </li>
        ))}
      </ul>

      <p className="text-4xl font-bold mb-6">
        {plan.price}<span className="text-sm font-normal text-gray-500">/mo</span>
      </p>

      <button
        onClick={() => onBuy(plan.id)}
        disabled={loading}
        className={`btn w-full ${plan.buttonStyle}`}
      >
        {loading ? "Processing..." : `Buy ${plan.name}`}
      </button>
    </div>
  );
};

export default PremiumCard;