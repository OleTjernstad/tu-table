import { SxProps, Theme } from "@mui/material";
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
    overrideColors: OverrideColors;
    theme: Theme;
}
export declare function TableRootStyle({ overrideColors: { disabled, completed, cut, warning, error }, theme, }: TableRootStyleProps): SxProps<Theme>;
export declare enum ColorStyleOptions {
    completed = "completed",
    disabled = "disabled",
    cut = "cut",
    error = "error",
    warning = "warning"
}
export {};
