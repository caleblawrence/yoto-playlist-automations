import { exec } from "child_process";

export const downloadFile = (link: string) => {
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
};
