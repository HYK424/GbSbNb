// import { check } from 'express-validator';
import * as Api from '/api.js';

const userList = document.querySelector('#userList');

const rolebtn = document.querySelector('#roleBtn');

getUserList();
rolebtn.addEventListener('click', handleUserRole);
//유저 리스트 만들기
async function getUserList() {
  const users = (await Api.get('/api/admin/allusers')).users;

  users.forEach((user) => {
    userList.insertAdjacentHTML(
      'beforeend',
      `
            <tr>
            <th onclick="location.href='/admin/allusers/${
              user._id
            }'" width="200rem"scope="row">${user.email}</th>           
            <td onclick="location.href='/admin/allusers/${
              user._id
            }'" width="100rem">${user.fullName}</td>
            <td onclick="location.href='/admin/allusers/${
              user._id
            }'" width="150rem">${user.phoneNumber}</td>
            <td onclick="location.href='/admin/allusers/${
              user._id
            }'" width="350rem">${Object.values(user.address).join(' ')}</td>
            <td width="80rem" >${
              user.role
            } <input type="checkbox" name="role" value="${user.role}" id="${
        user._id
      }"></td>
            </tr>
            `,
    );
  });
}

function getId() {
  const checked = document.querySelectorAll('input[name="role"]:checked');
  const checkedArr = [];

  checked.forEach((e) => {
    const { id, value } = e;
    console.log(id);
    console.log(value);
    const data = {};
    data[id] = value;
    // data.id = e.id;
    // data.role = e.value;
    checkedArr.push(data);
  });
  return { checkedArr: checkedArr };
}

async function handleUserRole() {
  const result = await Api.put('/api/admin/allusers', '', getId());
  console.log(result);
  if (!result) {
    alert('유저 정보 갱신 실패');
  } else {
    alert('유저 정보 갱신 성공');
    location.reload();
  }
}
