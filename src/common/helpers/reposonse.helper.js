export const responseSuccess = (metaData = null, message = `Ok`, code = 200) => {
   if (typeof code !== `number`) code = 200;
   return {
      status: `success`,
      code: code,
      message: message,
      metaData: metaData,
      doc: `api.domain.com/doc`,
   };
};

export const responseError = (message = `Internal Server Error`, code = 500, stack = null) => {
   if (typeof code !== `number`) code = 500;
   return {
      status: `error`,
      code: code,
      message: message,
      stack: stack,
   };
};
