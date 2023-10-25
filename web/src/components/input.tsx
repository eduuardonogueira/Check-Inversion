interface IInput {
    type: string,
    name?: string,
    placeholder?: string | undefined,
    required?: boolean 
    autoComplete?: string | undefined,
    style?: React.CSSProperties | undefined,
    onchange?: React.ChangeEventHandler<HTMLInputElement> | undefined,
    value?: string,
    classname?: string | undefined,
    icon?: boolean
}

export const Input = ({ type, name, placeholder, required, style, onchange, value, autoComplete, classname, icon }: IInput) => (
    <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required} 
        className={`py-4 box-border bg-[#343440] text-[#c0c0d3] rounded-sm text-sm outline-[#063170] ${classname} ${icon ? "px-14" : "px-6"}`}
        style={style}
        onChange={onchange}
        value={value}
        autoComplete={autoComplete}
    ></input>
)

