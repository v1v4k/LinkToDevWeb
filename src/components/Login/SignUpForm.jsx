import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema } from "../../schemas/authSchema";
import useAuth from "../../hooks/useAuth";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
  });

  const { handleSignup } = useAuth();

  const onSubmit = async (data) => {
    try {
      await handleSignup(data);
    } catch (error) {
      setError("root", {
        message: error?.message || "Something went wrong",
      });
    }
  };

  const inputCls = "input input-bordered w-full h-9 bg-base-300 border-base-300 text-sm focus:outline-none focus:border-primary focus:ring-0";
  const labelCls = "text-[11px] font-bold text-base-content/40 uppercase tracking-widest";
  const errorCls = "text-[11px] font-semibold text-error mt-0.5";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">

      {/* First + Last name side by side */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1">
          <label className={labelCls}>First Name</label>
          <input
            className={inputCls}
            {...register("firstName")}
            type="text"
            placeholder="Jane"
          />
          {errors.firstName && (
            <span className={errorCls}>{errors.firstName.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Last Name</label>
          <input
            className={inputCls}
            {...register("lastName")}
            type="text"
            placeholder="Doe"
          />
          {errors.lastName && (
            <span className={errorCls}>{errors.lastName.message}</span>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className={labelCls}>Email</label>
        <input
          className={inputCls}
          {...register("emailId")}
          type="email"
          placeholder="you@example.com"
        />
        {errors.emailId && (
          <span className={errorCls}>{errors.emailId.message}</span>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label className={labelCls}>Password</label>
        <input
          className={inputCls}
          {...register("password")}
          type="password"
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className={errorCls}>{errors.password.message}</span>
        )}
      </div>

      {/* API error */}
      {errors.root && (
        <p className="text-xs text-error text-center bg-error/10 border border-error/20 rounded-lg px-3 py-2 m-0">
          {errors.root.message}
        </p>
      )}

      {/* Submit */}
      <button
        className="btn btn-primary w-full h-10 min-h-0 text-sm font-bold normal-case mt-1"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? <span className="loading loading-spinner loading-xs" />
          : "Create Account"
        }
      </button>

    </form>
  );
};

export default SignUpForm;