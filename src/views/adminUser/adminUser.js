// import { check } from 'express-validator';
import * as Api from '/api.js';

const userList = document.querySelector('#userList');

const rolebtn = document.querySelector('#roleBtn');

getUserList();
rolebtn.addEventListener('click', handleUserRole);
//유저 리스트 만들기
async function getUserList() {
  const users = (await Api.get('/api/admin/allusers')).users;

 const usersTemplate= users.map((user)=>{
return `
<tr>
<th width="200rem"scope="row">${user.email}</th>           
<td width="100rem">${user.fullName}</td>
<td width="150rem">${user.phoneNumber}</td>
<td width="350rem">${Object.values(user.address).join(' ')}</td>
<td width="80rem" > <label for="${user._id}">${user.role
} </label><input type="checkbox" name="role" value="${user.role}" id="${user._id
}"></td>
</tr>
`
  }).join('');

  userList.insertAdjacentHTML('beforeend',usersTemplate);

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
