const STRING_FIELDS = ["firstname", "lastname"];
const LOCAL_STORAGE_ACCOUNT_KEY = "account";
const FORM_KEY = "form";

const form = document.querySelector("form");
const expenseElement = document.querySelector("#expense");
const incomeElement = document.querySelector("#income");
const totalElement = document.querySelector("#total");

const LS = localStorage;

let account = {
  firstname: "",
  lastname: "",
  income: [],
  expense: [],
  totalIncome() {
    return this.income.reduce((acc, value) => acc + value, 0);
  },
  totalExpense() {
    return this.expense.reduce((acc, value) => acc + value, 0);
  },
  accountInfo() {
    return JSON.stringify(account);
  },
  addIncome(value) {
    this.income.push(value);
  },
  addExpense(value) {
    this.expense.push(value);
  },
  accountBalance() {
    return this.totalIncome() - this.totalExpense();
  },
};

form.addEventListener("input", function (event) {
  const formValues = new FormData(form);
  LS.setItem(FORM_KEY, formToObject(formValues));

  if (!STRING_FIELDS.includes(event.target.name)) {
    return;
  }

  account[event.target.name] = event.target.value;
  LS.setItem(LOCAL_STORAGE_ACCOUNT_KEY, account.accountInfo());

  showTotal();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const data = new FormData(form);
  for (const [key, value] of data) {
    if (value === "") {
      continue;
    }
    if (key === "income") {
      account.addIncome(Number(value));
      incomeElement.value = "";
    }
    if (key === "expense") {
      account.addExpense(Number(value));
      expenseElement.value = "";
    }
  }
  LS.setItem(LOCAL_STORAGE_ACCOUNT_KEY, account.accountInfo());
  showTotal();
});

window.onload = function () {
  const savedAccount = JSON.parse(LS.getItem(LOCAL_STORAGE_ACCOUNT_KEY));
  if (savedAccount) {
    account = { ...account, ...savedAccount };
  }

  const formData = JSON.parse(LS.getItem(FORM_KEY));
  if (formData) {
    for (let key in formData) {
      form.elements[key].value = formData[key];
    }
  }

  showTotal();
};

function showTotal() {
  totalElement.innerHTML = `Имя: ${account.firstname} 
Фамилия: ${account.lastname}
    
Доходы: ${account.totalIncome()}
Расходы: ${account.totalExpense()}
Баланс: ${account.accountBalance()}
`;
}

function formToObject(form) {
  return JSON.stringify(Object.fromEntries(form));
}
