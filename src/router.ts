import express from 'express'

import serviceController from './controllers/serviceController'

const router = express.Router()

router.get("/services", serviceController.createService)
router.put("/services/:service", serviceController.updateService)
router.delete("/services/:service", serviceController.deleteService)

export default router
