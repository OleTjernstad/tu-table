/// <reference types="react" />
import { Column, Table } from "@tanstack/react-table";
interface FilterProps<T extends {}> {
    column: Column<T, unknown>;
    table: Table<T>;
}
export declare function Filter<T extends {}>({ column, table }: FilterProps<T>): JSX.Element;
interface FilterRemoveProps<T extends {}> {
    column: Column<T, unknown>;
    table: Table<T>;
}
export declare function FilterRemove<T extends {}>({ column }: FilterRemoveProps<T>): JSX.Element | null;
export {};
