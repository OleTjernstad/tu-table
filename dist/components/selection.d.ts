import { Row, Table } from "@tanstack/react-table";
import React from "react";
interface CheckboxCellProps<T extends {}> {
    isSelected: boolean;
    row: Row<T>;
    handleRowSelection: (event: React.MouseEvent<HTMLButtonElement>, row: Row<T>) => void;
}
export declare function CheckboxCell<T extends {}>({ isSelected, handleRowSelection, row, }: CheckboxCellProps<T>): JSX.Element;
interface CheckboxHeaderCellProps<T extends {}> {
    selectedRows: Row<T>[];
    table: Table<T>;
    setSelected: ((rows: Row<T>[]) => void) | undefined;
    setSelectedRows: (value: Row<T>[]) => void;
}
export declare function CheckboxHeaderCell<T extends {}>({ selectedRows, table, setSelected, setSelectedRows, }: CheckboxHeaderCellProps<T>): JSX.Element;
export {};
