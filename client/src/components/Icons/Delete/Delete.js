const Delete = ({onDelete}) => {

    const handleClick = () => {
        onDelete();
    }

    return (
        // <div className="main-article-details-delete-icon">
        <div>
            <i className="far fa-trash-alt" onClick={handleClick}/>
        </div>
        // </div>
    );
}

export default Delete;