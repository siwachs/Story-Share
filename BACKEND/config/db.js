import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Mongo DB connected ${con.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
