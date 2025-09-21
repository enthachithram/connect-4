const Eventinfo = ({ params }: { params: { id: string } }) => {

    const { id } = params
    return (
        <div> chat of the event: {id} </div>
    )


}


export default Eventinfo