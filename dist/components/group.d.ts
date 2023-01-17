import { Cell, Row, TableState } from "@tanstack/react-table";
import React from "react";
interface TableRowProps<T extends {}> {
    row: Row<T>;
    state: TableState;
    isSelected: boolean;
    rowClassName: string;
    enableSelection: boolean | undefined;
    handleRowSelection: (event: React.MouseEvent<HTMLButtonElement>, row: Row<T>) => void;
}
export declare function TableRow<T extends {}>({ row, state, rowClassName, isSelected, enableSelection, handleRowSelection, }: TableRowProps<T>): JSX.Element;
interface TableCellProps<T extends {}> {
    cell: Cell<T, unknown>;
    state: TableState;
}
export declare function TableCell<T extends {}>({ cell }: TableCellProps<T>): JSX.Element;
export {};
