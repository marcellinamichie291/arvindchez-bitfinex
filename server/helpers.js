const axios = require("axios");
const crypto = require("crypto");

const { apiKey, apiSecret, baseUrl, exchange } = require("./config");
const nonce = Date.now().toString();

const getTicker = async (symbol) => {
  const url = `/v1/pubticker/${symbol}`;
  const completeURL = baseUrl + url;
  const options = {
    method: "GET",
    url: completeURL,
    headers: { accept: "application/json" },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (err) {
    return err;
  }
};

const getAccountInfo = async () => {
  const url = "/v1/account_infos";
  const completeURL = baseUrl + url;
  const body = {
    request: url,
    nonce,
  };

  const payload = new Buffer.from(JSON.stringify(body)).toString("base64");

  const signature = crypto
    .createHmac("sha384", apiSecret)
    .update(payload)
    .digest("hex");

  const options = {
    method: "POST",
    url: completeURL,
    headers: {
      accept: "application/json",
      "X-BFX-APIKEY": apiKey,
      "X-BFX-PAYLOAD": payload,
      "X-BFX-SIGNATURE": signature,
    },
  };

  try {
    const response = await axios.request(options);
    return JSON.stringify(response.data);
  } catch (err) {
    return err;
  }
};

const createNewOrder = async ({
  symbol,
  amount,
  price,
  side,
  type,
  ocoorder,
  buy_price_oco,
  sell_price_oco,
}) => {
  const url = "/v1/order/new";
  const completeURL = baseUrl + url;
  const body = {
    request: url,
    nonce,
  };

  const payload = new Buffer.from(JSON.stringify(body)).toString("base64");

  const signature = crypto
    .createHmac("sha384", apiSecret)
    .update(payload)
    .digest("hex");

  const encodedParams = new URLSearchParams();
  encodedParams.set("exchange", exchange);
  encodedParams.set("is_hidden", "false");
  encodedParams.set("is_postonly", "false");
  encodedParams.set("use_all_available", "0");
  encodedParams.set("lev", "10");
  encodedParams.set("symbol", symbol);
  encodedParams.set("amount", amount);
  encodedParams.set("price", price);
  encodedParams.set("side", side);
  encodedParams.set("type", type);
  encodedParams.set("ocoorder", ocoorder);
  encodedParams.set("buy_price_oco", buy_price_oco);
  encodedParams.set("sell_price_oco", sell_price_oco);

  const options = {
    method: "POST",
    url: completeURL,
    headers: {
      accept: "application/json",
      "content-type": "application/x-www-form-urlencoded",
      "X-BFX-APIKEY": apiKey,
      "X-BFX-PAYLOAD": payload,
      "X-BFX-SIGNATURE": signature,
    },
    data: encodedParams,
  };

  try {
    return await axios.request(options);
    // return JSON.stringify(response.data);
  } catch (err) {
    return err;
  }
};

const getOrderHistory = async () => {
  const url = "/v1/orders/hist";
  const completeURL = baseUrl + url;
  const body = {
    request: url,
    nonce,
  };

  const payload = new Buffer.from(JSON.stringify(body)).toString("base64");

  const signature = crypto
    .createHmac("sha384", apiSecret)
    .update(payload)
    .digest("hex");

  const options = {
    method: "POST",
    url: completeURL,
    params: { limit: "100" },
    headers: {
      accept: "application/json",
      "X-BFX-APIKEY": apiKey,
      "X-BFX-PAYLOAD": payload,
      "X-BFX-SIGNATURE": signature,
    },
  };

  try {
    const response = await axios.request(options);
    return JSON.stringify(response.data);
  } catch (err) {
    return err;
  }
};

module.exports = { getTicker, createNewOrder, getAccountInfo, getOrderHistory };
