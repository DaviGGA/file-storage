import {join} from "path";

/**
 * Joins a given name with a path, defaulting to "user" if path is null.
 *
 * @param {string} name - The name to append to the path.
 * @param {string | null} path - The base path or null to use the default.
 * @returns {string} The resulting joined path.
 */
function joinPath(name:string, path: string | null) {
  return path ? join(path, name) : join("user", name);
}

export const pathHandler = {
  joinPath
}