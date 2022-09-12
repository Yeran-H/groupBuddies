const mongoose = require("mongoose");

const PeerRequest = mongoose.model(
  "PeerRequest",
  new mongoose.Schema({
    username: String,
    subjectName: String, 
    yesPeers: [String],
    noPeers: [String],
    status: Boolean,
  })
);

module.exports = PeerRequest;