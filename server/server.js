"use strict";
const { port, grapeUrl } = require("./config");
const { PeerRPCServer } = require("grenache-nodejs-ws");
const Link = require("grenache-nodejs-link");
const {
  getTicker,
  getAccountInfo,
  createNewOrder,
  getOrderHistory,
} = require("./helpers");

const link = new Link({
  grape: grapeUrl,
});
link.start();

const peer = new PeerRPCServer(link, {});
peer.init();

const service = peer.transport("server");
service.listen(parseInt(port));

setInterval(() => {
  link.announce("getTicker_worker", service.port, {});
  link.announce("getAccountInfo_worker", service.port, {});
  link.announce("createNewOrder_worker", service.port, {});
  link.announce("getOrderHistory_worker", service.port, {});
}, 1000);

service.on("request", async (rid, key, payload, handler) => {
  let result;
  if (key === "getTicker_worker") {
    result = await getTicker(payload.symbol);
  } else if (key === "getAccountInfo_worker") {
    result = await getAccountInfo();
  } else if (key === "createNewOrder_worker") {
    result = await createNewOrder(payload);
  } else if (key === "getOrderHistory_worker") {
    result = await getOrderHistory();
  }

  handler.reply(null, result);
});
