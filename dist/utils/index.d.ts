import { Column, Table } from "@tanstack/react-table";
import { ReactElement } from "react";
type ColumnHidePageProps<T extends Record<string, unknown>> = {
    instance: Table<T>;
};
export declare function ColumnSelectRT<T extends Record<string, unknown>>({ instance, }: ColumnHidePageProps<T>): ReactElement | null;
interface ColumnActionProps<T extends {}> {
    column: Column<T, unknown>;
    table: Table<T>;
}
export declare function ColumnAction<T extends {}>({ column, table, }: ColumnActionProps<T>): JSX.Element;
export {};
