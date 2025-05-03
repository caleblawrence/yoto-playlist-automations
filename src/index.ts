import { Client } from "@notionhq/client";
import "dotenv/config";
import { exec } from "child_process";

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

const fetchAndLogLinks = async () => {
  try {
    const links = await getMediaLinks();
    for (const link of links) {
      exec(
        `./yt-dlp '${link}' --extract-audio --audio-format mp3 --no-check-certificate --output "downloads/%(title)s.%(ext)s"`,
        (err, stdout, stderr) => {
          if (err) {
            console.error("Error executing yt-dlp:", err);
            return;
          }

          if (stderr) {
            console.error("yt-dlp stderr:", stderr);
          }

          console.log("yt-dlp output:", stdout);
        }
      );
    }
  } catch (error) {
    console.error("Error fetching links:", error);
  }
};

fetchAndLogLinks();
