interface IButton {
  text: string
  type?: 'button' | 'submit' | 'reset' | undefined
  style?: React.CSSProperties | undefined
  onClick?: () => void
}

export const Button = ({ type, text, style, onClick }: IButton) => {
  return (
    <button
      className="bg-[#044FBF] text-[#fff] box-border px-6 py-4 rounded-sm hover:bg-[#044fbfb0]"
      onClick={onClick}
      style={style}
      // eslint-disable-next-line react/button-has-type
      type={type ? type : 'button'}
    >
      {text}
    </button>
  )
}
