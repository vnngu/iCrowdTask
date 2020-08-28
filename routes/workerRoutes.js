const express = require("express");
const router = express.Router();
const workerController = require("../controllers/workerController");

// Retrieve, add and remove worker
router.get("/", workerController.get_workers);
router.post("/", workerController.add_workers);
router.delete("/", workerController.delete_workers);

// Retrieve, add and remove a specific worker
router.get("/:id", workerController.get_worker_by_id);
router.post("/:id", workerController.add_worker_by_id);
router.delete("/:id", workerController.delete_worker_by_id);

// Update a worker's address and mobile number
router.put("/password/:id", workerController.update_password_by_id);
router.put("/address/:id", workerController.update_address_by_id);
router.put("/phone/:id", workerController.update_phoneNumber_by_id);

module.exports = router;
