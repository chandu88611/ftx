import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineEnvironment, AiOutlineExclamationCircle, AiOutlineDollarCircle } from 'react-icons/ai';

function MultiStepForm() {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Do whatever you want with the form values
    setStep1(false);
    setStep2(true);
  };

  return (
    <div className="bg-cover bg-center  flex items-center justify-center ">
      <div className="p-8 rounded shadow-md w-full ">
        <h2 className="text-2xl mb-4">Online Register Consumer Complaint</h2>

        {step1 && (
          <div className="z-[-1px]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex mb-4 w-full gap-2">
                <div className="relative w-full">
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    placeholder="Name"
                    className={`w-full p-2 border rounded pl-10 ${errors.name ? 'border-red-500' : ''}`}
                  />
                  <AiOutlineUser className="absolute top-3 left-3 text-gray-500" />
                  {errors.name && <div className="text-red-500">{errors.name.message}</div>}
                </div>
                <div className="relative w-full">
                  <input
                    type="email"
                    {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                    placeholder="Email"
                    className={`w-full p-2 border rounded pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  />
                  <AiOutlineMail className="absolute top-3 left-3 text-gray-500" />
                  {errors.email && <div className="text-red-500">{errors.email.message}</div>}
                </div>
              </div>

              <div className="flex mb-4 w-full gap-2">
                <div className="relative w-full">
                  <input
                    type="text"
                    {...register("phone", { required: "Phone is required" })}
                    placeholder="Phone"
                    className={`w-full p-2 border rounded pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  <AiOutlinePhone className="absolute top-3 left-3 text-gray-500" />
                  {errors.phone && <div className="text-red-500">{errors.phone.message}</div>}
                </div>
                <div className="relative w-full">
                  <input
                    type="text"
                    {...register("city", { required: "City is required" })}
                    placeholder="City"
                    className={`w-full p-2 border rounded pl-10 ${errors.city ? 'border-red-500' : ''}`}
                  />
                  <AiOutlineEnvironment className="absolute top-3 left-3 text-gray-500" />
                  {errors.city && <div className="text-red-500">{errors.city.message}</div>}
                </div>
              </div>

              <div className="w-full mb-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    {...register("Complain", { required: "Complain is required" })}
                    placeholder="Complain"
                    className={`w-full p-2 border rounded pl-10 ${errors.Complain ? 'border-red-500' : ''}`}
                  />
                  <AiOutlineExclamationCircle className="absolute top-3 left-3 text-gray-500" />
                  {errors.Complain && <div className="text-red-500">{errors.Complain.message}</div>}
                </div>
              </div>

              <div className="w-full mb-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    {...register("Refund", { required: "Refund Amount is required" })}
                    placeholder="Refund Amount"
                    className={`w-full p-2 border rounded pl-10 ${errors.Refund ? 'border-red-500' : ''}`}
                  />
                  <AiOutlineDollarCircle className="absolute top-3 left-3 text-gray-500" />
                  {errors.Refund && <div className="text-red-500">{errors.Refund.message}</div>}
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Continue
              </button>
            </form>
          </div>
        )}

        {step2 && (
          <div className="z-[-1px]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full mb-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    {...register("field1", { required: "Field 1 is required" })}
                    placeholder="Field 1"
                    className={`w-full p-2 border rounded pl-10 ${errors.field1 ? 'border-red-500' : ''}`}
                  />
                  <AiOutlineUser className="absolute top-3 left-3 text-gray-500" />
                  {errors.field1 && <div className="text-red-500">{errors.field1.message}</div>}
                </div>
              </div>

              <div className="w-full mb-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    {...register("field2", { required: "Field 2 is required" })}
                    placeholder="Field 2"
                    className={`w-full p-2 border rounded pl-10 ${errors.field2 ? 'border-red-500' : ''}`}
                  />
                  <AiOutlineMail className="absolute top-3 left-3 text-gray-500" />
                  {errors.field2 && <div className="text-red-500">{errors.field2.message}</div>}
                </div>
              </div>

              <div className="w-full mb-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    {...register("field3", { required: "Field 3 is required" })}
                    placeholder="Field 3"
                    className={`w-full p-2 border rounded pl-10 ${errors.field3 ? 'border-red-500' : ''}`}
                  />
                  <AiOutlinePhone className="absolute top-3 left-3 text-gray-500" />
                  {errors.field3 && <div className="text-red-500">{errors.field3.message}</div>}
                </div>
              </div>

              <div className="w-full mb-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    {...register("field4", { required: "Field 4 is required" })}
                    placeholder="Field 4"
                    className={`w-full p-2 border rounded pl-10 ${errors.field4 ? 'border-red-500' : ''}`}
                  />
                  <AiOutlineEnvironment className="absolute top-3 left-3 text-gray-500" />
                  {errors.field4 && <div className="text-red-500">{errors.field4.message}</div>}
                </div>
              </div>

              <div className="w-full mb-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    {...register("field5", { required: "Field 5 is required" })}
                    placeholder="Field 5"
                    className={`w-full p-2 border rounded pl-10 ${errors.field5 ? 'border-red-500' : ''}`}
                  />
                  <AiOutlineDollarCircle className="absolute top-3 left-3 text-gray-500" />
                  {errors.field5 && <div className="text-red-500">{errors.field5.message}</div>}
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default MultiStepForm;
