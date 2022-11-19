/// <reference types="react" />
import { Table } from "@tanstack/react-table";
interface PaginationProps<T extends {}> {
    table: Table<T>;
}
export declare function Pagination<T extends {}>({ table }: PaginationProps<T>): JSX.Element;
export {};
