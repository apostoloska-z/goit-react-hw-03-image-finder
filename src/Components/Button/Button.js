import "./Button.scss"

const Button = ({onClick}) => (
    <button onClick={onClick} type="button" className="Button">Load more</button>
)

export default Button;