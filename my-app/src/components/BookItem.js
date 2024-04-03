import Button from './Button';
import './BookItem.css';

export default function BookItem(props){
    return (
        <div class="BookItem">
            <img class="imageSpecifications" src={props.image} alt={props.title}/>
            <div class="BookInfo">
                <h2>{props.title}</h2>
                <h2>{props.author}</h2>
                <h2>{props.genre}</h2>
                <h2>{props.stars} stars</h2>
                <h2>{props.length} pages</h2>
                <Button 
                    text={props.inWantToRead ? "Remove from Want to Read" : "Want To Read"}
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