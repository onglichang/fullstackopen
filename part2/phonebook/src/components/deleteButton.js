const DeleteButton = ({name, id, handleDelete}) => {
    return (
        <button name={name} id={id} onClick={handleDelete}>delete</button>
    )
}

export default DeleteButton