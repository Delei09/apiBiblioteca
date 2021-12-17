import express from "express";
import Rotas from "../rotas";

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const porta = 3001;

app.use(express.json())
app.use(Rotas)


export  { app , porta}