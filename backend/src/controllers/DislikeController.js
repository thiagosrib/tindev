const Dev = require('../models/Dev');

module.exports = {
    async store(request, response) {
        const { user }  = request.headers;
        const { devId } = request.params;

        const loggedDev = await Dev.findById(user);
        if (!loggedDev) {
            return response.status(400).json({ error: 'User not exists. Please Sign up.' });
        }

        const targedDev = await Dev.findById(devId);
        if (!targedDev) {
            return response.status(400).json({ error: 'Dev not exists' });
        }

        console.log(`${loggedDev.name} deu dislike em ${targedDev.name}`);
        loggedDev.dislikes.push(targedDev._id);
        await loggedDev.save();

        return response.json(loggedDev);
    }
};