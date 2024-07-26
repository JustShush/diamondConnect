const color = require("colors");
const { GuildMember, Client } = require("discord.js");
const Roles = require("../../roles.json");
const { getTimestamp } = require("../Functions/getTimestamp");

module.exports = {
	name: "guildMemberAdd",
	/**
	 * @param {GuildMember} member
	 * @param {Client} client
	 */
	async execute(member, client) {

		const { user, guild } = member;

		console.log(`[${getTimestamp(1)}] ${user.username} has joined "${guild.name}"`.brightMagenta.bold);

		let PDGuild;
		let PDMember;
		let GOVGuild;
		let GOVMember;
		let EMSGuild;
		let EMSMember;
		let BCSOGuild;
		let BCSOMember;

		switch (guild.id) {
			case Roles.GOV.server: //? GOV

				// PD
				PDGuild = client.guilds.cache.get(Roles.PD.server);
				if (PDGuild) {
					PDMember = await PDGuild.members.fetch(member.id).catch(() => console.log("something when wrong when fetching PDMember"));
					if (PDMember) {
						const PDroles = PDMember.roles.cache.map(role => role.id);
						console.log("PD MEMBER", PDroles);

						// run throw all the member roles then add the corresponding role to the GOV server
						for (let i = 0; i < PDroles.length - 1; i++) {
							// checks if the member that joined has the PD default role
							// then adds the corresponding role in the GOV server
							if (PDroles[i] == Roles.PD.default && !member.roles.cache.has(Roles.GOV.PD)) {
								const role = member.guild.roles.cache.get(Roles.GOV.PD);
								if (role) await member.roles.add(role);
							}
						}
					} else console.log(`User ${member.user.tag} is not in the PD Guild! update`);
				} else console.log(`PD Guild "${Roles.PD.server}" not found! update`);

				// EMS
				EMSGuild = client.guilds.cache.get(Roles.EMS.server);
				if (EMSGuild) {
					EMSMember = await EMSGuild.members.fetch(member.id).catch(() => console.log("something when wrong when fetching EMSMember"));
					if (EMSMember) {
						const EMSroles = EMSMember.roles.cache.map(role => role.id);
						console.log("EMS MEMBER", EMSroles);

						// run throw all the member roles then add the corresponding role to the GOV server
						for (let i = 0; i < EMSroles.length - 1; i++) {
							if (EMSroles[i] == Roles.EMS.default && !member.roles.cache.has(Roles.GOV.EMS)) {
								const role = member.guild.roles.cache.get(Roles.GOV.EMS);
								if (role) await member.roles.add(role);
							}
						}
					} else console.log(`User ${member.user.tag} is not in the EMS Guild! update`);
				} else console.log(`EMS Guild "${Roles.EMS.server}" not found! update`);

				// BCSO
				BCSOGuild = client.guilds.cache.get(Roles.BCSO.server);
				if (BCSOGuild) {
					BCSOMember = await BCSOGuild.members.fetch(member.id).catch(() => console.log("something when wrong when fetching BCSOMember"));
					if (BCSOMember) {
						const BCSOroles = BCSOMember.roles.cache.map(role => role.id);
						console.log("BCSO MEMBER", BCSOroles);

						// run throw all the member roles then add the corresponding role to the GOV server
						for (let i = 0; i < BCSOroles.length - 1; i++) {
							if (BCSOroles[i] == Roles.BCSO.default && !member.roles.cache.has(Roles.GOV.BCSO)) {
								const role = member.guild.roles.cache.get(Roles.GOV.BCSO);
								if (role) await member.roles.add(role);
							}
						}
					} else console.log(`User ${member.user.tag} is not in the BCSO Guild! update`);
				} else console.log(`BCSO Guild "${Roles.BCSO.server}" not found! update`);

				break;
			case Roles.PD.server: //? PD

				// GOV
				GOVGuild = client.guilds.cache.get(Roles.GOV.server);
				if (GOVGuild) {
					GOVMember = await GOVGuild.members.fetch(member.id).catch(() => console.log("something when wrong when fetching GOVMember"));
					if (GOVMember) {
						const GOVroles = GOVMember.roles.cache.map(role => role.id);
						console.log("GOV MEMBER", GOVroles);

						// run throw all the member roles then add the corresponding role to the PD server
						for (let i = 0; i < GOVroles.length - 1; i++) {
							// checks if the member that joined has the GOV default role
							// then adds the corresponding role in the PD server
							if (GOVroles[i] == Roles.GOV.default && !member.roles.cache.has(Roles.PD.GOV)) {
								const role = member.guild.roles.cache.get(Roles.PD.GOV);
								if (role) await member.roles.add(role);
							}
						}
					} else console.log(`User ${member.user.tag} is not in the GOV Guild! update`);
				} else console.log(`GOV Guild "${Roles.GOV.server}" not found! update`);

				// EMS
				EMSGuild = client.guilds.cache.get(Roles.EMS.server);
				if (EMSGuild) {
					EMSMember = await EMSGuild.members.fetch(member.id).catch(() => console.log("something when wrong when fetching EMSMember"));
					if (EMSMember) {
						const EMSroles = EMSMember.roles.cache.map(role => role.id);
						console.log("EMS MEMBER", EMSroles);

						// run throw all the member roles then add the corresponding role to the PD server
						for (let i = 0; i < EMSroles.length - 1; i++) {
							if (EMSroles[i] == Roles.EMS.default && !member.roles.cache.has(Roles.PD.EMS)) {
								const role = member.guild.roles.cache.get(Roles.PD.EMS);
								if (role) await member.roles.add(role);
							}
						}
					} else console.log(`User ${member.user.tag} is not in the EMS Guild! update`);
				} else console.log(`EMS Guild "${Roles.EMS.server}" not found! update`);

				// BCSO
				BCSOGuild = client.guilds.cache.get(Roles.BCSO.server);
				if (BCSOGuild) {
					BCSOMember = await BCSOGuild.members.fetch(member.id).catch(() => console.log("something when wrong when fetching BCSOMember"));
					if (BCSOMember) {
						const BCSOroles = BCSOMember.roles.cache.map(role => role.id);
						console.log("BCSO MEMBER", BCSOroles);

						// run throw all the member roles then add the corresponding role to the PD server
						for (let i = 0; i < BCSOroles.length - 1; i++) {
							if (BCSOroles[i] == Roles.BCSO.default && !member.roles.cache.has(Roles.PD.BCSO)) {
								const role = member.guild.roles.cache.get(Roles.PD.BCSO);
								if (role) await member.roles.add(role);
							}
						}
					} else console.log(`User ${member.user.tag} is not in the BCSO Guild! update`);
				} else console.log(`BCSO Guild "${Roles.BCSO.server}" not found! update`);

				break;

			case Roles.EMS.server: //? EMS

				// PD
				PDGuild = client.guilds.cache.get(Roles.PD.server);
				if (PDGuild) {
					PDMember = await PDGuild.members.fetch(member.id).catch(() => console.log("something when wrong when fetching PDMember"));
					if (PDMember) {
						const PDroles = PDMember.roles.cache.map(role => role.id);
						console.log("PD MEMBER", PDroles);

						// run throw all the member roles then add the corresponding role to the GOV server
						for (let i = 0; i < PDroles.length - 1; i++) {
							// checks if the member that joined has the PD default role
							// then adds the corresponding role in the GOV server
							if (PDroles[i] == Roles.PD.default && !member.roles.cache.has(Roles.EMS.PD)) {
								const role = member.guild.roles.cache.get(Roles.EMS.PD);
								if (role) await member.roles.add(role);
							}
						}
					} else console.log(`User ${member.user.tag} is not in the PD Guild! update`);
				} else console.log(`PD Guild "${Roles.PD.server}" not found! update`);

				// GOV
				GOVGuild = client.guilds.cache.get(Roles.GOV.server);
				if (GOVGuild) {
					GOVMember = await GOVGuild.members.fetch(member.id).catch(() => console.log("something when wrong when fetching GOVMember"));
					if (GOVMember) {
						const GOVroles = GOVMember.roles.cache.map(role => role.id);
						console.log("GOV MEMBER", GOVroles);

						// run throw all the member roles then add the corresponding role to the GOV server
						for (let i = 0; i < GOVroles.length - 1; i++) {
							if (GOVroles[i] == Roles.GOV.default && !member.roles.cache.has(Roles.EMS.GOV)) {
								const role = member.guild.roles.cache.get(Roles.EMS.GOV);
								if (role) await member.roles.add(role);
							}
						}
					} else console.log(`User ${member.user.tag} is not in the GOV Guild! update`);
				} else console.log(`GOV Guild "${Roles.GOV.server}" not found! update`);

				// BCSO
				BCSOGuild = client.guilds.cache.get(Roles.BCSO.server);
				if (BCSOGuild) {
					BCSOMember = await BCSOGuild.members.fetch(member.id).catch(() => console.log("something when wrong when fetching BCSOMember"));
					if (BCSOMember) {
						const BCSOroles = BCSOMember.roles.cache.map(role => role.id);
						console.log("BCSO MEMBER", BCSOroles);

						// run throw all the member roles then add the corresponding role to the GOV server
						for (let i = 0; i < BCSOroles.length - 1; i++) {
							if (BCSOroles[i] == Roles.BCSO.default && !member.roles.cache.has(Roles.EMS.BCSO)) {
								const role = member.guild.roles.cache.get(Roles.EMS.BCSO);
								if (role) await member.roles.add(role);
							}
						}
					} else console.log(`User ${member.user.tag} is not in the BCSO Guild! update`);
				} else console.log(`BCSO Guild "${Roles.BCSO.server}" not found! update`);

				break;

			case Roles.BCSO.server: //? BCSO
				console.log("BCSO join!")

				// GOV
				GOVGuild = client.guilds.cache.get(Roles.GOV.server);
				if (GOVGuild) {
					GOVMember = await GOVGuild.members.fetch(member.id).catch(() => console.log("something when wrong when fetching GOVMember"));
					if (GOVMember) {
						console.log("got BCSO membver!")
						const GOVroles = GOVMember.roles.cache.map(role => role.id);
						console.log("GOV MEMBER", GOVroles);

						// run throw all the member roles then add the corresponding role to the GOV server
						for (let i = 0; i < GOVroles.length - 1; i++) {
							console.log("before role")
							if (GOVroles[i] == Roles.GOV.default && !member.roles.cache.has(Roles.BCSO.GOV)) {
								const role = member.guild.roles.cache.get(Roles.BCSO.GOV);
								if (role) await member.roles.add(role);
								console.log("added role")
							}
						}
					} else console.log(`User ${member.user.tag} is not in the GOV Guild! update`);
				} else console.log(`GOV Guild "${Roles.GOV.server}" not found! update`);

				// PD
				PDGuild = client.guilds.cache.get(Roles.PD.server) ? client.guilds.cache.get(Roles.PD.server) : undefined;
				if (PDGuild) {
					PDMember = await PDGuild.members.fetch(member.id).catch(() => console.log("something when wrong when fetching PDMember"));
					if (PDMember) {
						const PDroles = PDMember.roles.cache.map(role => role.id);
						console.log("PD MEMBER", PDroles);

						// run throw all the member roles then add the corresponding role to the GOV server
						for (let i = 0; i < PDroles.length - 1; i++) {
							// checks if the member that joined has the PD default role
							// then adds the corresponding role in the GOV server
							if (PDroles[i] == Roles.PD.default && !member.roles.cache.has(Roles.BCSO.PD)) {
								const role = member.guild.roles.cache.get(Roles.BCSO.PD);
								if (role) await member.roles.add(role);
							}
						}
					} else console.log(`User ${member.user.tag} is not in the PD Guild! update`);
				} else console.log(`PD Guild "${Roles.PD.server}" not found! update`);

				// EMS
				EMSGuild = client.guilds.cache.get(Roles.EMS.server);
				if (EMSGuild) {
					EMSMember = await EMSGuild.members.fetch(member.id).catch(() => console.log("something when wrong when fetching EMSMember"));
					if (EMSMember) {
						const EMSroles = EMSMember.roles.cache.map(role => role.id);
						console.log("EMS MEMBER", EMSroles);

						// run throw all the member roles then add the corresponding role to the PD server
						for (let i = 0; i < EMSroles.length - 1; i++) {
							if (EMSroles[i] == Roles.EMS.default && !member.roles.cache.has(Roles.BCSO.EMS)) {
								const role = member.guild.roles.cache.get(Roles.BCSO.EMS);
								if (role) await member.roles.add(role);
							}
						}
					} else console.log(`User ${member.user.tag} is not in the EMS Guild! update`);
				} else console.log(`EMS Guild "${Roles.EMS.server}" not found! update`);

				break;
			default:
				break;
		}
	},
};
