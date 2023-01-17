/// <reference types="react" />
import { Header, Table } from "@tanstack/react-table";
interface HeaderCellProps<T extends {}> {
    header: Header<T, unknown>;
    table: Table<T>;
}
export declare function HeaderCell<T extends {}>({ header, table, }: HeaderCellProps<T>): JSX.Element;
export {};
