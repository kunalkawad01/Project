import { combineReducers } from 'redux'
import backtestReducer from './backtestReducer'
import optionchainReducer from './optionchainReducer'

export default combineReducers({
    backtest: backtestReducer,
    optionchain: optionchainReducer
})
