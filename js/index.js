const navElements = document.querySelectorAll(".nav-link");
const pageElements = document.querySelectorAll(".content-page");

const numOfMembersOptions = document.getElementsByName("firstParam");

const shungiteElement = document.getElementById("shungite");
const thermiteElement = document.getElementById("thermite");
const magnetElement = document.getElementById("magnet");
const c4Element = document.getElementById("c4");
const pixelPadElement = document.getElementById("pixelpad");

const bankClassOptions = document.getElementsByName("secondParam");

const investmentOption1 = document.getElementById("thirdParam1");
const investmentOption2 = document.getElementById("thirdParam2");

const investmentLabels = document.getElementsByName("fourthParamLabel");
const investmentInputElements = document.getElementsByName("fourthParam");

const payoutInputElements = document.getElementsByName("fifthParam");
const payoutValueElements = document.getElementsByName("sixthParam");

const splitButton = document.getElementById("splitButton");

var requiredInputElementList = document.querySelectorAll("[required]");
var numOfMembers = 4;

const memberInvList = [];

const payout = {
  markedBags: 0,
  inkedBags: 0,
  goldBars: 0,
  cash: 0,
  others: 0,
};

const payoutValues = {
  markedBag: 250,
  inkedBag: 50000,
  goldBar: 1500,
};

const TYPE_MARKED_BILL = "marked_bill";
const TYPE_INKED_BILL = "inked_bill";
const TYPE_GOLD_BAR = "gold_bar";

const showPage = (navId) => {
  const pageElement = document.getElementById(navId.replace("Nav", ""));

  pageElements.forEach((page) => {
    page.setAttribute("hidden", true);
  });

  pageElement.removeAttribute("hidden");
};

const removeClassFromInputGroup = (childElement, style) => {
  childElement.parentElement.classList.remove(style);
};

const addClassToInputGroup = (childElement, style) => {
  childElement.parentElement.classList.add(style);
};

const muteFirstNElements = (elements, n = elements.length()) => {
  for (var i = 0; i < n; i++) {
    elements[i].classList.add("text-muted");
  }
};

const unmuteFirstNElements = (elements, n = elements.length()) => {
  for (var i = 0; i < n; i++) {
    elements[i].classList.remove("text-muted");
  }
};

const enableFirstNInputElements = (elements, n = elements.length()) => {
  for (var i = 0; i < n; i++) {
    elements[i].removeAttribute("disabled");
    elements[i].required = true;
    elements[i].value = memberInvList[i] || "";
    elements[i].parentElement.classList.remove("not-required");
    autoEmphasizeOnFill(elements[i]);
  }
};

const disableFirstNInputElements = (elements, n = elements.length()) => {
  for (var i = 0; i < n; i++) {
    memberInvList[i] = parseInt(elements[i].value);
    elements[i].setAttribute("disabled", true);
    elements[i].removeAttribute("required");
    elements[i].value = "";
    elements[i].parentElement.classList.add("not-required");
    elements[i].parentElement
      .querySelector(".input-group > .input-group-text")
      .classList.remove("input-group-text-not-empty");
  }
};

const hasClassNameWithinInputGroup = (inputElement, className) => {
  return inputElement.parentElement.classList.contains(className);
};

const emphasizeInputGroup = (inputElement) => {
  const hasInvalidClass = hasClassNameWithinInputGroup(
    inputElement,
    "not-valid"
  );

  if (!hasInvalidClass) {
    addClassToInputGroup(inputElement, "input-group-focus");
    return;
  }

  if (inputElement.value === "") {
    addClassToInputGroup(inputElement, "not-valid-focus");
  } else {
    addClassToInputGroup(inputElement, "being-validated-focus");
  }
};

const deemphasizeInputGroup = (inputElement) => {
  const hasInvalidClass = hasClassNameWithinInputGroup(
    inputElement,
    "not-valid"
  );

  if (!hasInvalidClass) {
    removeClassFromInputGroup(inputElement, "input-group-focus");
  } else {
    if (inputElement.value === "") {
      removeClassFromInputGroup(inputElement, "not-valid-focus");
    } else {
      removeClassFromInputGroup(inputElement, "being-validated-focus");
    }
  }
};

