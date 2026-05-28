import PropTypes from "prop-types"

const PremiumCard = ({ plan, onBuy, loading, isCurrentPlan }) => (
  <div className={`p-10 rounded-xl border relative ${plan.style}`}>

    {plan.isBestValue && (
      <div className="absolute top-0 right-0 bg-yellow-400 text-black px-3 py-1 text-xs font-bold rounded-bl-lg">
        BEST VALUE
      </div>
    )}
    <h2 className="text-2xl font-bold text-base-content">{plan.name}</h2>
    <ul className="my-6 space-y-2">
      {plan.features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2 text-sm text-base-content/70">
          <span className="text-primary">✓</span> {feature}
        </li>
      ))}
    </ul>

    <p className="text-4xl font-bold text-base-content mb-6">
      {plan.price}
      <span className="text-sm font-normal text-base-content/40">/mo</span>
    </p>

    <button
      onClick={() => onBuy(plan.id)}
      disabled={loading || isCurrentPlan}
      className={`btn w-full ${isCurrentPlan ? "btn-outline opacity-60 cursor-not-allowed" : plan.buttonStyle}`}
    >
      {loading ? "Processing..." : isCurrentPlan ? "✓ Current Plan" : `Buy ${plan.name}`}
    </button>

  </div>
)

PremiumCard.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    isBestValue: PropTypes.bool,
    style: PropTypes.string.isRequired,
    buttonStyle: PropTypes.string.isRequired,
  }).isRequired,
  onBuy: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isCurrentPlan: PropTypes.bool.isRequired,
}

export default PremiumCard