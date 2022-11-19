import { getCoreRowModel, getExpandedRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getGroupedRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table";
import { useCallback, useEffect, useState, } from "react";
import { ColumnSelectRT } from "./utils";
import { HeaderCell } from "./components/header";
import LinearProgress from "@mui/material/LinearProgress";
import { Pagination } from "./components/pagination";
import Paper from "@mui/material/Paper";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { TableRow } from "./components/group";
import TableRowMui from "@mui/material/TableRow";
export function GroupTable(props) {
    const { columns, children, getRowStyling, setSelected, preserveSelected, selectedIds, enableSelection, setTableState, tableState, } = props;
    //   const classes2 = useTableStyles();
    //   /**Get saved table settings */
    //   const [tableState, setTableState] = useTableState<TableState>(tableKey, {
    //     grouping: defaultGrouping,
    //     columnVisibility: defaultVisibilityState,
    //     expanded: {},
    //   } as TableState);
    const [columnFilters, setColumnFilters] = useState([]);
    function updateGrouping(update) {
        const grouping = update instanceof Function ? update(tableState.grouping) : update;
        setTableState((prev) => {
            return Object.assign(Object.assign({}, prev), { grouping });
        });
    }
    function updateVisibility(update) {
        const columnVisibility = update instanceof Function ? update(tableState.columnVisibility) : update;
        setTableState((prev) => {
            return Object.assign(Object.assign({}, prev), { columnVisibility });
        });
    }
    function updateExpanded(update) {
        const expanded = update instanceof Function ? update(tableState.expanded) : update;
        setTableState((prev) => {
            return Object.assign(Object.assign({}, prev), { expanded });
        });
    }
    function updateSorting(update) {
        const sorting = update instanceof Function ? update(tableState.sorting) : update;
        setTableState((prev) => {
            return Object.assign(Object.assign({}, prev), { sorting });
        });
    }
    /**Table instance */
    const table = useReactTable(Object.assign(Object.assign({}, props), { columns, getCoreRowModel: getCoreRowModel(), autoResetExpanded: false, state: Object.assign(Object.assign({}, tableState), { columnFilters }), enableRowSelection: true, enableMultiRowSelection: true, enableSubRowSelection: true, onColumnFiltersChange: setColumnFilters, onGroupingChange: updateGrouping, onColumnVisibilityChange: updateVisibility, onExpandedChange: updateExpanded, onSortingChange: updateSorting, getExpandedRowModel: getExpandedRowModel(), getGroupedRowModel: getGroupedRowModel(), getPaginationRowModel: getPaginationRowModel(), getFilteredRowModel: getFilteredRowModel(), getSortedRowModel: getSortedRowModel(), getFacetedRowModel: getFacetedRowModel(), getFacetedUniqueValues: getFacetedUniqueValues(), getFacetedMinMaxValues: getFacetedMinMaxValues(), debugTable: false }));
    function getRowClassName(row) {
        if (getRowStyling !== undefined) {
            const className = getRowStyling(row);
            if (className !== undefined) {
                return `slk-table--${className}`;
            }
        }
        return "";
    }
    /**
     * Gets the current row being clicked from the 'data-row-index' attribute on the parent <tr>
     * element for any click event. Using this approach to avoid row re-renders whenever click handler
     * callbacks are updated
     *
     * @param target  The Target HTMLElement (event.target) that raised the event
     * @param rows    The list of sorted rows
     */
    function getRowFromEvent(target, rows) {
        var _a, _b, _c, _d, _e, _f;
        // skip if this is group header
        const isGroup = (_b = (_a = target.closest("tr")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-row-is-group-row")) !== null && _b !== void 0 ? _b : "";
        if (isGroup)
            return null;
        // Skip if this is action cell
        const isAction = (_d = (_c = target.closest("td")) === null || _c === void 0 ? void 0 : _c.getAttribute("data-is-action")) !== null && _d !== void 0 ? _d : "";
        if (isAction)
            return null;
        const rowIndex = parseInt((_f = (_e = target.closest("tr")) === null || _e === void 0 ? void 0 : _e.getAttribute("data-row-index")) !== null && _f !== void 0 ? _f : "");
        const filteredRows = rows.filter((row) => row.index === rowIndex && !row.getIsGrouped());
        if (filteredRows.length) {
            // Should only be one result
            return filteredRows[0];
        }
        return null;
    }
    const [selectedRows, setSelectedRows] = useState([]);
    useEffect(() => {
        if (selectedIds)
            setSelectedRows(table.getPreFilteredRowModel().rows.filter((r) => {
                return selectedIds.find((o) => o === r.getValue("id"));
            }));
    }, [selectedIds, table]);
    /**
     * Handle Row Selection:
     *
     * 1. Click + CMD/CTRL - Select multiple rows
     * 2. Click + SHIFT - Range Select multiple rows
     * 3. Single Click - Select only one row
     */
    const handleRowSelection = useCallback((event, row) => {
        var _a;
        // See if row is already selected
        const selectedRowIds = (_a = selectedRows === null || selectedRows === void 0 ? void 0 : selectedRows.map((r) => r.id)) !== null && _a !== void 0 ? _a : [];
        const selectIndex = selectedRowIds.indexOf(row.id);
        const isSelected = selectIndex > -1;
        let updatedSelectedRows = [...(selectedRows ? selectedRows : [])];
        if (event.ctrlKey ||
            event.metaKey ||
            (preserveSelected && !event.shiftKey)) {
            // 1. Click + CMD/CTRL - select multiple rows
            // Remove clicked element from list
            if (isSelected) {
                updatedSelectedRows.splice(selectIndex, 1);
            }
            else {
                updatedSelectedRows.push(row);
            }
        }
        else if (event.shiftKey) {
            // 2. Click + SHIFT - Range Select multiple rows
            if (selectedRows === null || selectedRows === void 0 ? void 0 : selectedRows.length) {
                const lastSelectedRow = selectedRows[0];
                // Calculate array indexes and reset selected rows
                const lastIndex = table.getRowModel().rows.indexOf(lastSelectedRow);
                const currentIndex = table.getRowModel().rows.indexOf(row);
                updatedSelectedRows = [];
                if (lastIndex < currentIndex) {
                    for (let i = lastIndex; i <= currentIndex; i++) {
                        const selectedRow = table.getRowModel().rows[i];
                        if (!selectedRow.getIsGrouped()) {
                            updatedSelectedRows.push(selectedRow);
                        }
                    }
                }
                else {
                    for (let i = currentIndex; i <= lastIndex; i++) {
                        const selectedRow = table.getRowModel().rows[i];
                        if (!selectedRow.getIsGrouped()) {
                            updatedSelectedRows.push(selectedRow);
                        }
                    }
                }
            }
            else {
                // No rows previously selected, select only current row
                updatedSelectedRows = [row];
            }
        }
        else {
            // 3. Single Click - Select only one row
            if (isSelected && updatedSelectedRows.length === 1) {
                updatedSelectedRows = [];
            }
            else {
                updatedSelectedRows = [row];
            }
        }
        if (setSelected && enableSelection) {
            setSelectedRows(updatedSelectedRows);
            setSelected(updatedSelectedRows);
        }
    }, [selectedRows, preserveSelected, setSelected, enableSelection, table]);
    return (React.createElement(React.Fragment, null,
        React.createElement(TableContainer, { component: Paper },
            React.createElement("div", null,
                React.createElement("div", null, children),
                React.createElement(ColumnSelectRT, { instance: table })),
            React.createElement(Table, { style: { overflowX: "auto" }, role: "grid", size: "small", "aria-label": "Table" },
                React.createElement(TableHead, null, table.getHeaderGroups().map((headerGroup) => (React.createElement(TableRowMui, { key: headerGroup.id }, headerGroup.headers.map((header) => {
                    return (React.createElement(HeaderCell, { key: header.id, header: header, table: table }));
                }))))),
                React.createElement(TableBody, { onClick: (event) => {
                        const row = getRowFromEvent(event.target, table.getRowModel().rows);
                        if (row) {
                            handleRowSelection(event, row);
                        }
                    } },
                    props.isLoading && (React.createElement("tr", null,
                        React.createElement("td", { colSpan: table.getVisibleFlatColumns().length },
                            React.createElement(LinearProgress, { sx: { width: "100%" } })))),
                    table.getRowModel().rows.map((row) => {
                        return (React.createElement(TableRow, { key: row.id, row: row, state: tableState, isSelected: !!(selectedRows === null || selectedRows === void 0 ? void 0 : selectedRows.find((r) => r.id === row.id)), rowClassName: getRowClassName(row) }));
                    })))),
        React.createElement(Pagination, { table: table })));
}
