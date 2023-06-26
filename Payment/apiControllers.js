const axios = require('axios');
const Chapa_Endpoint = "https://api.chapa.co/v1/transaction/initialize";
const Chapa_Verify = "https://api.chapa.co/v1/transaction/verify/";
const Chapa_Transfer = "https://api.chapa.co/v1/transfers";
const TEXT_REF = "tx-wms-" + Date.now();
const CALLBACK_URL = "http://localhost:3008/api/verify/";
const RETURN_URL = "http://localhost:3008/api/success";

const header = { 
    headers: { 'Authorization': `Bearer ${process.env.API_SECRET}` }
}

const initiateTransfer = async (req, res) => {
    const data = {
        account_name: "Israel Goytom",
        account_number: "32423423",
        amount: req.body.amount,
        currency: "ETB",
        reference: TEXT_REF,
        bank_code: "fe087651-4910-43af-b666-bbd393d8e81f"
    }
    const response = await axios.post(Chapa_Transfer, data, header);
    if(response){
        res.status(201).json(response.data);
    }
}

const postTransactionData = async (req, res) => {  
    const data = {
        amount: "30",
        currency: "ETB",
        phone_number: req.body.userPhone,
        tx_ref: TEXT_REF,
        callback_url: CALLBACK_URL + TEXT_REF,
        return_url: RETURN_URL
    }
    await axios.post(Chapa_Endpoint, data, header)
    .then(response => {
        console.log('Data posted successfully:', response.data);
        res.redirect(response.data.data.checkout_url);
    })
    .catch (e => {
        console.error('Error posting data:', e.message);
    })   
};

const verifyPayment = async (req, res) => {
    try{
        await axios.get(Chapa_Verify + req.params.id, header);
        console.log("Payment was successfully verified");
    }catch(err){
        console.log("Payment can't be verfied", err);
    }
}

const success = async (req, res) => {
    res.status(200).json({message: "Transaction Successful"});
}

const controllers = {
    postTransactionData,
    verifyPayment,
    success,
    initiateTransfer
}

module.exports = controllers;