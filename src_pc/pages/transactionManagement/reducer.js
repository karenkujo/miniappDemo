import { TRANSACTION_CHANGE } from "./config";


let initState = {
    searchVal: '',
    activeTabKey: 'ALL',
    tradeCounts: {},
    pageSize: 20,
    pageNo: 1,
    list:[],
    isLoading: true,
};


export function transactionListReducer(state = initState, action) {
    switch (action.type) {
        case TRANSACTION_CHANGE:
            return Object.assign({},state,action.data)
        default:
            return state;
    }
}
