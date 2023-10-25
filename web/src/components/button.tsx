interface IButton {
    text: string
    type?: "button" | "submit" | "reset" | undefined,
    style?: React.CSSProperties | undefined,
    onClick?: () => void
}

export function Button({ type, text, style, onClick }: IButton) {
    return (  
        <button
            type={type}
            className="bg-[#044FBF] text-[#fff] box-border px-6 py-4 rounded-sm hover:bg-[#044fbfb0]"
            style={style}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
