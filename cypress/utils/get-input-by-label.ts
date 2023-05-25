/**
 * Assumes `<input>` elements are nested inside a `<label>` element.
 */
export function getInputByLabel(labelText: string) {
  return cy.get(`label:contains("${labelText}")`).find('input');
}