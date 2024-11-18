const PlanOption = ({ duration, price, perDay, popular = false, onSelect, planImage, babyName = "", sleepGoal = 12 }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getDisplayedSleepGoal = (duration, sleepGoal) => {
        switch(duration) {
            case "1-Week Trial":
                return Math.round(sleepGoal / 4);
            case "2-Week Plan":
                return Math.round(sleepGoal / 2);
            case "4-Week Plan":
                return Math.round(sleepGoal);
            default:
                return Math.round(sleepGoal);
        }
    };

    const displayedSleepGoal = getDisplayedSleepGoal(duration, sleepGoal);

    const handleClick = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Initialize Stripe
            const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

            // Create checkout session
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    duration,
                    price,
                    babyName,
                    displayedSleepGoal
                }),
            });

            if (!response.ok) {
                throw new Error('Payment setup failed');
            }

            const { sessionId } = await response.json();

            // Open Stripe checkout modal
            const result = await stripe.redirectToCheckout({
                sessionId,
            });

            if (result.error) {
                throw new Error(result.error.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Payment setup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`bg-white p-4 rounded-lg shadow-md ${popular ? 'border-2 border-blue-500' : ''}`}>
            <div className="relative">
                {planImage && (
                    <div className="relative">
                        <img
                            src={planImage}
                            alt={`${duration} Plan`}
                            className="w-full h-auto mb-4 rounded"
                        />
                        <div className="absolute top-[15%] left-[45%] right-0 text-left">
                            <div
                                className="text-white font-serif leading-tight text-lg"
                                style={{
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                                    fontWeight: '500',
                                    letterSpacing: '0.02em',
                                    filter: 'brightness(1.2)',
                                    transform: 'perspective(500px) rotateY(5deg)',
                                }}
                            >
                                {babyName ? `${babyName}'s` : 'Your'}
                                <br />
                                {displayedSleepGoal}Hr
                                <br />
                                Sleep Plan
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <h3 className="text-lg font-semibold">{duration}</h3>
            <p className="text-2xl font-bold">${price.toFixed(2)}</p>
            <p className="text-md">${perDay.toFixed(2)} per day</p>
            {popular && <span className="text-sm text-blue-500">Most Popular!</span>}

            {error && (
                <div className="text-red-500 text-sm mt-2 mb-2">
                    {error}
                </div>
            )}

            <button
                onClick={handleClick}
                disabled={isLoading}
                className={`w-full bg-blue-500 text-white mt-4 py-2 rounded 
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'} 
                    transition-colors`}
            >
                {isLoading ? 'Processing...' : 'Choose Plan'}
            </button>
        </div>
    );
};