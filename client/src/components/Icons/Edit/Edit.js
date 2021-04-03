const Edit = ({onEdit}) => {
    const handleClick = () => {
        onEdit();
    }

    return (
        <div className="main-article-details-edit-icon">
            <i className="far fa-edit" onClick={handleClick}/>
        </div>
    );
}

export default Edit;