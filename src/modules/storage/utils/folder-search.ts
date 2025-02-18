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

export const folderSearch = {
  directDescendants
}