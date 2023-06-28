interface Props {
  user: string | undefined,
  image: string | undefined,
  onClick: () => void 
}

export function UserShape({user, image, onClick} : Props): JSX.Element{

  return (
    <div>
      <p>{user}</p>
      <img src={image} onClick={onClick}/>
    </div>
  )
};
