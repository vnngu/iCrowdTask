const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require("validator");

// Retrieve, add and remove worker
/*
  @method: GET
  @url: /workers
*/
const get_workers = (req, res) => {
  User.find({})
    .then((users) => res.json({ users, status: "success" }))
    .catch((err) => res.json({ users: [], status: "error" }));
};

/*
  @method: POST
  @url: /workers
  @body
  {
    users: [
      {
        country: 'Vietnam',
        firstName: 'Nam',
        lastName: 'Nguyen',
        email: 'abc@gmail.com',
        password: '123456789',
        city: 'Melbourne',
        state: 'VIC',
        zipCode: '3125',
        phoneNumber: '',
        address: 'Middleborough Rd'
      }
    ]
  }
*/
const add_workers = async (req, res) => {
  const { users } = req.body;
  for await (const user of users) {
    await User.create(user)
      .then((user) => console.log("Success"))
      .catch((err) => res.json({ user: "", status: err.message }));
  }
  await User.find({}).then((users) => res.json({ users, status: "success" }));
};

/*
  @method: DELETE
  @url: /workers
*/
const delete_workers = (req, res) => {
  User.deleteMany({}, (err, docs) => {
    if (err) {
      res.json({ status: "error" });
    } else {
      res.json({ number: docs.n, users: [], status: "success" });
    }
  });
};

// Retrieve, add and remove a specific worker
/*
  @method: GET 
  @url: /workers/:id
*/
const get_worker_by_id = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => res.json({ user, status: "success" }))
    .catch((err) => res.json({ user: "", status: "error" }));
};

/*
  @method: POST
  @url: /workers/:id
  @body
      {
        country: 'Vietnam',
        firstName: 'Nam',
        lastName: 'Nguyen',
        email: 'abc@gmail.com',
        password: '123456789',
        city: 'Melbourne',
        state: 'VIC',
        zipCode: '3125',
        phoneNumber: '',
        address: 'Middleborough Rd'
      }
*/
const add_worker_by_id = async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  User.create({ ...user, _id: id })
    .then((user) => res.json({ user, status: "success" }))
    .catch((err) => res.json({ user: "", status: err.message }));
};

/*
  @method: DELETE
  @url: /workers/:id
*/
const delete_worker_by_id = (req, res) => {
  const { id } = req.params;
  User.deleteOne({ _id: id })
    .then((user) => res.json({ status: "success" }))
    .catch((err) => res.json({ status: err }));
};

// Update a worker
/*
  @method: PUT
  @url: /workers/address/:id
  @body: 
  {
    address: "123",
  }
*/
const update_address_by_id = (req, res) => {
  const { address } = req.body;
  const { id } = req.params;

  if (validator.isEmpty(address)) {
    res.json({ status: "error", message: "Cannot be empty" });
  } else {
    User.findByIdAndUpdate({ _id: id }, { address })
      .then((user) => {
        User.findById({ _id: id }).then((user) =>
          res.json({ user, status: "success" })
        );
      })
      .catch((err) => res.json({ status: "error", err }));
  }
};

/*
  @method: PUT
  @url: /workers/phone/:id
  @body: 
  {
    phoneNumber: "123",
  }
*/
const update_phoneNumber_by_id = (req, res) => {
  const { phoneNumber } = req.body;
  const { id } = req.params;

  if (validator.isEmpty(phoneNumber)) {
    res.json({ status: "error", message: "Cannot be empty" });
  } else if (
    !validator.isMobilePhone(phoneNumber, [
      "en-AU",
      "en-CA",
      "en-GB",
      "en-GG",
      "en-GH",
      "en-HK",
      "en-MO",
      "en-IE",
      "en-IN",
      "en-KE",
      "en-MT",
      "en-MU",
      "en-NG",
      "en-NZ",
      "en-PK",
      "en-PH",
      "en-RW",
      "en-SG",
      "en-SL",
      "en-UG",
      "en-US",
      "en-TZ",
      "en-ZA",
      "en-ZM",
      "en-ZW",
    ])
  ) {
    res.json({ status: "error", message: "Phone Number is invalid" });
  } else {
    User.findByIdAndUpdate({ _id: id }, { phoneNumber })
      .then((user) => {
        User.findById({ _id: id }).then((user) =>
          res.json({ user, status: "success" })
        );
      })
      .catch((err) => res.json({ status: "error", err }));
  }
};

/*
  @method: PUT
  @url: /workers/password/:id
  @body: 
  {
    password: "123",
  }
*/
const update_password_by_id = async (req, res) => {
  let { password } = req.body;
  const { id } = req.params;

  if (validator.isEmpty(password)) {
    res.json({ status: "error", message: "Cannot be empty" });
  } else {
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate({ _id: id }, { password })
      .then((user) => {
        User.findById({ _id: id }).then((user) =>
          res.json({ user, status: "success" })
        );
      })
      .catch((err) => res.json({ status: "error", err }));
  }
};

// Export all functions
module.exports = {
  get_workers,
  add_workers,
  delete_workers,
  get_worker_by_id,
  add_worker_by_id,
  delete_worker_by_id,
  update_address_by_id,
  update_password_by_id,
  update_phoneNumber_by_id,
};
