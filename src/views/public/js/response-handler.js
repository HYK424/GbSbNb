export const responseHandler = async (res) => {
  const data = await res.json();

  if (res.status === 200) {
    return data;
  }
  if (res.status === 400) {
    errorHandler(data);
  }
  if (!res.ok) {
    errorHandler(data);
  }
  //   if (statusCode === 1234) {
  //   }
};

const errorHandler = (errorContent) => {
  const errSplit = errorContent.includes('/')
    ? errorContent.split('/')
    : [errorContent];
  const errs = errSplit;
  for (let i in errs) {
    alert(errs[i]);
  }
};
