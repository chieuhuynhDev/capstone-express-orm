export const responseSuccess = (
  code = 200,
  message = "Ok",
  metaData = null
) => {
  return {
    status: "Success",
    code: code,
    message: message,
    metaData: metaData,
    doc: "api.domain.com/doc",
  };
};

export const responseError = (
  code = 500,
  message = "Internal Server Error",
  stack = null
) => {
  return {
    status: "Error",
    code: code,
    message: message,
    stack: stack,
  };
};
