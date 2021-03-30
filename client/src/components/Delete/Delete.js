const Delete = ({onDelete}) => {
    const handleClick = () => {
        onDelete();
    }

    return (
        <span><i className="fas fa-eraser" onClick={handleClick}/>Delete</span>
    );
}

export default Delete;