import "@testing-library/jest-dom";
import { useCounter } from "../../Hooks/useCounter";
import { renderHook, act } from "@testing-library/react-hooks";

describe("Pruebas en useCounter", () => {
  test("debe retornar valores por defecto", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.counter).toBe(10);
    expect(typeof result.current.increment).toBe("function");
    expect(typeof result.current.decrement).toBe("function");
    expect(typeof result.current.reset).toBe("function");
  });

  test("debe retornar el counter en 100", () => {
    const { result } = renderHook(() => useCounter(100));
    expect(result.current.counter).toBe(100);
  });

  test("debe incrementar el contador", () => {
    const { result } = renderHook(() => useCounter());
    const { increment } = result.current;
    act(() => {
      increment();
    });
    expect(result.current.counter).toBe(11);
  });

  test("debe decrementar el contador", () => {
    const { result } = renderHook(() => useCounter());
    const { decrement } = result.current;
    act(() => {
      decrement();
    });
    expect(result.current.counter).toBe(9);
  });

  test("debe resetear el contador", () => {
    const { result } = renderHook(() => useCounter());
    const { decrement, reset } = result.current;
    act(() => {
      decrement();
      reset();
    });
    expect(result.current.counter).toBe(10);
  });
});
