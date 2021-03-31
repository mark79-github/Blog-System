const Delete = ({onDelete}) => {
    const handleClick = () => {
        onDelete();
    }

    return (
        <span><i className="fas fa-eraser" onClick={() => { if (window.confirm('Are you sure you wish to delete the post ?')) handleClick() } }/>Delete</span>
    );
}

export default Delete;