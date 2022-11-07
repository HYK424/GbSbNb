// api 로 GET 요청 (/endpoint/params 형태로 요청함)

import { setToken } from './public/js/header-handler.js';

async function get(endpoint, params = '') {
  const apiUrl = `${endpoint}/${params}`;
  console.log(`%cGET 요청: ${apiUrl} `, 'color: #a25cd1;');

  await setToken.tokenCheck();

  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        'accessToken',
      )} ${sessionStorage.getItem('refreshToken')}`,
    },
  });

  console.log(res);

  // 응답 코드가 4XX 계열일 때 (400, 403 등)
  if (res.status === 419) {
    const getMessage = await res.json();

    alert(getMessage.message);
    console.log('419찾음');
    window.location.href = '/login';
  }

  if (!res.ok) {
    console.log(await res.json());
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const result = await res.json();

  return result;
}

// api 로 POST 요청 (/endpoint 로, JSON 데이터 형태로 요청함)
async function post(endpoint, data) {
  const apiUrl = endpoint;
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPOST 요청: ${apiUrl}`, 'color: #296aba;');
  console.log(`%cPOST 요청 데이터: ${bodyData}`, 'color: #296aba;');

  let auth = 'Bearer';
  if (sessionStorage.getItem('accessToken') != null) {
    auth += ` ${sessionStorage.getItem('accessToken')}`;
  }

  if (sessionStorage.getItem('refreshToken') != null) {
    auth += ` ${sessionStorage.getItem('refreshToken')}`;
  }

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth,
    },
    body: bodyData,
  });

  if (res.status === 202) {
    const result = await res.json();
    return result;
  }

  if (!res.ok) {
    // 응답 코드가 4XX 계열일 때 (400, 403 등)
    // fetch(endpoint).then(res => res.json())
    // .then(funcData => console.log(`이것이 바로 우리가 추출하고 싶어하는 value : ${funcData}`)

    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const result = await res.json();

  return result;
}

// api 로 PUT 요청 (/endpoint/params 로, JSON 데이터 형태로 요청함)
async function put(endpoint, params = '', data) {
  const apiUrl = `${endpoint}/${params}`;

  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPUT 요청: ${apiUrl}`, 'color: #059c4b;');
  console.log(`%cPUT 요청 데이터: ${bodyData}`, 'color: #059c4b;');

  const res = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: bodyData,
  });

  // 응답 코드가 4XX 계열일 때 (400, 403 등)
  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const result = await res.json();

  return result;
}

// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function del(endpoint, params = '', data = {}) {
  const tokenRes = tokenCheck();
  if (tokenCheck.refreshToken || tokenCheck.accessToken) {
    sessionStorage.setItem('accesstoken', tokenCheck.accessToken);
  }
  const apiUrl = `${endpoint}/${params}`;

  const res = await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
  });

  // 응답 코드가 4XX 계열일 때 (400, 403 등)
  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const result = await res.json();

  return result;
}

const tokenCheck = async () => {
  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        'accessToken',
      )} ${sessionStorage.getItem('refreshToken')}`,
    },
  });
};

// 아래처럼 export하면, import * as Api 로 할 시 Api.get, Api.post 등으로 쓸 수 있음.
export { get, post, put, del as delete };
