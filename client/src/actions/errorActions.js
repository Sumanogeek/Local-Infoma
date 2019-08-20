// RETURN ERRORS
export const returnErrors = (msg, status, id = null, action={type: 'GET_ERRORS'}) => {
    return {
        //type: GET_ERRORS,
        type: action.type,
        payload: { msg, status, id}
    };
};

//CLEAR ERRORS
export const clearErrors = (action={type: 'CLEAR_ERRORS'}) => {
    return {
        //type: CLEAR_ERRORS
        type: action.type
    };
};