const userList = document.querySelector('#userList');

getUserList()

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
            <td width="80rem" >${user.role} <input type="checkbox" id="${user._id}" name="role" value="${user.role}"></td>
            </tr>
            `)

        //1. 체크박스에서 값을 가져온 걸 배열에 저장하고 저장할 때 해당 체크박스 값에 해당하는
        //id도 같이 변수에 저장(id는 유저 id->유저정보 수정에 필요)
        //권한 수정 함수 만들어서 실행할 때 배열 개수만큼 반복문/ 하나씩 id에 해당하는 주소로 put요청  
    })
}

//submit 후에 체크박스를 바꾼다.
//id랑 체크박스 value를 객체로 묶고 객체 담는 배열에 넣고 반환
function getRoleAndId() {
    const checked = document.querySelectorAll('input[name="role"]:checked');
    const checkedArr = [];
    checked.forEach((e) => {
        let obj = {};
        obj._id = e.id;
        obj.value = e.value;
        checkedArr.push(obj);
    });
    return checkedArr;
}

async function userRolePut(checkedArr){
    checkedArr.forEach((e)=>{
        await fetch(`/`)


    })


} 
