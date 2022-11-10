import fs from 'fs';
import path from 'path';

const dataPath = path.dirname(__filename) + '/formdata';

export const testMail = {
  doTest: async (name, pass) => {
    const fileData = fs.readFile(
      `${dataPath}/testHTML`,
      'utf-8',
      (err, description) => {
        if (err) {
          console.log(err);
        }
        console.log(description);
        return description;
      },
    );

    return fileData;
  },
};

// const getBody = document.getElementById('exportBody');
// const getNamePlace = document.getElementById('namePlace');
// const getPasswordPlace = document.getElementById('passwordPlace');

// export function mailData() {
//   getNamePlace.innerHTML = '시험이름';
//   getNamePlace.style.fontWeight = 'bold';
//   getNamePlace.style.color = '#00ff00';
//   getNamePlace.style.fontSize = '20px';

//   getPasswordPlace.innerHTML = '시험비번';
//   getPasswordPlace.style.fontWeight = 'bolder';
//   getPasswordPlace.style.color = '#ff0000';
//   getPasswordPlace.style.fontSize = '15px';

//   const returnBody = getBody.innerHTML;

//   return returnBody;
// }
