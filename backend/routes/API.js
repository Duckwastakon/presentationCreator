import express from "express";

const APIRouter = express.Router()

APIRouter.get("/", (req, res) => {
    res.json({ message: "Hello from Api!" });
})

APIRouter.get("/:WantedValue", (req, res) => {
    res.send(req.params.WantedValue)
})

export default APIRouter