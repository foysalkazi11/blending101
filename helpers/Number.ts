// Function to find the greatest common divisor (GCD) of two numbers
function findGCD(a, b) {
  if (b === 0) {
    return a;
  }
  return findGCD(b, a % b);
}

export function decimalToMixedNumber(decimal) {
  // Get the integer part
  const integerPart = Math.floor(decimal);

  // Get the proper fraction part
  const fractionPart = decimal - integerPart;

  // Find the greatest common divisor (GCD) to simplify the fraction
  const gcd = findGCD(Math.round(fractionPart * 100), 100);

  // Calculate the numerator for the proper fraction
  const numerator = Math.round(fractionPart * 100) / gcd;

  // Calculate the denominator for the proper fraction
  const denominator = 100 / gcd;

  // Create the mixed number string
  if (numerator === 0) {
    // If there's no proper fraction part
    return [integerPart, ""];
  } else {
    return [integerPart, numerator + "/" + denominator];
  }
}

export function mixedNumberToDecimal(mixedNumber) {
  // Split the mixed number into its parts (integer, numerator, denominator)
  const parts = mixedNumber.split(" ");
  console.log(parts);
  if (parts.length === 1) {
    const [numerator, denominator] = parts[0].split("/");

    // If there is fraction then we calculate otherwise the number only
    return denominator ? +numerator / +denominator : numerator;
  } else if (parts.length === 2) {
    // If there's a space, it's a mixed number
    const integerPart = parseFloat(parts[0]);
    const fractionPart = parseFraction(parts[1]);

    // Calculate the decimal value by adding the integer and fractional parts
    return integerPart + fractionPart;
  } else {
    // Invalid input
    throw new Error("Invalid mixed number format");
  }
}

function parseFraction(fraction) {
  // Split the fraction into numerator and denominator
  const [numerator, denominator] = fraction.split("/").map(Number);

  if (denominator === 0) {
    throw new Error("Denominator cannot be zero");
  }

  // Calculate and return the decimal value of the fraction
  return numerator / denominator;
}
