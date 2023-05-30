interface IInput {
    type: string,
    name?: string,
    placeholder?: string,
    required?: boolean 
    autoComplete?: string | undefined,
    style?: React.CSSProperties | undefined,
    onchange?: React.ChangeEventHandler<HTMLInputElement> | undefined ,
    value?: string
}


export function Input({type, name, placeholder, required, style, onchange, value, autoComplete}:IInput) {
    return (  
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            required={required} 
            className="px-6 py-4 box-border bg-[#343440] text-[#c0c0d3] rounded-sm text-sm outline-[#063170]"
            style={style}
            onChange={onchange}
            value={value}
            autoComplete={autoComplete}
        />

    );
}
