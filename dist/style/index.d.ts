import { Theme } from "@mui/material";
interface OverrideColors {
    disabled?: {
        bg: string;
        hover: string;
    };
    completed?: {
        bg: string;
        hover: string;
    };
    cut?: {
        bg: string;
        hover: string;
    };
    error?: {
        bg: string;
        hover: string;
    };
    warning?: {
        bg: string;
        hover: string;
    };
}
interface TableRootStyleProps {
    overrideColors?: OverrideColors;
    theme: Theme;
}
export declare function TableRootStyle({ overrideColors, theme }: TableRootStyleProps): {
    "& .tu-table--disabled": {
        backgroundColor: string;
        "&:hover": {
            backgroundColor: string;
        };
    };
    "& .tu-table--completed": {
        backgroundColor: string;
        "&:hover": {
            backgroundColor: string;
        };
    };
    "& .tu-table--cut": {
        backgroundColor: string;
        "&:hover": {
            backgroundColor: string;
        };
    };
    "& .tu-table--warning": {
        backgroundColor: string;
        "&:hover": {
            backgroundColor: string;
        };
    };
    "& .tu-table--error": {
        backgroundColor: string;
        "&:hover": {
            backgroundColor: string;
        };
    };
    "& .tu-table-selectable": {
        "&:hover": {
            boxShadow: string;
        };
    };
};
export declare enum ColorStyleOptions {
    completed = "completed",
    disabled = "disabled",
    cut = "cut",
    error = "error",
    warning = "warning"
}
export {};
