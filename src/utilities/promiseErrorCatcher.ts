export const promiseErrorCatcher = (
  callback: (req: Request) => Promise<Response>
) => {
  try {
    return async (req: Request) => {
      return await callback(req);
    };
  } catch (error) {
    Response.json({
      message: error as string,
      success: false,
    });
  }
};

/* : Promise<ApiResponse> => {
  try {
    return callback();
  } catch (error) {
    return {
      message: error as string,
      success: false,
    };
  }
};
 */
