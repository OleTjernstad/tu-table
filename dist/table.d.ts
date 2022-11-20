import { Row, TableOptions, TableState } from "@tanstack/react-table";
import { PropsWithChildren, ReactElement } from "react";
import { SxProps, Theme } from "@mui/material";
import React from "react";
interface TableProperties<T extends Record<string, unknown>> extends Omit<TableOptions<T>, "getCoreRowModel"> {
    children?: React.ReactNode;
    getRowStyling?: (row: Row<T>) => string | undefined;
    setSelected?: (rows: Row<T>[]) => void;
    selectedIds?: number[];
    preserveSelected?: boolean;
    isLoading: boolean;
    enableSelection?: boolean;
    tableState: TableState;
    setTableState: (value: TableState | ((val: TableState) => TableState)) => void;
    tableContainerStyle: SxProps<Theme>;
}
export declare function TuTable<T extends Record<string, unknown>>(props: PropsWithChildren<TableProperties<T>>): ReactElement;
export {};
