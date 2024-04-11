const { name } = require("ejs");
const User = require("../../models/User");

exports.sginUpUser = async (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    const userPesponse = await User.create(user,{
        fields: ['name', 'email', 'password']
    });
    res.status(200).json({
        data: userPesponse
    })
}

exports.signInUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // Đăng nhập thành công, trả về thông báo thành công
        res.status(200).json({
            message: 'Login successful',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}