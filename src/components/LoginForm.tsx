import { authenticateUser } from "@/api/AuthAPI";
import domain from "@/assets/domain.svg";
import { UserLoginForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserLoginForm>();

  const navigate = useNavigate();

  const [requestError, setRequestError] = useState("");

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      console.error("Error:", error);
      setRequestError("Correo o Contraseña incorrectos");
    },
    onSuccess: () => {
      reset();
      console.log("Login Success: there is an error here");
      navigate("/");
    },
  });

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <img src={domain} className="" alt="Toy Car" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Bingo Login
        </h2>
        <p className="text-center text-xl font-light text-gray-500">
          Introduce tus datos para empezar
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleLogin)}>
        <div className="rounded-md shadow-sm space-y-1">
          {errors.email && (
            <p className="p-1 text-red-500 capitalize text-sm">
              {errors.email.message}
            </p>
          )}
          {requestError && (
            <p className="p-1 text-red-500 capitalize text-sm">
              {requestError}
            </p>
          )}
          <div>
            <label htmlFor="email"></label>
            <input
              id="email"
              type="text"
              placeholder="Correo Electrónico"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email No Válido",
                },
              })}
            />
          </div>
          <div>
            <label htmlFor="password"></label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              })}
            />
          </div>
        </div>

        <div>
          <button
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
