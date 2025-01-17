import { Admin } from "../Model/admin.Model.js";
import wrapAsync from "../util/wrapAsync.js";
import { ApiResponse } from "../util/responseHandler.js";
import { ApiError } from "../util/errorHandler.js";
import { generateRefreshToken } from "../util/generateRefreshToken.js";
import { generateAccessToken } from "../util/generateAcessToken.js";
import jwt from "jsonwebtoken";

export const createAdmin = wrapAsync(async (req, res, next) => {
    const { name, email, password, address } = req.body;

    const admin = new Admin({
        name,
        email,
        password,
        address,
    });

    await admin.save();

    res.status(201).json(
        new ApiResponse(201, admin, "Admin Created Successfully")
    );
});

export const getAllAdmin = wrapAsync(async (req, res, next) => {
    const admin = await Admin.find();

    if (!admin) {
        return next(new ApiError(404, "No Admin Found"));
    }

    return res.status(200).json(new ApiResponse(200, admin, "All Admins"));
});

export const getAdminById = wrapAsync(async (req, res, next) => {
    const { id } = req.body;
    const admin = await Admin.findById(id);

    if (!admin) {
        return next(new ApiError(404, "Admin Not Found"));
    }

    return res.status(200).json(new ApiResponse(200, admin, "Admin"));
});

export const updateAdmin = wrapAsync(async (req, res, next) => {
    const { id, name, email, password, address } = req.body;
    const admin = await Admin.findById(id);

    if (!admin) {
        return next(new ApiError(404, "Admin Not Found"));
    }

    if (name) admin.name = name;
    if (email) admin.email = email;
    if (address) admin.address = address;

    await admin.save();

    return res.status(200).json(new ApiResponse(200, admin, "Admin Updated"));
});

export const deleteAdmin = wrapAsync(async (req, res, next) => {
    const { id } = req.body;

    const admin = await Admin.findByIdAndDelete(id);

    if (!admin) {
        return next(new ApiError(404, "Admin Not Found"));
    }

    return res.status(200).json(new ApiResponse(200, admin, "Admin Deleted"));
});

const generateAccessAndRefreshTokens = async (
    adminId,
    options = { accessToken: true, refreshToken: true },
    next
) => {
    const admin = await Admin.findById(adminId);
    let accessToken = null;
    let refreshToken = null;

    if (options.accessToken) {
        accessToken = generateAccessToken(admin);
    }

    if (options.refreshToken) {
        refreshToken = generateRefreshToken(admin);
    }

    if (options.refreshToken && !refreshToken) {
        return next(new ApiError(500, "Refresh token not generated"));
    }

    if (options.accessToken && !accessToken) {
        return next(new ApiError(500, "Access token not generated"));
    }

    return { accessToken, refreshToken };
};

export const loginAdmin = wrapAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
        return next(new ApiError(404, "Admin Not Found"));
    }

    const isPasswordValid = await admin.isValidatePassword(password);

    if (!isPasswordValid) {
        return next(new ApiError(401, "Invalid Password"));
    }

    let { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        admin._id,
        { accessToken: true, refreshToken: !admin.refreshToken },
        next
    );

    if (refreshToken) {
        admin.refreshToken = refreshToken;
        await admin.save();
    }

    if (!refreshToken) {
        refreshToken = admin.refreshToken;
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { admin, accessToken, refreshToken },
                "Admin Logged in"
            )
        );
});

export const newRefreshToken = wrapAsync(async (req, res, next) => {
    const { newRefreshToken } = req.body;

    if (!newRefreshToken) {
        return next(new ApiError(401, "Unauthorized request"));
    }

    let decodeToken;

    try {
        decodeToken = jwt.verify(
            newRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
    } catch (error) {
        return next(new ApiError(401, "Invalid refesh token"));
    }

    const admin = await Admin.findById(decodeToken?.id);
    if (!admin) {
        return next(new ApiError(401, "Invalid refesh token"));
    }

    if (newRefreshToken !== admin.refreshToken) {
        return next(new ApiError(401, "Refresh token is expired or used "));
    }

    const { accessToken } = await generateAccessAndRefreshTokens(
        admin._id,
        { accessToken: true, refreshToken: false },
        next
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { accessToken, newRefreshToken },
                "New access token generated"
            )
        );
});
