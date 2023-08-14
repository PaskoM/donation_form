declare namespace Cypress {
  interface Chainable<Subject> {
    iframe(iframeSelector: string): Chainable<JQuery<HTMLBodyElement>>;
    checkAccessibility(context?: any, options?: any): Chainable<any>;
  }
}
