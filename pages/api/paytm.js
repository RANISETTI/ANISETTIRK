const paytmInitiatePayment = async (price, fromUrl, applicationid) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}payment/initiatepayment/?amount=${price}&callbackurl=${fromUrl}&id=${applicationid}`
    // `${process.env.NEXT_PUBLIC_BASE_URL}payment/initiatepayment/?amount=${price}&callbackurl=${fromUrl}`
  ).then((res) => res.json());
  return response;
};

const paytmVerifyPayment = async (orderid, from, applicationId) => {
  // http://localhost:8000/api-server/api/payment/verifypayment/?orderid=1234567888&transactiontype=dsc
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}payment/verifypayment/?orderid=${orderid}&transactiontype=${from}&id=${applicationId}`
  ).then((res) => res);
  return response;
};

export { paytmInitiatePayment, paytmVerifyPayment };
