



const initialState = {
    OptionChain: [],

}


export default function (state = initialState, action) {
    switch (action.type) {

        case 'OPTIONCHAIN':

            return {

                ...state,
                OptionChain: action.payload
            }




        default:
            return state









    }//switch


}