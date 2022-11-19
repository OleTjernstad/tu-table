/* eslint-disable @typescript-eslint/ban-types */
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import TextField from "@mui/material/TextField";
export function Pagination({ table }) {
    return (React.createElement("div", { style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        } },
        React.createElement("div", { style: {
                display: "flex",
                flexDirection: "row",
            } },
            React.createElement(IconButton, { color: "primary", "aria-label": "G\u00E5 til f\u00F8rste side", onClick: () => table.setPageIndex(0), disabled: !table.getCanPreviousPage() },
                React.createElement(KeyboardDoubleArrowLeftIcon, null)),
            React.createElement(IconButton, { color: "primary", "aria-label": "G\u00E5 tilbake en", onClick: () => table.previousPage(), disabled: !table.getCanPreviousPage() },
                React.createElement(KeyboardArrowLeftIcon, null)),
            React.createElement(IconButton, { color: "primary", "aria-label": "G\u00E5 fram en", onClick: () => table.nextPage(), disabled: !table.getCanNextPage() },
                React.createElement(KeyboardArrowRightIcon, null)),
            React.createElement(IconButton, { color: "primary", "aria-label": "G\u00E5 til siste side", onClick: () => table.setPageIndex(table.getPageCount() - 1), disabled: !table.getCanNextPage() },
                React.createElement(KeyboardDoubleArrowRightIcon, null)),
            React.createElement("span", { style: { paddingLeft: "20px", paddingTop: "10px" } },
                React.createElement(TextField, { size: "small", label: "Gå til side", id: "outlined-basic", variant: "outlined", type: "number", defaultValue: table.getState().pagination.pageIndex + 1, onChange: (e) => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                        table.setPageIndex(page);
                    } })),
            React.createElement("span", { style: { paddingTop: "10px", paddingLeft: "20px" } },
                React.createElement(TextField, { size: "small", select: true, label: "Vis", value: table.getState().pagination.pageSize, onChange: (e) => {
                        table.setPageSize(Number(e.target.value));
                    } }, [10, 20, 30, 40, 50].map((pageSize) => (React.createElement(MenuItem, { key: pageSize, value: pageSize }, pageSize)))))),
        React.createElement("span", null,
            React.createElement("div", null, "Side"),
            React.createElement("strong", null,
                table.getState().pagination.pageIndex + 1,
                " av ",
                table.getPageCount()))));
}
