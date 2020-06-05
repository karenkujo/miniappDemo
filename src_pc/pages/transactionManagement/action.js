import Taro from '@tarojs/taro';
import { TRANSACTION_CHANGE } from './config';
import { getTransactionList } from "tradePublic/tradeDataCenter/api/transactionListGet";
import { transaction_default_fields } from "tradePublic/tradeDataCenter/config";

let app = Taro.getApp();
/**
 *
 * @param json
 */
export const dispatch = (json) => {
    app.store.dispatch(json);
};
/**
 *
 * @returns {any|*|Promise<NavigationPreloadState>}
 */
export const getState = () => {
    return app.store.getState();
};


export const changeTab = (tabkey, pageNo, pageSize, searchVal) => {

    dispatch({
        type: TRANSACTION_CHANGE,
        data:{
            activeTabKey: tabkey,
            pageNo:pageNo,
            pageSize: pageSize,
            list:[],
            isLoading:true,
        },
    });
    getTransactionList({
        fields:transaction_default_fields,
        status:tabkey,
        pageNo:pageNo,
        pageSize:pageSize,
        buyerNnick:searchVal,
        useHasNext:false,
        callback:(rsp) => {
            let list = rsp.trades;
            dispatch({
                type: TRANSACTION_CHANGE,
                data:{
                    activeTabKey: tabkey,
                    list:[...list],
                    tradeCounts: rsp.totalResults,
                    isLoading:false,
                },
            });
        }
    });
};