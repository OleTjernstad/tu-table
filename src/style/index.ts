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
export function TableRootStyle({ overrideColors, theme }: TableRootStyleProps) {
  return {
    "& .tu-table--disabled": {
      backgroundColor: overrideColors?.disabled
        ? overrideColors.disabled.bg
        : theme.palette.grey[600],
      "&:hover": {
        backgroundColor: overrideColors?.disabled
          ? overrideColors.disabled.hover
          : theme.palette.grey[600],
      },
    },
    "& .tu-table--completed": {
      backgroundColor: overrideColors?.completed
        ? overrideColors.completed.bg
        : theme.palette.success.main,
      "&:hover": {
        backgroundColor: overrideColors?.completed
          ? overrideColors.completed.hover
          : theme.palette.success.light,
      },
    },
    "& .tu-table--cut": {
      backgroundColor: overrideColors?.cut
        ? overrideColors.cut.bg
        : theme.palette.warning.main,
      "&:hover": {
        backgroundColor: overrideColors?.cut
          ? overrideColors.cut.bg
          : theme.palette.warning.light,
      },
    },
    "& .tu-table--warning": {
      backgroundColor: overrideColors?.warning
        ? overrideColors.warning.bg
        : theme.palette.warning.main,
      "&:hover": {
        backgroundColor: overrideColors?.warning
          ? overrideColors.warning.bg
          : theme.palette.warning.light,
      },
    },
    "& .tu-table--error": {
      backgroundColor: overrideColors?.error
        ? overrideColors.error.bg
        : theme.palette.error.main,
      "&:hover": {
        backgroundColor: overrideColors?.error
          ? overrideColors.error.bg
          : theme.palette.error.light,
      },
    },
    "& .tu-table-selectable": {
      "&:hover": {
        boxShadow: "inset 0em 0em 0em 10em rgba(0, 0, 0, 0.3)",
      },
    },
  };
}

export enum ColorStyleOptions {
  completed = "completed",
  disabled = "disabled",
  cut = "cut",
  error = "error",
  warning = "warning",
}
