export const responseHandler = async (res) => {
  const data = await res.json();

  if (res.status >= 201 || res.status <= 299) {
    return data;
  } else if (res.status >= 400 || res.status <= 499) {
    errorHandler(data);
  } else {
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
