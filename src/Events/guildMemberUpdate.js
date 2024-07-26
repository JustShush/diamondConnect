const color = require("colors");
const { GuildMember, Client } = require("discord.js");
const Roles = require("../../roles.json");
const { getTimestamp } = require("../Functions/getTimestamp.js");

module.exports = {
	name: "guildMemberUpdate",
	/**
	 * @param {GuildMember} oldMember
	 * @param {GuildMember} newMember
	 * @param {Client} client
	 */
	async execute(oldMember, newMember, client) {
		console.log(`[${getTimestamp(1)}] update!`, `${newMember.user.username} | ${newMember.user.id}`);

		const guild = oldMember.guild;

		const oldRoles = oldMember.roles.cache;
		const newRoles = newMember.roles.cache;

		const addedRoles = newRoles.filter(roles => !oldRoles.has(roles.id)).map(role => role.id);
		const removedRoles = oldRoles.filter(roles => !newRoles.has(roles.id)).map(role => role.id);

		switch (guild.id) {
			case Roles.GOV.server: // GOV

				if (addedRoles.length > 0) {
					addedRoles.forEach(async role => {
						// check every server to add the GOV role when the change is in the GOV server

						// PD
						const PDGuild = client.guilds.cache.get(Roles.PD.server);
						if (PDGuild) {
							const PDMember = await PDGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching PDMember"));
							if (PDMember) {
								// check if the member received a PD role in GOV server
								if (role == Roles.GOV.default && !PDMember.roles.cache.has(Roles.PD.GOV)) {
									const rolE = PDMember.guild.roles.cache.get(Roles.PD.GOV);
									if (rolE) await PDMember.roles.add(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the PD Guild! update`)
						} else console.log(`PD Guild "${Roles.PD.server}" not found! update`);

						// EMS
						const EMSGuild = client.guilds.cache.get(Roles.EMS.server);
						if (EMSGuild) {
							const EMSMember = await EMSGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching EMSMember"));
							if (EMSMember) {
								// check if the member received a EMS role in GOV server
								if (role == Roles.GOV.default && !EMSMember.roles.cache.has(Roles.EMS.GOV)) {
									const rolE = EMSMember.guild.roles.cache.get(Roles.EMS.GOV);
									if (rolE) await EMSMember.roles.add(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the EMS Guild! update`)
						} else console.log(`EMS Guild "${Roles.EMS.server}" not found! update`);

						// BCSO
						const BCSOGuild = client.guilds.cache.get(Roles.BCSO.server);
						if (BCSOGuild) {
							const BCSOMember = await BCSOGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching BCSOMember"));
							if (BCSOMember) {
								// check if the member received a BCSO role in GOV server
								if (role == Roles.GOV.default && !BCSOMember.roles.cache.has(Roles.BCSO.GOV)) {
									const rolE = BCSOMember.guild.roles.cache.get(Roles.BCSO.GOV);
									if (rolE) await BCSOMember.roles.add(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the BCSO Guild! update`)
						} else console.log(`EMS Guild "${Roles.BCSO.server}" not found! update`);

					});
					console.log(`Roles added: ${addedRoles.join(", ")}`);
				}

				if (removedRoles.length > 0) {
					removedRoles.forEach(async role => {
						// check every server to add the new roles

						// PD
						const PDGuild = client.guilds.cache.get(Roles.PD.server);
						if (PDGuild) {
							const PDMember = await PDGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching PDMember"));
							if (PDMember) {
								// check if the member received a PD role in GOV server
								if (role == Roles.GOV.default && PDMember.roles.cache.has(Roles.PD.GOV)) {
									const rolE = PDMember.guild.roles.cache.get(Roles.PD.GOV);
									if (rolE) await PDMember.roles.remove(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the PD Guild! update`)
						} else console.log(`PD Guild "${Roles.PD.server}" not found! update`);

						// EMS
						const EMSGuild = client.guilds.cache.get(Roles.EMS.server);
						if (EMSGuild) {
							const EMSMember = await EMSGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching EMSMember"));
							if (EMSMember) {
								// check if the member received a EMS role in GOV server
								if (role == Roles.GOV.default && EMSMember.roles.cache.has(Roles.EMS.GOV)) {
									const rolE = EMSMember.guild.roles.cache.get(Roles.EMS.GOV);
									if (rolE) await EMSMember.roles.remove(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the EMS Guild! update`)
						} else console.log(`EMS Guild "${Roles.EMS.server}" not found! update`);

						// BCSO
						const BCSOGuild = client.guilds.cache.get(Roles.BCSO.server);
						if (BCSOGuild) {
							const BCSOMember = await BCSOGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching BCSOMember"));
							if (BCSOMember) {
								// check if the member received a BCSO role in GOV server
								if (role == Roles.GOV.default && BCSOMember.roles.cache.has(Roles.BCSO.GOV)) {
									const rolE = BCSOMember.guild.roles.cache.get(Roles.BCSO.GOV);
									if (rolE) await BCSOMember.roles.remove(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the BCSO Guild! update`)
						} else console.log(`EMS Guild "${Roles.BCSO.server}" not found! update`);

					});
					console.log(`Roles removed: ${removedRoles.join(", ")}`);
				}

				break;

			case Roles.PD.server: // LSPD

				if (addedRoles.length > 0) {
					addedRoles.forEach(async role => {
						// check every server to add the PD role when the change is in the PD server

						// GOV
						const GOVGuild = client.guilds.cache.get(Roles.GOV.server);
						if (GOVGuild) {
							const GOVMember = await GOVGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching GOVMember"));
							if (GOVMember) {
								// check if the member received a PD role in GOV server
								if (role == Roles.PD.default && !GOVMember.roles.cache.has(Roles.GOV.PD)) {
									const rolE = GOVMember.guild.roles.cache.get(Roles.GOV.PD);
									if (rolE) await GOVMember.roles.add(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the GOV Guild! update`)
						} else console.log(`GOV Guild "${Roles.GOV.server}" not found! update`);

						// EMS
						const EMSGuild = client.guilds.cache.get(Roles.EMS.server);
						if (EMSGuild) {
							const EMSMember = await EMSGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching EMSMember"));
							if (EMSMember) {
								// check if the member received a EMS role in PD server
								if (role == Roles.PD.default && !EMSMember.roles.cache.has(Roles.EMS.PD)) {
									const rolE = EMSMember.guild.roles.cache.get(Roles.EMS.PD);
									if (rolE) await EMSMember.roles.add(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the EMS Guild! update`)
						} else console.log(`EMS Guild "${Roles.EMS.server}" not found! update`);

						// BCSO
						const BCSOGuild = client.guilds.cache.get(Roles.BCSO.server);
						if (BCSOGuild) {
							const BCSOMember = await BCSOGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching BCSOMember"));
							if (BCSOMember) {
								// check if the member received a BCSO role in PD server
								if (role == Roles.PD.default && !BCSOMember.roles.cache.has(Roles.BCSO.PD)) {
									const rolE = BCSOMember.guild.roles.cache.get(Roles.BCSO.PD);
									if (rolE) await BCSOMember.roles.add(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the BCSO Guild! update`)
						} else console.log(`BCSO Guild "${Roles.BCSO.server}" not found! update`);

					});
					console.log(`Roles added: ${addedRoles.join(", ")}`);
				}

				if (removedRoles.length > 0) {
					removedRoles.forEach(async role => {
						// check every server to add the new roles

						// GOV
						const GOVGuild = client.guilds.cache.get(Roles.GOV.server);
						if (GOVGuild) {
							const GOVMember = await GOVGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching GOVMember"));
							if (GOVMember) {
								// check if the member received a PD role in GOV server
								if (role == Roles.PD.default && !GOVMember.roles.cache.has(Roles.GOV.PD)) {
									const rolE = GOVMember.guild.roles.cache.get(Roles.GOV.PD);
									if (rolE) await GOVMember.roles.remove(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the GOV Guild! update`)
						} else console.log(`GOV Guild "${Roles.GOV.server}" not found! update`);

						// EMS
						const EMSGuild = client.guilds.cache.get(Roles.EMS.server);
						if (EMSGuild) {
							const EMSMember = await EMSGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching EMSMember"));
							if (EMSMember) {
								if (role == Roles.PD.default && EMSMember.roles.cache.has(Roles.EMS.PD)) {
									const rolE = EMSMember.guild.roles.cache.get(Roles.EMS.PD);
									if (rolE) await EMSMember.roles.remove(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the EMS Guild! update`)
						} else console.log(`EMS Guild "${Roles.EMS.server}" not found! update`);

						// BCSO
						const BCSOGuild = client.guilds.cache.get(Roles.BCSO.server);
						if (BCSOGuild) {
							const BCSOMember = await BCSOGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching BCSOMember"));
							if (BCSOMember) {
								if (role == Roles.PD.default && BCSOMember.roles.cache.has(Roles.BCSO.PD)) {
									const rolE = BCSOMember.guild.roles.cache.get(Roles.BCSO.PD);
									if (rolE) await BCSOMember.roles.remove(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the BCSO Guild! update`)
						} else console.log(`EMS Guild "${Roles.BCSO.server}" not found! update`);

					});
					console.log(`Roles removed: ${removedRoles.join(", ")}`);
				}

				break;

			case Roles.EMS.server: // EMS server

				if (addedRoles.length > 0) {
					addedRoles.forEach(async role => {
						// check every server to add the PD role when the change is in the PD server

						// GOV
						const GOVGuild = client.guilds.cache.get(Roles.GOV.server);
						if (GOVGuild) {
							const GOVMember = await GOVGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching GOVMember"));
							if (GOVMember) {
								// check if the member received a PD role in GOV server
								if (role == Roles.EMS.default && !GOVMember.roles.cache.has(Roles.GOV.EMS)) {
									const rolE = GOVMember.guild.roles.cache.get(Roles.GOV.EMS);
									if (rolE) await GOVMember.roles.add(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the GOV Guild! update`)
						} else console.log(`GOV Guild "${Roles.GOV.server}" not found! update`);

						// PD
						const PDGuild = client.guilds.cache.get(Roles.PD.server);
						if (PDGuild) {
							const PDMember = await PDGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching PDMember"));
							if (PDMember) {
								// check if the member received a PD role in GOV server
								if (role == Roles.EMS.default && PDMember.roles.cache.has(Roles.PD.EMS)) {
									const rolE = PDMember.guild.roles.cache.get(Roles.PD.EMS);
									if (rolE) await PDMember.roles.add(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the PD Guild! update`)
						} else console.log(`PD Guild "${Roles.PD.server}" not found! update`);

						// BCSO
						const BCSOGuild = client.guilds.cache.get(Roles.BCSO.server);
						if (BCSOGuild) {
							const BCSOMember = await BCSOGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching BCSOMember"));
							if (BCSOMember) {
								// check if the member received a BCSO role in PD server
								if (role == Roles.EMS.default && !BCSOMember.roles.cache.has(Roles.BCSO.PD)) {
									const rolE = BCSOMember.guild.roles.cache.get(Roles.BCSO.PD);
									if (rolE) await BCSOMember.roles.add(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the BCSO Guild! update`)
						} else console.log(`BCSO Guild "${Roles.BCSO.server}" not found! update`);

					});
					console.log(`Roles added: ${addedRoles.join(", ")}`);
				}

				if (removedRoles.length > 0) {
					removedRoles.forEach(async role => {

						// GOV
						const GOVGuild = client.guilds.cache.get(Roles.GOV.server);
						if (GOVGuild) {
							const GOVMember = await GOVGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching GOVMember"));
							if (GOVMember) {
								// check if the member received a PD role in GOV server
								if (role == Roles.EMS.default && !GOVMember.roles.cache.has(Roles.GOV.EMS)) {
									const rolE = GOVMember.guild.roles.cache.get(Roles.GOV.EMS);
									if (rolE) await GOVMember.roles.remove(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the GOV Guild! update`)
						} else console.log(`GOV Guild "${Roles.GOV.server}" not found! update`);

						// PD
						const PDGuild = client.guilds.cache.get(Roles.PD.server);
						if (PDGuild) {
							const PDMember = await PDGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching PDMember"));
							if (PDMember) {
								// check if the member received a PD role in GOV server
								if (role == Roles.EMS.default && PDMember.roles.cache.has(Roles.PD.EMS)) {
									const rolE = PDMember.guild.roles.cache.get(Roles.PD.EMS);
									if (rolE) await PDMember.roles.remove(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the PD Guild! update`)
						} else console.log(`PD Guild "${Roles.PD.server}" not found! update`);

						// BCSO
						const BCSOGuild = client.guilds.cache.get(Roles.BCSO.server);
						if (BCSOGuild) {
							const BCSOMember = await BCSOGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching BCSOMember"));
							if (BCSOMember) {
								// check if the member received a BCSO role in PD server
								if (role == Roles.EMS.default && !BCSOMember.roles.cache.has(Roles.BCSO.PD)) {
									const rolE = BCSOMember.guild.roles.cache.get(Roles.BCSO.PD);
									if (rolE) await BCSOMember.roles.remove(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the BCSO Guild! update`)
						} else console.log(`BCSO Guild "${Roles.BCSO.server}" not found! update`);

					});
					console.log(`Roles removed: ${removedRoles.join(", ")}`);
				}

				break;

			case Roles.BCSO.server: // BCSO server

				if (addedRoles.length > 0) {
					addedRoles.forEach(async role => {
						// check every server to add the PD role when the change is in the PD server

						// GOV
						const GOVGuild = client.guilds.cache.get(Roles.GOV.server);
						if (GOVGuild) {
							const GOVMember = await GOVGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching GOVMember"));
							if (GOVMember) {
								// check if the member received a PD role in GOV server
								if (role == Roles.BCSO.default && !GOVMember.roles.cache.has(Roles.GOV.BCSO)) {
									const rolE = GOVMember.guild.roles.cache.get(Roles.GOV.BCSO);
									if (rolE) await GOVMember.roles.add(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the GOV Guild! update`)
						} else console.log(`GOV Guild "${Roles.GOV.server}" not found! update`);

						// PD
						const PDGuild = client.guilds.cache.get(Roles.PD.server);
						if (PDGuild) {
							const PDMember = await PDGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching PDMember"));
							if (PDMember) {
								// check if the member received a PD role in GOV server
								if (role == Roles.BCSO.default && PDMember.roles.cache.has(Roles.PD.BCSO)) {
									const rolE = PDMember.guild.roles.cache.get(Roles.PD.BCSO);
									if (rolE) await PDMember.roles.add(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the PD Guild! update`)
						} else console.log(`PD Guild "${Roles.PD.server}" not found! update`);

						// EMS
						const EMSGuild = client.guilds.cache.get(Roles.EMS.server);
						if (EMSGuild) {
							const EMSMember = await EMSGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching EMSMember"));
							if (EMSMember) {
								if (role == Roles.BCSO.default && EMSMember.roles.cache.has(Roles.EMS.BCSO)) {
									const rolE = EMSMember.guild.roles.cache.get(Roles.EMS.BCSO);
									if (rolE) await EMSMember.roles.add(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the EMS Guild! update`)
						} else console.log(`EMS Guild "${Roles.EMS.server}" not found! update`);

					});
					console.log(`Roles added: ${addedRoles.join(", ")}`);
				}

				if (removedRoles.length > 0) {
					removedRoles.forEach(async role => {

						// GOV
						const GOVGuild = client.guilds.cache.get(Roles.GOV.server);
						if (GOVGuild) {
							const GOVMember = await GOVGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching GOVMember"));
							if (GOVMember) {
								// check if the member received a PD role in GOV server
								if (role == Roles.BCSO.default && !GOVMember.roles.cache.has(Roles.GOV.BCSO)) {
									const rolE = GOVMember.guild.roles.cache.get(Roles.GOV.BCSO);
									if (rolE) await GOVMember.roles.remove(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the GOV Guild! update`)
						} else console.log(`GOV Guild "${Roles.GOV.server}" not found! update`);

						// PD
						const PDGuild = client.guilds.cache.get(Roles.PD.server);
						if (PDGuild) {
							const PDMember = await PDGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching PDMember"));
							if (PDMember) {
								// check if the member received a PD role in GOV server
								if (role == Roles.BCSO.default && PDMember.roles.cache.has(Roles.PD.BCSO)) {
									const rolE = PDMember.guild.roles.cache.get(Roles.PD.BCSO);
									if (rolE) await PDMember.roles.remove(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the PD Guild! update`)
						} else console.log(`PD Guild "${Roles.PD.server}" not found! update`);

						// EMS
						const EMSGuild = client.guilds.cache.get(Roles.EMS.server);
						if (EMSGuild) {
							const EMSMember = await EMSGuild.members.fetch(newMember.id).catch(() => console.log("something when wrong when fetching EMSMember"));
							if (EMSMember) {
								if (role == Roles.BCSO.default && EMSMember.roles.cache.has(Roles.EMS.BCSO)) {
									const rolE = EMSMember.guild.roles.cache.get(Roles.EMS.BCSO);
									if (rolE) await EMSMember.roles.remove(rolE);
								}
							}
							else console.log(`User ${newMember.user.tag} is not in the EMS Guild! update`)
						} else console.log(`EMS Guild "${Roles.EMS.server}" not found! update`);

					});
					console.log(`Roles removed: ${removedRoles.join(", ")}`);
				}

				break;

			default:
				break;
		}
	},
};
