import  User  from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        // console.log(fullname, email, phoneNumber, password, role );

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
      
    
        const file=req.file;
        const fileUri=getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: 'User already exist ',
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 11);
     
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto: cloudResponse.secure_url,
            }
        });

        console.log(User);
        return res.status(201).json({
            message: 'Account created successfully.',
            success: true

        })


    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {

        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }

        // Check if role is correct or not

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role",
                success: false
            });
        }

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });



        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile

        }
        return res.status(200).cookie('token', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true,  sameSite: 'None' }).json(
            {
                message: `Welcome back ${user.fullname} `,
                user,
                success: true


            }
        )


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error. Please try again later.",
            success: false
        });
    }
}


export const logout = async (req, res) => {
    try {

        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true

        })
    } catch (error) {
        console.log(error);
    }
};

export const updateProfile = async (req, res) => {
    try {

        const { fullname, email, phoneNumber, bio, skills } = req.body;

        // console.log(fullname, email, phoneNumber, bio, skills)
        const file = req.file;
        // Cloudinary
            let cloudResponse = null;

        // Handle file only if it's uploaded
        if (file) {
            const fileUri = getDataUri(file);
            
            // cloudResponse = await cloudinary.uploader.upload(fileUri.content);

            const extension = path.extname(file.originalname).toLowerCase(); // e.g., .pdf
  const filename = path.basename(file.originalname, extension).replace(/\s+/g, "_"); // Remove spaces
  const publicId = `resumes/${filename}`; // Add folder path

  cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
    resource_type: "raw",
    public_id: publicId,
    type: "upload"
  });
        }

        

        let skillsArray;

if (skills) {
    skillsArray = Array.isArray(skills) ? skills : [skills];
}
        

        const userId = req.id; //Middleware authentication

        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: 'user not found',
                success: false
            })
        }

        // Updating data

        if(fullname) user.fullname = fullname;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills)  user.profile.skills = skillsArray;
        if(email) user.email = email;
        
    
        // Resume 
        if(cloudResponse)
        {
            // user.profile.resume=cloudResponse.secure_url //save the cloudinary url
            // user.profile.resumeOriginalName= file.originalname // save the og file name

              const inlineUrl = `https://res.cloudinary.com/${process.env.CLOUD_NAME}/raw/upload/fl_attachment:false/${publicId}${extension}`;

    user.profile.resume = inlineUrl;
    user.profile.resumeOriginalName = file.originalname;
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile

        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true


        })

    } catch (error) {
        console.log(error);
    }
}
