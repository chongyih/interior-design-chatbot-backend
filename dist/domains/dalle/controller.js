"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editBaseImage = exports.storeImage = exports.createImage = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const db_1 = require("../../utils/db");
const replicate_1 = __importDefault(require("replicate"));
const createImage = (openai, prompt, n = 3, size = "512x512") => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield openai.createImage({
        prompt: prompt,
        n: n,
        size: size,
        response_format: "b64_json"
    });
    return response.data.data.map((image) => image.b64_json);
});
exports.createImage = createImage;
const storeImage = (res, chat_id, image) => __awaiter(void 0, void 0, void 0, function* () {
    const s3 = new aws_sdk_1.default.S3({
        region: 'ap-southeast-1',
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    });
    const params = {
        Bucket: 'interio-ai-base-image',
        Key: `${chat_id}.png`,
        Body: Buffer.from(image, 'base64'),
        ContentEncoding: 'base64',
        ContentType: 'image/png'
    };
    s3.upload(params, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.status(500).json(err);
        }
        const updateStatus = yield (0, db_1.updateImage)(chat_id, data.Location);
        if (!updateStatus)
            return res.status(500).json("Error uploading image");
        res.json({ imageLink: data.Location });
    }));
});
exports.storeImage = storeImage;
const editBaseImage = (prompt, imageLink, samples = 2) => __awaiter(void 0, void 0, void 0, function* () {
    // const resp = await axios.post("https://stablediffusionapi.com/api/v5/controlnet", {
    //     key: process.env.STABLE_DIFFUSION_KEY,
    //     controlnet_model: "canny",
    //     model_id: "midjourney",
    //     auto_hint: "yes",
    //     prompt: prompt,
    //     negative_prompt: null,
    //     init_image: imageLink,
    //     width: 512,
    //     height: 512,
    //     samples: samples,
    //     num_inference_steps: "30",
    //     safety_checker: "no",
    //     enhance_prompts: "yes",
    //     scheduler: "UniPCMultistepScheduler",
    //     guidance_scale: 7.5,
    //     strength: 0.7,
    //     seed: null,
    //     webhook: null,
    //     track_id: null
    // })
    // const resp = await axios.post("https://stablediffusionapi.com/api/v5/interior", {
    //     key: process.env.STABLE_DIFFUSION_KEY,
    //     prompt: prompt,
    //     init_image: imageLink
    // })
    // if (resp.data.status === "failed" || resp.data.status === "error") {
    //     console.error(resp.data)
    //     return false
    // }
    // if (resp.data.status === "processing") {
    //     return resp.data.eta
    // } else if (resp.data.output) {
    //     return resp.data.output
    // }
    const replicate = new replicate_1.default({ auth: process.env.REPLICATE_API_TOKEN, userAgent: 'Interio AI' });
    // @ts-ignore
    const output = yield replicate.run("jagilley/controlnet-hough:854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b", {
        input: {
            image: imageLink,
            prompt: prompt,
            num_samples: "1",
        }
    });
    output.shift();
    return output;
});
exports.editBaseImage = editBaseImage;
//# sourceMappingURL=controller.js.map