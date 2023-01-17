/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/ban-types */
import { flexRender } from "@tanstack/react-table";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { ColumnAction } from "../utils";
import { FilterRemove } from "./filter";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import React from "react";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
export function HeaderCell({ header, table, }) {
    var _a;
    //   const { classes } = useTableStyles();
    return (React.createElement(TableCell
    //   className={classes.header}
    , { 
        //   className={classes.header}
        key: header.id, colSpan: header.colSpan }, header.isPlaceholder ? null : (React.createElement(React.Fragment, null,
        React.createElement("div", { 
            // className={classes.header}
            style: {
                display: "flex",
                flexDirection: "row",
            } },
            header.column.getCanGroup() ? (React.createElement(Tooltip, { title: "Grupper kolonne" },
                React.createElement(TableSortLabel, Object.assign({ active: true }, {
                    onClick: header.column.getToggleGroupingHandler(),
                    style: {
                        cursor: "pointer",
                    },
                }, { direction: header.column.getIsGrouped() ? "desc" : "asc", IconComponent: KeyboardArrowRight })))) : null,
            " ",
            React.createElement(Tooltip, { title: "Sorter kolonne" },
                React.createElement("div", Object.assign({}, {
                    className: header.column.getCanSort()
                        ? "classes.canSortClass"
                        : "",
                    onClick: header.column.getToggleSortingHandler(),
                    onKeyDown: header.column.getToggleSortingHandler(),
                }), flexRender(header.column.columnDef.header, header.getContext()))),
            " ", (_a = {
            asc: React.createElement(ArrowDropUpIcon, null),
            desc: React.createElement(ArrowDropDownIcon, null),
        }[header.column.getIsSorted()]) !== null && _a !== void 0 ? _a : null,
            React.createElement(FilterRemove, { column: header.column, table: table }),
            React.createElement("div", { style: {
                    flexGrow: 3,
                } }),
            (header.column.getCanFilter() || header.column.getCanSort()) && (React.createElement(ColumnAction, { column: header.column, table: table })))))));
}
