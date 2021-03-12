import express from "express";
import User from "./User";

export default interface RequestWithUser extends express.Request {
    user :User
}
