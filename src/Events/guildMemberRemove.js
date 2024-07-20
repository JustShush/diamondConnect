const color = require("colors");
const { GuildMember, Client } = require("discord.js");
const Roles = require("../../roles.json");

module.exports = {
	name: "guildMemberRemove",
	/**
	 * @param {GuildMember} member
	 * @param {Client} client
	 */
	async execute(member, client) {
		// remove the server's default role from the member in the rest of the servers
	},
};
