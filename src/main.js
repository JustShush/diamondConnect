// Diamond Connect
/**
 * Conecta os cargos entre os varios servidores das ORGs legais do Diamond RP
 *
 * GOV: https://discord.gg/bvevxnfsYP
 * LSPD: https://discord.gg/vJnPDJhYRW
 * EMS: https://discord.gg/3zQyAPrT
 * BCSO: https://discord.gg/UWWfpGgHE3
 * https://github.com/JustShush/diamondConnect
 */
const color = require('colors');
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Partials} = require("discord.js");
const { Guilds, GuildMembers } = GatewayIntentBits;

const client = new Client({
	intents: [Guilds, GuildMembers],
	partials: [Partials.User, Partials.GuildMember, Partials.Channel],
});

client.config = require("../config.json");

const eventsPath = path.join(__dirname, 'Events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

const process = require("node:process");

process.on("unhandledRejection", (reason, promise) => {
	console.error("Unhandled Rejection:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
	console.error("Uncaught Exception:", err);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
	console.error("Uncaught Exception Monitor:", err, origin);
});

process.on('rejectionHandled', (err) => {
	console.log("rejected handled:", err);
})

client.login(client.config.TOKEN);