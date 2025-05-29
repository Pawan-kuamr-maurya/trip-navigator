let mongoose = require("mongoose");
let listing = require("../module/listing");
let insitdata = require("./sampledata.js");
let User = require("../module/usermodal.js");
mongoose
  .connect("mongodb://127.0.0.1:27017/newdata")
  .then(() => console.log("Connected!"));

async function creade(params) {
  //await listing.deleteMany({});
  await listing.insertMany(insitdata.data);

  const userData = {
    _id: new mongoose.Types.ObjectId("675d066ca6b63af51a18c31f"), // Use mongoose.Types.ObjectId
    gender: "Male",
    name: "Admin@pawan",
    isAdmin: true,
    username: "pawan_admin@gmail.com",
    salt: "c40fce6292f63da7968eac8368bde3ec9fab48644e13a7e17e50aaf6d44f7236",
    hash: "57ceed89182125c88ee051de88bd408d6b3d00702eb7236c833cb07ed30d5c5d87b76fb60be4323f1f6e61a476cf13d95939446dcedc9d2de034438657ca378a5d0e41b6b92f36e238dce1ae21632d5289d97a5e4b61596970057fb60d5ce32309a65df22827eb0f8a1e6f204918b26b38bf73b89d513b872a297fac690248087dc8770a4fa8594c34057133f783570d523ab8c364f70f3a0743c808ed8eeeb6b47003d29a9bf3e4af6a137bd16c47ddfce33318ece0a125f747f4bd9acbea8a59a6b951d2238ddf71a32f3c1ecab6b617f893c855ac69714e7047344c695120523f74ef7d98b4cabdfc0397079c99343876210bb532ade99f2da46dd50aacacd888af3ff24e305b22440da288727f59b0b2858c51dc7f3e100a73a20b90d9cbc5ce5cf0386004d4c48c742463e21f05c03110c21126cc314c5412ae89dfafd7ecaf9358dab62246db8209d9f38bdb405641dc166eeee86dce390cf8386f24d7d070f1f3e3d356a136f9c35f475d67e0fc0753a6353f0e44e882232ac523b84968868eddcabc9fffa15fc5610b35f2cd25f5681434e0ce3999e31760f004225f29d33f7040f6047de17f1566a4287305136566fa4d575b633b93ce3f89368b30c889c40b002066b6232ba3a0bec993755dcfa608d7a21c5fa74f3e8c06a052e9d0c8e24317dc274677e5807828a0cdbb92608c4517e36fa7d46feb5645bd2828",
    __v: 0,
  };
  const newUser = new User(userData);

  await newUser.save();

  console.log("data insert");
}
creade();
