/// <reference types="react" />
import { Cell, Row, TableState } from "@tanstack/react-table";
interface TableRowProps<T extends {}> {
    row: Row<T>;
    state: TableState;
    isSelected: boolean;
    rowClassName: string;
}
export declare function TableRow<T extends {}>({ row, state, rowClassName, isSelected, }: TableRowProps<T>): JSX.Element;
interface TableCellProps<T extends {}> {
    cell: Cell<T, unknown>;
    state: TableState;
}
export declare function TableCell<T extends {}>({ cell }: TableCellProps<T>): JSX.Element;
export {};
