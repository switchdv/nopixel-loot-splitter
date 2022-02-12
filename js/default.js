const fleeca_avg = document.getElementById("fleeca_avg");

fleeca_avg.innerHTML = numberWithCommas(
  roundDecimals(getDefaultInvestmentByBankClass("fleeca") / 3, 2)
);

const fleecas = document.getElementsByName("fleeca_default");

fleecas.forEach((e) => {
  e.innerHTML = numberWithCommas(getDefaultInvestmentByBankClass("fleeca"));
});

const paletos = document.getElementsByName("paleto_default");

paletos.forEach((e) => {
  e.innerHTML = numberWithCommas(getDefaultInvestmentByBankClass("paleto"));
});

const baycities = document.getElementsByName("baycity_default");

baycities.forEach((e) => {
  e.innerHTML = numberWithCommas(getDefaultInvestmentByBankClass("baycity"));
});

const jewelries = document.getElementsByName("jewelry_default");

jewelries.forEach((e) => {
  e.innerHTML = numberWithCommas(getDefaultInvestmentByBankClass("jewelry"));
});

const uppervaults = document.getElementsByName("uppervault_default");

uppervaults.forEach((e) => {
  e.innerHTML = numberWithCommas(
    getDefaultInvestmentByBankClass("upper-vault")
  );
});

const shungites = document.getElementsByName("shungite_default");

shungites.forEach((e) => {
  e.innerHTML = 100;
});

const thermites = document.getElementsByName("thermite_default");

thermites.forEach((e) => {
  e.innerHTML = 6000;
});
