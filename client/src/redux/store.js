import { combineReducers, legacy_createStore as createStore } from 'redux'
import { userReducer } from './reducers/userReducer'
import { chatReducer } from './reducers/chatReducer'
import messageReducer from './reducers/messageReducer'


const reducers = combineReducers(
    {
        userReducer: userReducer,
        chatReducer: chatReducer,
        messageReducer: messageReducer
    }
)
const store = createStore(reducers)

export default store