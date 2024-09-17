import { createGame } from "@/api/AuthAPI";
import { DatePicker } from "@/components/DatePicker";
import type { NewGameForm } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const NewGamePage = () => {
  const [requestError, setRequestError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<NewGameForm>();

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: createGame,
    onError: (error) => {
      console.error("Error:", error);
      setRequestError(error.message);
    },
    onSuccess: () => {
      reset();
      navigate("/");
    },
  });

  const handleCreateGame = (formData: NewGameForm) => mutate(formData);

  return (
    <div className="min-h-full bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear Nuevo Juego de Bingo
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(handleCreateGame)}
        >
          <div className="rounded-md shadow-sm space-y-1">
            <div>
              <label htmlFor="gameName" className="sr-only">
                Nombre del Juego
              </label>
              <input
                id="gameName"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
                placeholder="Nombre del Juego"
                {...register("gameName", { required: "Game Name is required" })}
              />
            </div>
            <div className="relative">
              <label htmlFor="date" className="sr-only">
                Fecha del Juego
              </label>
              {/* <input
                id="date"
                type="date"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                {...register("date", { required: "Game Date is required" })}
              />
              <CalendarIcon className="absolute right-3 top-2 h-5 w-5 text-gray-400" /> */}
              <Controller
                name="date"
                control={control}
                rules={{ required: "La fecha del Juego es requerida" }}
                render={({ field }) => <DatePicker field={field} />}
              />
            </div>
          </div>

          {errors.gameName && (
            <div className="text-red-500 text-sm mt-2">
              {errors.gameName.message}
            </div>
          )}
          {requestError && (
            <div className="text-red-500 text-sm mt-2">{requestError}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Crear Juego
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewGamePage;
