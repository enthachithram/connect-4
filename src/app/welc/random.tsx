const Random = (({ list }: { list: string[] }) => {

    const k = ["asdd", "dsfdf", "zfgfdgk"]
    return (
        list.map((ele, id) => (
            <div key={id}>
                {ele}
            </div>
        ))
    )
})

export default Random