const crypto = require("crypto");

async function base32tohex(base32) {
  /*
  Converts a base32-encoded string to its hexadecimal representation.
  
  This function takes a base32-encoded string and converts it to its 
  hexadecimal representation. Base32 is a method of encoding binary data as a string 
  of ASCII characters using a limited set of characters. The function performs the conversion 
  by first converting the base32 string to a binary string and then grouping the binary digits 
  into groups of 4 to convert them to hexadecimal values.

  Parameters
  ----------
  base32 : int
    The base32-encoded string to be converted to hexadecimal.

  Returns
  -------
  hex : int
    The hexadecimal representation of the input base32 string.
  */
  // The characters used for base32 encoding
  let base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

  // Initialize variables to store intermediate results
  let bits = "";
  let hex = "";

  // Convert base32 characters to binary representation
  for (let i = 0; i < base32.length; i++) {
    let val = base32chars.indexOf(base32.charAt(i).toUpperCase());
    bits += (Array(5).fill(0).join("") + val.toString(2)).slice(-5);
  }

  // Group binary digits into chunks of 4 and convert to hexadecimal
  for (let i = 0; i < bits.length - 3; i += 4) {
    let chunk = bits.slice(i, i + 4);
    hex = hex + parseInt(chunk, 2).toString(16);
  }

  // Return the hexadecimal representation
  return hex;
}

async function generateTOTP(secret, algorithm = "sha1") {
  /*
  Generates a Time-based One-Time Password (TOTP) using the provided secret.
  
  This function generates a TOTP using the Time-based One-Time Password algorithm. 
  It takes a secret key as input, and calculates a TOTP value based on the current 
  time, synchronized with a time interval. TOTP is commonly used for two-factor 
  authentication (2FA) mechanisms.

  Parameters
  ----------
  secret : str
    The secret key used to generate the TOTP.

  algorithm : str, optional
    The hashing algorithm to use for HMAC (e.g., "sha1", "sha256").

  Returns
  -------
  totp : int
    The generated Time-based One-Time Password.
  */
  // Calculate the time interval for TOTP
  const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
  const timeInterval = Math.floor(currentTimeInSeconds / 30);

  // Create a buffer for the message
  const mssg = Buffer.alloc(8);
  mssg.writeUInt32BE(timeInterval, 4);

  // Convert the secret to a buffer for key generation
  const key = Buffer.from(await base32tohex(secret), "hex");

  // Create an Hmac instance using the "sha1" algorithm and provided key
  const hmac = crypto.createHmac(algorithm, key);
  hmac.update(mssg);
  const hmacDigest = hmac.digest();

  // Extract and manipulate the TOTP value
  const offset = hmacDigest[hmacDigest.length - 1] & 0xf;
  const truncatedHash = hmacDigest.readUInt32BE(offset) & 0x7fffffff;
  const totp = String(truncatedHash % 1000000).padStart(6, "0");

  return totp;
}

async function randomBase32(length) {
  /*
  Generates a random base32-encoded string of the specified length.
  
  This function generates a random base32-encoded string with the specified length. 
  The generated string contains characters from the base32 character set and is suitable 
  for various purposes such as generating secrets, tokens, or unique identifiers. 
  The function ensures that the generated string has an even length.

  Parameters
  ----------
  length : int
    The desired length of the random base32 string.

  Returns
  -------
  randomBase32String : str
    The randomly generated base32-encoded string.
  */
  // The characters used for base32 encoding
  var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

  // Ensure the length is even
  length = length % 2 === 0 ? length : length + 1;

  // Generate the random base32 string
  var secret = [];
  for (var i = 0; i < length; i++) {
    secret.push(base32chars.split("")[Math.floor(Math.random() * 32)]);
  }

  // Join the array of characters to form the final random base32 string
  var randomBase32String = secret.join("");

  return randomBase32String;
}

async function generateBackupCodes(count, length) {
  /*
  Generates a specified number of secure backup codes for TOTP.
  
  This function generates a specified number of secure backup codes, which can be used
  for account recovery in case of lost or unavailable TOTP devices.

  Parameters
  ----------
  count : int
    The number of backup codes to generate.

  length : int
    The length of each backup code.

  Returns
  -------
  backupCodes : Array of strings
    An array containing the generated secure backup codes.
  */
  const backupCodes = [];

  for (let i = 0; i < count; i++) {
    const randomBytes = crypto.randomBytes(length);
    const backupCode = await base32Encode(randomBytes);
    backupCodes.push(backupCode);
  }

  return backupCodes;
}

async function generateTOTPURL(
  secret,
  id,
  issuer,
  algorithm = "SHA1",
  digits = 6,
  period = 30,
  counter = 0,
  initialTime = 0,
  window = 1
) {
  /*
  Generates an OTP (One-Time Password) URL for a given secret and username.
  This function constructs a URL in the otpauth://totp format, suitable for use
  with OTP applications and devices. The URL includes the encoded secret, the username,
  and an issuer label for better identification.

  Parameters
  ----------
  secret : str
    The secret key used to generate the TOTP, base64-encoded.

  username : str
    The username for whom the OTP URL is generated.

  issuer : str
    The issuer of the code.

  algorithm : str
    The hashing algorithm used for TOTP.

  digits : int
    The number of digits in the generated TOTP.

  period : int
    The time period (in seconds) for TOTP validity.
 
  counter : int
    The initial counter value for HOTP.

  initialTime : int
    The initial time for TOTP calculations.
    
  window : int
    The acceptable time window for TOTP validation.

  Returns
  -------
  An OTP URL in otpauth://totp format.
  */
  const encodedIssuer = encodeURIComponent(issuer);
  const encodedUsername = encodeURIComponent(id);
  const encodedSecret = encodeURIComponent(secret);
  const encodedAlgorithm = encodeURIComponent(algorithm);

  const totpURL = `otpauth://totp/${encodedIssuer}:${encodedUsername}?secret=${encodedSecret}&issuer=${encodedIssuer}&algorithm=${encodedAlgorithm}&digits=${digits}&period=${period}&counter=${counter}&initial_time=${initialTime}&window=${window}`;

  return totpURL;
}

module.exports = {
  base32tohex,
  generateTOTP,
  randomBase32,
  generateBackupCodes,
  generateTOTPURL,
};