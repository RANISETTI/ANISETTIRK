import Script from "next/script";

function onScriptPaytmLoad(orderId, token, amount) {
  var config = {
    root: "",
    flow: "DEFAULT",
    data: {
      orderId: orderId /* update order id */,
      token: token /* update token value */,
      tokenType: "TXN_TOKEN",
      amount: amount /* update amount */,
    },
    handler: {
      notifyMerchant: function (eventName, data) {
        console.log("notifyMerchant handler function called");
        console.log("eventName => ", eventName);
        console.log("data => ", data);
      },
    },
  };
  // if (window.Paytm && window.Paytm.CheckoutJS) {
  // window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
  // initialze configuration using init method
  window.Paytm.CheckoutJS.init(config)
    .then(function onSuccess() {
      // after successfully updating configuration, invoke JS Checkout
      window.Paytm.CheckoutJS.invoke();
    })
    .catch(function onError(error) {
      console.log("error => ", error);
    });
  // });
  // }
}

const PaymentModal = () => {
  return (
    <>
      <Script
        type="application/javascript"
        src="https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/Andhra12045912464661.js"
      ></Script>
    </>
  );
};
export { PaymentModal, onScriptPaytmLoad };
