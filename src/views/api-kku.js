// api 로 GET 요청 (/endpoint/params 형태로 요청함)

async function get(endpoint, params = '') {
  const apiUrl = `${endpoint}/${params}`;

  let auth = 'Bearer';

  if (sessionStorage.getItem('accessToken')) {
    auth += `/${sessionStorage.getItem('accessToken')}`;
  }
  if (sessionStorage.getItem('refreshToken')) {
    auth += `/${sessionStorage.getItem('refreshToken')}`;
  }

  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem(
        'accessToken',
      )} ${sessionStorage.getItem('refreshToken')}`,
    },
  });

  // 액세스 토큰이 만료가 되었을 때,
  if (res.status === 419) {
    refreshToken();
    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(
          'accessToken',
        )} ${sessionStorage.getItem('refreshToken')}`,
      },
    });
    if (!res.ok) {
      console.log(await res.json());
      const errorContent = await res.json();
      const { reason } = errorContent;

      throw new Error(reason);
    }
    const data = res.json();
    return data;
  }
  // 엑세스 토큰이 만료되지 않았을 때
  if (!res.ok) {
    console.log(await res.json());
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }
  const data = res.json();
  return data;
}

async function post(endpoint, data) {
  const apiUrl = endpoint;
  const bodyData = JSON.stringify(data);
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem(
        'accessToken',
      )} ${sessionStorage.getItem('refreshToken')}`,
    },
    body: bodyData,
  });

  if (res.status === 419) {
    refreshToken();
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem(
          'accessToken',
        )} ${sessionStorage.getItem('refreshToken')}`,
      },
      body: bodyData,
    });

    if (!res.ok) {
      const errorContent = await res.json();
      const { reason } = errorContent;

      throw new Error(reason);
    }

    const result = res.json();
    return result;
  }
  const result = res.json();
  return result;
}

async function put(endpoint, params = '', data) {
  const apiUrl = `${endpoint}/${params}`;
  const bodyData = JSON.stringify(data);
  const res = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
    body: bodyData,
  });

  if (res.status === 419) {
    refreshToken();
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
      body: bodyData,
    });

    if (!res.ok) {
      const errorContent = await result.json();
      const { reason } = errorContent;

      throw new Error(reason);
    }
    const data = res.json();
    return data;
  }

  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const result = await res.json();

  return result;
}

async function del(endpoint, params = '') {
  const apiUrl = `${endpoint}/${params}`;

  const res = await fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
    },
    body: bodyData,
  });

  if (res.status === 419) {
    refreshToken();
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
      body: bodyData,
    });

    if (!res.ok) {
      const errorContent = await result.json();
      const { reason } = errorContent;

      throw new Error(reason);
    }
    const data = res.json();
    return data;
  }

  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const data = await res.json();
  return data;
}
// 토큰을 리프레쉬 해달라는 요청을 보낼 엔드 포인트가 필요함
const refreshToken = async () => {
  try {
    const data = await (
      await fetch('api/users/token', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('refreshToken')}`,
        },
      })
    ).json();
    const { accessToken, refreshToken } = data;

    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
  } catch (err) {
    sessionStorage.clear();
    alert(err.message);
    location.href = '/login';
  }
};

export { get, post, put, test, del as delete };
