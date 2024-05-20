import cn from "classnames";
import cls from "./ButtonUI.module.css";

export const ButtonUITheme = {
    PRIMARY: "primary",
    SECONDARY: "secondary"
}

export const ButtonUI = (props) => {
    const {
        className,
        theme = ButtonUITheme.PRIMARY,
        text,
        isLoading,
        ...restProps
    } = props;
    return (
        <button
            className={cn(cls.btn, { [cls.isLoading]: isLoading }, cls[theme], className)}
            { ...restProps }
        >   
            {text}
        </button>
    )
};