import fs from 'fs';

const deleteFile = (fileapth) => {
  fs.unlink(fileapth, (err) => {
    if (err) {
      throw new Error('알 수 없는 오류가 발생했어요.');
    }
  });
};

export { deleteFile };
