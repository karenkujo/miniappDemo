import { Component } from '@tarojs/taro';
import { View, Text, Input, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { TRANSACTION_TABS } from "tradePublic/consts";
import MyTabs from "mapp_common/components/myTab";
import MyPagination from "pcComponents/myPagination";
import TransactionList from "pcComponents/transactionManagement/transactionList";

import { changeTab } from "./action";

import './index.scss';
import { getSystemInfo } from "mapp_common/utils/systemInfo";

@connect((store) => {
    return {
        searchVal: store.transactionListReducer.searchVal,
        activeTabKey: store.transactionListReducer.activeTabKey,
        pageNo: store.transactionListReducer.pageNo,
        pageSize: store.transactionListReducer.pageSize,
        tradeCounts: store.transactionListReducer.tradeCounts,
        list: store.transactionListReducer.list,
    };
})
class ReturnManagement extends Component {

    constructor (props) {
        super(props);
        this.state = { scrollHeight: 0 };
    }
    componentDidMount () {
        const { pageNo, pageSize, searchVal } = this.props;
        this.setState({ scrollHeight: 500 });
        changeTab('WAIT_BUYER_PAY', pageNo, pageSize, searchVal);
    }
    onPageChange = (type, v) => {
        const { activeTabKey, pageNo, pageSize, searchVal } = this.props;
        if(type === 'pageNo') {
            changeTab(activeTabKey, v, pageSize, searchVal);
        }else{
            changeTab(activeTabKey, pageNo, v, searchVal);
        }
    };

    onTabChange = (v)=>{
        const { pageSize } = this.props;
        changeTab(v, 1, pageSize, '');
    };
    render () {
        const { activeTabKey, list, searchVal, tradeCounts } = this.props;
        const tabList = Object.keys(TRANSACTION_TABS).map((key) => {
            return { title: TRANSACTION_TABS[key].name, key };
        });
        const { scrollHeight } = this.state;
        const PAGE_SIZE_LIST = [20, 40, 80, 100];
        return (
            <View className='transactionmanagement'>
                <ScrollView
                    className='trade-scroll'
                    style={{ height: getSystemInfo().windowHeight - 60 - 50 }}
                    scrollY enableBackToTop
                    scroll-top={scrollHeight}
                >
                    <View className='transaction-search'>
                        <Input placeholder='请输入订单号或买家昵称' className='input'/>
                        <Button className='button'>
                            <Text className='button-text'>
                                搜索
                            </Text>
                        </Button>
                    </View>
                    <View className='grid-item24 tab-con' >
                        <MyTabs className='trade-tab custom-tab grid-item24' current={activeTabKey} tabList={tabList} scroll dotNum={tradeCounts} onClick={this.onTabChange} />
                        <View className='tab-blank'></View>
                    </View>
                    <TransactionList />
                </ScrollView>

                <View className='transaction-footer'>
                    <View/>
                    <MyPagination
                        total={tradeCounts}
                        pageNo={this.props.pageNo}
                        pageSizeSelector='dropdown'
                        pageSize={this.props.pageSize}
                        pageSizeList={PAGE_SIZE_LIST}
                        onPageSizeChange={this.onPageChange.bind(this, 'pageSize')}
                        onPageNoChange={this.onPageChange.bind(this, 'pageNo')}
                    />
                </View>
            </View>
        );
    }
}

export default ReturnManagement;
