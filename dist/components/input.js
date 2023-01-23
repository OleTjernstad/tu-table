var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
// A debounced input react component
export function DebouncedInput(_a) {
    var { value: initialValue, onChange, debounce = 500, label } = _a, props = __rest(_a, ["value", "onChange", "debounce", "label"]);
    const [value, setValue] = useState(initialValue);
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);
    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);
        return () => clearTimeout(timeout);
    }, [value]);
    return (React.createElement(TextField, { variant: "outlined", fullWidth: true, id: props.name, label: label, name: props.name, value: value, onChange: (e) => setValue(e.target.value) }));
}
