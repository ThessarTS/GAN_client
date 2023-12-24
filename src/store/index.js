import { legacy_createStore as createStore } from 'redux'

let initialState = {
    currentId: '',
}
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_ID':
            return {
                ...state,
                currentId: action.payload
            }
        default:
            return state

    }
}

const store = createStore(rootReducer)

export default store