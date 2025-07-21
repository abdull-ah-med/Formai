import { Router } from "express";
import { generateForm, reviseForm, finalizeForm } from "../controllers/formController";
import verifyJWT from "../middleware/verifyJWT";

const router = Router();

router.post("/generate", verifyJWT, generateForm);

router.post("/revise", verifyJWT, reviseForm);

router.post("/finalize", verifyJWT, finalizeForm);

export default router;
