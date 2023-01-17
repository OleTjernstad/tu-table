import Checkbox from "@mui/material/Checkbox";
import React from "react";
import TableCell from "@mui/material/TableCell";
export function CheckboxCell({ isSelected, handleRowSelection, row, }) {
    return (React.createElement(TableCell, null,
        React.createElement(Checkbox, { size: "small", checked: isSelected, onClick: (e) => handleRowSelection(e, row) })));
}
export function CheckboxHeaderCell({ selectedRows, table, setSelected, setSelectedRows, }) {
    const rows = table.getRowModel().rows;
    function setSelection() {
        if (rows.length === selectedRows.length) {
            setSelected && setSelected([]);
            setSelectedRows([]);
            return;
        }
        setSelected && setSelected(rows);
        setSelectedRows(rows);
    }
    return (React.createElement(TableCell, null,
        React.createElement(Checkbox, { size: "small", checked: rows.length === selectedRows.length, indeterminate: selectedRows.length > 0 && rows.length > selectedRows.length, onClick: setSelection })));
}
