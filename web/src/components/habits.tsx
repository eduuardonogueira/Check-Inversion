interface HabitProps {
    propriedade: number
}


export function Habit(props: HabitProps) {
    return (
        <div className="">{props.propriedade}</div>
    )
}

export default Habit