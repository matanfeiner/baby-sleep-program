function AppContent() {
  const [step, setStep] = useState(0);

  const handleNextStep = () => {
    if (step < 10) {
      setStep(step + 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <BabySleepDevelopmentForm onSubmit={handleNextStep} />;
        // Other steps...
    }
  };

  return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-100 to-blue-100">
        <main className="flex-grow overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            {renderStep()}
          </div>
        </main>
        {step < 10 && (
            <footer className="sticky bottom-0 bg-white shadow-sm">
              <div className="container mx-auto px-4 py-2">
                <button
                    onClick={handleNextStep}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 active:bg-blue-700 transition-colors"
                >
                  NEXT STEP
                </button>
              </div>
            </footer>
        )}
      </div>
  );
}

export default App;
