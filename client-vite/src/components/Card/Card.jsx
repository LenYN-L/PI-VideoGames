import { Link } from 'react-router-dom'
import NotFound from '../NotFound/NotFound'
import './Card.css'

export default function Card ({data}) {
	const mapGenres = () => {
		const dataGenres = data.genres.map( G => {
			return G.name
		})
		return dataGenres.join(', ')
	}

    return(
        <div className='card'>
			<div className='card-title'>{data.name}</div>
            <Link className='card-container' to={'/home/'+data.id}>
                {data.image === null || !data.image ? (
					<NotFound image={'noimage'} />
				) : (
					<img className='card-img' src={data.image} alt={data.name} />
				)}
            </Link>
            <div className='card-data'>
				<div>
					<div>Genres: {!(Array.isArray(data.genres)) ? data.genres: mapGenres()}</div>
				</div>
				<div>
					<div>Rating: {data.rating}</div>
				</div>
			</div>
        </div>
    )
}

