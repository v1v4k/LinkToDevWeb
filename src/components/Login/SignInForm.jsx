import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../../schemas/authSchema";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const SignInForm = ({ oauthError }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signinSchema),
    mode: "onTouched",
  });

  const { handleSignin } = useAuth();

  const onSubmit = async (data) => {
    try {
      await handleSignin(data);
    } catch (error) {
      setError("root", {
        message: error?.message,
      });
    }
  };

  useEffect(() => {
    if (oauthError) {
      setError("root", { message: oauthError });
    }
  }, [oauthError, setError]);

  const inputCls =
    "input input-bordered w-full h-9 bg-base-300 border-base-300 text-sm focus:outline-none focus:border-primary focus:ring-0";
  const labelCls =
    "text-[11px] font-bold text-base-content/40 uppercase tracking-widest";
  const errorCls = "text-[11px] font-semibold text-error mt-0.5";

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
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
      <div className="flex flex-col gap-1">
        <label className={labelCls}>Password</label>
        <input
          className={inputCls}
          {...register("password")}
          type="password"
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className={`${errorCls}`}>{errors.password.message}</span>
        )}
      </div>
      {errors.root && (
        <p className="text-xs text-error text-center bg-error/10 border border-error/20 rounded-lg px-3 py-2 ">
          {errors.root.message}
        </p>
      )}
      <button
        className="btn btn-primary w-full h-10 min-h-0 text-sm font-bold normal-case mt-2"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="loading loading-spinner loading-xs" />
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};

export default SignInForm;
