import Taro, { Component } from "@tarojs/taro";
import { View, Checkbox, Text } from "@tarojs/components";
import MyPagination from "pcComponents/myPagination";
import GoodsCard from "pcComponents/goodsCard";
import { connect } from "@tarojs/redux";
import "./index.scss";
import EmptyPage from "pcComponents/emptyPage";

import { select, onAllSelect } from 'pcPages/goodsManagement/action';

@connect((state) => ({
    pageNo: state.goodsListReducer.pageNo,
    pageSize: state.goodsListReducer.pageSize,
    activeTabKey: state.goodsListReducer.activeTabKey,
    goodsCount: state.goodsListReducer.goodsCount,
    list: state.goodsListReducer.list,
    allSelect: state.goodsListReducer.allSelect,
    selectNum: state.goodsListReducer.selectNum,
}))
class Mytable extends Component {
    onPageChange = (type, v) => {
        const { activeTabKey, pageNo, pageSize, onChangeTab } = this.props;
        if (type === "pageNo") {
            onChangeTab(activeTabKey, v, pageSize);
        } else {
            onChangeTab(activeTabKey, pageNo, v);
        }
    };
    render() {
        const headList = [
            {
                title: "宝贝信息",
                class: "baby-msg",
            },
            {
                title: "价格",
                class: "baby-price",
            },
            {
                title: "库存/销量",
                class: "baby-num",
            },
            {
                title: "下架时间",
                class: "baby-time",
            },
            {
                title: "手机详情",
                class: "baby-detail",
            },
            {
                title: "操作",
                class: "baby-caozuo",
            },
        ];

        const { pageNo, pageSize, goodsCount, list, activeTabKey, allSelect, selectNum } = this.props;
        const PAGE_SIZE_LIST = [20, 40, 60, 80, 100];
        return (
            <View className="Mytable">
                <View className="table-header grid-item24">
                    {headList.map((item, index) => (
                        <View
                            key={index}
                            className={item.class + " header-item"}
                        >
                            {item.title}
                        </View>
                    ))}
                </View>

                <View className="table-content grid-item24">
                    <View className="content-wrapper">
                        {
                            list.length == 0 && (
                                <View className="empty">
                                    <EmptyPage text="未找到符合条件的宝贝" />
                                </View>
                            )
                        }
                        {
                            list.length > 0 && list.map((good, index) => (
                                <GoodsCard good={good} activeTabKey={activeTabKey} idx={index} onSelect={select} />
                            ))
                        }
                    </View>
                </View>

                <View className="table-footer grid-item24">
                    <View className="footer-checkbox">
                        <Checkbox className="checkbox" checked={allSelect} onChange={onAllSelect} />
                        <Text>
                            全选(已选：<Text className="footer-num">{selectNum}</Text>)
                        </Text>
                    </View>
                    <View className="pagination">
                        <MyPagination
                            total={goodsCount}
                            pageNo={pageNo}
                            pageSizeSelector="dropdown"
                            pageSizeList={PAGE_SIZE_LIST}
                            pageSize={pageSize}
                            onPageSizeChange={this.onPageChange.bind(
                                this,
                                "pageSize"
                            )}
                            onPageNoChange={this.onPageChange.bind(
                                this,
                                "pageNo"
                            )}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export default Mytable;
