import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step1: {},
    step2: {},
    step3: {},
    currentStep: 1,
};

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        setStep1Data: (state, action) => {
            state.step1 = action.payload;
        },
        setStep2Data: (state, action) => {
            state.step2 = action.payload;
        },
        setStep3Data: (state, action) => {
            state.step3 = action.payload;
        },
        nextStep: (state) => {
            if (state.currentStep < 3) state.currentStep += 1;
        },
        prevStep: (state) => {
            if (state.currentStep > 1) state.currentStep -= 1;
        },
        resetForm: () => initialState,
    },
});

export const {
    setStep1Data,
    setStep2Data,
    setStep3Data,
    nextStep,
    prevStep,
    resetForm,
} = formSlice.actions;

export default formSlice.reducer;
