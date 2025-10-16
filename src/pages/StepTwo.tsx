
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { countriesData, step2Schema, type Step2Schema } from "../validation/stepOneSchema";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";

import { setStep2Data, nextStep, prevStep } from "../redux/slices/formSlice";
import Input from "../components/common/Input";

const Step2: React.FC = () => {
    const dispatch = useDispatch();
    const savedData = useSelector((state: RootState) => state.form.step2);

    const [countries, setCountries] = useState<string[]>([]);
    const [states, setStates] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<Step2Schema>({
        resolver: zodResolver(step2Schema),
        defaultValues: savedData,
    });

    const selectedCountry = watch("country");

    useEffect(() => {
        setCountries(countriesData);
    }, []);

    useEffect(() => {
        if (selectedCountry === "India") setStates(["Gujarat", "Maharashtra", "Rajasthan"]);
        else if (selectedCountry === "USA") setStates(["California", "Texas", "New York"]);
        else if (selectedCountry === "Canada") setStates(["Ontario", "Quebec", "British Columbia"]);
        else setStates([]);
    }, [selectedCountry]);

    const onSubmit = (data: Step2Schema) => {
        dispatch(setStep2Data(data));
        dispatch(nextStep());
    };

    const handlePrev = () => {
        dispatch(setStep2Data(watch()));
        dispatch(prevStep());
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-2xl font-bold text-blue-500">Step 2 - Address & Bank Info</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 p-4 rounded-lg shadow-lg">
                {/* Address (textarea) */}
                <Input
                    label="Address Line *"
                    type="textarea"
                    register={register("address")}
                    error={errors.address}
                />

                {/* Country (select stays as-is) */}
                <div className="flex flex-col mb-4">
                    <label className="text-left mb-2 font-medium">Country *</label>
                    <select
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("country")}
                    >
                        <option value="">Select Country</option>
                        {countries.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                    {errors.country && (
                        <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                    )}
                </div>

                {/* State (select stays as-is) */}
                <div className="flex flex-col mb-4">
                    <label className="text-left mb-2 font-medium">State</label>
                    <select
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("state")}
                    >
                        <option value="">Select State</option>
                        {states.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ZIP / PIN Code */}
                <Input
                    label="ZIP / PIN Code *"
                    type="number"
                    register={register("zipCode", { valueAsNumber: true })}
                    error={errors.zipCode}
                />

                {/* Bank Name */}
                <Input
                    label="Bank Name *"
                    type="text"
                    register={register("bankName")}
                    error={errors.bankName}
                />
            </div>

            <div className="mt-4 flex justify-between">
                <button
                    type="button"
                    className="cursor-pointer bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
                    onClick={handlePrev}
                >
                    Previous
                </button>
                <button
                    type="submit"
                    className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Next
                </button>
            </div>
        </form>

    );
};

export default Step2;
