import path from "path";
import os from "os";

const OS_PATH_DIVISOR = os.platform() === "win32" ?
  "\\" : "/"

function joinPaths(name: string, filePath: string | null | undefined) {
  if (!filePath) return name;

  const slashPath = filePath.replace("\,\g", OS_PATH_DIVISOR);
   
  return path
    .join(slashPath, name)
    .replace(new RegExp(OS_PATH_DIVISOR, "gi"), ",");

}

export const storagePath = {
  joinPaths
} 