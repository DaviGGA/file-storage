/**
 * Returns a regex to fetch the folder direct descendants
 * @param {string} path - The folder path
 * 
 * @example directDescendants("user/books") // user/books/[^/]+$
 * 
 * @returns {RegExp}
 */
function directDescendants(path: string): RegExp {
  return new RegExp(`^${path}/[^/]+$`)
}

/**
 * Generates a regular expression to match all descendant paths of a given folder.
 *
 * @param {string} path - The base path to search for descendants.
 * @param {boolean} [includeSelf=true] - Whether to include the path itself in the match.
 * @returns {RegExp} A regular expression that matches all descendant paths.
 *
 * @example
 * // Match "user/foo" and all its descendants
 * allDescendants("user/foo", true); // /^user\/foo/
 *
 * @example
 * // Match only descendants of "user/foo" (excluding "user/foo" itself)
 * allDescendants("user/foo", false); // /^user\/foo\//
 */

function allDescendants(path: string, includeSelf = true): RegExp {
  return includeSelf ? RegExp(path) : RegExp(`^${path}/`)
}

export const folderSearch = {
  directDescendants,
  allDescendants
}