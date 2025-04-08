export const Button = ({ disabled, label, onClick }) => {
    return <button onClick={onClick} disabled={disabled}>{label}</button>
}