interface Colorset {
    main: string
    text: string
    border: string
}

export interface DefaultTheme {
    mode_name: string

    mainBackground: string;
    content: string;
    border: string;
    title: string;
    text: string;
    disabled: string;

    // point-color
    // default: Colorset;
    primary: Colorset;
    secondary: Colorset;
    ghost: Colorset;
}
