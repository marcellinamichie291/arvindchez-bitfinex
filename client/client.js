"use strict";
const prompt = require("prompt");

const { PeerRPCClient } = require("grenache-nodejs-ws");
const Link = require("grenache-nodejs-link");

const link = new Link({
  grape: "http://127.0.0.1:30001",
  requestTimeout: 10000,
});
link.start();
const peer = new PeerRPCClient(link, {});
peer.init();

// Function to get the ticket information
const getTicker = () => {
  prompt.start();
  prompt.get(["symbol"], function (err, result) {
    if (err) {
      return onErr(err);
    }

    const payload = { symbol: result.symbol };
    peer.request(
      "getTicker_worker",
      payload,
      { timeout: 100000 },
      (err, result) => {
        if (err) {
          throw err;
        }
        console.log(result);
      }
    );
  });
};

// Function to get the account information for a user
const getAccountInfo = () => {
  peer.request(
    "getAccountInfo_worker",
    "",
    { timeout: 100000 },
    (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
    }
  );
};

// Function to create a new order
const createNewOrder = () => {
  prompt.start();
  prompt.get(
    [
      "symbol",
      "amount",
      "price",
      "side",
      "type",
      "ocoorder",
      "buy_price_oco",
      "sell_price_oco",
    ],
    function (err, result) {
      if (err) {
        return onErr(err);
      }

      const payload = {
        symbol: result.symbol,
        amount: result.amount,
        price: result.price,
        side: result.side,
        type: result.type,
        ocoorder: result.ocoorder,
        buy_price_oco: result.buy_price_oco,
        sell_price_oco: result.sell_price_oco,
        // ocoorder: result.ocoorder === "true",
        // buy_price_oco: parseFloat(result.buy_price_oco),
        // sell_price_oco: parseFloat(result.sell_price_oco),
      };
      peer.request(
        "createNewOrder_worker",
        payload,
        { timeout: 10000 },
        (err, result) => {
          if (err) {
            throw err;
          }
          console.log(result);
        }
      );
    }
  );
};

// Function to get the order book(order history)
const getOrderHistory = () => {
  peer.request(
    "getOrderHistory_worker",
    "",
    { timeout: 100000 },
    (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
    }
  );
};

getTicker();
