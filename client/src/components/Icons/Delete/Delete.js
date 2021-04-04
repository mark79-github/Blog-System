const Delete = ({onDelete}) => {

    const handleClick = () => {
        onDelete();
    }

    return (
        <div className="main-article-details-delete-icon">
            <i className="far fa-trash-alt" onClick={handleClick}/>
        </div>
    );
}

export default Delete;