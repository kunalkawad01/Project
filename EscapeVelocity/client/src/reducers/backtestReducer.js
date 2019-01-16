import { BACKTEST } from '../actions/types'



const initialState = {
    NetResultsFlat: [],

}


export default function (state = initialState, action) {
    switch (action.type) {

        case BACKTEST:

            return {

                ...state,
                NetResultsFlat: action.payload
            }




        default:
            return state









    }//switch


}