const autoEmphasizeOnFill = (inputElement) => {
  const inputTextElements =
    inputElement.parentElement.querySelectorAll(".input-group-text");

  inputTextElements.forEach((inputText) => {
    if (inputElement.value !== "") {
      inputText.classList.add("input-group-text-not-empty");
    } else {
      inputText.classList.remove("input-group-text-not-empty");
    }
  });
};

const updateRequiredInputElementList = () => {
  requiredInputElementList.forEach((inputElement) => {
    removeClassFromInputGroup(inputElement, "not-valid");
    removeClassFromInputGroup(inputElement, "not-valid-focus");
    removeClassFromInputGroup(inputElement, "not-required");
    removeClassFromInputGroup(inputElement, "being-validated");
    removeClassFromInputGroup(inputElement, "being-validated-focus");
  });
  requiredInputElementList = document.querySelectorAll("[required]");
  return requiredInputElementList;
};

const validateRequiredInputs = (inputElementList) => {
  var isValid = true;

  for (let i = 0; i < inputElementList.length; i++) {
    const val = inputElementList[i].value;
    if (isNaN(val) || val === "") {
      isValid = false;
      addClassToInputGroup(inputElementList[i], "not-valid");
    }
  }

  return isValid;
};

const toggleValidationStyleOnInputChange = (inputElement) => {
  if (inputElement.value === "") {
    removeClassFromInputGroup(inputElement, "being-validated");
    removeClassFromInputGroup(inputElement, "being-validated-focus");
  } else {
    addClassToInputGroup(inputElement, "being-validated");
    addClassToInputGroup(inputElement, "being-validated-focus");
  }
};

const updateNumOfMembers = () => {
  if (numOfMembersOptions[0] && numOfMembersOptions[0].checked) {
    numOfMembers = parseInt(numOfMembersOptions[0].value);
  }
  if (numOfMembersOptions[1] && numOfMembersOptions[1].checked) {
    numOfMembers = parseInt(numOfMembersOptions[1].value);
  }
  if (numOfMembersOptions[2] && numOfMembersOptions[2].checked) {
    numOfMembers = parseInt(numOfMembersOptions[2].value);
  }
  if (numOfMembersOptions[3] && numOfMembersOptions[3].checked) {
    numOfMembers = parseInt(numOfMembersOptions[3].value);
  }
  if (numOfMembersOptions[4] && numOfMembersOptions[4].checked) {
    numOfMembers = parseInt(numOfMembersOptions[4].value);
  }
  if (numOfMembersOptions[5] && numOfMembersOptions[5].checked) {
    numOfMembers = parseInt(numOfMembersOptions[5].value);
  }
  if (numOfMembersOptions[6] && numOfMembersOptions[6].checked) {
    numOfMembers = parseInt(numOfMembersOptions[6].value);
  }
  if (numOfMembersOptions[7] && numOfMembersOptions[7].checked) {
    numOfMembers = parseInt(numOfMembersOptions[7].value);
  }
};

const getShungitePoints = (bank = null) => {
  if (bank != null) {
    return getInvPointsByBankClass(bank, "shungite");
  }

  if (bankClassOptions[0].checked) {
    return 100;
  }
  if (bankClassOptions[1].checked) {
    return 250;
  }
  if (bankClassOptions[4].checked) {
    return 500;
  }
  if (bankClassOptions[5].checked) {
    return 750;
  }

  return 0;
};

const getThermitePoints = (bank = null) => {
  if (bank != null) {
    return getInvPointsByBankClass(bank, "thermite");
  }

  if (
    bankClassOptions[0].checked ||
    bankClassOptions[1].checked ||
    bankClassOptions[3].checked
  ) {
    return 1;
  }

  if (bankClassOptions[2].checked) {
    return 2;
  }

  if (bankClassOptions[4].checked || bankClassOptions[7].checked) {
    return 3;
  }

  return 0;
};

