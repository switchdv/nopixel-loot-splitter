const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

const roundDecimals = (num, decimals) => {
  return (
    Math.round((num + Number.EPSILON) * Math.pow(10, decimals)) /
    Math.pow(10, decimals)
  );
};

const convertMarkedBillToCash = (bags) => {
  return bags * payoutValues.markedBag;
};

const convertInkedBillToCash = (bags) => {
  return bags * payoutValues.inkedBag;
};

const convertGoldBarToCash = (bars) => {
  return bars * payoutValues.goldBar;
};

const getInvPointsByBankClass = (bank, inv) => {
  switch (inv) {
    case "shungite":
      switch (bank.toLowerCase()) {
        case "fleeca":
          return 100;
        case "paleto":
          return 250;
        case "upper-vault":
        case "upper vault":
        case "upper_vault":
        case "uppervault":
          return 500;
        case "lower-vault":
        case "lower vault":
        case "lower_vault":
        case "lowervault":
          return 750;
        default:
          return 0;
      }

    case "thermite":
      switch (bank.toLowerCase()) {
        case "fleeca":
        case "paleto":
        case "jewelry":
          return 1;
        case "bay-city":
        case "bay city":
        case "bay_city":
        case "baycity":
          return 2;
        case "upper-vault":
        case "upper vault":
        case "upper_vault":
        case "uppervault":
        case "casino":
          return 3;
        default:
          return 0;
      }

    case "magnet":
      switch (bank.toLowerCase()) {
        case "casino":
          return 3;
        default:
          return 0;
      }

    case "c4":
      switch (bank.toLowerCase()) {
        case "lower-vault":
        case "lower vault":
        case "lower_vault":
        case "lowervault":
          return 1;
        case "casino":
          return 2;
      }

    case "pixel-pad":
    case "pixel pad":
    case "pixel_pad":
    case "pixelpad":
      switch (bank.toLowerCase()) {
        case "yacht":
          return 1;
        default:
          return 0;
      }

    default:
      return 0;
  }
};
