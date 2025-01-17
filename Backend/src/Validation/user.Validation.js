import JOI from "joi";

export const createUserValidation = JOI.object({
    name: JOI.string().required(),
    photo: JOI.string().required(),
    email: JOI.string().email().required(),
    description: JOI.string().required(),
    address: JOI.string().required(),
    hobby: JOI.string(),
    location: JOI.object({
        lat: JOI.number().required(),
        lng: JOI.number().required(),
    }),
});
