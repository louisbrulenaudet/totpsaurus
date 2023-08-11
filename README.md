# Totpsaurus, unleash the Time-Traveling OTPs ⏱️

Ultralight, non-dependent and minimalist open-source package for generating Time-based One-Time Passwords (TOTPs), creating OTP URLs, and generating secure backup codes for account recovery.

Time-based one-time password (TOTP) is a computer algorithm that generates a one-time password (OTP) that uses the current time as a source of uniqueness. As an extension of the HMAC-based one-time password algorithm (HOTP), it has been adopted as Internet Engineering Task Force (IETF) standard RFC 6238.

TOTP is the cornerstone of Initiative for Open Authentication (OATH), and is used in a number of two-factor authentication (2FA) systems.

Unlike passwords, TOTP codes are single-use, so a compromised credential is only valid for a limited time. However, users must enter TOTP codes into an authentication page, which creates the potential for phishing attacks. Due to the short window in which TOTP codes are valid, attackers must proxy the credentials in real time.

```js
const totp = require("totpsaurus");

const secret = await totp.randomBase32(32);
const totp = await totp.generateTOTP(secret);
const url = await totp.generateTOTPURL(
  secret,
  user.id,
  process.env.APP_NAME
);
```
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) 
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/louisbrulenaudet/totpsaurus/issues)
![npm version](https://img.shields.io/npm/v/totpsaurus)

## Features

- Low memory usage
- Executable for generating applications quickly
- Simple deployment with one-line integration

## Tech Stack

**Server:** Node

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm](https://www.npmjs.com/) & [yarn](https://yarnpkg.com/?q=totpsaurus) registries.

Before installing, [download and install Node.js](https://nodejs.org/en/download/). Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file). Then:

```bash
  npm i totpsaurus
  yarn add totpsaurus
```

## Importing

```js
// Using Node.js 'require()'
const totp = require('totpsaurus');
```

## Usage/Examples

```javascript
const secret = await totp.randomBase32(32);
const totp = await totp.generateTOTP(secret);
const url = await totp.generateTOTPURL(
  secret,
  user.id,
  process.env.APP_NAME
);

console.log(secret);
console.log(totp);
console.log(url);
```

```javascript
YHOOVS3PD3YK66XD5NXUMHT4ILKX45GZ
828364
otpauth://totp/ISSUER:ID?secret=YHOOVS3PD3YK66XD5NXUMHT4ILKX45GZ&issuer=ISSUER&algorithm=SHA1&digits=6&period=30&counter=0&initial_time=0&window=1
```

TOTP credentials are also based on a shared secret known to both the client and the server, creating multiple locations from which a secret can be stolen. An attacker with access to this shared secret could generate new, valid TOTP codes at will. This can be a particular problem if the attacker breaches a large authentication database.

## Documentation

Import the functions from the package and use them as follows:

### `base32tohex(base32)`
Converts a base32-encoded string to its hexadecimal representation.

#### Parameters
`base32` (String): The base32-encoded string to be converted to hexadecimal.

#### Returns
`Int`: The hexadecimal representation of the input base32 string.

### `generateTOTP(secret, algorithm = "sha1")`
Generates a Time-based One-Time Password (TOTP) using the provided secret.

#### Parameters
`secret` (String): The secret key used to generate the TOTP.
`algorithm` (String, optional): The hashing algorithm to use for HMAC (e.g., "sha1", "sha256").

#### Returns
`Int`: The generated Time-based One-Time Password.

### `randomBase32(length)`
Generates a random base32-encoded string of the specified length.

#### Parameters
`length` (Int): The desired length of the random base32 string.

#### Returns
`String`: The randomly generated base32-encoded string.

### `generateBackupCodes(count, length)`
Generates a specified number of secure backup codes for TOTP.

#### Parameters
`count` (Int): The number of backup codes to generate.
`length` (Int): The length of each backup code.

#### Returns
`Array of Strings`: An array containing the generated secure backup codes.

### `generateTOTPURL(secret, username, issuer, algorithm = "SHA1", digits = 6, period = 30, counter = 0, initialTime = 0, window = 1)`
Generates an OTP (One-Time Password) URL for a given secret and username.

#### Parameters
`secret` (String): The secret key used to generate the TOTP, base64-encoded.
`username` (String): The username for whom the OTP URL is generated.
`issuer` (String): The issuer of the code.
`algorithm` (String): The hashing algorithm used for TOTP.
`digits` (Int): The number of digits in the generated TOTP.
`period` (Int): The time period (in seconds) for TOTP validity.
`counter` (Int): The initial counter value for HOTP.
`initialTime` (Int): The initial time for TOTP calculations.
`window` (Int): The acceptable time window for TOTP validation.

#### Returns
`String`: An OTP URL in otpauth://totp format.

## License

Copyright (c) 2022 Louis Brulé Naudet <contact@louisbrulenaudet.com>.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Feedback

If you have any feedback, please reach out to us at contact@louisbrulenaudet.com.
