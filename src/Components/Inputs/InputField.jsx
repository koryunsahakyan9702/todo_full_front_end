import React from 'react';

function InputField({ name, label, type = "text", register, errors, validationRules }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        
        id={name}
        type={type}
        placeholder={`Enter your ${label.toLowerCase()}`}
        {...register(name, validationRules)}
        className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
    </div>
  );
}

export default InputField;
