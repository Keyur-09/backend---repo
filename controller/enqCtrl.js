const Enquiry = require("../models/enqModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");
const axios = require("axios");

const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const { recaptchaValue } = req.body;
    // console.log("-----------",recaptchaValue);
    
    const secretKey = process.env.GOOGLE_SECRET_KEY;
    const data = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaValue}`
    );
    // console.log(data.data.success);
    

    if (data.data.success) {
      const newEnquiry = await Enquiry.create(req.body);
      res.json(newEnquiry);
    } else {
      res.status(400).json({ message: "Invalid reCAPTCHA" });
    }
  } catch (error) {
    throw new Error(error);
  }
});
const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
    res.json(deletedEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const getEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaEnquiry = await Enquiry.findById(id);
    res.json(getaEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const getallEnquiry = asyncHandler(async (req, res) => {
  try {
    const getallEnquiry = await Enquiry.find();
    res.json(getallEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getallEnquiry,
};
