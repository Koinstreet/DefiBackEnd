const { CREATED, UNAUTHORIZED, BAD_REQUEST, OK } = require("http-status-codes");

// DB
const Funded = require("../../../model/v1/funded");
const Startups = require("../../../model/v1/Startups");

const {
  successWithData,
  successNoData,
} = require("../../../utils/successHandler");

// Error
const AppError = require("../../../utils/appError");

exports.createFund = async (req, res, next) => {
  try {
    let Fund = {
        ...req.body,
        startup_id: req.body.startup_id,
        user_id : req.user.id
      };
    const fund = await Startups.findById(req.body.startup_id).populate(
              "_id"
            );
    if (!fund) {
        console.log('no Startup found')
    }

    const newFund= await Funded.create(Fund);

    return successWithData(
      res,
      CREATED,
      "Fund created successfully",
      newFund
    );
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.getAllFund= async (req, res, next) => {
  try {
    const Funds = await Funded.find({}).populate("user_id").populate("startup_id")
      .sort("-createdAt");
    return successWithData(res, OK, "Fund fetched successfully", Funds);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};


exports.getFund = async (req, res, next) => {
  try {
    const Fund = await Funded.findById(req.params.id).populate("user_id").populate("startup_id");
    if (!Fund) return AppError.tryCatchError(res, err);
    return successWithData(res, OK, "Fund fetched successfully", Fund);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.updateFund = async (req, res, next) => {
  
  try {

    const FundUpdate = await Funded.findById(req.params.id);
    if (!FundUpdate) return AppError.tryCatchError(res, err);

    let Fund = {
        ...req.body,
        startup_id: req.body.startup_id,
        user_id : req.user.id
      };
    
    const modifiedFund = await Funded.findOneAndUpdate(
      { _id: req.params.id },
      { ...Fund },
      { new: true }
    );
    return successWithData(res, OK, "Fund modified", modifiedFund);
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};

exports.deleteFund = async (req, res, file) => {
  try {
    await Funded.findOneAndDelete({ _id: req.params.id });
    return successNoData(res, OK, "Fund deleted");
  } catch (err) {
    console.log(err);
    return AppError.tryCatchError(res, err);
  }
};
