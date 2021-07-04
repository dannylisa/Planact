import { useSelector } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import theme from './theme'
import userAuth from './userAuth'
import userSchedules from './userSchedules'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import ReduxThunk from 'redux-thunk'
// 전체 Global State
const rootReducer = combineReducers({
  theme,
  userSchedules,
  userAuth,
})
export type GlobalState = ReturnType<typeof rootReducer>
export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, logger))
)
