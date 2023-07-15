
export const homeController = (req, res, next) =>{ 
    res.status(200).json({server:`server is running on http://localhost:${process.env.PORT}`});
}