const color = require("colors");
const Roles = require("../../roles.json");

module.exports = {
	name: "guildMemberUpdate",
	async execute(oldMember, newMember, client) {
		console.log("update!!!", `${newMember.user.username} | ${newMember.user.id}`);

		const guild = oldMember.guild;

		const oldRoles = oldMember.roles.cache;
		const newRoles = newMember.roles.cache;

		const addedRoles = newRoles.filter(roles => !oldRoles.has(roles.id)).map(role => role.id);
		const removedRoles = oldRoles.filter(roles => !newRoles.has(roles.id)).map(role => role.id);

		switch (guild.id) {
			case "1262454167792779264": // GOV

				if (addedRoles.length > 0) {
					addedRoles.forEach(async role => {
						// check every server to add the GOV role when the change is in the GOV server

						// PD
						const PDGuild = client.guilds.cache.get(Roles.PD.server);
						if (!PDGuild) return console.log(`PD Guild "${Roles.PD.server}" not found! update`);

						const PDMember = await PDGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching PDMember"));
						if (PDMember) {
							// check if the member received a PD role in GOV server
							if (role == Roles.GOV.default && !PDMember.roles.cache.has(Roles.PD.GOV)) {
								const rolE = PDMember.guild.roles.cache.get(Roles.PD.GOV);
								await PDMember.roles.add(rolE);
							}
						}
						else console.log(`User ${newMember.user.tag} is not in the PD Guild! update`)

						// EMS
						const EMSGuild = client.guilds.cache.get(Roles.EMS.server);
						if (!EMSGuild) return console.log(`EMS Guild "${Roles.EMS.server}" not found! update`);

						const EMSMember = await EMSGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching EMSMember"));
						if (EMSMember) {
							// check if the member received a EMS role in GOV server
							if (role == Roles.GOV.default && !EMSMember.roles.cache.has(Roles.EMS.GOV)) {
								const rolE = EMSMember.guild.roles.cache.get(Roles.EMS.GOV);
								await EMSMember.roles.add(rolE);
							}
						}
						else console.log(`User ${newMember.user.tag} is not in the EMS Guild! update`)

						// BCSO
						const BCSOGuild = client.guilds.cache.get(Roles.BCSO.server);
						if (!BCSOGuild) return console.log(`EMS Guild "${Roles.BCSO.server}" not found! update`);

						const BCSOMember = await BCSOGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching BCSOMember"));
						if (BCSOMember) {
							// check if the member received a BCSO role in GOV server
							if (role == Roles.GOV.default && !BCSOMember.roles.cache.has(Roles.BCSO.GOV)) {
								const rolE = BCSOMember.guild.roles.cache.get(Roles.BCSO.GOV);
								await BCSOMember.roles.add(rolE);
							}
						}
						else console.log(`User ${newMember.user.tag} is not in the BCSO Guild! update`)

					});
					console.log(`Roles added: ${addedRoles.join(", ")}`);
				}

				if (removedRoles.length > 0) {
					removedRoles.forEach(async role => {
						// check every server to add the new roles

						// PD
						const PDGuild = client.guilds.cache.get(Roles.PD.server);
						if (!PDGuild) return console.log(`PD Guild "${Roles.PD.server}" not found! update`);

						const PDMember = await PDGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching PDMember"));
						if (PDMember) {
							// check if the member received a PD role in GOV server
							if (role == Roles.GOV.default && PDMember.roles.cache.has(Roles.PD.GOV)) {
								const rolE = PDMember.guild.roles.cache.get(Roles.PD.GOV);
								await PDMember.roles.remove(rolE);
							}
						}
						else console.log(`User ${newMember.user.tag} is not in the PD Guild! update`)

						// EMS
						const EMSGuild = client.guilds.cache.get(Roles.EMS.server);
						if (!EMSGuild) return console.log(`EMS Guild "${Roles.EMS.server}" not found! update`);

						const EMSMember = await EMSGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching EMSMember"));
						if (EMSMember) {
							// check if the member received a EMS role in GOV server
							if (role == Roles.GOV.default && EMSMember.roles.cache.has(Roles.EMS.GOV)) {
								const rolE = EMSMember.guild.roles.cache.get(Roles.EMS.GOV);
								await EMSMember.roles.remove(rolE);
							}
						}
						else console.log(`User ${newMember.user.tag} is not in the EMS Guild! update`)

						// BCSO
						const BCSOGuild = client.guilds.cache.get(Roles.BCSO.server);
						if (!BCSOGuild) return console.log(`EMS Guild "${Roles.BCSO.server}" not found! update`);

						const BCSOMember = await BCSOGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching BCSOMember"));
						if (BCSOMember) {
							// check if the member received a BCSO role in GOV server
							if (role == Roles.GOV.default && BCSOMember.roles.cache.has(Roles.BCSO.GOV)) {
								const rolE = BCSOMember.guild.roles.cache.get(Roles.BCSO.GOV);
								await BCSOMember.roles.remove(rolE);
							}
						}
						else console.log(`User ${newMember.user.tag} is not in the BCSO Guild! update`)

					});
					console.log(`Roles removed: ${removedRoles.join(", ")}`);
				}

				break;

			case "123": // LSPD server

				break;

			case "123": // EMS server

				break;

			case "123": // BCSO server

				break;

			default:
				break;
		}
	},
};
