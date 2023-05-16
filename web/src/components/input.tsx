interface IInput {
    type: string,
    name?: string,
    placeholder?: string,
    required?: boolean 
    style?: React.CSSProperties | undefined,
    onchange?: React.ChangeEventHandler<HTMLInputElement> | undefined ,
    value?: string
}


export function Input({type, name, placeholder, required, style, onchange, value}:IInput) {
    return (  
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            required={required} 
            className="px-6 py-4 box-border bg-[#343440] text-[#7C7C8A] rounded-sm text-xs"
            style={style}
            onChange={onchange}
            value={value}
        />

    );
}
