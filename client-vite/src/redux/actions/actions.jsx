import axios from 'axios'

// export function getVideogames () {
//     return async function (dispatch) {
//         const getGames = await axios.get('http://localhost:3001/videogame') 
//         dispatch({
//             type: 'GET_VIDEOGAMES',
//             payload: getGames.data
//         })
//     }
// }

export function getVideogames () {
  return function (dispatch) {
    fetch('http://localhost:3001/videogame')
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: 'GET_VIDEOGAMES',
          payload: json
        })
      })
  }
}

// export function getVideogameById (id) {
//     return async function (dispatch) {
//         const getGamesById = await axios.get(`http://localhost:3001/videogame/${id}`)
//         dispatch({
//             type: "GET_VIDEOGAME_BY_ID",
//             payload: getGamesById.data
//         })
//     }
// }

export function getVideogameById (id) {
  return function (dispatch) {
    axios.get(`http://localhost:3001/videogame/${id}`)
      .then(response => {
        const {data} = response
        dispatch({
          type: 'GET_VIDEOGAME_BY_ID',
          payload: data
        })
      })
  }
}
 

export function searchVideogames (name) {
    return async function (dispatch) {
        const Game = await axios.get(`http://localhost:3001/videogame?name=${name}`)
        dispatch({
            type: "SEARCH_VIDEOGAME",
            payload: Game.data
        })
    }
}

export function getGenres() {
    return async function (dispatch) {
        const genres = await axios.get('http://localhost:3001/genres')
        dispatch({
            type: 'GET_GENRES',
            payload: genres.data
        })
    }
}

export function createVideogame (obj) {
  return async function (dispatch) {
    const newVideogame = await axios.post('http://localhost:3001/videogame', obj)
    dispatch({
      type: 'CREATE_VIDEOGAME'
    })
  }
}

export const resetAll = () => {
    return (dispatch) => {
        dispatch({
            type: 'RESET'
        })
    }
}

export const filterByGenre = (genres) => {
    return async function (dispatch, getState) {
        let filteredGames = [];
      
        if (genres === "All") {
          filteredGames = getState().videogames;
        } else {
          filteredGames = getState().videogames.filter((game) =>
            (game.genres).includes(genres)
          )
        };
        dispatch({
          type: "FILTER_BY_GENRE",
          payload: {
            genres,
            videogameGenre: filteredGames,
          },
        });
      };
}

  
  
export const orderAsc = (type) => {
    return async function (dispatch, getState) {
      const filtered = getState().filteredVideogames;
      let videogamesOrder = []
    
        if (type === "asc_name") {
          videogamesOrder = filtered.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          });
        } else if (type === "asc_rating") {
          videogamesOrder = filtered.sort((a, b) => a.rating - b.rating);
        }
        dispatch({
          type: "ORDER_ASC_RATING",
          payload: {
            videogamesOrder,
            name: type,
          },
        });
    }
}
  
  
export const orderDesc = (type) => {
    return async function (dispatch, getState) {
      const filtered = getState().filteredVideogames;
      let videogamesOrder = []
        
        if (type === "desc_name") {
          videogamesOrder = filtered.sort((a, b) => {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
          });
        } else if (type === "desc_rating") {
          videogamesOrder = filtered.sort((a, b) => b.rating - a.rating);
        }
        dispatch({
          type: "ORDER_DESC_RATING",
          payload: {
            videogamesOrder,
            name: type,
          },
        });
    }
}
  
  
export const orderByCreator = (source) => {
  return async function (dispatch, getState) {
    const videogames = getState().videogames.filter( G => {
      if(source === 'Created') return G.id.length === 36
      else return G.id.length !==36
    })
      dispatch({
        type: "ORDER_BY_CREATOR",
        payload: {
          videogames,
          source,
        },
      });
  }
};
