function ComponentMock(props) {
    return (
        <div className="component-mock" role="document">
            {
                `${Object.keys(props).toString()} `
                + `${Object.values(props).toString()}`
            }
        </div>
    )
}

export default ComponentMock
