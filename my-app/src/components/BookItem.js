import Button from './Button';
import './BookItem.css';

export default function BookItem(props){
    return (
        <div class="BookItem">
            <img class="imageSpecifications" src={props.image} alt={props.title}/>
            <div class="BookInfo">
                <h2>{props.title}</h2>
                <h3>{props.author}</h3>
                <h3>{props.genre}</h3>
                <h3>{props.stars} stars</h3>
                <h3>{props.length} pages</h3>
                <Button 
                    text={props.inWantToRead ? "Remove" : "Want To Read"}
                    onClick={() => {
                        if (props.inWantToRead){
                            props.removeFromWantToReadBooks(props.title);
                            props.decrementWantToReadTotal();
                        } else {
                            props.incrementWantToReadTotal();
                            props.addToWantToReadBooks(props.title);
                        }
                }}/>
            </div>
        </div>
    )
}