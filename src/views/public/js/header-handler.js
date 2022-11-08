export const setToken = {
  tokenCheck: async () => {
    // console.log('//////////////header-handler//////////////');
    const accessHeaders = createHeaders(sessionStorage.getItem('accessToken'));

    const oldaccess = sessionStorage.getItem('accessToken');
    const accessRes = await fetch('/api/access', {
      headers: accessHeaders,
    });

    const { result } = await accessRes.json();

    //console.log(`result: ${result}`);

    if (!result) {
      console.log('리프레시 받아야함');
      const refreshHeaders = createHeaders(
        sessionStorage.getItem('refreshToken'),
      );
      const refreshRes = await fetch('/api/refresh', {
        headers: refreshHeaders,
      });

      //console.log(refreshRes);

      const result = await refreshRes.json();

      // console.log(!refreshRes.ok);

      if (!refreshRes.ok) {
        sessionStorage.setItem('accessToken', '');
        sessionStorage.setItem('refreshToken', '');
        alert('다시 로그인해 주시기 바랍니다.');
        window.location.href = '/login';
      }

      // console.log('result');
      // console.log(result);
      // console.log('만료된거 //');
      // console.log(oldaccess);
      // console.log('새로받은거 //');
      // console.log(result.accessToken);
      // console.log('리프레시 //');
      // console.log(result.refreshToken);

      sessionStorage.setItem('accessToken', result.accessToken);
      sessionStorage.setItem('refreshToken', result.refreshToken);
    }
    //console.log('//////////////header-handler//////////////');
    return;
  },
};

const createHeaders = (token) => {
  // console.log('createHeaders');
  // console.log(token);
  const sendToken = 'Bearer ' + String(token);
  return {
    'Content-Type': 'application/json',
    Authorization: sendToken,
  };
};
