"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    palette: {
        secondary: {
            light: '#6ec6ff',
            main: '#2196f3',
            dark: '#0069c0',
            contrastText: '#fff',
        },
    },
    typography: {
        title: {
            fontWeight: 400,
        },
    },
    sidebar: {
        width: 240,
        closedWidth: 55,
    },
    overrides: {
        MuiFilledInput: {
            root: {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                '&$disabled': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
            },
        },
    },
};
