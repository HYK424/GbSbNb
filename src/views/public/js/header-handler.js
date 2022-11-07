export const setToken = {
  tokenCheck: async () => {
    const accessHeaders = createHeaders(sessionStorage.getItem('accessToken'));

    const accessRes = await fetch('/api/token/access', {
      headers: accessHeaders,
    });

    console.log(accessRes);

    console.log(await accessRes.json());

    if (!accessRes) {
      const refreshHeaders = createHeaders(
        sessionStorage.getItem('refreshToken'),
      );
      const refreshRes = await fetch('/api/token/refresh', {
        headers: refreshHeaders,
      });
      console.log(refreshRes);
      if (!refreshHeaders) {
        alert('다시 로그인해 주시기 바랍니다.');
        //window.location.href = '/login';
      }
      sessionStorage.setItem('accessToken', refreshRes.accessToken);
      sessionStorage.setItem('refreshToken', refreshRes.refreshToken);
    }
    return;
  },
};

const createHeaders = (token) => {
  const sendToken = 'Bearer ' + String(token);
  console.log(sendToken);
  return {
    'Content-Type': 'application/json',
    Authorization: sendToken,
  };
};
