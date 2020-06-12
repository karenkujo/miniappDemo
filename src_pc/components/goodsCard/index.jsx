import Taro, { Component } from "@tarojs/taro";
import { View, Checkbox, Text, Image } from "@tarojs/components";
import './index.scss';
import { connect } from "@tarojs/redux";
import { getDiffFormatTime } from "tradePublic/tradeDataCenter/common/utils";

import { delistAndList } from 'pcPages/goodsManagement/action';

@connect((state) => ({
    selectList: state.goodsListReducer.selectList,
}))
class goodsCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            btnDeatil: {
                "出售中": [
                    {
                        text: "编辑",
                        class: "card-btn",
                        clickbtn: () => {}
                    },
                    {
                        text: "下架",
                        class: "card-btn",
                        clickbtn: delistAndList.bind(null, 'delisting')
                    }
                ],
                "仓库中": [
                    {
                        text: "删除宝贝",
                        class: "card-btn card-redbtn",
                        clickbtn: () => {}
                    },
                    {
                        text: "上架",
                        class: "card-btn",
                        clickbtn: delistAndList.bind(null, 'listing')
                    }
                ]
            }
        }
    }
    diffTime () {
        const { diffDay, diffHour, diffMinute } = getDiffFormatTime(
            new Date(),
            this.props.good.delist_time
        );
        return '剩余' + diffDay + '天' + diffHour + '小时' + diffMinute + '分'
    }
    change() {
        const { idx, onSelect, good } = this.props
        onSelect(idx, good.num_iid)
    }
    render () {
        const { btnDeatil } = this.state
        const { good, activeTabKey, selectList, idx } = this.props
        return (
            <View className="goodsCard card grid-cont">
                <View className="card-item1 grid-item10">
                    <Checkbox className="checkbox" checked={selectList[idx] ? true : false} onChange={this.change} ></Checkbox>
                    <Image className="img" src={good.pic_url} />
                    <View className="title-wrapper">
                        <Text className="title">{good.title}</Text>
                        <Text className="maidian">宝贝卖点：未设置宝贝卖点</Text>
                        <Text className="bianma">商家编码：{good.outer_id}</Text>
                    </View>
                </View>
                <View className="card-item2 grid-item3">
                    <View className="price">{good.price}</View>
                    <Text className="cuxiao">设置促销活动</Text>
                </View>
                <View className="card-item2 grid-item3">
                    <Text className="num">库存：{good.num}</Text>
                    <Text className="sold-quantity">销量：{good.sold_quantity ? good.sold_quantity : 0}</Text> 
                </View>
                <View className="card-item2 grid-item3">
                    <Text className="time">{good.delist_time}</Text>
                    { activeTabKey === "出售中" && <Text className="diff-time">{this.diffTime()}</Text> }
                    <Text className="auto-list">自动上下架</Text>
                </View>
                <View className="card-item2 grid-item2">
                    <Text className="mobile-detail">无详情</Text>
                    <Text className="combile">一键生成</Text>
                </View>
                <View className="card-item3 grid-item3">
                    {
                        btnDeatil[activeTabKey].map((item, index) => {
                            return <View onClick={() => item.clickbtn(good.num_iid)} key={index} className={item.class}>{item.text}</View>
                        })
                    }
                    <Text className="more">更多操作</Text>
                </View>
            </View>
        )
    }
}

export default goodsCard