import React from "react";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import { ColumnFilter } from "../components/columFilter";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Switch from "@mui/material/Switch";
export function ColumnSelectRT({ instance, }) {
    const [open, setOpen] = React.useState(false);
    // const { allColumns, toggleHideColumn } = instance;
    const hideableColumns = instance
        .getAllColumns()
        .filter((column) => !(column.id === "actions"));
    const checkedCount = hideableColumns.reduce((acc, val) => acc + (val.getIsVisible() ? 0 : 1), 0);
    const onlyOneOptionLeft = checkedCount + 1 >= hideableColumns.length;
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { style: { margin: "10px", marginLeft: 0 }, variant: "contained", color: "info", onClick: () => setOpen(true) }, "Velg kolonner"),
        React.createElement(Dialog, { sx: { "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }, maxWidth: "xs", open: open, onClose: () => setOpen(false) },
            React.createElement(DialogTitle, null, "Velg kolonner"),
            React.createElement(DialogContent, { dividers: true },
                React.createElement(FormControl, { component: "fieldset" },
                    React.createElement(FormLabel, { component: "legend" }, "Velg kolonner"),
                    React.createElement(FormGroup, null, instance
                        .getAllLeafColumns()
                        .filter((column) => !(column.id === "actions"))
                        .map((c) => {
                        var _a;
                        return (React.createElement(FormControlLabel, { key: c.id, control: React.createElement(Switch, { name: c.id, color: "primary", size: "small", disabled: c.getIsVisible() && onlyOneOptionLeft }), onChange: c.getToggleVisibilityHandler(), checked: c.getIsVisible(), label: (_a = c.columnDef.header) === null || _a === void 0 ? void 0 : _a.toString() }));
                    })))),
            React.createElement(DialogActions, null,
                React.createElement(Button, { autoFocus: true, onClick: () => setOpen(false) }, "lukk")))));
}
export function ColumnAction({ column, table, }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const close = () => {
        setAnchorEl(null);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(IconButton, { "aria-label": "kolonne meny", "aria-controls": "simple-menu", "aria-haspopup": "true", onClick: handleClick, size: "small" },
            React.createElement(MoreVertIcon, { fontSize: "inherit" })),
        React.createElement(Menu, { id: "simple-menu", anchorEl: anchorEl, keepMounted: true, open: Boolean(anchorEl), onClose: close },
            column.getCanSort() && [
                React.createElement(MenuItem, { key: "removeSort" },
                    React.createElement(Button, { disabled: !column.getIsSorted(), variant: "text", startIcon: React.createElement(ClearIcon, null), onClick: () => column.clearSorting() }, "Fjern sortering")),
                React.createElement(MenuItem, { key: "raisingSort" },
                    React.createElement(Button, { disabled: column.getIsSorted() === "asc", variant: "text", startIcon: React.createElement(KeyboardArrowUpIcon, null), onClick: () => column.toggleSorting(false) }, "Sorter stigende")),
                React.createElement(MenuItem, { key: "downSort" },
                    React.createElement(Button, { disabled: column.getIsSorted() === "desc", variant: "text", startIcon: React.createElement(KeyboardArrowDownIcon, null), onClick: () => column.toggleSorting(true) }, "Sorter synkende")),
            ],
            column.getCanFilter() && (React.createElement(MenuItem, null,
                React.createElement(ColumnFilter, { column: column, table: table }))))));
}
