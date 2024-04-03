export default function Button(props){
    return (
        <button onClick={props.onClick} aria-label="button to add or remove book from want to read list">
            {props.text}
        </button>
    )
}