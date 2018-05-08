// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return sessionStorage.getItem('antd-pro-authority');
}

export function setAuthority(authority) {
  return sessionStorage.setItem('antd-pro-authority', authority);
}

// 记录后台返回的token
export function getAuthorizations() {
  return sessionStorage.getItem('backed-authorizations');
}

export function setAuthorizations(authorizations) {

  // console.log('setAuthorizations: ' + authorizations)

  return sessionStorage.setItem('backed-authorizations', authorizations);
}