const getMagnetPoints = (bank = null) => {
  if (bank != null) {
    return getInvPointsByBankClass(bank, "magnet");
  }

  if (bankClassOptions[7].checked) {
    return 4;
  }

  return 0;
};

const getC4Points = (bank = null) => {
  if (bank != null) {
    return getInvPointsByBankClass(bank, "c4");
  }

  if (bankClassOptions[5].checked) {
    return 1;
  }

  if (bankClassOptions[7].checked) {
    return 2;
  }

  return 0;
};

const getPixelPadPoints = (bank = null) => {
  if (bank != null) {
    return getInvPointsByBankClass(bank, "pixelpad");
  }

  if (bankClassOptions[6].checked) {
    return 1;
  }

  return 0;
};

const convertMemberPayoutToCash = (memberPayout) => {
  return (
    convertMarkedBillToCash(memberPayout.markedBags) +
    convertInkedBillToCash(memberPayout.inkedBags) +
    convertGoldBarToCash(memberPayout.goldBars) +
    memberPayout.cash
  );
};

const getDefaultInvestment = () => {
  return (
    getShungitePoints() * 100 +
    getThermitePoints() * 6000 +
    getMagnetPoints() * 6000 +
    getC4Points() * 25000
  );
};

const getDefaultInvestmentByBankClass = (bank) => {
  return (
    getShungitePoints(bank) * 100 +
    getThermitePoints(bank) * 6000 +
    getMagnetPoints(bank) * 6000 +
    getC4Points(bank) * 25000
  );
};

const getTotalInvestment = () => {
  if (investmentOption1.checked) {
    return getDefaultInvestment();
  }

  var total = 0;
  for (let i = 0; i < numOfMembers; i++) {
    total += memberInvList[i] || 0;
  }

  return total;
};

const getTotalPayout = () => {
  var markedBags = payout.markedBags || 0;
  var inkedBags = payout.inkedBags || 0;
  var goldBars = payout.goldBars || 0;
  var cash = payout.cash || 0;
  var otherPayout = payout.others || 0;
  var totalPayout =
    convertMarkedBillToCash(markedBags) +
    convertInkedBillToCash(inkedBags) +
    convertGoldBarToCash(goldBars) +
    cash +
    otherPayout;

  return totalPayout;
};

const showTotalInvestment = () => {
  document.getElementById("invTotal").innerHTML = numberWithCommas(
    getTotalInvestment()
  );
};

const showTotalPayout = () => {
  document.getElementById("payoutTotal").innerHTML = numberWithCommas(
    getTotalPayout()
  );
};

const showMemberCut = (cuts) => {
  document.getElementById("result_1_4").removeAttribute("hidden");
  document.getElementById("result_5_8").removeAttribute("hidden");

  const memberCutList = document.querySelectorAll(".member-cut");
  memberCutList.forEach((memberEl) => {
    memberEl.setAttribute("hidden", true);
  });

  for (let i = 0; i < numOfMembers; i++) {
    const propClass = ".member-" + (i + 1) + "-prop";
    const memberProps = document.querySelectorAll(propClass);
    memberProps.forEach((prop) => {
      prop.removeAttribute("hidden");
    });

    const member = "member" + (i + 1);

    const mbId = "member-" + (i + 1) + "-mb";
    document.getElementById(mbId).innerHTML = numberWithCommas(
      cuts[member].markedBags
    );

    const ibId = "member-" + (i + 1) + "-ib";
    document.getElementById(ibId).innerHTML = numberWithCommas(
      cuts[member].inkedBags
    );

    const cId = "member-" + (i + 1) + "-c";
    const cash = cuts[member].cash;
    document.getElementById(cId).innerHTML = numberWithCommas(
      roundDecimals(cash, 2)
    );

    const gId = "member-" + (i + 1) + "-g";
    document.getElementById(gId).innerHTML = numberWithCommas(
      cuts[member].goldBars
    );

    const tId = "member-" + (i + 1) + "-t";
    const cut = convertMemberPayoutToCash(cuts[member]);
    document.getElementById(tId).innerHTML = numberWithCommas(
      roundDecimals(cut, 2)
    );

    const pId = "member-" + (i + 1) + "-p";
    let memberInv;
    if (investmentOption1.checked) {
      memberInv = getDefaultInvestment() / numOfMembers;
    } else {
      memberInv = memberInvList[i];
    }
    const profit = convertMemberPayoutToCash(cuts[member]) - memberInv;
    document.getElementById(pId).innerHTML = numberWithCommas(
      roundDecimals(profit, 2)
    );
  }
};

