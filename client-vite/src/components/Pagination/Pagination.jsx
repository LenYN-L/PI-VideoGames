import './Pagination.css'

export default function Pagination ({ videogamesPerPage, totalVideogames, paginate}) {
    const pageNumber = []
    const numOfPage = Math.ceil(totalVideogames / videogamesPerPage)

    for (let i = 1; i < numOfPage; i++) {
        pageNumber.push(i)
    }

    return(
        <div className="pagination">
            <nav className='pagination-container'>
                {pageNumber.map(num => (
                    <div key={num}>
                        <button onClick={e => paginate(e, num)}>{num}</button>
                    </div>
                ))}
            </nav>
        </div>
    )
}