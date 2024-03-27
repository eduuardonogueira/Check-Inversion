interface IUserShape {
  user: string | undefined
  image: string | undefined
  onClick: () => void
}

export const UserShape = ({ user, image, onClick }: IUserShape): JSX.Element => (
  <div>
    <p>{user}</p>
    <img onClick={onClick} src={image} />
  </div>
)
