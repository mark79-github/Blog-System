const Edit = ({onEdit}) => {

    const handleClick = () => {
        onEdit();
    }

    return (
        // <div className="main-article-details-edit-icon">
        <div>
            <i className="far fa-edit" onClick={handleClick}/>
        </div>
        // </div>
    );
}

export default Edit;