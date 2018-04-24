export const getNotices = (req, res) => {
  res.json([
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到了 14 份新周报',
      datetime: '2018-04-14',
      type: '通知',
    },
    {
      id: '000000002',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: '售前支持人员 任飞 即将到期',
      datetime: '2018-04-14',
      type: '通知',
    },
    {
      id: '000000006',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      title: '任飞 给你发送的消息',
      description: '领导好，计划什么时间去九江POC支持？',
      datetime: '2018-04-07',
      type: '消息',
    },
    {
      id: '000000009',
      title: '中关村项目售前项目建立',
      description: '任务需要在 2018-04-27 18:00 前审批完成',
      extra: '已开始',
      status: 'todo',
      type: '待办',
    },
    {
      id: '000000010',
      title: '百信POC支持人员申请',
      description: '许源继提交于 2018-04-13，需在 2018-04-20 前完成审批',
      extra: '即将到期',
      status: 'urgent',
      type: '待办',
    },
    {
      id: '000000012',
      title: '九江POC人员支持',
      description: '许源继提交于 2018-04-09，预计 2018-04-30 结束',
      extra: '进行中',
      status: 'processing',
      type: '待办',
    },
  ]);
};
export default {
  getNotices,
};
