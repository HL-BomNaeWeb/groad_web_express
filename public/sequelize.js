document.querySelectorAll('#user-list tr').forEach((el) => {
  el.addEventListener('click', function () {
    const id = el.querySelector('td').textContent;
    getComment(id);
  });
});
async function getUser() {
  try {
    const res = await axios.get('/users');
    const users = res.data;
    console.log(users);
    const tbody = document.querySelector('#user-list tbody');
    tbody.innerHTML = '';
    users.map(function (user) {
      const row = document.createElement('tr');
      row.addEventListener('click', () => {
        getComment(user.id);
      });
      // 로우 셀 추가
      let td = document.createElement('td');
      td.textContent = user.id;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = user.first_name;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = user.last_name;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = user.email;
      row.appendChild(td);
      td = document.createElement('td');
      td.textContent = user.password;
      row.appendChild(td);
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
  }
}
document.getElementById('user-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const first_name = e.target.first_name.value;
  const last_name = e.target.last_name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  if (!first_name) {
    return alert('성을 입력하세요');
  }
  if (!last_name) {
    return alert('이름을 입력하세요');
  }
  if (!email) {
    return alert('메일을 입력하세요');
  }
  if (!password) {
    return alert('비밀번호를 입력하세요');
  }
  try {
    await axios.post('/users', { first_name, last_name, email, password });
    getUser();
  } catch (err) {
    console.error(err);
  }
  e.target.first_name.value = '';
  e.target.last_name.value = '';
  e.target.email.value = '';
  e.target.password.value = '';
});