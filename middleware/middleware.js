import jwt from "jsonwebtoken"

const authMiddleware = (req,res,next)=>{
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTIyNTIzMTJiMGQ3NmY5MGVjMzU2NCIsImlhdCI6MTcyMTkxMTQ0MX0.AhveGz-VCJ16tmIjhC0gXRkVRHC9cy7iHDF1apwy6vE"
const token = req.headers.token
   try {
    if (!token) return res.status(401).json({success:false,msg:"No token provided"})
         
        const decodeToken = jwt.verify(token,process.env.SECRET_KEY)
        req.userId = decodeToken.id
       
        //  res.status(200).json({success:true,msg:"Token decoded successfully",decodeToken})
        
        next();
   } catch (error) {
      console.log(error)
      return res.status(500).json({success:false,msg:"Invalid token"})
   }
   

}
export default authMiddleware