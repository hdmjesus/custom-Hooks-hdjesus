import "@testing-library/jest-dom";
import { useFetch } from "../../Hooks/useFetch";
import { renderHook, act } from "@testing-library/react-hooks";

describe("Pruebas en useFetch", () => {
  const initialState = { data: null, loading: true, error: null };
  test("Debe retornar la data por defecto ", () => {
    const { result } = renderHook(() =>
      useFetch(`https://www.breakingbadapi.com/api/quotes/1`)
    );

    const { data, loading, error } = result.current;

    expect(data).toBe(null);
    expect(loading).toBe(true);
    expect(error).toBe(null);
  });

  test("debe retornar la data de la API", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(`https://www.breakingbadapi.com/api/quotes/1`)
    );

    await waitForNextUpdate({ timeout: 5000 });
    // {timeout:2000} se coloca para que el tiempo maximo para tener una respuesta de la API sea de 5000 ms

    const { data, loading, error } = result.current;

    expect(data.length).toBe(1);
    expect(loading).toBe(false);
    expect(error).toBe(null);
  });

  test("debe manejar el error", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(`https://reqres.in/api/`)
    );

    await waitForNextUpdate({ timeout: 5000 });
    // {timeout:2000} se coloca para que el tiempo maximo para tener una respuesta de la API sea de 5000 ms

    const { data, loading, error } = result.current;

    expect(data).toBe(null);
    expect(loading).toBe(false);
    expect(error).toBe("No se pudo cargar la informacion");
  });
});
