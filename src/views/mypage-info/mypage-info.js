import * as Api from '/api.js';

const fullNameInput = document.querySelector('#fullNameInput');
const emailInput = document.querySelector('#emailInput');
const telInput = document.querySelector('#phoneNumberInput');
const addressZipInput = document.querySelector('#addressZipInput');
const addressBasicInput = document.querySelector('#addressBasicInput');
const addressOptionInput = document.querySelector('#addressOptionInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const submitButton = document.querySelector('#submitButton');
const editButton = document.querySelector('#editButton');
const deleteButton = document.querySelector('#deleteButton');
const searchAddress = document.querySelector('#searchAddressButton');
const editButtonPwd = document.querySelector('#editButtonPwd');
const submitButtonPwd = document.querySelector('#submitButtonPwd');

let oldEmail = '';

main();

function main() {
  addAllEvents();
  insertUserInfo();
}
// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  editButton.addEventListener('click', handleEdit);
  submitButton.addEventListener('click', handleSubmit);
  deleteButton.addEventListener('click', handleDelete);
  editButtonPwd.addEventListener('click', handleEditPwd);
  submitButtonPwd.addEventListener('click', handleSubmitPwd);
  searchAddress.addEventListener('click', handleSearchAddressClick);
}

async function insertUserInfo() {
  const result = await Api.get('/api/users/myinfo');
  fullNameInput.value = result.userInfo.fullName;
  telInput.value = result.userInfo.phoneNumber;
  emailInput.value = result.userInfo.email;
  addressZipInput.value = result.userInfo.address.postalCode;
  addressBasicInput.value = result.userInfo.address.address1;
  addressOptionInput.value = result.userInfo.address.address2;

  oldEmail = result.userInfo.email;
}
async function handleEdit(e) {
  e.preventDefault();

  //모달 창 만들기
  const modal = `
<div class="moral-post">
<form class="box moral-card">
<h2>비밀번호 확인</h2>
<p>개인 정보 보호를 위해 비밀번호를 다시 한 번 확인합니다.</p>
<input class="input form-control mb-3" id="passwordCheckInputEdit" type="password" placeholder="********" autocomplete="off" />
<button class="btn btn-danger" id="passwordCheckButtonEdit"> 확인 </button>
<button class="btn btn-info" id="passwordCancelButtonEdit"> 취소 </button>
</form>
</div>
`;
  const modalEl = document.createElement('div');
  modalEl.setAttribute('class', 'modal-layout');
  modalEl.innerHTML = modal;
  document.querySelector('body').prepend(modalEl);

  // 확인 버튼 누를 시
  document
    .querySelector('#passwordCheckButtonEdit')
    .addEventListener('click', async function (e) {
      e.preventDefault();

      const userPassword = document.querySelector(
        '#passwordCheckInputEdit',
      ).value;

      const data = { email: oldEmail, password: userPassword };

      const result = await Api.post('/api/users/login', true, data);

      if (result.err) {
        alert('비밀번호가 다릅니다.');
        return;
      } else {
        // 비밀번호 창 보이게 하기
        document.querySelectorAll('.hidden-until-info-edit').forEach((item) => {
          item.style.display = 'block';
        });

        document.querySelectorAll('.hidden-when-info-edit').forEach((item) => {
          item.style.display = 'none';
        });

        document.querySelectorAll('.able-when-edit').forEach((item) => {
          item.disabled = false;
        });

        document.querySelector('body').removeChild(modalEl);
      }
    });

  // 취소 버튼 누를 시
  document
    .querySelector('#passwordCancelButtonEdit')
    .addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector('body').removeChild(modalEl);
      alert('수정 취소');
    });
}

