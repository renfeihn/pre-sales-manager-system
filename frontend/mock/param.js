/**
 * Created by renfei on 2018/4/30.
 */


// 事业部
const department = [
  {
    id: '1',
    name: '东区事业部',
  },
  {
    id: '2',
    name: '西区事业部',
  },
];


// 产品
const product = [
  {
    id: '1',
    name: '核心产品线',
  },
  {
    id: '2',
    name: '互金产品线',
  },
  {
    id: '3',
    name: '支付产品线',
  },
];

// 项目
const project = [
  {
    id: '1',
    name: '中关村售前项目',
  },
  {
    id: '2',
    name: '百信售前项目',
  },
];


const importance = [
  {
    key: '1',
    name: '跟进',
  },
  {
    key: '2',
    name: '关注',
  },
  {
    key: '3',
    name: '了解',
  },
  {
    key: '4',
    name: '重要',
  },
];

const isPoc = [
  {
    key: 'Y',
    name: '是',
  },
  {
    key: 'N',
    name: '否',
  },
];

// 项目落单情况
const state = [
  {
    key: '1',
    name: '跟进',
  },
  {
    key: '2',
    name: '成功',
  },
  {
    key: '3',
    name: '失败',
  },
  {
    key: '4',
    name: '放弃',
  },
  {
    key: '5',
    name: '停止',
  },
  {
    key: '6',
    name: '暂停',
  },
];

// 解决方案
const solution = [
  {
    key: '1',
    name: '大数据',
  },
  {
    key: '2',
    name: '大数据平台',
  },
  {
    key: '3',
    name: '定制方案',
  },
  {
    key: '4',
    name: '定制开发',
  },
  {
    key: '5',
    name: '监管报送',
  },
  {
    key: '6',
    name: '数据平台',
  },
  {
    key: '7',
    name: '数据应用',
  },
  {
    key: '8',
    name: '数据治理',
  },
  {
    key: '9',
    name: '作业调度',
  },
];


export const getParam = {
  department,
  product,
  project,
  isPoc,
  state,
  solution,
  importance,
};

export default {
  getParam,
};
