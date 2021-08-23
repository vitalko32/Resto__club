export const jwtConstants = {
    secret: process.env.RESTLINKAPIKEY, // OS environment variable!    
    signOptions: {expiresIn: 60*60*24*365}, // expiresIn - time in seconds    
};
