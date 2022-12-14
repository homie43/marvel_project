import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {Link} from "react-router-dom";
import './comicsList.scss';

const ComicsList = () => {
    
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics, clearError} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    // метод для запросов на сервер
    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded);
    }

    const onComicsListLoaded = (newComicsList) => { // изменяет состояние спинера
        let ended = false;

        if (newComicsList.length < 8) {
            ended = true
        }
        clearError()
        setComicsList([...comicsList, ...newComicsList]); // то есть в comicsList содержится старый comicsList и порция новых данных newComicsList
        setNewItemLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);

    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return(
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul> 
        )
    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null,
          spinner = loading && !newItemLoading ? <Spinner/> : null;
    
    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">Загрузить еще</div>
            </button>
        </div>
    )
}

export default ComicsList;