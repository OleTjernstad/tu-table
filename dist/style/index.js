export function TableRootStyle({ overrideColors: { disabled, completed, cut, warning, error }, theme, }) {
    return {
        "& .tu-table--disabled": {
            backgroundColor: disabled ? disabled.bg : theme.palette.grey[600],
            "&:hover": {
                backgroundColor: disabled ? disabled.hover : theme.palette.grey[600],
            },
        },
        "& .tu-table--completed": {
            backgroundColor: completed ? completed.bg : theme.palette.success.main,
            "&:hover": {
                backgroundColor: completed
                    ? completed.hover
                    : theme.palette.success.light,
            },
        },
        "& .tu-table--cut": {
            backgroundColor: cut ? cut.bg : theme.palette.warning.main,
            "&:hover": {
                backgroundColor: cut ? cut.bg : theme.palette.warning.light,
            },
        },
        "& .tu-table--warning": {
            backgroundColor: warning ? warning.bg : theme.palette.warning.main,
            "&:hover": {
                backgroundColor: warning ? warning.bg : theme.palette.warning.light,
            },
        },
        "& .tu-table--error": {
            backgroundColor: error ? error.bg : theme.palette.error.main,
            "&:hover": {
                backgroundColor: error ? error.bg : theme.palette.error.light,
            },
        },
        "& .tu-table-selectable": {
            "&:hover": {
                boxShadow: "inset 0em 0em 0em 10em rgba(0, 0, 0, 0.3)",
            },
        },
    };
}
export var ColorStyleOptions;
(function (ColorStyleOptions) {
    ColorStyleOptions["completed"] = "completed";
    ColorStyleOptions["disabled"] = "disabled";
    ColorStyleOptions["cut"] = "cut";
    ColorStyleOptions["error"] = "error";
    ColorStyleOptions["warning"] = "warning";
})(ColorStyleOptions || (ColorStyleOptions = {}));
