function padWithZero(number) {
  return number.toString().padStart(2, "0");
}

export function modifyResponse(response) {
  const dateRegex = /\$EXPIRATION_DATE/g;
  // What we know:
  // The first part is unknown (10)
  // The second part is the restaurant code (53790)
  // The third part is an unknown but probably a boolean (0)
  // The fourth part is the month and date (0204)
  // The fifth part is the time - hours and minutes (0301)
  const codeRegex = /\$COUPON_CODE/g;

  // The coupons are usually valid for 5 days but we only add 4 to be on the
  // safe side - you never know what timezone bugs could exist.
  const in4Days = new Date();
  in4Days.setDate(in4Days.getDate() + 4);
  const in4DaysString = in4Days.toLocaleDateString("bg-BG");

  const today = new Date();

  // getMonth is 0-based
  const fourthPart = `${padWithZero(today.getMonth() + 1)}${padWithZero(
    today.getDate()
  )}`;
  const fifthPart = `${padWithZero(today.getHours())}${padWithZero(
    today.getMinutes()
  )}`;
  const replacementCode = `10-53790-0-${fourthPart}-${fifthPart}`;

  const newResponse = response
    .replace(dateRegex, in4DaysString)
    .replace(codeRegex, replacementCode);

  return newResponse;
}
