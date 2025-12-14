import Authmodel from "../Models/AuthModel.js"
import jwt from "jsonwebtoken";
class AuthController{

     static async Login(req, res) {
    try {
      const data = req.body;

      
      const verify = await Authmodel.loginVerify(data);

      if (!verify.status) {
        return res.status(401).json({
          status: false,
          message: "Invalid email or password",
        });
      }

     
      const token = jwt.sign(
        {
          id: verify.id,
          email: verify.email,
        },
        process.env.JWT_SECRET || "mysecretkey",
        {
          expiresIn: "1d", 
        }
      );

     
      return res.status(200).json({
        status: "success",
        message: "Login successful",
        token,
        user: {
          id: verify.id,
          email: verify.email,
        },
      });

    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }
  static async signup(req, res) {
  try {
    const data = req.body;

    const result = await Authmodel.signup(data);

    if (result.affectedRows > 0) {
         const re = await Authmodel.loginInsert(data);
      return res.status(200).json({
        status: "success",
        message: "User registered successfully",
      });
    } else {
      return res.status(200).json({
        status: "error",
        message: "Something went wrong",
      });
    }
  } catch (error) {
    console.error("Signup Error:", error);

    return res.status(200).json({
      status: "error",
      message: error.message || "Internal server error",
    });
  }
}

} 
export default AuthController;