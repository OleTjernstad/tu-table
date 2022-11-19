/* eslint-disable @typescript-eslint/ban-types */
import { flexRender } from "@tanstack/react-table";
import Button from "@mui/material/Button";
import React from "react";
import TableCellMui from "@mui/material/TableCell";
import TableRowMui from "@mui/material/TableRow";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
export function TableRow({ row, state, rowClassName, isSelected, }) {
    return (React.createElement(TableRowMui, { "data-row-index": row.index, "data-row-is-group-row": row.getIsGrouped() ? 1 : undefined, style: {
            cursor: !row.getIsGrouped() ? "pointer" : "auto",
        }, className: `${rowClassName} ${!row.getIsGrouped() && "slk-table-selectable"} ${isSelected && "Mui-selected"}` }, row.getVisibleCells().map((cell) => {
        return React.createElement(TableCell, { key: cell.id, cell: cell, state: state });
    })));
}
export function TableCell({ cell }) {
    var _a;
    if (cell.getIsGrouped() || cell.row.getIsGrouped())
        return (React.createElement(TableCellMui, { "data-is-action": cell.column.id === "action" ? 1 : undefined, "aria-describedby": "rowActionDescription" }, cell.getIsGrouped() ? (
        // If it's a grouped cell, add an expander and row count
        React.createElement(React.Fragment, null,
            React.createElement(Button, Object.assign({}, {
                onClick: cell.row.getToggleExpandedHandler(),
                style: {
                    cursor: cell.row.getCanExpand() ? "pointer" : "normal",
                },
            }, { variant: "text", size: "small", startIcon: cell.row.getIsExpanded() ? (React.createElement(UnfoldLessIcon, null)) : (React.createElement(UnfoldMoreIcon, null)) }),
                flexRender(cell.column.columnDef.cell, cell.getContext()),
                " (",
                cell.row.subRows.length,
                ")"))) : cell.getIsAggregated() ? (
        // If the cell is aggregated, use the Aggregated
        // renderer for cell
        flexRender((_a = cell.column.columnDef.aggregatedCell) !== null && _a !== void 0 ? _a : cell.column.columnDef.cell, cell.getContext())) : cell.getIsPlaceholder() ? null : cell.row.getIsGrouped() ? (React.createElement("span", null)) : null));
    return (React.createElement(TableCellMui, { "aria-describedby": "rowActionDescription" }, flexRender(cell.column.columnDef.cell, cell.getContext())));
}
