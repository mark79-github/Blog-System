const Comments = (props) => {

    const handleClick = () => {
        props.onClick();
    }

    return (
        <div className="main-article-details-comment-icon">
            <i className="far fa-comments" onClick={handleClick}/>
        </div>
    )

}

export default Comments;