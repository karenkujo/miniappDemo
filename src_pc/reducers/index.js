import { combineReducers } from 'redux';
import { marketingAdInfoReducer } from "mapp_common/marketing/reducer";
import { refundListReducer } from "pcPages/refundManagement/reducer";
import { transactionListReducer } from "pcPages/transactionManagement/reducer";
import { goodsListReducer } from "pcPages/goodsManagement/reducer"

export default combineReducers({
    marketingAdInfoReducer,
    refundListReducer,
    transactionListReducer,
    goodsListReducer
});

