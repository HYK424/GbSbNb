export const responseHandler = async (res) => {
  const data = await res.json();

  if (!res.ok) {
    errorHandler(data);
    data.err = true;
    return data;
  }

  return data;

  // if (!res.ok) {
  //   console.log('false임');
  // }

  // if (res.status <= 299) {
  //   console.log('여기찍힘0');
  //   return data;
  // } else if (res.status >= 400 && res.status <= 499) {
  //   console.log('여기찍힘1');
  //   errorHandler(data);
  // } else {
  //   console.log('여기찍힘3');
  //   errorHandler(data);
  // }
};

const errorHandler = (errorContent) => {
  const errSplit = errorContent.message.includes('/')
    ? errorContent.message.split('/')
    : [errorContent.message];

  const errs = errSplit;
  for (let i in errs) {
    alert(errs[i]);
  }
};
