import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { profileSchema } from "../../schemas/profileSchema";
import useProfile from "../../hooks/useProfile";
import Field from "../shared/Field";
import SkillsInput from "./SkillsInput";
import { inputCls, textareaCls, selectCls } from "../../utils/formStyles";

const ProfileForm = ({ user, onValuesChange }) => {
    console.log(user)
    console.log("user in ProfileForm:", user?.firstName)
  const {
    register,
    handleSubmit,
    setError,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      age: user?.age || "",
      gender: user?.gender || "",
      about: user?.about || "",
      photoUrl: user?.photoUrl || "",
      skills: user?.skills || [],
    },
  });

  const { handleUpdateProfile, showToast } = useProfile();

 useEffect(() => {
  const subscription = watch((values) => onValuesChange(values))
  return () => subscription.unsubscribe()  
}, [watch, onValuesChange])



  const onSubmit = async (formData) => {
    try {
      await handleUpdateProfile(formData);
    } catch (error) {
      setError("root", { message: error?.message || "Update failed" });
    }
  };

  return (
    <div className="flex-1 h-full flex flex-col">
      <div className="p-4 shrink-0">
        <div className="max-w-xl mx-auto w-full border-b border-base-300 pb-3">
          <h1 className="text-2xl font-bold text-base-content pt-6">Edit Profile</h1>
          <p className="text-base-content/60 text-sm mt-1">
            Update your personal details
          </p>
        </div>
      </div>

      <div className="overflow-y-auto p-4 flex-1">
        <div className="max-w-xl mx-auto w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <Field label="First Name" error={errors.firstName?.message}>
                <input
                  {...register("firstName")}
                  type="text"
                  placeholder="Jane"
                  className={inputCls}
                />
              </Field>
              <Field label="Last Name" error={errors.lastName?.message}>
                <input
                  {...register("lastName")}
                  type="text"
                  placeholder="Doe"
                  className={inputCls}
                />
              </Field>
            </div>

            <Field label="Photo URL" error={errors.photoUrl?.message}>
              <input
                {...register("photoUrl")}
                type="text"
                placeholder="https://example.com/photo.jpg"
                className={inputCls}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Age" error={errors.age?.message}>
                <input
                  {...register("age")}
                  type="number"
                  placeholder="25"
                 className={`${inputCls} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                />
              </Field>
              <Field label="Gender" error={errors.gender?.message}>
                <select {...register("gender")} className={selectCls}>
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </Field>
            </div>

            <Field label="Skills" error={errors.skills?.message}>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <SkillsInput skills={field.value} onChange={field.onChange} />
                )}
              />
            </Field>

            <Field label="About" error={errors.about?.message}>
              <textarea
                {...register("about")}
                placeholder="Tell developers about yourself..."
                className={`${textareaCls} h-28`}
              />
            </Field>
            {errors.root && (
              <p className="text-error text-xs font-semibold bg-error/10 border border-error/20 rounded-lg px-3 py-2">
                {errors.root.message}
              </p>
            )}


            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full h-10 min-h-0 text-sm font-bold normal-case"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                "Save Profile"
              )}
            </button>
          </form>
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

ProfileForm.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gender: PropTypes.string,
    about: PropTypes.string,
    photoUrl: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onValuesChange: PropTypes.func.isRequired,
};

export default ProfileForm;
