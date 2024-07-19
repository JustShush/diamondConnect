const color = require("colors");
const Roles = require("../../roles.json");

module.exports = {
	name: "guildMemberUpdate",
	async execute(oldMember, newMember) {

		const guild = oldMember.guild;

		const oldRoles = oldMember.roles.cache;
		const newRoles = newMember.roles.cache;

		const addedRoles = newRoles.filter( roles => !oldRoles.has(roles.id)).map(role => role.id);
		const removedRoles = oldRoles.filter( roles => !newRoles.has(roles.id)).map(role => role.id);

		switch (guild.id) {
			case "940607525512962088": // GOV

				if (addedRoles.length > 0) {
					addedRoles.forEach(async role => {
						// check every server to add the new roles

						//! small problem, if the member is in one server but not the other the bot just returns
						//! this happens in the returns when fetching the member and the server.

						// PD
						const PDGuild = client.guilds.cache.get(Roles.PD.server);
						if (!PDGuild) return console.log(`PD Guild "${Roles.PD.server}" not found!`);

						const PDMember = await PDGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching PDMember"));
						if (!PDMember) return console.log(`User ${newMember.user.tag} is not in the PD Guild!`)

						// EMS
						const EMSGuild = client.guilds.cache.get(Roles.EMS.server);
						if (!EMSGuild) return console.log(`EMS Guild "${Roles.EMS.server}" not found!`);

						const EMSMember = await EMSGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching EMSMember"));
						if (!EMSMember) return console.log(`User ${newMember.user.tag} is not in the EMS Guild!`)

						// check if the member receive a PD role in GOV server
						if (role.id == Roles.PD.default && !PDMember.roles.cache.has(Roles.PD.default)) {
							// fetch both PD and EMS server and add those roles to the member if it is in the server.
							let role = PDMember.guild.roles.cache.get(Roles.PD.default);
							await PDMember.roles.add(role);
							role = EMSMember.guild.roles.cache.get(Roles.PD.default);
							await EMSMember.roles.add(role);
						}
						if (role.id == Roles.PD.GOV && !member.roles.cache.has(Roles.GOV.default)) {
							const role = member.guild.roles.cache.get(Roles.GOV.default);
							await member.roles.add(role);
						}
						if (role.id == Roles.PD.EMS && !member.roles.cache.has(Roles.GOV.EMS)) {
							const role = member.guild.roles.cache.get(Roles.GOV.EMS);
							await member.roles.add(role);
						}

					});
				}
					console.log(`Roles added: ${addedRoles.join(", ")}`);
			
				if (removedRoles.length > 0)
					console.log(`Roles removed: ${removedRoles.join(", ")}`);

				break;
		
			default:
				break;
		}
	},
};
