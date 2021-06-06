const navElements = document.querySelectorAll(".nav-link");
const pageElements = document.querySelectorAll(".content-page");

const numOfMembersOptions = document.getElementsByName("firstParam");

const shungiteElement = document.getElementById("shungite");

const bankClassOptions = document.getElementsByName("secondParam");

const investmentOption1 = document.getElementById("thirdParam1");
const investmentOption2 = document.getElementById("thirdParam2");

const investmentLabels = document.getElementsByName("fourthParamLabel");
const investmentInputElements = document.getElementsByName("fourthParam");

const payoutInputElements = document.getElementsByName("fifthParam");

const splitButton = document.getElementById("splitButton");

var requiredInputElementList = document.querySelectorAll("[required]");
var numOfMembers = 4;

const memberInvList = [];

const payout = {
  markedBags: 0,
  inkedBags: 0,
  cash: 0,
  others: 0,
};

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
  } else {
    if (inputElement.value === "") {
      addClassToInputGroup(inputElement, "not-valid-focus");
    } else {
      addClassToInputGroup(inputElement, "being-validated-focus");
    }
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
  const inputText =
    inputElement.parentElement.querySelector(".input-group-text");

  if (inputElement.value !== "") {
    inputText.classList.add("input-group-text-not-empty");
  } else {
    inputText.classList.remove("input-group-text-not-empty");
  }
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
};

const getShungitePoints = () => {
  if (bankClassOptions[0].checked) {
    return 100;
  }
  if (bankClassOptions[1].checked) {
    return 250;
  }
  if (bankClassOptions[2].checked) {
    return 500;
  }
};

const getBankClass = () => {
  var bankClass = 1;
  bankClassOptions.forEach((bankClassOption) => {
    if (bankClassOption.checked) {
      bankClass = parseInt(bankClassOption.value);
    }
  });

  return bankClass;
};

const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

const convertMarkedBillToCash = (bags) => {
  return bags * 250;
};

const convertInkedBillToCash = (bags) => {
  return bags * 50000;
};

const convertMemberPayoutToCash = (memberPayout) => {
  return (
    convertMarkedBillToCash(memberPayout.markedBags) +
    convertInkedBillToCash(memberPayout.inkedBags) +
    memberPayout.cash
  );
};

const getDefaultInvestment = (bankClass) => {
  if (bankClass === 2) {
    return 25000;
  } else if (bankClass === 3) {
    return 71000;
  }
  return 10000;
};

const getTotalInvestment = () => {
  if (investmentOption1.checked) {
    const totalPrice = getDefaultInvestment(getBankClass());
    return totalPrice;
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
  var cash = payout.cash || 0;
  var otherPayout = payout.others || 0;
  var totalPayout =
    convertMarkedBillToCash(markedBags) +
    convertInkedBillToCash(inkedBags) +
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
  document.getElementById("result").removeAttribute("hidden");

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
    document.getElementById(cId).innerHTML = numberWithCommas(
      cuts[member].cash
    );

    const pId = "member-" + (i + 1) + "-p";
    var memberInv = getTotalInvestment() / numOfMembers;
    if (memberInvList[i] !== undefined) {
      memberInv = memberInvList[i];
    }
    document.getElementById(pId).innerHTML = numberWithCommas(
      convertMemberPayoutToCash(cuts[member]) - memberInv
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
  var pCash = payout.cash + payout.others;
  const cuts = {};
  for (let i = 0; i < n; i++) {
    const member = "member" + (i + 1);
    cuts[member] = {};
    cuts[member].markedBags = 0;
    cuts[member].inkedBags = 0;
    cuts[member].cash = 0;

    let memberInv;
    if (investmentOption1.checked) {
      memberInv = getDefaultInvestment(getBankClass()) / numOfMembers;
    } else {
      memberInv = memberInvList[i];
    }

    cuts[member].cash = memberInv - pricePerMember + payoutPerMember;

    var bags = Math.floor(cuts[member].cash / 50000);
    if (bags > pInkedBags) {
      bags = pInkedBags;
    }
    cuts[member].inkedBags += bags;
    cuts[member].cash -= convertInkedBillToCash(bags);
    pInkedBags -= bags;

    bags = Math.floor(cuts[member].cash / 250);
    if (bags > pMarkedBags) {
      bags = pMarkedBags;
    }
    cuts[member].markedBags += bags;
    cuts[member].cash -= convertMarkedBillToCash(bags);
    cuts[member].cash =
      Math.round((cuts[member].cash + Number.EPSILON) * 100) / 100;
    pMarkedBags -= bags;
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
      if (bankClass.value === "3") {
        document.getElementById("thermite").removeAttribute("hidden");
      } else {
        document.getElementById("thermite").setAttribute("hidden", true);
      }

      showTotalInvestment();
    }
  });
});

investmentOption1.addEventListener("change", () => {
  if (investmentOption1.checked) {
    muteFirstNElements(investmentLabels, numOfMembers);
    disableFirstNInputElements(investmentInputElements, numOfMembers);

    for (let i = 0; i < numOfMembers; i++) {
      investmentInputElements[i].removeAttribute("required");
    }

    showTotalInvestment();
  }
});

investmentOption2.addEventListener("change", () => {
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
});

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
    if (element.id === "fifthParam1") {
      payout.markedBags = parseInt(element.value || 0);
    } else if (element.id === "fifthParam2") {
      payout.inkedBags = parseInt(element.value || 0);
    } else if (element.id === "fifthParam3") {
      payout.cash = parseInt(element.value || 0);
    } else if (element.id === "fifthParam4") {
      payout.others = parseInt(element.value || 0);
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
  const cuts = splitLoot();
  showMemberCut(cuts);
});
