import { Client } from "@notionhq/client";
import "dotenv/config";
import { downloadFile } from "./fileDownloader";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID;

const getMediaLinks = async () => {
  const links = [];
  try {
    const response = await notion.databases.query({
      database_id: databaseId as string,
      filter: {
        property: "Status",
        status: {
          equals: "New",
        },
      },
    });

    for (const page of response.results) {
      // @ts-ignore
      const link = page.properties.link.rich_text[0].plain_text;
      links.push(link);
    }
  } catch (error) {
    console.error("Error querying database:", error);
  }

  return links;
};

const getLinksAndDownload = async () => {
  try {
    const links = await getMediaLinks();
    for (const link of links) {
      downloadFile(link);
    }
  } catch (error) {
    console.error("Error fetching links:", error);
  }
};

getLinksAndDownload();
