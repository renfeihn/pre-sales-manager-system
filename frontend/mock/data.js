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


// 产品线
const productLine = [
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




export const getDepartment = {
  department,
  productLine,
  project,
};

export default {
  getDepartment,
};
