// src/components/Step3.tsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema, type Step3Schema, servicesOffered, pricingModels, currencies } from "../validation/stepOneSchema";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { setStep3Data, prevStep, resetForm } from "../redux/slices/formSlice";
import Input from "../components/common/Input";

const Step3: React.FC = () => {
    const dispatch = useDispatch();
    const savedData = useSelector((state: RootState) => state.form.step3);
    const [file, setFile] = useState<File | null>(null);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Step3Schema>({
        resolver: zodResolver(step3Schema),
        defaultValues: savedData,
    });

    const step1Data = useSelector((state: RootState) => state.form.step1);
    const step2Data = useSelector((state: RootState) => state.form.step2);

    const watchedServices = watch("services") || [];
    const watchedDeclaration = watch("declaration");

    const handlePrev = () => {
        dispatch(setStep3Data(watch()));
        dispatch(prevStep());
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        if (selectedFile) setValue("finalDoc", selectedFile);
    };

    const onSubmit = async (data: Step3Schema) => {
        dispatch(setStep3Data(data));

        alert("Form submitted successfully 🎉");
        console.log("Final Form Data:", {
            step1: step1Data,
            step2: step2Data,
            step3: data,
        });

        dispatch(resetForm());
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-2xl font-bold text-blue-500">Step 3 - Services & Final Document</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 p-4 rounded-lg shadow-lg">
                {/* Services Offered - checkbox group */}
                <div className="flex flex-col mb-4">
                    <label className="text-left mb-2 font-medium">Services Offered *</label>
                    <div className="flex flex-col">
                        {servicesOffered.map((service) => (
                            <label key={service} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={service}
                                    {...register("services")}
                                    defaultChecked={watchedServices.includes(service)}
                                    className="mr-2"
                                />
                                {service}
                            </label>
                        ))}
                    </div>
                    {errors.services && (
                        <p className="text-red-500 text-left text-sm mt-1">{errors.services.message}</p>
                    )}
                </div>

                {/* Pricing Model - radio buttons */}
                <div className="flex flex-col mb-4">
                    <label className="text-left mb-2 font-medium">Pricing Model *</label>
                    <div className="flex flex-col">
                        {pricingModels.map((model) => (
                            <label key={model} className="flex items-center">
                                <input
                                    type="radio"
                                    value={model}
                                    {...register("pricingModel")}
                                    defaultChecked={watch("pricingModel") === model}
                                    className="mr-2"
                                />
                                {model}
                            </label>
                        ))}
                    </div>
                    {errors.pricingModel && (
                        <p className="text-red-500 text-left text-sm mt-1">{errors.pricingModel.message}</p>
                    )}
                </div>

                {/* Preferred Currency - select */}
                <div className="flex flex-col mb-4">
                    <label className="text-left mb-2 font-medium">Preferred Currency</label>
                    <select
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("currency")}
                    >
                        <option value="">Select Currency</option>
                        {currencies.map((c) => (
                            <option key={c} value={c} selected={watch("currency") === c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </div>


                {/* Additional Notes - textarea */}
                <Input
                    label="Additional Notes"
                    type="textarea"
                    register={register("notes")}
                    error={errors.notes}
                />

                {/* Final Document - file input */}
                <div className="flex flex-col mb-4 md:col-span-2">
                    <label className="text-left mb-2 font-medium">Final Document (e.g., KYC Proof)</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    {file && (
                        <div className="mt-2">
                            <strong>File Selected:</strong> {file.name}
                        </div>
                    )}
                </div>


                {/* Declaration - checkbox */}
                <div className="flex flex-col mb-4 md:col-span-2">
                    <label className="flex items-center mt-2">
                        <input
                            type="checkbox"
                            {...register("declaration")}
                            defaultChecked={watchedDeclaration}
                            className="mr-2"
                        />
                        I agree to the declaration *
                    </label>
                    {errors.declaration && (
                        <p className="text-red-500 text-left text-sm mt-1">{errors.declaration.message}</p>
                    )}
                </div>
            </div>

            {/* Buttons */}
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
                    Submit
                </button>
            </div>
        </form>

    );
};

export default Step3;
