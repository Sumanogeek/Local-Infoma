//import uuid from 'uuid';

const initialState = {
    items: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    const newState = {...state};

    switch(action.type) {
        case 'GET_ITEMS':
            //console.log('newState: ' + JSON.stringify(action.payload))
            return {
                newState,
                items: action.payload,
                loading: false
            };
            //break;
        case 'DELETE_ITEM':
            //console.log('DELETE_ITEM' + " - " + action.id );
            return {
                ...state, 
                items: state.items.filter(item => item._id !== action.id)
            };
            //break;
        case 'ADD_ITEM':
            //console.log('ADD_ITEM' + " - " + JSON.stringify(action.payload) );
            //console.log('ADD_ITEM-state' + " - " + JSON.stringify({...state}) );
            return {
                ...state,
                items: [action.payload, ...state.items]
            };
            //break
        case 'ITEMS_LOADING':
            return{
                ...state,
                loading: true
            }
            //break
        default:
            return state;
    }
};

export default reducer;