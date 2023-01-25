const Filter = ({filter, eventHandler}) => {
    return (
        <div>
            find countries <input value={filter} onChange={eventHandler}/>
        </div>
    )
}

export default Filter