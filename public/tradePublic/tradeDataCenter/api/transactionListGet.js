import { transaction_default_fields, soldget_all_type } from "tradePublic/tradeDataCenter/config";
import taobaoTransactionReceiveGet from "tradePublic/taobaoTransactionReceiveGet";
import {fullinfoGetBatch} from "tradePublic/tradeDataCenter/api/fullinfoGet";
import { NOOP } from "tradePolyfills/index";
import { getArrayByKey, getOrders, resolveTopResponse } from "tradePublic/tradeDataCenter/common/resolveTopResponse";
import { handleError } from "tradePublic/tradeDataCenter/common/handleError";
export function getTransactionList(
    {
        fields = transaction_default_fields,
        buyerNnick = '',
        type = soldget_all_type,
        useHasNext = true,
        pageSize = 40,
        pageNo = 1,
        source,
        fallback = true,
        callback = NOOP,
        errCallback = handleError,
        ...rest
    }
) {
    let query = {
        fields,
        buyer_nick:buyerNnick,
        type,
        page_no: pageNo,
        page_size: pageSize,
        use_has_next: useHasNext,
        ...rest,
    };
    let has_next=false;
    let totalResults = 0;

    return new Promise((resolve, reject) => {
        taobaoTransactionReceiveGet({
            query: query,
            callback: (rsp) => {
                rsp = resolveTopResponse(rsp);
                let transactions = getArrayByKey('trade', rsp);
                console.log(transactions)
                if (transactions) {
                    has_next = rsp.has_next;
                }
                totalResults = rsp.total_results;
                resolve({transactions:transactions});
            },
            errCallback: (error) => {
                reject(error);
                errCallback(error);
            },
        });
    }).then(({transactions}) => {
        let idObj = {};
        transactions.map(item => {
            if (!idObj[item.tid]){
                idObj[item.tid] = [];
            }
            idObj[item.tid].push(item);
        })
        console.log(transactions, idObj, '1111111111')
        return new Promise((resolve,reject) => {
            fullinfoGetBatch({
                tids: Object.keys(idObj),
                callback: (rsp) => {
                    let list = [];
                    let trades = rsp.filter(Boolean);
                    console.log(trades, '-----------')
                    trades.forEach(trade => {
                        list.push(trade);
                    });
                    console.log(list,'22222222')
                    callback({totalResults: totalResults,trades: list, has_next});
                }
            })
        });
    });
}