async function handleSubmit(e) {
  e.preventDefault();
  // 입력 완료시
  const fullName = fullNameInput.value;
  const email = emailInput.value;
  const phoneNumber = telInput.value;
  const postalCode = addressZipInput.value;
  const address1 = addressBasicInput.value;
  const address2 = addressOptionInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;

  const data = {
    fullName,
    email,
    password,
    passwordConfirm,
    phoneNumber,
    address: {
      postalCode,
      address1,
      address2,
    },
  };
  try {
    const result = await Api.put('/api/users/myinfo', '', data);

    if (result.err) {
      return;
    }

    alert(`정상적으로 수정되었습니다.`);

    // 새로고침
    window.location.reload();
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

async function handleEditPwd(e) {
  e.preventDefault();

  //모달 창 만들기
  const modal = `
<div class="moral-post">
<form class="box moral-card">
<h2>비밀번호 확인</h2>
<p>개인 정보 보호를 위해 비밀번호를 다시 한 번 확인합니다.</p>
<input class="input form-control mb-3" id="passwordCheckInputEdit" type="password" placeholder="********" autocomplete="off" />
<button class="btn btn-danger" id="passwordCheckButtonEdit"> 확인 </button>
<button class="btn btn-info" id="passwordCancelButtonEdit"> 취소 </button>
</form>
</div>
`;
  const modalEl = document.createElement('div');
  modalEl.setAttribute('class', 'modal-layout');
  modalEl.innerHTML = modal;
  document.querySelector('body').prepend(modalEl);

  // 확인 버튼 누를 시
  document
    .querySelector('#passwordCheckButtonEdit')
    .addEventListener('click', async function (e) {
      e.preventDefault();

      const userPassword = document.querySelector(
        '#passwordCheckInputEdit',
      ).value;

      const data = { email: oldEmail, password: userPassword };

      const result = await Api.post('/api/users/login', true, data);

      if (result.err) {
        alert('비밀번호가 다릅니다.');
        return;
      } else {
        // 비밀번호 창 보이게 하기
        document.querySelectorAll('.hidden-until-pwd-edit').forEach((item) => {
          item.style.display = 'block';
        });

        document.querySelectorAll('.hidden-when-pwd-edit').forEach((item) => {
          item.style.display = 'none';
        });

        document.querySelectorAll('.able-when-edit').forEach((item) => {
          item.disabled = false;
        });

        document.querySelector('body').removeChild(modalEl);
      }
    });

  // 취소 버튼 누를 시
  document
    .querySelector('#passwordCancelButtonEdit')
    .addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector('body').removeChild(modalEl);
      alert('수정 취소');
    });
}

async function handleSubmitPwd(e) {
  e.preventDefault();
  // 입력 완료시
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;

  if (password !== passwordConfirm) {
    alert('비밀번호가 일치하지 않습니다');
    return;
  }

  const data = {
    password: password,
    changedPassword: passwordConfirm,
  };

  try {
    const result = await Api.put('/api/users/myinfo/password', false, data);

    if (result.err) {
      return;
    }

    alert(`정상적으로 수정되었습니다.`);

    // 새로고침
    window.location.reload();
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

async function handleDelete(e) {
  //모달 창 만들기
  const modal = `
<div class="moral-post">
<form class="box moral-card">
<h2>비밀번호 확인</h2>
<p>비밀번호를 입력하신 후 확인 버튼을 누르시면 계정 삭제가 완료됩니다.<br> 한 번 삭제하신 계정은 다시 되돌릴 수 없습니다.</p>
<input class="input form-control mb-3" id="passwordCheckInput" type="password" placeholder="********" autocomplete="off" />
<button class="btn btn-danger" id="passwordCheckButton"> 확인 </button>
<button class="btn btn-info" id="passwordCancelButton"> 취소 </button>
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
    .addEventListener('click', async function (e) {
      e.preventDefault();

      const userPassword = document.querySelector('#passwordCheckInput').value;
      const data = { email: oldEmail, password: userPassword };
      const result = await Api.post('/api/users/login', true, data);

      if (result.err) {
        alert('비밀번호가 다릅니다.');
        return;
      } else {
        // 계정 삭제하기
        alert('계정이 삭제되었습니다.');
        const result = await Api.put('/api/users/myinfo/delete', '', {
          password: userPassword,
        });

        if (result.err) {
          alert(result.err);
          return;
        }
        sessionStorage.clear();
        alert(result.message);
        window.location.href = '/';
      }
    });

  // 취소 버튼 누를 시
  document
    .querySelector('#passwordCancelButton')
    .addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector('body').removeChild(modalEl);
      alert('계정 삭제 취소');
    });
}

function handleSearchAddressClick(e) {
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = '';
      let extraAddr = '';

      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
      } else {
      }

      addressZipInput.value = data.zonecode;
      addressBasicInput.value = `${addr} ${extraAddr}`;
      addressOptionInput.placeholder = '상세 주소를 입력해 주세요.';
      addressOptionInput.focus();
    },
  }).open();
}
