import { stringify } from 'qs';
import request from '../utils/request';


export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}



export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}


export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}


// 提交项目信息
export async function projectSubmitForm(params) {
  return request('/api/project', {
    method: 'POST',
    body: params,
  });
}

// 工作台-查看项目列表
export async function queryProjectNotice() {
  return request('/api/project/notice');
}


// 工作台-图标数据
export async function fakeChartData() {
  return request('/api/chart/fake_chart_data');
}


// 工作台-用户动态
export async function queryActivities() {
  return request('/api/activities');
}

// 工作台-获取当前用户、项目统计信息
export async function getWorkInfo() {
  return request('/api/getWorkInfo');
}


// 项目列表
export async function queryFakeList(params) {
  return request(`/api/project/list?${stringify(params)}`);
}

// 项目详情页
export async function queryAdvancedProfile(params) {
  // console.log('params: '+params.id);
  return request(`/api/project/info?id=${params.id}`);

}
