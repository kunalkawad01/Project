import { BACKTEST } from './types'
import axios from 'axios'
export const backtestFire = (LegsState, history) => dispatch => {

    const instance1 = axios.create()

    const k = LegsState
    console.log('From action creator', k)
    instance1.get('/api/backtestequity', {
        params: {
            ...k
        }
    })//promise

        .then(response => {
            console.log('Hello action')
            console.log('responese', response.data)
            dispatch({ type: BACKTEST, payload: response.data })
            history.push('/backtestReport')
        })//then

        .catch(err => console.log(err))



}//backtestFire


