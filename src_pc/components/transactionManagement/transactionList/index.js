import { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View } from '@tarojs/components';
import TransactionCard from "pcComponents/transactionManagement/transactionCard";
import './index.scss';
import EmptyPage from "pcComponents/emptyPage";

@connect((store) => {
    return {
        activeTabKey: store.transactionListReducer.activeTabKey,
        list: store.transactionListReducer.list,
        isLoading: store.transactionListReducer.isLoading,
    };
})
class TransactionList extends Component {

    render () {
        const { list, activeTabKey, isLoading} = this.props;
        return (
            <View className='transaction-list'>
                {
                    list.length == 0 && !isLoading  && (
                        <View className='transaction-empty'>
                            <EmptyPage text='当前没有任何订单' />
                        </View>
                    )
                }
                {
                    list.map((trade) => {
                        return <TransactionCard trade={trade} activeTabKey={activeTabKey}/>;
                    })
                }
            </View>
        );
    }
}
export default TransactionList;
