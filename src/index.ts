const { Client } = require("@notionhq/client");
import "dotenv/config";

console.log("Starting Notion client...");
console.log("Environment Variables:");
console.log(process.env.NOTION_TOKEN);
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
