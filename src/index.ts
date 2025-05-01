const { Client } = require("@notionhq/client");
import "dotenv/config";

console.log("Starting Notion client...");
console.log("Environment Variables:");
console.log(process.env.NOTION_TOKEN);

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID;

const getDatabaseData = async () => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Status",
        status: {
          equals: "New",
        },
      },
    });

    console.log("Query Results:", response.results);
    console.log(
      "Link:",
      response.results[0].properties.link.rich_text[0].plain_text
    );
  } catch (error) {
    console.error("Error querying database:", error);
  }
};

getDatabaseData();
