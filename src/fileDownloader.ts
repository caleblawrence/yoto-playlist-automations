import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export const downloadFile = async (link: string) => {
  try {
    const { stdout, stderr } = await execAsync(
      `./yt-dlp '${link}' --extract-audio --audio-format mp3 --no-check-certificate --output "downloads/%(title)s.%(ext)s"`
    );

    if (stderr) {
      console.error("yt-dlp stderr:", stderr);
    }

    console.log("yt-dlp output:", stdout);
  } catch (err) {
    console.error("Error executing yt-dlp:", err);
  }
};
