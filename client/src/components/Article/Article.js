import BtnReadMore from '../BtnReadMore';
import {api} from "../../utils/globals";
import {request} from "../../utils/data";

const Article = ({data, history}) => {
    const {_id, title, urlToImage} = data;

    const handleButtonCLick = async () => {
        await request(`${api.posts.visit}/${_id}`, 'POST')
            .then(() => {
                history.push(`/post/${_id}`);
            }).catch(error => console.error('Error:', error));
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