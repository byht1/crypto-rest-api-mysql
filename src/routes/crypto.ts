import { currencyName } from "./../controllers/crypto/currency/currencyName.controller";
import { crypto } from "./../controllers/crypto/popular/popular.controller";
import { ctrlWrapper } from "./../helpers/ctrlWrapper";
import express from "express";

// import { ctrlWrapper } from "helpers";

// import { crypto, currencyName } from "controllers";

const router = express.Router();

router.get("/popular", ctrlWrapper(crypto));
router.get("/currency/:name", ctrlWrapper(currencyName));

export const routerCrypto = router;
