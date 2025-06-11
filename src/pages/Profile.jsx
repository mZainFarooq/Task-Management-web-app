import { useDispatch, useSelector } from "react-redux";
import { handleLogout, handleupdateUserData } from "../firebase/authHandling";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const updatedData = {};

    if (data.username !== user.username) {
      updatedData.username = data.username;
    }

    if (data.fullname !== user.fullname) {
      updatedData.fullname = data.fullname;
    }

    if (Object.keys(updatedData).length === 0) {
      toast.error("No changes to update");
      return;
    }

    handleupdateUserData(user, updatedData, setIsEdit, dispatch);
  };

  return (
    <div className="min-h-screen bg-[#FFF7F0] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-[#FFE8D6]">
        <h2 className="text-2xl font-bold text-[#7B341E] text-center">
          Your Profile
        </h2>

        <div className="flex flex-col items-center space-y-4">
          {/* Profile Photo */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#FB923C] bg-[#FB923C] flex items-center justify-center">
            <span className="text-white text-4xl font-semibold select-none uppercase">
              {user.fullname.slice(0, 1)}
            </span>
          </div>

          {/* User Info */}
          {isEdit ? (
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium text-[#7B341E]">
                  Username
                </label>
                <input
                  type="text"
                  disabled={!isEdit}
                  defaultValue={user?.username}
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters",
                    },
                  })}
                  className={`mt-1 block w-full px-4 py-2 rounded-lg bg-[#FFF3E6] focus:outline-none focus:ring-2 focus:ring-[#F97316] placeholder:text-[#7B341E]  ${
                    errors.username
                      ? "border-red-500"
                      : "border-[#FCD9B8] border"
                  }`}
                />
                {errors.username && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7B341E]">
                  Full Name
                </label>
                <input
                  type="text"
                  disabled={!isEdit}
                  defaultValue={user?.fullname}
                  {...register("fullname", {
                    required: "Full name is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters",
                    },
                  })}
                  className={`mt-1 block w-full px-4 py-2 rounded-lg bg-[#FFF3E6] focus:outline-none focus:ring-2 focus:ring-[#F97316]  placeholder:text-[#7B341E] capitalize ${
                    errors.fullname
                      ? "border-red-500"
                      : "border-[#FCD9B8] border"
                  }`}
                />
                {errors.fullname && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.fullname.message}
                  </p>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className=" w-full bg-[#FB923C] text-white py-2 rounded-lg hover:bg-[#F97316] transition"
                >
                  Update Profile
                </button>
                <button
                  type="button"
                  onClick={() => setIsEdit(false)}
                  className="w-full bg-[#64748B] text-white py-2 rounded-lg hover:bg-[#475569] transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="w-full space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#7B341E]">
                    User Id
                  </label>
                  <input
                    type="text"
                    disabled
                    placeholder={user?.uid}
                    className="mt-1 block w-full px-4 py-2 bg-[#FFF3E6] border border-[#FCD9B8] rounded-lg text-[#7B341E] placeholder:text-[#7B341E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#7B341E]">
                    Username
                  </label>
                  <input
                    type="text"
                    disabled={!isEdit}
                    defaultValue={user?.username}
                    {...register("username", {
                      required: "Username is required",
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters",
                      },
                    })}
                    className={`mt-1 block w-full px-4 py-2 rounded-lg bg-[#FFF3E6] focus:outline-none focus:ring-2 focus:ring-[#F97316] placeholder:text-[#7B341E]  ${
                      errors.username
                        ? "border-red-500"
                        : "border-[#FCD9B8] border"
                    }`}
                  />
                  {errors.username && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#7B341E]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    disabled={!isEdit}
                    defaultValue={user?.fullname}
                    {...register("fullname", {
                      required: "Full name is required",
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters",
                      },
                    })}
                    className={`mt-1 block w-full px-4 py-2 rounded-lg bg-[#FFF3E6] focus:outline-none focus:ring-2 focus:ring-[#F97316]  placeholder:text-[#7B341E] capitalize ${
                      errors.fullname
                        ? "border-red-500"
                        : "border-[#FCD9B8] border"
                    }`}
                  />
                  {errors.fullname && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.fullname.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#7B341E]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    disabled
                    placeholder={user?.email}
                    className="mt-1 block w-full px-4 py-2 bg-[#FFF3E6] border border-[#FCD9B8] rounded-lg text-[#7B341E] placeholder:text-[#7B341E] "
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#7B341E]">
                    Created At
                  </label>
                  <input
                    type="text"
                    disabled
                    placeholder={user?.createdAt}
                    className="mt-1 block w-full px-4 py-2 bg-[#FFF3E6] border border-[#FCD9B8] rounded-lg text-[#7B341E] placeholder:text-[#7B341E] "
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEdit(true)}
                className=" w-full bg-[#FB923C] text-white py-2 rounded-lg hover:bg-[#F97316] transition"
              >
                Edit Profile
              </button>
              <button
                type="button"
                onClick={() => handleLogout(dispatch, navigate)}
                className=" w-full bg-[#DC2626] text-white py-2 rounded-lg hover:bg-[#B91C1C] transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
