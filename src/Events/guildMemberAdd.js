const color = require("colors");
const { GuildMember } = require("discord.js");
const Roles = require("../../roles.json");

module.exports = {
	name: "guildMemberAdd",
	/**
	 * @param {GuildMember} member
	 */
	async execute(member, client) {

		const { user, guild } = member;

		console.log(`${user.username} has joined "${guild.name}"`.brightMagenta.bold);

		switch (guild.id) {
			case "940607525512962088": // GOV
				console.log("GOV!")

				// PD
				const PDGuild = client.guilds.cache.get(Roles.PD.server);
				if (!PDGuild) return console.log(`PD Guild "${Roles.PD.server}" not found! update`);

				const PDMember = await PDGuild.members.fetch(member.id).catch(() => console.log("something when wrong when fetching PDMember"));
				if (!PDMember) return console.log(`User ${member.user.tag} is not in the PD Guild! update`)

				const PDroles = PDMember.roles.cache.map(role => role.id);
				console.log("PD MEMBER", PDroles);

				// run throw all the member roles then add the corresponding role to the GOV server
				for (let i = 0; i < PDroles.length - 1; i++) {
					if (PDroles[i] == Roles.PD.default && !member.roles.cache.has(Roles.GOV.PD)) {
						const role = member.guild.roles.cache.get(Roles.GOV.PD);
						await member.roles.add(role);
					}
					if (PDroles[i] == Roles.PD.GOV && !member.roles.cache.has(Roles.GOV.default)) {
						const role = member.guild.roles.cache.get(Roles.GOV.default);
						await member.roles.add(role);
					}
					if (PDroles[i] == Roles.PD.EMS && !member.roles.cache.has(Roles.GOV.EMS)) {
						const role = member.guild.roles.cache.get(Roles.GOV.EMS);
						await member.roles.add(role);
					}
				}

				// EMS
				const EMSGuild = client.guilds.cache.get(Roles.EMS.server);
				if (!EMSGuild) return console.log(`EMS Guild "${Roles.EMS.server}" not found! update`);

				const EMSMember = await EMSGuild.members.fetch(member.id).catch(() => console.log("something when wrong when fetching EMSMember"));
				if (!EMSMember) return console.log(`User ${member.user.tag} is not in the EMS Guild! update`)

				const EMSroles = EMSMember.roles.cache.map(role => role.id);
				console.log("EMS MEMBER", EMSroles);

				// run throw all the member roles then add the corresponding role to the GOV server
				for (let i = 0; i < EMSroles.length - 1; i++) {
					if (EMSroles[i] == Roles.EMS.default && !member.roles.cache.has(Roles.GOV.PD)) {
						const role = member.guild.roles.cache.get(Roles.GOV.PD);
						await member.roles.add(role);
					}
					if (EMSroles[i] == Roles.EMS.GOV && !member.roles.cache.has(Roles.GOV.default)) {
						const role = member.guild.roles.cache.get(Roles.GOV.default);
						await member.roles.add(role);
					}
					if (EMSroles[i] == Roles.EMS.default && !member.roles.cache.has(Roles.GOV.EMS)) {
						const role = member.guild.roles.cache.get(Roles.GOV.EMS);
						await member.roles.add(role);
					}
				}

				break;
			case "1263588151507812383": // PD

				break;
			default:
				break;
		}
	},
};
