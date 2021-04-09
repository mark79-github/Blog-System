const Comments = (props) => {

    const handleClick = () => {
        props.onClick();
    }

    return (
        // <div className="main-article-details-comment-icon">
        <div>
            <i className="far fa-comments" onClick={handleClick}/>
        </div>
        // </div>
    )

}

export default Comments;