const splitLoot = () => {
  var n = numOfMembers;
  var totalPrice = getTotalInvestment();
  var totalPayout = getTotalPayout();

  var pricePerMember = totalPrice / n;
  var payoutPerMember = totalPayout / n;
  var pMarkedBags = payout.markedBags;
  var pInkedBags = payout.inkedBags;
  var pGoldBars = payout.goldBars;
  var pCash = payout.cash + payout.others;
  const cuts = {};

  const sortedPayoutValues = sortPayoutValues();
  const sortedPayoutValuesArray = [
    sortedPayoutValues.largest,
    sortedPayoutValues.middle,
    sortedPayoutValues.smallest,
  ];

  for (let i = 0; i < n; i++) {
    const member = "member" + (i + 1);
    cuts[member] = {};
    cuts[member].markedBags = 0;
    cuts[member].inkedBags = 0;
    cuts[member].goldBars = 0;
    cuts[member].cash = 0;

    let memberInv;
    if (investmentOption1.checked) {
      memberInv = getDefaultInvestment() / numOfMembers;
    } else {
      memberInv = memberInvList[i];
    }

    cuts[member].cash = memberInv - pricePerMember + payoutPerMember;

    for (let i = 0; i < sortedPayoutValuesArray.length; i++) {
      const payoutValueObject = sortedPayoutValuesArray[i];
      switch (payoutValueObject.type) {
        case TYPE_INKED_BILL:
          var bags = Math.floor(cuts[member].cash / payoutValues.inkedBag);
          if (bags > pInkedBags) {
            bags = pInkedBags;
          }
          cuts[member].inkedBags += bags;
          cuts[member].cash -= convertInkedBillToCash(bags);
          pInkedBags -= bags;
          break;
        case TYPE_GOLD_BAR:
          var bars = Math.floor(cuts[member].cash / payoutValues.goldBar);
          if (bars > pGoldBars) {
            bars = pGoldBars;
          }
          cuts[member].goldBars += bars;
          cuts[member].cash -= convertGoldBarToCash(bars);
          pGoldBars -= bars;
          break;
        case TYPE_MARKED_BILL:
          var bags = Math.floor(cuts[member].cash / payoutValues.markedBag);
          if (bags > pMarkedBags) {
            bags = pMarkedBags;
          }
          cuts[member].markedBags += bags;
          cuts[member].cash -= convertMarkedBillToCash(bags);
          pMarkedBags -= bags;
          break;
        default:
          break;
      }
    };
  }

  return cuts;
};

navElements.forEach((nav) => {
  nav.addEventListener("click", () => {
    navElements.forEach((nav) => {
      nav.classList.remove("active");
      nav.removeAttribute("aria-current");
    });
    nav.classList.add("active");
    nav.setAttribute("aria-current", "page");

    showPage(nav.id);
  });
});

numOfMembersOptions.forEach((option) => {
  option.addEventListener("change", () => {
    if (option.checked) {
      if (investmentOption1.checked) {
        updateNumOfMembers();
      } else if (investmentOption2.checked) {
        muteFirstNElements(investmentLabels, numOfMembers);
        disableFirstNInputElements(investmentInputElements, numOfMembers);
        updateNumOfMembers();
        unmuteFirstNElements(investmentLabels, numOfMembers);
        enableFirstNInputElements(investmentInputElements, numOfMembers);
      }

      showTotalInvestment();
    }
  });
});

