import React from "react";
export declare function DebouncedInput({ value: initialValue, onChange, debounce, label, ...props }: {
    value: string | number;
    onChange: (value: string | number) => void;
    label: string;
    debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">): JSX.Element;
