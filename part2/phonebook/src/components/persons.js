import DeleteButton from "./deleteButton"

const Persons = ({ personsToShow, deletePersonHandler}) => {
    return (
        <div>
            {personsToShow.map(person =>
            <p key={person.name}>
                {person.name} {person.number}
                <DeleteButton name={person.name} id={person.id} handleDelete={deletePersonHandler}/>
            </p>
            )}
        </div>
    )
}

export default Persons