bankClassOptions.forEach((bankClass) => {
  bankClass.addEventListener("change", () => {
    if (bankClass.checked) {
      shungiteElement.innerHTML = numberWithCommas(getShungitePoints());
      thermiteElement.innerHTML = numberWithCommas(getThermitePoints());
      magnetElement.innerHTML = numberWithCommas(getMagnetPoints());
      c4Element.innerHTML = numberWithCommas(getC4Points());
      pixelPadElement.innerHTML = numberWithCommas(getPixelPadPoints());

      showTotalInvestment();

      switch (bankClass.value.toLowerCase()) {
        case "lower-vault":
        case "lower vault":
        case "lower_vault":
        case "lowervault":
        case "yacht":
        case "casino":
          investmentOption2.checked = true;
          investmentOption1.disabled = true;
          customInvestmentEvent();
          break;
        default:
          if (investmentOption1.disabled) {
            investmentOption1.removeAttribute("disabled");
          }
          break;
      }
    }
  });
});

const defaultInvestmentEvent = () => {
  if (investmentOption1.checked) {
    muteFirstNElements(investmentLabels, numOfMembers);
    disableFirstNInputElements(investmentInputElements, numOfMembers);

    for (let i = 0; i < numOfMembers; i++) {
      investmentInputElements[i].removeAttribute("required");
    }

    showTotalInvestment();
  }
};

const customInvestmentEvent = () => {
  if (investmentOption2.checked) {
    unmuteFirstNElements(investmentLabels, numOfMembers);
    enableFirstNInputElements(investmentInputElements, numOfMembers);

    investmentInputElements.forEach((element) => {
      autoEmphasizeOnFill(element);
    });

    for (let i = 0; i < numOfMembers; i++) {
      investmentInputElements[i].required = true;
    }

    showTotalInvestment();
  }
};

investmentOption1.addEventListener("change", defaultInvestmentEvent);

investmentOption2.addEventListener("change", customInvestmentEvent);

investmentInputElements.forEach((element) => {
  element.addEventListener("blur", () => {
    deemphasizeInputGroup(element);
  });

  element.addEventListener("focus", () => {
    emphasizeInputGroup(element);
  });

  element.addEventListener("input", () => {
    autoEmphasizeOnFill(element);
    if (hasClassNameWithinInputGroup(element, "not-valid")) {
      toggleValidationStyleOnInputChange(element);
    }
    const elementId = element.id;
    const index = parseInt(elementId.replace("fourthParam", "")) - 1;
    memberInvList[index] = parseInt(element.value);

    showTotalInvestment();
  });
});

payoutInputElements.forEach((element) => {
  element.addEventListener("blur", () => {
    deemphasizeInputGroup(element);
  });

  element.addEventListener("focus", () => {
    emphasizeInputGroup(element);
  });

  element.addEventListener("input", () => {
    autoEmphasizeOnFill(element);

    if (hasClassNameWithinInputGroup(element, "not-valid")) {
      toggleValidationStyleOnInputChange(element);
    }

    switch (element.id) {
      case "fifthParam1":
        payout.markedBags = parseInt(element.value || 0);
        break;
      case "fifthParam2":
        payout.inkedBags = parseInt(element.value || 0);
        break;
      case "fifthParam3":
        payout.goldBars = parseInt(element.value || 0);
        break;
      case "fifthParam4":
        payout.cash = parseInt(element.value || 0);
        break;
      case "fifthParam5":
        payout.others = parseInt(element.value || 0);
        break;
      default:
        break;
    }

    showTotalPayout();
  });
});

payoutValueElements.forEach((element) => {
  element.addEventListener("blur", () => {
    deemphasizeInputGroup(element);
  });

  element.addEventListener("focus", () => {
    emphasizeInputGroup(element);
  });

  element.addEventListener("input", () => {
    autoEmphasizeOnFill(element);

    if (hasClassNameWithinInputGroup(element, "not-valid")) {
      toggleValidationStyleOnInputChange(element);
    }

    switch (element.id) {
      case "sixthParam1":
        payoutValues.markedBag = parseInt(element.value || 0);
        break;
      case "sixthParam2":
        payoutValues.inkedBag = parseInt(element.value || 0);
        break;
      case "sixthParam3":
        payoutValues.goldBar = parseInt(element.value || 0);
        break;
      default:
        break;
    }

    showTotalPayout();
  });
});

