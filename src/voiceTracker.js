const { Events } = require('discord.js');

const voiceUsers = new Map();

module.exports = (client) => {

    client.on(Events.VoiceStateUpdate, async (oldState, newState) => {

        const allowedChannels = [
            'حط_ايدي_الروم'
        ];1061717272072310878

        const userId = newState.id;

        // دخل روم
        if (!oldState.channelId && newState.channelId) {

            if (!allowedChannels.includes(newState.channelId)) return;

            voiceUsers.set(userId, {
                joinTime: Date.now(),
                sessions: (voiceUsers.get(userId)?.sessions || 0) + 1
            });

            console.log(`${newState.member.user.tag} joined voice`);
        }

        // خرج من روم
        if (oldState.channelId && !newState.channelId) {

            const data = voiceUsers.get(userId);

            if (!data) return;

            const totalSeconds = Math.floor((Date.now() - data.joinTime) / 1000);

            console.log(`
User: ${newState.member.user.tag}
Time: ${totalSeconds} sec
Sessions: ${data.sessions}
            `);

            voiceUsers.delete(userId);
        }

    });

};
