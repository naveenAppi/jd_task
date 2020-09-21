import * as Action_type from "../Actions/actionTypes";

const initialState = {
    products: [],
    product: {},
    productAddedSuccessfully: false,
    getProductSuccessfully: false,
    getAllProductSuccessfully:false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case Action_type.GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                getProductSuccessfully:true
            }
        default:
            return state
    }
}