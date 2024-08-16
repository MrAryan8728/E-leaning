export const register = async(req, res) =>{
    try {
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}