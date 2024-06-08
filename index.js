const tokenizationSpecification = {
    type: 'PAYMENT_GATEWAY',
    parameters: {
        'gateway': 'mpgs',
        'gatewayMerchantId': '000008219933'
    }
};

const cardPaymentMethod = {
    type: 'CARD',
    tokenizationSpecification: tokenizationSpecification,
    parameters: {
        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
        allowedCardNetworks: ["MASTERCARD", "VISA"]
    }
};

const googlePayConfiguration = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [cardPaymentMethod]
};

console.log("script loaded");


// const tokenizationSpecification = {
//     type: 'PAYMENT_GATEWAY',
//     parameters: {
//         'gateway': 'mpgs',
//         'gatewayMerchantId': '000008219933'
//     }
// };





let googlePayClient;

function onGooglePayLoaded() {
    console.log('LOADED');
    googlePayClient = new google.payments.api.PaymentsClient({
        environment: 'TEST',
    });

    googlePayClient.isReadyToPay(googlePayConfiguration)
        .then(response => {
            if (response.result) {
                console.log("is ready to pay");
                createAndAddButton();
            } else {
                console.log("is NOT ready");
            }
        })
        .catch(error => console.error('isReadyToPay error: ', error));
}

function createAndAddButton() {
    const googlePayButton = googlePayClient.createButton({
        onClick: onGooglePayButtonClicked
    });
    console.log("btn is created");
    document.getElementById('container').appendChild(googlePayButton);
}

function onGooglePayButtonClicked() {
    const paymentDataRequest = { ...googlePayConfiguration};

    paymentDataRequest.merchantInfo = {
        merchantId: 'BCR2DN4TZLJONY3P',
        merchantName: 'TIPZ TECHNOLOGY FZ LLC'
    };

    paymentDataRequest.transactionInfo = {
        totalPriceStatus: 'FINAL',
        totalPrice: "12.00",
        totalPriceLabel: "Total",
        countryCode: 'US',
        currencyCode: "USD"
    };
    console.log("btn is cliked");
    console.log(paymentDataRequest);

    googlePayClient.loadPaymentData(paymentDataRequest)
        .then(paymentData => {
            processPaymentData(paymentData)
            console.log("payment data is loading");
        })
        .catch(error => console.error("loadPaymentData error: ", error));
}

function processPaymentData(paymentData) {
    console.log("go to backend");
    fetch("http://gpay/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: "TEEEST"
    })
        .then(response => response.json())
        .then(res => console.log(res));

    // fetch("http://localhost/gpay.php", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: paymentData
    // });
}
