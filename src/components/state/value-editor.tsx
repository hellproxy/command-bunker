import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface ValueEditorProps {
  value: number;
  setValue: (value: number) => void;
}

export const ValueEditor = ({ value, setValue }: ValueEditorProps) => {
  const [editValue, setEditValue] = useState<number | null>(null);

  const startEdit = () => {
    setEditValue(value);
  };

  const endEdit = () => {
    if (editValue === null) return;
    setEditValue(null);
    if (editValue === value) return;
    setValue(editValue);
  };

  const onKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") endEdit();
  };

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setEditValue((prev) =>
      prev !== null ? sanitize(target.value, prev) : null
    );
  };

  const ref = useRef(null);
  useOnClickOutside(ref, endEdit);

  const displayedValue = editValue !== null ? editValue : value;
  const focusRing = editValue != null ? "ring-2 focus-visible:ring-2" : "";

  return (
    <input
      className={`max-w-7 text-center text-lg border rounded shadow-inner 
        hover:ring hover:ring-1 ring-offset-2 focus-visible:outline-none ${focusRing}`}
      ref={ref}
      value={displayedValue}
      onClick={startEdit}
      onKeyDown={onKeyDown}
      onChange={onChange}
    />
  );
};

const sanitize = (value: string, oldValue: number) => {
  if (value === "") return 0;
  const parsed = parseInt(value);
  return parsed >= 0 ? parsed : oldValue;
};
