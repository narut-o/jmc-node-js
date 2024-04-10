export const cookieOptions = {
    
    httpOnly:true,
    expires:new Date(Date.now()+12*60*60*1000),
    sameSite:process.env.NODE_ENV === "PRODUCTION" ? "none" : "lax",
    secure:process.env.NODE_ENV === "PRODUCTION" ? true : false
};