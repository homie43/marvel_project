import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() { // вызывается после того как компонент был создан на стр, это иделаьный момент чтобы выполнять какието запросы на сервер, подписываться на другие сервисы, те делать что-то асинхронное для изменения UI
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId) { // условие обязательноБ чтобы не войти в бесконечную петлю
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading();
        this.marvelService.getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoaded = (char) => { // изменяет состояние спинера
        this.setState({
            char, 
            loading: false
        })
    }

    onCharLoading() { // метод показывает спинер, при переключении "try it", помещается в updateChar
        this.setState({
            loading: true
        })
    }

    onError = () => { // изменяет состояние ошибки
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const contetnt = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {contetnt}
            </div>
        )
    }
}


const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.map((item, i) => {
                        return(
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        ) 
                    })
                }
                
            </ul>
        </>
    )
}

export default CharInfo;