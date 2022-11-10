import { setToken } from './public/js/header-handler.js';

import { responseHandler } from './public/js/response-handler.js';

const Bearer = 'Bearer ';

async function get(endpoint, params = '', extra = false) {
  const apiUrl = `${endpoint}/${params}`;

  if (!extra) {
    await setToken.tokenCheck();
  }
  const res = await fetchModule('GET', apiUrl, bodyData);

  const result = await responseHandler(res);

  return result;
}

async function post(endpoint, extra, data) {
  console.log(extra);
  const apiUrl = endpoint;

  const bodyData = JSON.stringify(data);

  if (!extra) {
    await setToken.tokenCheck();
  }

  const res = await fetchModule('POST', apiUrl, bodyData);

  const result = await responseHandler(res);

  return result;
}

async function put(endpoint, params = '', data) {
  const apiUrl = `${endpoint}/${params}`;

  await setToken.tokenCheck();

  const bodyData = JSON.stringify(data);

  const res = await fetchModule('PUT', apiUrl, bodyData);

  const result = await responseHandler(res);

  return result;
}

async function del(endpoint, params = '', extra = false, data) {
  const apiUrl = `${endpoint}/${params}`;

  if (!extra) {
    await setToken.tokenCheck();
  }

  const bodyData = JSON.stringify(data);

  const res = await fetchModule('DELETE', apiUrl, bodyData);

  const result = await responseHandler(res);

  return result;
}

async function fetchModule(reqMethod, apiUrl, bodyData = null) {
  let fetchData = {
    method: reqMethod,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAccess(Bearer),
    },
  };

  if (bodyData != null) {
    fetchData.body = bodyData;
  }

  console.log(apiUrl);
  console.log(fetchData);

  return await fetch(apiUrl, fetchData);
}

const getAccess = (Bearer) => {
  if (sessionStorage.getItem('accessToken')) {
    const auth = Bearer + String(sessionStorage.getItem('accessToken'));

    return auth;
  }
};

export { get, post, put, del as delete };
