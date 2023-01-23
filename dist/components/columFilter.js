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
import { useEffect, useMemo, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import IconButton from "@mui/material/IconButton";
import React from "react";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
export function ColumnFilter({ column, table }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    const firstValue = (_a = table
        .getPreFilteredRowModel()
        .flatRows[0]) === null || _a === void 0 ? void 0 : _a.getValue(column.id);
    const columnFilterValue = column.getFilterValue();
    const sortedUniqueValues = useMemo(() => typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [firstValue]);
    return typeof firstValue === "number" ? (React.createElement("div", null,
        React.createElement("div", { style: { display: "flex" } },
            React.createElement(DebouncedInput, { type: "number", min: Number((_c = (_b = column.getFacetedMinMaxValues()) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : ""), max: Number((_e = (_d = column.getFacetedMinMaxValues()) === null || _d === void 0 ? void 0 : _d[1]) !== null && _e !== void 0 ? _e : ""), value: (_f = columnFilterValue === null || columnFilterValue === void 0 ? void 0 : columnFilterValue[0]) !== null && _f !== void 0 ? _f : "", onChange: (value) => column.setFilterValue((old) => [value, old === null || old === void 0 ? void 0 : old[1]]), label: `Min ${((_g = column.getFacetedMinMaxValues()) === null || _g === void 0 ? void 0 : _g[0])
                    ? `(${(_h = column.getFacetedMinMaxValues()) === null || _h === void 0 ? void 0 : _h[0]})`
                    : ""}` }),
            React.createElement(DebouncedInput, { type: "number", min: Number((_k = (_j = column.getFacetedMinMaxValues()) === null || _j === void 0 ? void 0 : _j[0]) !== null && _k !== void 0 ? _k : ""), max: Number((_m = (_l = column.getFacetedMinMaxValues()) === null || _l === void 0 ? void 0 : _l[1]) !== null && _m !== void 0 ? _m : ""), value: (_o = columnFilterValue === null || columnFilterValue === void 0 ? void 0 : columnFilterValue[1]) !== null && _o !== void 0 ? _o : "", onChange: (value) => column.setFilterValue((old) => [old === null || old === void 0 ? void 0 : old[0], value]), label: `Maks ${((_p = column.getFacetedMinMaxValues()) === null || _p === void 0 ? void 0 : _p[1])
                    ? `(${(_q = column.getFacetedMinMaxValues()) === null || _q === void 0 ? void 0 : _q[1]})`
                    : ""}` })))) : (React.createElement(React.Fragment, null,
        React.createElement(DebouncedInput, { type: "text", id: column.id, value: (columnFilterValue !== null && columnFilterValue !== void 0 ? columnFilterValue : ""), onChange: (value) => column.setFilterValue(value), label: `Søk... (${column.getFacetedUniqueValues().size})`, options: sortedUniqueValues
                .slice(0, 50)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((value) => value) })));
}
export function FilterRemove({ column }) {
    if (column.getIsFiltered())
        return (React.createElement(Tooltip, { title: "Fjern filter for kolonne" },
            React.createElement(IconButton, { color: "error", onClick: () => column.setFilterValue(""), size: "small" },
                React.createElement(FilterAltOffIcon, { fontSize: "inherit" }))));
    return null;
}
// A debounced input react component
function DebouncedInput(_a) {
    var { value: initialValue, onChange, debounce = 500, options, label } = _a, props = __rest(_a, ["value", "onChange", "debounce", "options", "label"]);
    const [value, setValue] = useState(initialValue);
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);
    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    if (props.type === "text") {
        return (React.createElement(Autocomplete, { size: "small", id: props.id, options: options !== null && options !== void 0 ? options : [], onChange: (e, value) => {
                setValue(value !== null && value !== void 0 ? value : "");
            }, sx: { width: 300 }, renderInput: (params) => React.createElement(TextField, Object.assign({}, params, { label: label })) }));
    }
    return (React.createElement(TextField, { size: "small", id: props.id, variant: "outlined", sx: { width: 300 }, label: label, value: value, onChange: (e) => setValue(e.target.value) }));
}
