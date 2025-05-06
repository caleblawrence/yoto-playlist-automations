import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function getPresignedUrl(sha256: string, filename: string): Promise<any> {
  const url = `https://api.yotoplay.com/media/transcode/audio/uploadUrl?sha256=${sha256}&filename=${encodeURIComponent(
    filename
  )}`;
  const authToken = process.env.YOTO_AUTH_TOKEN;

  if (!authToken) {
    throw new Error(
      "YOTO_AUTH_TOKEN is not defined in the environment variables."
    );
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching presigned URL:", error);
    throw error;
  }
}

export { getPresignedUrl };
