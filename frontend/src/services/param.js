import request from '../utils/request';

export async function getParamDtl() {
    return request('/api/param/getParam');
}
