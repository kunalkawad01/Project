
import axios from 'axios'
export const optionchainAction = (ChainParams, history) => dispatch => {

    const instance1 = axios.create()



    instance1.get('/api/optionchain', {
        params: ChainParams
    })//promise

        .then(response => {
            console.log('Hello action')
            console.log('responese', response.data)
            dispatch({ type: 'OPTIONCHAIN', payload: response.data })
            //history.push('/backtestReport')
        })//then

        .catch(err => console.log(err))



}//backtestFire