splitButton.addEventListener("click", () => {
  const inputs = updateRequiredInputElementList();
  const isValid = validateRequiredInputs(inputs);
  if (!isValid) {
    return;
  }
  location.href = "#result_1_4";
  const cuts = splitLoot();
  showMemberCut(cuts);
});

const sortPayoutValues = () => {
  var sortedPayoutValues = {
    smallest: {
      type: TYPE_MARKED_BILL,
      value: payoutValues.markedBag,
    },
    middle: {
      type: TYPE_GOLD_BAR,
      value: payoutValues.goldBar,
    },
    largest: {
      type: TYPE_INKED_BILL,
      value: payoutValues.inkedBag,
    },
  };

  if (
    payoutValues.inkedBag >= payoutValues.goldBar &&
    payoutValues.inkedBag >= payoutValues.markedBag
  ) {
    sortedPayoutValues.largest.type = TYPE_INKED_BILL;
    sortedPayoutValues.largest.value = payoutValues.inkedBag;
  } else if (
    payoutValues.goldBar > payoutValues.inkedBag &&
    payoutValues.inkedBag >= payoutValues.markedBag
  ) {
    sortedPayoutValues.largest.type = TYPE_GOLD_BAR;
    sortedPayoutValues.largest.value = payoutValues.goldBar;
  } else {
    sortedPayoutValues.largest.type = TYPE_MARKED_BILL;
    sortedPayoutValues.largest.value = payoutValues.markedBag;
  }

  if (sortedPayoutValues.largest.type === TYPE_INKED_BILL) {
    if (payoutValues.goldBar >= payoutValues.markedBag) {
      sortedPayoutValues.middle.type = TYPE_GOLD_BAR;
      sortedPayoutValues.middle.value = payoutValues.goldBar;
      sortedPayoutValues.smallest.type = TYPE_MARKED_BILL;
      sortedPayoutValues.smallest.value = payoutValues.markedBag;
    } else {
      sortedPayoutValues.middle.type = TYPE_MARKED_BILL;
      sortedPayoutValues.middle.value = payoutValues.markedBag;
      sortedPayoutValues.smallest.type = TYPE_GOLD_BAR;
      sortedPayoutValues.smallest.value = payoutValues.goldBar;
    }
  } else if (sortedPayoutValues.largest.type === TYPE_GOLD_BAR) {
    if (payoutValues.inkedBag >= payoutValues.markedBag) {
      sortedPayoutValues.middle.type = TYPE_INKED_BILL;
      sortedPayoutValues.middle.value = payoutValues.inkedBag;
      sortedPayoutValues.smallest.type = TYPE_MARKED_BILL;
      sortedPayoutValues.smallest.value = payoutValues.markedBag;
    } else {
      sortedPayoutValues.middle.type = TYPE_MARKED_BILL;
      sortedPayoutValues.middle.value = payoutValues.markedBag;
      sortedPayoutValues.smallest.type = TYPE_INKED_BILL;
      sortedPayoutValues.smallest.value = payoutValues.inkedBag;
    }
  } else {
    if (payoutValues.inkedBag >= payoutValues.goldBar) {
      sortedPayoutValues.middle.type = TYPE_INKED_BILL;
      sortedPayoutValues.middle.value = payoutValues.inkedBag;
      sortedPayoutValues.smallest.type = TYPE_GOLD_BAR;
      sortedPayoutValues.smallest.value = payoutValues.goldBar;
    } else {
      sortedPayoutValues.middle.type = TYPE_GOLD_BAR;
      sortedPayoutValues.middle.value = payoutValues.goldBar;
      sortedPayoutValues.smallest.type = TYPE_INKED_BILL;
      sortedPayoutValues.smallest.value = payoutValues.inkedBag;
    }
  }

  return sortedPayoutValues;
};
