import {parse} from 'url';

const titles = [
  '上海银行',
  '中关村银行',
  '百信银行',
  '阜新银行',
  '石嘴山银行',
  '重庆银行',
  '中原银行',
  '厦门银行',
];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];

const avatars2 = [
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
  'https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png',
  'https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png',
  'https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png',
];

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const desc = [
  '上海银行核心系统售前项目',
  '中关村银行核心系统售前项目',
  '百信银行核心系统售前项目',
  '阜新银行核心系统售前项目',
  '石嘴山银行核心系统售前项目',
  '重庆银行核心系统售前项目',
];

const user = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
];

export function fakeList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - i % 4],
      // status: ['active', 'exception', 'normal'][i % 3],
      status: 'active',
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://ant.design',
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 36 * i),
      subDescription: desc[i % 5],
      description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content: '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
        },
      ],
    });
  }

  return list;
}

export function getFakeList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  const count = params.count * 1 || 20;

  const result = fakeList(count);

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export const getNotice = [
  {
    id: 'xxx1',
    projectName: titles[0],
    logo: avatars[0],
    projectDesc: desc[0],
    updateDate: new Date('2017-12-20'),
    departmentName: '东区事业部',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx2',
    projectName:  titles[1],
    logo: avatars[1],
    projectDesc: desc[1],
    updateDate: new Date('2016-11-13'),
    departmentName: '北区事业部祖',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx3',
    projectName: titles[2],
    logo: avatars[2],
    projectDesc: desc[2],
    updateDate: new Date('2016-12-14'),
    departmentName: '北区事业部',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx4',
    projectName: titles[3],
    logo: avatars[3],
    projectDesc: desc[3],
    updateDate: new Date('2017-12-23'),
    departmentName: '东北事业部',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx5',
    projectName: titles[4],
    logo: avatars[4],
    projectDesc: desc[4],
    updateDate: new Date('2016-01-04'),
    departmentName: '西区事业部',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx6',
    projectName: titles[5],
    logo: avatars[5],
    projectDesc: desc[5],
    updateDate: new Date('2016-10-16'),
    departmentName: '南区事业部',
    href: '',
    memberLink: '',
  },
];

export const getActivities = [
  {
    id: 'trend-1',
    user: {
      name: '曲丽丽',
      avatar: avatars2[0],
    },
    group: {
      name: '东区事业部',
      link: '',
    },
    project: {
      name: '上海银行售前项目',
      link: '',
      updateDate: new Date(),
    },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-2',
    user: {
      name: '付小小',
      avatar: avatars2[1],
    },
    group: {
      name: '东区事业部',
      link: '',
    },
    project: {
      name: '厦门银行售前项目',
      link: '',
      updateDate: new Date(),
    },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-3',
    user: {
      name: '林东东',
      avatar: avatars2[2],
    },
    group: {
      name: '中关村银行',
      link: '',
    },
    project: {
      name: '2',
      link: '',
      updateDate: new Date(),
    },
    template: '在 @{group} 申请核心支持人员 @{project} 人',
  },
  {
    id: 'trend-4',
    user: {
      name: '周星星',
      avatar: avatars2[4],
    },
    project: {
      name: '百信项目组',
      link: '',
      updateDate: new Date(),
    },
    members: {
      name: '3',
      link: '',
    },
    template: '从 @{project} 撤出  @{members} 人',
  },

];

export default {
  getNotice,
  getActivities,
  getFakeList,
};
