const Edit = ({onEdit}) => {
    const handleClick = () => {
        onEdit();
    }

    return (
        <span><i className="far fa-edit" onClick={handleClick}/>Edit</span>
    );
}

export default Edit;