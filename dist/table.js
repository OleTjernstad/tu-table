import { getCoreRowModel, getExpandedRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getGroupedRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table";
import { useCallback, useEffect, useState, } from "react";
import Box from "@mui/material/Box";
import { CheckboxHeaderCell } from "./components/selection";
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
import { useDebounce } from "./hooks/useDebounce";
export function TuTable(props) {
    const { columns, children, getRowStyling, setSelected, preserveSelected, selectedIds, enableSelection, setTableState, tableState, tableContainerStyle, } = props;
    const [{ pageIndex, pageSize }, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    useEffect(() => {
        setPagination(tableState.pagination);
    }, []);
    const debouncedStatement = useDebounce({ pageIndex, pageSize }, 2000);
    useEffect(() => {
        setTableState((prev) => {
            return Object.assign(Object.assign({}, prev), { pagination: debouncedStatement });
        });
    }, [debouncedStatement]);
    function updateGrouping(update) {
        const grouping = update instanceof Function ? update(tableState.grouping) : update;
        setTableState((prev) => {
            return Object.assign(Object.assign({}, prev), { grouping });
        });
    }
    function updateColumnFilters(update) {
        const columnFilters = update instanceof Function ? update(tableState.columnFilters) : update;
        setTableState((prev) => {
            return Object.assign(Object.assign({}, prev), { columnFilters });
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
    const table = useReactTable(Object.assign(Object.assign({}, props), { columns, getCoreRowModel: getCoreRowModel(), autoResetExpanded: false, state: Object.assign(Object.assign({}, tableState), { pagination: { pageIndex, pageSize } }), enableRowSelection: true, enableMultiRowSelection: true, enableSubRowSelection: true, onColumnFiltersChange: updateColumnFilters, onGroupingChange: updateGrouping, onColumnVisibilityChange: updateVisibility, onExpandedChange: updateExpanded, onSortingChange: updateSorting, getExpandedRowModel: getExpandedRowModel(), getGroupedRowModel: getGroupedRowModel(), getPaginationRowModel: getPaginationRowModel(), onPaginationChange: setPagination, getFilteredRowModel: getFilteredRowModel(), getSortedRowModel: getSortedRowModel(), getFacetedRowModel: getFacetedRowModel(), getFacetedUniqueValues: getFacetedUniqueValues(), getFacetedMinMaxValues: getFacetedMinMaxValues(), debugTable: false }));
    function getRowClassName(row) {
        if (getRowStyling !== undefined) {
            const className = getRowStyling(row);
            if (className !== undefined) {
                return `tu-table--${className}`;
            }
        }
        return "";
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
        React.createElement(TableContainer, { component: Paper, sx: tableContainerStyle },
            React.createElement(Box, { sx: { display: "flex", height: "4em" } },
                React.createElement(Box, { sx: { flexGrow: 1 } }, children),
                React.createElement(ColumnSelectRT, { instance: table })),
            React.createElement(Table, { style: { overflowX: "auto" }, role: "grid", size: "small", "aria-label": "Table" },
                React.createElement(TableHead, null, table.getHeaderGroups().map((headerGroup) => (React.createElement(TableRowMui, { key: headerGroup.id },
                    enableSelection && (React.createElement(CheckboxHeaderCell, { setSelected: setSelected, setSelectedRows: setSelectedRows, selectedRows: selectedRows, table: table })),
                    headerGroup.headers.map((header) => {
                        return (React.createElement(HeaderCell, { key: header.id, header: header, table: table }));
                    }))))),
                React.createElement(TableBody, null,
                    props.isLoading && (React.createElement("tr", null,
                        React.createElement("td", { colSpan: table.getVisibleFlatColumns().length },
                            React.createElement(LinearProgress, { sx: { width: "100%" } })))),
                    table.getRowModel().rows.map((row) => {
                        return (React.createElement(TableRow, { enableSelection: enableSelection, handleRowSelection: handleRowSelection, key: row.id, row: row, state: tableState, isSelected: !!(selectedRows === null || selectedRows === void 0 ? void 0 : selectedRows.find((r) => r.id === row.id)), rowClassName: getRowClassName(row) }));
                    })))),
        React.createElement(Pagination, { table: table })));
}
