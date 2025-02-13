import { connect } from "mongoose";
const connectDB = async (url) => await connect(url, { dbName: "exem5" });
export default connectDB;
