describe('check search home page', () => {
    
    beforeEach(() => {
      cy.visit("http://127.0.0.1:5173/");
    })


    it('visit home page', () => {
        // We use the `cy.get()` command to get all elements that match the selector.
        // Then, we use `should` to assert that there are two matched items,
        // which are the two default items.
        cy.visit("http://127.0.0.1:5173/");
      })
})