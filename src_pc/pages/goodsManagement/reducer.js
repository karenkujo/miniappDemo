import { GOODS_CHANGE } from './config';

let initState = {
    list: [],
    activeTabKey: '出售中',
    pageSize: 20,
    pageNo: 1,
    goodsCount: 0,
    selectList: [],
    allSelect: false,
    selectNum: 0
};


export function goodsListReducer(state = initState, action) {
    switch (action.type) {
        case GOODS_CHANGE:
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}
