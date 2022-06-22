const ApiUrl = "http://localhost:3000/dataInfor";
const getUserName = document.getElementById("userName");
const getFullName = document.getElementById("fullName");
const getEmail = document.getElementById("email");
const getDate = document.getElementById("date");
const getRepair = document.getElementById("repair-data");
const cancelBtn = document.getElementById("cancel");
const resetBtn = document.getElementById("reset");
const setBtnRepair = document.getElementById("repair-data");
const setBtnSave = document.getElementById("confirm-data");
const setBtnReset = document.getElementById("reset");
const setBtnCancel = document.getElementById("cancel");
const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
let getIdRepair = 0;

function App() {
  getData(renderData);
  handlePostData();
  handlepPRepairData();
}
App();

function postData(data, callBack) {
  if (
    !getUserName.value &&
    !getFullName.value &&
    !getEmail.value &&
    !getDate.value
  ) {
    valiateForm();
  } else {
    fetch(ApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then(callBack)
      .catch((error) => {
        console.log(error);
      });
  }
}

function getData(callBack) {
  fetch(ApiUrl, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      return response.json();
    })
    .then(callBack)
    .catch((error) => {
      console.log(error);
    });
}

function renderData(dataResult) {
  const exportData = dataResult.map((dataResult) => {
    return `
        <ul>
            <li>${dataResult.userName}</li>
            <li>${dataResult.fullName}</li>
            <li>${dataResult.email}</li>
            <li>${dataResult.date}</li>
        </ul>

        <div class="btn-container">
             <button class="btn-delete" id='delete-data' type='submit' onClick="handleDeleteData(${dataResult.id})">Xoá</button>
             <button class="btn-repair" id='delete-data' type='submit' onClick="handleRepairData(${dataResult.id})">Sửa</button>
        </div>
    `;
  });
  const renderArea = document.getElementById("table-data");
  renderArea.innerHTML += exportData.join("");
}

function handleDeleteData(id) {
  fetch(ApiUrl + "/" + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      return response.json();
    })
    .then(() => {});
}

function handleRepairData(id) {
  fetch(ApiUrl + "/" + id, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      getUserName.value = data.userName;
      getFullName.value = data.fullName;
      getEmail.value = data.email;
      getDate.value = data.date;
      getIdRepair = data.id;
      setBtnRepair.style.display = "block";
      setBtnSave.style.display = "none";
      setBtnReset.style.display = "none";
      setBtnCancel.style.display = "block";
    });
}

function RepairData(data, callBack) {
  fetch(ApiUrl + "/" + getIdRepair, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then(callBack)
    .catch((error) => {
      console.log(error);
    });
}

function handlepPRepairData() {
  getRepair.addEventListener("click", (e) => {
    e.preventDefault();
    const dataRepaired = {
      userName: getUserName.value,
      fullName: getFullName.value,
      email: getEmail.value,
      date: getDate.value,
    };
    RepairData(dataRepaired);
  });
}

function handlePostData() {
  const confirmData = document.getElementById("confirm-data");
  confirmData.addEventListener("click", (e) => {
    e.preventDefault();
    const userName = document.getElementById("userName").value;
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const date = document.getElementById("date").value;

    const marginData = {
      userName: userName,
      fullName: fullName,
      email: email,
      date: date,
    };
    postData(marginData, () => {
      getData(renderData);
    });
  });
}

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  (getUserName.value = ""),
    (getFullName.value = ""),
    (getEmail.value = ""),
    (getDate.value = "");
});

getUserName.addEventListener("blur", () => {
  if (!getUserName.value) {
    const showMesesage = document.getElementById("0101");
    showMesesage.style.display = "block";
  } else {
    const showMesesage = document.getElementById("0101");
    showMesesage.style.display = "none";
  }
});

getFullName.addEventListener("blur", () => {
  if (!getFullName.value) {
    const showMesesage = document.getElementById("0202");
    showMesesage.style.display = "block";
  } else {
    const showMesesage = document.getElementById("0202");
    showMesesage.style.display = "none";
  }
});

getEmail.addEventListener("blur", () => {
  if (!getEmail.value) {
    const showMesesage = document.getElementById("0303");
    showMesesage.style.display = "block";
  } else {
    const showMesesage = document.getElementById("0303");
    showMesesage.style.display = "none";
  }
});

getDate.addEventListener("blur", () => {
  if (!getDate.value) {
    const showMesesage = document.getElementById("0404");
    showMesesage.style.display = "block";
  } else {
    const showMesesage = document.getElementById("0404");
    showMesesage.style.display = "none";
  }
});

function valiateForm() {
  if (!getUserName.value) {
    const showMesesage = document.getElementById("0101");
    showMesesage.style.display = "block";
  } else {
    const showMesesage = document.getElementById("0101");
    showMesesage.style.display = "none";
  }

  if (!getFullName.value) {
    const showMesesage = document.getElementById("0202");
    showMesesage.style.display = "block";
  } else {
    const showMesesage = document.getElementById("0202");
    showMesesage.style.display = "none";
  }

  if (!getEmail.value) {
    const showMesesage = document.getElementById("0303");
    showMesesage.style.display = "block";
  } else {
    const showMesesage = document.getElementById("0303");
    showMesesage.style.display = "none";
  }

  if (!getDate.value) {
    const showMesesage = document.getElementById("0404");
    showMesesage.style.display = "block";
  } else {
    const showMesesage = document.getElementById("0404");
    showMesesage.style.display = "none";
  }
}

setBtnReset.addEventListener("click", () => {
  location.reload();
});

setBtnCancel.addEventListener("click", () => {
  setBtnRepair.style.display = "none";
  setBtnSave.style.display = "block";
  setBtnCancel.style.display = "none";
  setBtnReset.style.display = "block";
});
