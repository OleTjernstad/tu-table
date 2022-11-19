import { Column, Table } from "@tanstack/react-table";
import React, { ReactElement } from "react";
type ColumnHidePageProps<T extends Record<string, unknown>> = {
    instance: Table<T>;
};
export declare function ColumnSelectRT<T extends Record<string, unknown>>({ instance, }: ColumnHidePageProps<T>): ReactElement | null;
export interface ActionItem {
    name: string;
    action?: () => void;
    to?: string;
    skip?: boolean;
    icon?: React.ReactNode;
}
interface RowActionProps {
    actionItems: Array<ActionItem>;
    LinkComponent: React.ElementType<{
        to: string;
        icon?: React.ReactNode;
        label: string;
    }>;
}
export declare const RowAction: ({ actionItems, LinkComponent }: RowActionProps) => JSX.Element;
interface ColumnActionProps<T extends {}> {
    column: Column<T, unknown>;
    table: Table<T>;
}
export declare function ColumnAction<T extends {}>({ column, table, }: ColumnActionProps<T>): JSX.Element;
export {};
