import joi from "joi";
//import { CreateRecommendationData } from "../services/recommendationsService.js";

const youtubeLinkRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;

export const recommendationSchema = joi.object({
  title: joi.string().required(),
  description:joi.string().required(),
  userId:joi.number().required(),
  youtubeLink: joi.string().pattern(youtubeLinkRegex),
  externalURL: joi.string().uri(),
  categories: joi.array().required()
});
