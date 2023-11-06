export const mapErrorMessage = (error) => {
  const message = error.error;

  if (
    message ===
    '[Errno 400 Client Error: Bad Request for url: https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyARfundmbUnE0pMD1w8i9nhII_zKx1H9HI] {\n  "error": {\n    "code": 400,\n    "message": "EMAIL_EXISTS",\n    "errors": [\n      {\n        "message": "EMAIL_EXISTS",\n        "domain": "global",\n        "reason": "invalid"\n      }\n    ]\n  }\n}\n'
  ) {
    return "Email already exists";
  } else if (
    message ===
    '[Errno 400 Client Error: Bad Request for url: https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyARfundmbUnE0pMD1w8i9nhII_zKx1H9HI] {\n  "error": {\n    "code": 400,\n    "message": "INVALID_PASSWORD",\n    "errors": [\n      {\n        "message": "INVALID_PASSWORD",\n        "domain": "global",\n        "reason": "invalid"\n      }\n    ]\n  }\n}\n'
  ) {
    return "Invalid Password";
  } else if (
    message ===
    '[Errno 400 Client Error: Bad Request for url: https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyARfundmbUnE0pMD1w8i9nhII_zKx1H9HI] {\n  "error": {\n    "code": 400,\n    "message": "EMAIL_NOT_FOUND",\n    "errors": [\n      {\n        "message": "EMAIL_NOT_FOUND",\n        "domain": "global",\n        "reason": "invalid"\n      }\n    ]\n  }\n}\n'
  ) {
    return "A User with this email does not exist";
  } else {
    return "Unknown Error Occured";
  }
};
