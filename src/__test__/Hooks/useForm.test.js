import { useForm } from "../../Hooks/useForm";
import { renderHook, act } from "@testing-library/react-hooks";

describe("Probar CustomHook useForm", () => {
  const initialForm = { name: "Jesus", email: "hdjesus@gmail.com" };

  test("Debe regresar un formulario por defecto", () => {
    const { result } = renderHook(() => useForm(initialForm));
    const [value, handleInputChange, reset] = result.current;
    expect(value).toEqual(initialForm);
    expect(typeof handleInputChange).toBe("function");
    expect(typeof reset).toBe("function");
  });

  test("Debe cambiar el valor del formulario (name)", () => {
    const { result } = renderHook(() => useForm(initialForm));
    const [, handleInputChange] = result.current;

    act(() => {
      handleInputChange({
        target: { name: "name", value: "Manuel" },
      });
    });
    const [value] = result.current;

    expect(value).toEqual({ ...initialForm, name: "Manuel" });
  });
  test("Debe re-establecer el formulario con reset", () => {
    const { result } = renderHook(() => useForm(initialForm));
    const [, handleInputChange, reset] = result.current;

    act(() => {
      handleInputChange({
        target: { name: "name", value: "Manuel" },
      });
      reset();
    });
    const [value] = result.current;

    expect(value).toEqual(initialForm);
  });
});
