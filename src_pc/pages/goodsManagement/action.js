import Taro from '@tarojs/taro';
import { GOODS_CHANGE } from './config';
import { taobaoItemListGet } from 'tradePublic/itemTopApi/taobaoItemListGet';
import { taobaoItemOper } from 'tradePublic/itemTopApi/taobaoItemOper';
import { getArrayByKey } from "tradePublic/tradeDataCenter/common/resolveTopResponse";

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

export const changeTab = (tabkey, pageNo, pageSize) => {
    dispatch({
        type: GOODS_CHANGE,
        data: {
            activeTabKey: tabkey,
            pageNo: pageNo,
            pageSize: pageSize
        }
    })
    taobaoItemListGet({
        status: tabkey,
        page_no: pageNo,
        page_size: pageSize,
        callback: (res) => {
            console.log(res)
            let goods = getArrayByKey('item', res);
            let goodsCount = res.total_results
            dispatch({
                type: GOODS_CHANGE,
                data: {
                    list: goods,
                    goodsCount
                }
            })
        }
    })
}

export const select = (index, id) => {
    const selectList = getState().goodsListReducer.selectList.slice(0)
    let { list, allSelect } = getState().goodsListReducer
    let num = 0
    if (!selectList[index]) {
        selectList[index] = id
    } else {
        selectList[index] = false
    }
    selectList.forEach(item => {
        if (item) {
            num++
        }
    })
    if (num === list.length) {
        allSelect = true
    } else {
        allSelect = false
    }
    dispatch({
        type: GOODS_CHANGE,
        data: {
            selectList,
            allSelect,
            selectNum: num
        }
    })
}

export const onAllSelect = () => {
    let { allSelect, list } = getState().goodsListReducer
    let selectList = []
    let selectNum = 0
    if (allSelect) {
        allSelect = false
        selectNum = 0
    } else {
        list.forEach(item => {
            selectList.push(item.num_iid)
            selectNum++
        })
        allSelect = true
    }
    dispatch({
        type: GOODS_CHANGE,
        data: {
            selectList,
            allSelect,
            selectNum
        }
    })
}

export const delistAndList = (status, num_iid) => {
    taobaoItemOper({
        num_iid,
        status,
        callback: (res) => {
            console.log(res)
        }
    })
}