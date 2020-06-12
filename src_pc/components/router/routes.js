export const routes = [
    {
        name: '订单管理',
        path: '/tradeManagement',
        abstract: true,
        children: [
            {
                name: '退款管理',
                default: true,
                component: 'refundManagement',
                path: '/refundManagement',
                icon: 'iconfont-tuikuanguanli',

            },
            {
                name: '交易管理',
                default: false,
                component: 'transactionManagement',
                path: '/transactionManagement',
                icon: 'iconfont-fahuodan',
            },
            {
                name: '商品管理',
                default: false,
                component: 'goodsManagement',
                path: '/goodsManagement',
                icon: 'iconfont-dingdanguanli',
            }
        ],
    }
];
export const defaultPath = '/tradeManagement/refundManagement';
