import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store"; 
import StepOne from "./pages/StepOne";
import StepTwo from "./pages/StepTwo";
import StepThree from "./pages/StepThree";
import './App.css'

const App: React.FC = () => {
  const currentStep = useSelector((state: RootState) => state.form.currentStep);

  return (
    <div>
      {currentStep === 1 && <StepOne />}
      {currentStep === 2 && <StepTwo />}
      {currentStep === 3 && <StepThree />}
    </div>
  );
};

export default App;
