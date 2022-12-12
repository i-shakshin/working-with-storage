let formData = {};

const form = document.querySelector("form");
const LS = localStorage;

// form.addEventListener("submit", function () {
//   formData.income.push(1);
// });

// form.addEventListener("input", function (event) {
//   formData[event.target.name] = event.target.value;
//   LS.setItem("formData", JSON.stringify(formData));
// });

// if (LS.getItem("formData")) {
//   formData = JSON.parse(LS.getItem("formData"));

//   for (let key in formData) {
//     form.elements[key].value = formData[key];
//   }
// }

// console.log(form.getElementsByTagName("textarea")[0].value);
// form.getElementsByTagName(
//   "textarea"
// )[0].value = `Имя: ${formData.name} Фамилия: ${formData.lastname}
// Доходы: ${formData.income}
// Расходы: ${formData.expense}
// `;

const account = {
  name: "Илья",
  surname: "Шакшин",
  income: [55, 55],
  expense: [44, 44],
  totalIncome() {
    return this.income.reduce((a, b) => a + b);
  },
  totalExpense() {
    return this.expense.reduce((a, b) => a + b);
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
  console.log(event.target.valueAsNumber);
});

console.log(account);

form.addEventListener("input", function (event) {
  account[event.target.name] = event.target.value;
  LS.setItem("account", JSON.stringify(account));
});

form.addEventListener("submit", function (event) {
  console.log(event.target.valueAsNumber);
  event.preventDefault();
});
