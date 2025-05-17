import { Client } from "@notionhq/client";
import "dotenv/config";
import { downloadFile } from "./fileDownloader";
import { getPresignedUrl } from "./yoto";
import axios from "axios";
import { shouldUploadToYoto } from "./featureFlags";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID;

const getMediaLinks = async () => {
  const links = [];
  try {
    const response = await notion.databases.query({
      database_id: databaseId as string,
      // this is the property name in your Notion database and will differ
      // depending on your database setup
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
      const fileContent = await downloadFile(link);

      // NOTE: this is not fully implemented yet. It does get the file into s3
      // but it doesn't show up on the Yoto playlist yet. See the README for
      // more details.
      if (shouldUploadToYoto()) {
        console.log("Uploading to Yoto...");
        const presignedUrl = await getPresignedUrl(
          link,
          link.split("/").pop() || "unknown.mp3"
        );

        const uploadUrl = presignedUrl.upload.uploadUrl;

        await axios.put(uploadUrl, fileContent, {
          headers: {
            "Content-Type": "application/octet-stream",
          },
        });

        console.log("File uploaded to S3 successfully.");
      }
    }
  } catch (error) {
    console.error("Error fetching links or uploading files:", error);
  }
};

getLinksAndDownload();
