import moment from 'moment';

// mock data
const visitData = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

const visitData2 = [];
const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY2.length; i += 1) {
  visitData2.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY2[i],
  });
}

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
const searchData = [];
// for (let i = 0; i < 50; i += 1) {
searchData.push({
    index: 1,
    keyword: `任飞`,
    count: 9,
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
});
searchData.push({
    index: 2,
    keyword: `袁靖鹏`,
    count: 7,
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
});
searchData.push({
    index: 3,
    keyword: `崔明鹤`,
    count: 5,
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
});
searchData.push({
    index: 4,
    keyword: `加鑫`,
    count: 4,
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
});
searchData.push({
    index: 5,
    keyword: `黄楠`,
    count: 4,
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
});
// }
const salesTypeData = [
  {
    x: '东区事业部',
    y: 35,
  },
  {
    x: '北区事业部',
    y: 21,
  },
  {
    x: '南区事业部',
    y: 26,
  },
  {
    x: '西区事业部',
    y: 17,
  },
  {
    x: '开行事业部',
    y: 8,
  },
  {
    x: '华夏事业部',
    y: 5,
  },
];

const salesTypeDataOnline = [
    {
        x: '东区事业部',
        y: 8,
    },
    {
        x: '北区事业部',
        y: 3,
    },
    {
        x: '南区事业部',
        y: 6,
    },
    {
        x: '西区事业部',
        y: 3,
    },
    {
        x: '开行事业部',
        y: 1,
    },
    {
        x: '华夏事业部',
        y: 0,
    },
];

const salesTypeDataOffline = [
    {
        x: '东区事业部',
        y: 10,
    },
    {
        x: '北区事业部',
        y: 6,
    },
    {
        x: '南区事业部',
        y: 8,
    },
    {
        x: '西区事业部',
        y: 7,
    },
    {
        x: '开行事业部',
        y: 4,
    },
    {
        x: '华夏事业部',
        y: 1,
    },

];

const offlineData = [];
// for (let i = 0; i < 10; i += 1) {
//   offlineData.push({
//     name: `门店${i}`,
//     cvr: Math.ceil(Math.random() * 9) / 10,
//   });
// }

offlineData.push({
    name: `东区事业部`,
    cvr: Math.ceil(Math.random() * 9) / 10,
});
offlineData.push({
    name: `西区事业部`,
    cvr: Math.ceil(Math.random() * 9) / 10,
});
offlineData.push({
    name: `南区事业部`,
    cvr: Math.ceil(Math.random() * 9) / 10,
});
offlineData.push({
    name: `北区事业部`,
    cvr: Math.ceil(Math.random() * 9) / 10,
});
offlineData.push({
    name: `东北区事业部`,
    cvr: Math.ceil(Math.random() * 9) / 10,
});
offlineData.push({
    name: `开行事业部`,
    cvr: Math.ceil(Math.random() * 9) / 10,
});
offlineData.push({
    name: `华夏事业部`,
    cvr: Math.ceil(Math.random() * 9) / 10,
});


const offlineChartData = [];
// for (let i = 0; i < 20; i += 1) {
//   offlineChartData.push({
//     x: new Date().getTime() + 1000 * 60 * 30 * i,
//     y1: Math.floor(Math.random() * 100) + 10,
//     y2: Math.floor(Math.random() * 100) + 10,
//   });
// }

offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * 1,
    y1: 3589,
    y2: 378,
});
offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * 2,
    y1: 3468,
    y2: 457,
});

offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * 3,
    y1: 4568,
    y2: 789,
});
offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * 4,
    y1: 5680,
    y2: 980,
});

offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * 5,
    y1: 6807,
    y2: 1346,
});
offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * 6,
    y1: 7864,
    y2: 2457,
});

offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * 7,
    y1: 8643,
    y2: 2897,
});
offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * 8,
    y1: 9876,
    y2: 4568,
});

offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * 9,
    y1: 9754,
    y2: 6753,
});
offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * 10,
    y1: 7680,
    y2: 4231,
});
offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * 11,
    y1: 8765,
    y2: 5432,
});

const radarOriginData = [
  {
    name: 'POC总数',
    ref: 10,
    koubei: 8,
    output: 5,
    contribute: 4,
    hot: 2,
  },
  {
    name: '中标数',
    ref: 4,
    koubei: 2,
    output: 2,
    contribute: 1,
    hot: 0,
  },
  {
    name: '人员支持数',
    ref: 12,
    koubei: 9,
    output: 10,
    contribute: 5,
    hot: 6,
  },
];

//
const radarData = [];
const radarTitleMap = {
  ref: '东区事业部',
  koubei: '西区事业部',
  output: '南区事业部',
  contribute: '北区事业部',
  hot: '东北事业部',
};
radarOriginData.forEach(item => {
  Object.keys(item).forEach(key => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});

export const getFakeChartData = {
  visitData,
  visitData2,
  salesData,
  searchData,
  offlineData,
  offlineChartData,
  salesTypeData,
  salesTypeDataOnline,
  salesTypeDataOffline,
  radarData,
};

export default {
  getFakeChartData,
};
