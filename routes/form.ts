import * as express from "express";
import FormController from "../controllers/FormController";

const form = express.Router();
const formCtrl = new FormController();

form.get('/', async (req, res) => {
    const result = await formCtrl.loadForm(Number(req.query.page), Number(req.query.limit), Number(req.query.user_id), Number(req.query.friend_id));
    res.statusCode = result.status;
    res.json(result);
});

export default form;