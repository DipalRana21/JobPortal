import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {

    try {
        console.log("Cookies in request:", req.cookies);
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false

            })

        }

        const decode= await jwt.verify(token,process.env.SECRET_KEY);
        console.log("Decoded token:", decode);

        if(!decode)
        {
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        }

        req.id=decode.userId;
         console.log("User ID in request:", req.id);
        next();

    } catch (error) {
        console.log("Authentication error:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }


}

export default isAuthenticated;
