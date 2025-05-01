const { Client } = require("@notionhq/client");
import "dotenv/config";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID;

const getLinks = async () => {
  const links = [];
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

    for (const page of response.results) {
      const link = page.properties.link.rich_text[0].plain_text;
      links.push(link);
    }
  } catch (error) {
    console.error("Error querying database:", error);
  }

  return links;
};

const fetchAndLogLinks = async () => {
  try {
    const links = await getLinks();
    console.log("Fetched links:", links);
  } catch (error) {
    console.error("Error fetching links:", error);
  }
};

fetchAndLogLinks();
