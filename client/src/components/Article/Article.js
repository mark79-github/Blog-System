import BtnReadMore from '../BtnReadMore';

const Article = ({data, history}) => {
    const {_id, title, urlToImage} = data;

    //TODO to fix fetch
    const handleButtonCLick = async () => {
        await fetch(`http://localhost:5000/api/posts/visit/${_id}`, {
            method: 'POST',
        })
            .then(() => history.push(`/post/${_id}`))
            .catch(error => console.error('Error:', error));
    }

    return (
        <article className="article">
            <article className="article-image">
                <img src={urlToImage} alt="react"/>
            </article>
            <article className="article-description">
                <h2 className="article-description-title">{title}</h2>
                <BtnReadMore onClick={handleButtonCLick}/>
            </article>
        </article>
    );
}

export default Article;