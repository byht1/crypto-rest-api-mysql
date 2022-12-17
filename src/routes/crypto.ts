import express from "express";

import { ctrlWrapper } from "helpers/ctrlWrapper";

import { crypto, currencyName } from "controllers";

const router = express.Router();

router.get("/popular", ctrlWrapper(crypto));
router.get("/currency/:name", ctrlWrapper(currencyName));

export const routerCrypto = router;
