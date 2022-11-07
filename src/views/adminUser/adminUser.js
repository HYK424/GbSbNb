import { put } from "../api";

const userList = document.querySelector('#userList');
const rolebtn=document.querySelector('#roleBtn');

getUserList()

//유저 리스트 만들기
async function getUserList() {
    const users = await (await fetch('/api/admin/allusers')).json();

    users.foreach((user) => {
        userList.insertAdjacentHTML('beforeend',
            `
            <tr>
            <th onclick="location.href='/api/admin/allusers/${user._id}'" width="200rem"scope="row">${user.email}</th>           
            <td onclick="location.href='/api/admin/allusers/${user._id}'" width="100rem">${user.fullName}</td>
            <td onclick="location.href='/api/admin/allusers/${user._id}'" width="150rem">${user.phoneNumber}</td>
            <td onclick="location.href='/api/admin/allusers/${user._id}'" width="350rem">${user.address.vlaues().join(' ')}</td>
            <td width="80rem" >${user.role} <input type="checkbox" name="role" value="$${user._id}"></td>
            </tr>
            `)
    })
}


//체크 된 유저들 value 배열에 저장 후 PUT으로 전송
userRolePut(getId);

function getId() {
    const checked = document.querySelectorAll('input[name="role"]:checked');
    const checkedArr = [];
    checked.forEach((e) => {
        checkedArr.push(e.value);
    });
    return checkedArr;
}

async function userRolePut(checkedArr) {

    await fetch(`/api/sdsds`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userIds: checkedArr,
        })
    })
}

