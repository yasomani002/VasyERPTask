import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyTypesData, step1Schema, type Step1Schema } from "../validation/stepOneSchema";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store"; 
import { setStep1Data, nextStep } from "../redux/slices/formSlice";

import { openDB } from "idb";
import Input from "../components/common/Input";

const Step1: React.FC = () => {
    const dispatch = useDispatch();
    const savedData = useSelector((state: RootState) => state.form.step1);

    const [companyTypes, setCompanyTypes] = useState<string[]>([]);
    const [logoFile, setLogoFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Step1Schema>({
        resolver: zodResolver(step1Schema),
        defaultValues: savedData,
    });


    useEffect(() => {
        function fetchCompanyTypes() {
            setCompanyTypes(companyTypesData);
        }
        fetchCompanyTypes();
    }, []);

    useEffect(() => {
        (async () => {
            const db = await openDB("CompanyFormDB", 1, {
                upgrade(db) {
                    db.createObjectStore("logos");
                },
            });
            const storedLogo = await db.get("logos", "companyLogo");
            if (storedLogo) setValue("companyLogo", storedLogo);
        })();
    }, [setValue]);

    const onSubmit = async (data: Step1Schema) => {
        dispatch(setStep1Data(data));
        dispatch(nextStep());

        if (logoFile) {
            const db = await openDB("CompanyFormDB", 1);
            await db.put("logos", logoFile, "companyLogo");
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setLogoFile(file);
        if (file) setValue("companyLogo", file);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p className="text-2xl font-bold text-blue-500">Step 1 - Company Information</p>
                <br />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 p-4 rounded-lg shadow-lg">

                    <Input
                        label="Company Name *"
                        register={register("companyName")}
                        error={errors.companyName}
                    />

                    <div className="flex flex-col mb-4">
                        <label className="text-left mb-2 font-medium">Company Type *</label>
                        <select className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("companyType")}>
                            <option value="">Select Type</option>
                            {companyTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        {errors.companyType && <p className="text-red-500 text-sm mt-1">{errors.companyType.message}</p>}
                    </div>

                    <Input
                        label="Registration Number"
                        register={register("registrationNumber")}
                        error={errors.registrationNumber}
                    />

                    <div className="flex flex-col mb-4">
                        <label className="text-left mb-2 font-medium">Established Date</label>
                        <input className=" ml-2 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer" type="date" {...register("establishedDate")} />
                    </div>

                    <Input
                        label="Employee Count"
                        type="number"
                        register={register("employeeCount", { valueAsNumber: true })}
                        error={errors.employeeCount}
                    />

                    <Input
                        label="Contact Person Name *"
                        register={register("contactName")}
                        error={errors.contactName}
                    />

                    <Input
                        label="Contact Email *"
                        type="email"
                        register={register("contactEmail")}
                        error={errors.contactEmail}
                    />

                    <Input
                        label="Contact Phone *"
                        type="tel"
                        register={register("contactPhone")}
                        error={errors.contactPhone}
                    />

                    <div className="flex flex-col mb-4">
                        <label className="text-left mb-2 font-medium">Company Logo</label>
                        <input className=" ml-2 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer" type="file" accept="image/*" onChange={handleFileChange} />
                    </div>
                    <br />

                </div>
                <button
                    type="submit"
                    className=" cursor-pointer mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Next
                </button>
            </form>

        </>
    );
};

export default Step1;