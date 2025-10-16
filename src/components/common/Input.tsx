// src/components/Input.tsx
import React from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  type?: "text" | "email" | "number" | "tel" | "textarea";
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  error,
  register,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-left mb-2 font-medium">{label}</label>

      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          {...register}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          {...register}
        />
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default Input;
