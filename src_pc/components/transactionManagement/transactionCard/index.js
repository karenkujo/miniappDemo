import { Component } from "@tarojs/taro";
import { Checkbox, Text, View, Image } from "@tarojs/components";
import { getDiffFormatTime } from "tradePublic/tradeDataCenter/common/utils";
import OrderCard from "../orderCard";
import "./index.scss";
import { getTradeAddress } from "tradePublic/tradeDataCenter/biz/resolveTrade";
import { getOrders } from "tradePublic/tradeDataCenter/common/resolveTopResponse";
import { TRANSACTION_TABS } from "tradePublic/consts";

class TransactionCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { trade } = this.props;
        const { activeTabKey } = this.props;
        const { diffHour, diffMinute, diffSecond } = getDiffFormatTime(
            new Date(),
            trade.timeout_action_time
        );
        return (
            <View className="transaction-detail-card">
                <View className="hd">
                    <View className="frac">
                        <Checkbox className="check-box" />
                        <View className="card-item2-row">
                            <View
                                className={TRANSACTION_TABS[trade.status].class}
                            >
                                {TRANSACTION_TABS[trade.status].name}
                            </View>
                        </View>
                        <View className="card-item2-row">
                            编号：{trade.tid}
                        </View>
                        <Text
                            className="iconfont iconfont-fuzhi"
                            onClick={this.copyText.bind(this, {
                                text: trade.buyer_nick,
                                msg: "复制成功",
                            })}
                        />
                        <Text className="hd-tid">下单时间:{trade.created}</Text>
                        <Text className="iconfont iconfont-beizhuqi"></Text>
                        <Text className="iconfont iconfont-shuaxin"></Text>
                    </View>
                    <View>
                        {trade.status ===
                            TRANSACTION_TABS.WAIT_BUYER_PAY.key && (
                            <Text className="hd-close">
                                <Text className="hd-close1">
                                    {diffHour}时{diffMinute}分{diffSecond}秒
                                </Text>
                                <Text>后订单自动关闭</Text>
                            </Text>
                        )}
                    </View>
                </View>
                <View className="card grid-cont">
                    <View className="card-item1 grid-item8">
                        {getOrders(trade).map((order) => {
                            return <OrderCard trade={trade} order={order} />;
                        })}
                    </View>

                    <View className="card-item3 grid-item4">
                        <View className="card-item-row">
                            <Text className="iconfont iconfont-wangwang"></Text>
                            <Text className="texts">{trade.buyer_nick}</Text>
                            <Text className="iconfont iconfont-fuzhi"></Text>
                            <Image
                                src={require("../../../assets/fonts/loudou.png")}
                                mode="scaleToFill"
                                style="width: 16px;height: 16px;"
                            ></Image>
                        </View>
                        {trade.status ===
                            TRANSACTION_TABS.WAIT_BUYER_PAY.key && (
                            <View>
                                <View className="card-item-row">
                                    <Text className="iconfont iconfont-wangwangcuifu"></Text>
                                    <Text className="texts">旺旺催付</Text>
                                </View>
                                <View className="card-item-row">
                                    <Text className="iconfont iconfont-duanxincuifu"></Text>
                                    <Text className="texts">短信催付</Text>
                                </View>
                            </View>
                        )}
                        <View className="card-item-row">
                            <Text className="iconfont iconfont-zuzhiTApaidan"></Text>
                            <Text className="texts">阻止此买家拍单</Text>
                        </View>
                        <View className="card-item-row">
                            <Text className="iconfont iconfont-heduidingdan"></Text>
                            <Text className="texts">核对订单</Text>
                        </View>
                        {trade.status ===
                            TRANSACTION_TABS.WAIT_SELLER_SEND_GOODS.key && (
                            <View className="card-item-row">
                                <Image
                                    src={require("../../../assets/fonts/zhifubao.png")}
                                    mode="scaleToFill"
                                    style="width: 16px;height: 16px; margin: 0 4px;"
                                ></Image>
                                <Text className="texts">返现给买家</Text>
                            </View>
                        )}
                    </View>

                    <View className="card-item3 grid-item4">
                        <View className="card-item-row">
                            <View className="payment-content">
                                <Text className="content1">
                                    <Text>实付：</Text>
                                    <Text className="content1-item">
                                        ￥{Number(trade.payment).toFixed(2)}
                                    </Text>
                                    {<Text>(含运费￥{trade.post_fee})</Text>}
                                </Text>
                            </View>
                        </View>
                        <View className="card-item-row">
                            <Text className="payment-titles">数量：</Text>
                            <Text className="num">{trade.num}</Text>
                        </View>
                        <View className="card-item-row">
                            <View className="card-btn1">手机订单</View>
                        </View>
                    </View>

                    <View className="card-item3 card-item5 grid-item4">
                        <View className="card-item-row">
                            <View className="payment-content">
                                {trade.status ===
                                    TRANSACTION_TABS.WAIT_SELLER_SEND_GOODS
                                        .key && (
                                    <View className="card-btn card-btn2">
                                        发货
                                    </View>
                                )}
                                <Text className="payment-detail">
                                    <Text className="iconfont iconfont-dingdanxiangqing"></Text>
                                    <Text>订单详情</Text>
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View className="card-item4 grid-item4">
                        {trade.status ===
                            TRANSACTION_TABS.WAIT_BUYER_PAY.key && (
                            <View className="card-item4-option">
                                <View className="option-item">
                                    <Image
                                        src={require("../../../assets/fonts/mianyou.png")}
                                        mode="scaleToFill"
                                        style="width: 16px;height: 16px; "
                                    ></Image>
                                    <Text className="text">一键免邮</Text>
                                </View>
                                <View className="option-item">
                                    <Image
                                        src={require("../../../assets/fonts/xiugai.png")}
                                        mode="scaleToFill"
                                        style="width: 16px;height: 16px;"
                                    ></Image>
                                    <Text className="text">修改价格</Text>
                                </View>
                                <View className="option-item">
                                    <Image
                                        src={require("../../../assets/fonts/guanbi.png")}
                                        mode="scaleToFill"
                                        style="width: 16px;height: 16px;"
                                    ></Image>
                                    <Text className="text">关闭订单</Text>
                                </View>
                            </View>
                        )}
                        {trade.status ===
                            TRANSACTION_TABS.WAIT_SELLER_SEND_GOODS.key && (
                            <View className="card-item4-option">
                                <View className="card-btn card-btn2">
                                    打快递单
                                </View>
                                <View className="card-btn card-btn2">
                                    打印面单
                                </View>
                                <View className="card-btn card-btn2">
                                    打发货单
                                </View>
                            </View>
                        )}
                    </View>
                </View>
                <View className="bd-add">
                    <Text className="add-title">收货地址：</Text>
                    <Text className="add-content">
                        <Text>
                            {getTradeAddress(trade, { needContact: true })}
                        </Text>
                        <Text className="iconfont iconfont-fuzhi" />
                        <Text className="add-check">核对地址</Text>
                        {
                            // 修改地址
                            activeTabKey == "WAIT_SELLER_SEND_GOODS" && (
                                <Text className="iconfont iconfont-bianji" />
                            )
                        }
                    </Text>
                </View>
            </View>
        );
    }
}
export default TransactionCard;
