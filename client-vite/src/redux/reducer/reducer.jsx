const initialState = {
    videogames: [],
    genres: [],
    searchVideogame: [],
    createVideoGame: undefined,
    searchVideoGameById: [],
    searchVideoGameByName: [],
    filteredVideogames:[],
    filteredVideoGamesAZ : [],
    filteredVideoGamesZA : [],
    orderBy: 'Select',
    filterBy:'All'
}

export default function rootReducer( state = initialState, action){
    switch (action.type) {
        case "GET_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload
            }

        case "GET_VIDEOGAME_BY_ID":
            return {
                ...state,
                searchVideoGameById: action.payload
            }

        case "SEARCH_VIDEOGAME":
            return {
                ...state,
                searchVideoGameByName: action.payload
            }

        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload
            }

        case "CREATE_VIDEOGAME":
            return {
                ...state,
                createVideoGame: action.payload
            }
        
        case "RESET":
            return {
                ...state,
                videogames: [],
                filteredVideoGames: [],
                orderBy: "Select",
                filterBy: 'All',
            }

        case "FILTER_BY_GENRE":
            return {
                ...state,
                filteredVideogames: action.payload.videogameGenre,
                filterBy: action.payload.genre,
            };

        case "ORDER_ASC_NAME":
        case "ORDER_ASC_RATING":
        case "ORDER_DESC_NAME":
        case "ORDER_DESC_RATING":
            return {
                ...state,
                filteredVideogames: action.payload.videogamesOrder,
                orderBy: action.payload.name,
            };

        case "ORDER_BY_CREATOR":
            return {
            ...state,
            filteredVideogames: action.payload.videogames,
            filterBy: action.payload.source,
            };
    
        default:
            return state;
    }
}