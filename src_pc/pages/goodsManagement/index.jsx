import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from '@tarojs/redux';
import { GOODS_TABS } from "tradePublic/consts";
import MyTabs from "mapp_common/components/myTab";
import Mytable from "pcComponents/mytable";
import "./index.scss";

import { changeTab } from "./action";

@connect((state) => ({
    activeTabKey: state.goodsListReducer.activeTabKey,
    pageNo: state.goodsListReducer.pageNo,
    pageSize: state.goodsListReducer.pageSize,
    list: state.goodsListReducer.list,
}))
class GoodsManagement extends Component {
    componentDidMount() {
        const { pageNo, pageSize } = this.props
        changeTab('出售中', pageNo, pageSize)
    }
    onTabChange = (tabkey) => {
        const { pageNo, pageSize } = this.props
        changeTab(tabkey, pageNo, pageSize);
    };
    render() {
        const { activeTabKey, list } = this.props;
        const tabList = Object.keys(GOODS_TABS).map((key) => {
            return { title: GOODS_TABS[key].name + `(${list.length})`, key: GOODS_TABS[key].name };
        });

        return (
            <View className="goodsManagement">
                    <View className='grid-item24 tab-con'>
                        <MyTabs className='trade-tab custom-tab grid-item24' current={activeTabKey} tabList={tabList} onClick={this.onTabChange}/>
                        <View className='tab-blank'></View>
                    </View>
                    <View className='grid-item24 tab-con'>
                        <Mytable className='trade-tab grid-item24' onChangeTab={changeTab} />
                    </View>
            </View>
        );
    }
}

export default GoodsManagement;
