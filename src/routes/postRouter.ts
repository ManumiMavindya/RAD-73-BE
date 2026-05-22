import { Router } from "express"
import { createPost, getAllPost, getMyPost } from "../controller/postController"
import { authenticate } from "../middleware/auth"
import { requireRole } from "../middleware/role"
import { UserRole } from "../models/userModel"
import { upload } from "../middleware/upload"
import dns from "node:dns"

dns.setServers(["8.8.8.8", "8.8.4.4"])
const router = Router()

router.post(
  "/create",
  authenticate,
  requireRole([UserRole.ADMIN, UserRole.MANAGER]),
  upload.single("image"), // form data key name
  createPost
)

router.get("/", getAllPost)

router.get(
  "/me",
  authenticate,
  requireRole([UserRole.ADMIN, UserRole.MANAGER]),
  getMyPost
)

export default router
