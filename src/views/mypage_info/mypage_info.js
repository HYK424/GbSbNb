import * as Api from "/api.js";
import { validateEmail } from "/useful-functions.js";

// 요소(element), input 혹은 상수
const fullNameInput = document.querySelector("#fullNameInput");
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const passwordConfirmInput = document.querySelector("#passwordConfirmInput");
const submitButton = document.querySelector("#submitButton");
const editButton = document.querySelector("#editButton");
const deleteButton = document.querySelector("#deleteButton");

main();

function main() {
    // addAllElements();
    addAllEvents();
    // checkLoginState();
    insertUserInfo();
}


// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
    editButton.addEventListener("click", handleEdit);
    submitButton.addEventListener("click", handleSubmit);
    deleteButton.addEventListener("click", handleDelete);
}

//로그인 상태가 아닐 때 로그인 창으로 보냄
function checkLoginState() {
    if (!sessionStorage.getItem("token")) {
        alert("로그인 상태가 아닙니다");
        location.href = '/login';
    }
}

//최초 실행시 유저의 정보를 불러옴
function insertUserInfo() {
    const userToken = sessionStorage.getItem("token");
    // 토큰을 이용하여 BE에서 유저 정보를 가져옴
    const userDataFake = {
        fullName: "ㅇㅇㅇ",
        email: "elice@elice.com",
    };

    fullNameInput.value = userDataFake.fullName;
    emailInput.value = userDataFake.email;
}

// 정보 수정 진행 시작
async function handleEdit(e) {
    e.preventDefault();

    //모달 창 만들기
    const modal = `
  <div class="moral-post">
  <form class="box moral-card">
  <h2>비밀번호 확인</h2>
  <p>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인 합니다.</p>
  <input class="input" id="passwordCheckInput" type="password" placeholder="********" autocomplete="off" />
  <button class="button is-primary" id="passwordCheckButton"> 확인 </button>
  <button class="button is-primary" id="passwordCancelButton"> 취소 </button>
  </form>
</div>
  `;
    const modalEl = document.createElement('div');
    modalEl.setAttribute('class', 'modal-layout');
    modalEl.innerHTML = modal;
    document.querySelector('body').prepend(modalEl);

    // 확인 버튼 누를 시
    document
        .querySelector('#passwordCheckButton')
        .addEventListener('click', function(e) {
            e.preventDefault();
            const userToken = sessionStorage.getItem("token");
            // 토큰을 이용하여 BE에서 비밀번호 같은지 확인함
            const userPasswordFake = "1234";
            if (document.querySelector('#passwordCheckInput').value == userPasswordFake) {
                alert('비밀번호 확인');
                document.querySelector('body').removeChild(modalEl);

                // 비밀번호 창 보이게 하기
                document.querySelectorAll(".hidden-untill-edit").forEach((item) => {
                    item.style.display = 'inline-block';
                })
                editButton.style.display = 'none';

            } else {
                alert('비밀번호가 같지 않습니다');
            }
        })

    // 취소 버튼 누를 시
    document
        .querySelector('#passwordCancelButton')
        .addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('body').removeChild(modalEl);
            alert('비밀번호 입력 취소');
        });
}

async function handleSubmit(e) {
    e.preventDefault();

    // 입력 완료시
    const fullName = fullNameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;

    // 잘 입력했는지 확인
    const isFullNameValid = fullName.length >= 2;
    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 4;
    const isPasswordSame = password === passwordConfirm;

    if (!isFullNameValid || !isPasswordValid) {
        return alert("이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.");
    }

    if (!isEmailValid) {
        return alert("이메일 형식이 맞지 않습니다.");
    }

    if (!isPasswordSame) {
        return alert("비밀번호가 일치하지 않습니다.");
    }

    // 회원 정보 수정 api 요청
    try {
        const data = { fullName, email, password };

        await Api.post("/api/users", data);

        alert(`정상적으로 수정되었습니다.`);

        // 새로고침
        window.location.reload();

    } catch (err) {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
}

function handleDelete(e) {
    //모달 창 만들기
    const modal = `
<div class="moral-post">
<form class="box moral-card">
<h2>비밀번호 확인</h2>
<p>비밀번호를 입력하신 후 확인 버튼을 누르시면 계정 삭제가 완료됩니다. 한 번 삭제하신 계정은 다시 되돌릴 수 없습니다.</p>
<input class="input" id="passwordCheckInput" type="password" placeholder="********" autocomplete="off" />
<button class="button is-primary" id="passwordCheckButton"> 확인 </button>
<button class="button is-primary" id="passwordCancelButton"> 취소 </button>
</form>
</div>
`;
    const modalEl = document.createElement('div');
    modalEl.setAttribute('class', 'modal-layout');
    modalEl.innerHTML = modal;
    document.querySelector('body').prepend(modalEl);

    // 확인 버튼 누를 시
    document
        .querySelector('#passwordCheckButton')
        .addEventListener('click', function(e) {
            e.preventDefault();
            const userToken = sessionStorage.getItem("token");
            // 토큰을 이용하여 BE에서 비밀번호 같은지 확인함
            const userPasswordFake = "1234";
            if (document.querySelector('#passwordCheckInput').value == userPasswordFake) {
                alert('계정 삭제가 완료되었습니다. 이용해 주셔서 감사합니다.');

                //BE에서 계정 삭제 

                //홈으로 이동
                location.href = '/';

            } else {
                alert('비밀번호가 같지 않습니다');
            }
        })

    // 취소 버튼 누를 시
    document
        .querySelector('#passwordCancelButton')
        .addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('body').removeChild(modalEl);
            alert('계정 삭제 취소');
        });
}