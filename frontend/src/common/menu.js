import {isUrl} from '../utils/utils';

const menuData = [
    {
        name: '仪表盘',
        icon: 'dashboard',
        path: 'dashboard',
        children: [
            {
                name: '首页',
                path: 'analysis',
            },
            // {
            //     name: '监控页',
            //     path: 'monitor',
            // },
            {
                name: '工作台',
                path: 'workplace',
                // hideInBreadcrumb: true,
                // hideInMenu: true,
            },
        ],
    },
    {
        name: '项目信息',
        icon: 'form',
        path: 'form',
        children: [
            {
                name: '项目申请',
                path: 'basic-form',
            },

            // {
            //     name: '人员申请',
            //     authority: 'admin',
            //     path: 'advanced-form',
            // },
        ],
    },
    {
        name: '项目查询',
        icon: 'table',
        path: 'list',
        children: [

            {
                name: '项目列表',
                path: 'basic-list',
            },

        ],
    },
    {
        name: '项目查看',
        icon: 'profile',
        path: 'profile',
        children: [

            {
                name: '高级详情页',
                path: 'advanced',
                authority: 'admin',
            },
        ],
    },
    /*
    {
        name: '结果页',
        icon: 'check-circle-o',
        path: 'result',
        children: [
            {
                name: '成功',
                path: 'success',
            },
            {
                name: '失败',
                path: 'fail',
            },
        ],
    },
     {
     name: '异常页',
     icon: 'warning',
     path: 'exception',
     children: [
     {
     name: '403',
     path: '403',
     },
     {
     name: '404',
     path: '404',
     },
     {
     name: '500',
     path: '500',
     },
     {
     name: '触发异常',
     path: 'trigger',
     hideInMenu: true,
     },
     ],
     },
     */
    {
        name: '账户',
        icon: 'user',
        path: 'user',
        authority: 'guest',
        children: [
            {
                name: '登录',
                path: 'login',
            },
            {
                name: '注册',
                path: 'register',
            },
            {
                name: '注册结果',
                path: 'register-result',
            },
        ],
    },
];

function formatter(data, parentPath = '/', parentAuthority) {
    return data.map(item => {
        let {path} = item;
        if (!isUrl(path)) {
            path = parentPath + item.path;
        }
        const result = {
            ...item,
            path,
            authority: item.authority || parentAuthority,
        };
        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
        }
        return result;
    });
}

export const getMenuData = () => formatter(menuData);
