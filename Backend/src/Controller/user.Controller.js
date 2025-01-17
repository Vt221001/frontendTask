import wrapAsync from "../util/wrapAsync.js";
import { ApiResponse } from "../util/responseHandler.js";
import { ApiError } from "../util/errorHandler.js";
import { User } from "../Model/user.Model.js";
import { createUserValidation } from "../Validation/user.Validation.js";
import cloudinary from "../util/cloudinaryConfig.js";

export const createUser = wrapAsync(async (req, res, next) => {
    const { error } = createUserValidation.validate({
        ...req.body,
        photo: req.file?.path,
    });

    if (error) {
        return next(new ApiError(400, error.details[0].message));
    }

    const { name, email, description, address, hobby, location } = req.body;

    const newUser = new User({
        name,
        email,
        description,
        address,
        hobby,
        location,
        photo: req.file.path,
    });

    await newUser.save();

    res.status(201).json(
        new ApiResponse(201, newUser, "User Created Successfully")
    );
});

export const getAllUsers = wrapAsync(async (req, res, next) => {
    const users = await User.find();

    if (users.length === 0) {
        return next(new ApiError(404, "No User Found"));
    }

    res.status(200).json(new ApiResponse(200, users, "All Users"));
});

export const getUserId = wrapAsync(async (req, res, next) => {
    const { id } = req.body;

    const user = await User.findById(id);

    if (!user) {
        return next(new ApiError(404, "User Not Found"));
    }

    res.status(200).json(new ApiResponse(200, user, "User Found Successfully"));
});

export const updateUser = wrapAsync(async (req, res, next) => {
    const { userId, name, email, description, address, hobby, location } =
        req.body;

    console.log(
        "Id",
        userId,
        "Name",
        name,
        "Email",
        email,
        "Description",
        description,
        "Address",
        address,
        "Hobby",
        hobby,
        "Location",
        location
    );

    const photo = req.file ? req.file.path : null;

    const user = await User.findById(userId);
    if (!user) {
        return next(new ApiError(404, "User Not Found"));
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.description = description || user.description;
    user.address = address || user.address;
    user.hobby = hobby || user.hobby;
    user.location = location || user.location;

    if (photo) {
        user.photo = photo;
    }

    await user.save();

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User Updated Successfully"));
});

export const deleteUser = wrapAsync(async (req, res, next) => {
    const deleteUser = await User.findByIdAndDelete(req.body.id);
    console.log(req.body.id);

    if (!deleteUser) {
        return next(new ApiError(404, "User Not Found"));
    }

    if (deleteUser.photo) {
        const photoUrl = deleteUser.photo;
        const publicId = photoUrl.split("/").slice(-2).join("/").split(".")[0];

        try {
            await cloudinary.uploader.destroy(publicId);
        } catch (error) {
            return next(new ApiError(500, "Error in deleting photo"));
        }
    }

    res.status(200).json(
        new ApiResponse(200, deleteUser, "User Deleted Successfully")
    );
});
