describe("Sort And Filter Test", () => {
    beforeEach(() => {
        cy.intercept({
            method: 'GET',
            url: '/search*',
            hostname: 'localhost',
          }).as('getSearch');

		// visit home page
		cy.visit("http://127.0.0.1:5173/");

        // search keyword
        cy.getByData("searchTerm")
        .type("ai")
        .should("have.value", "ai");

        cy.getByData("searchButton").click();

        cy.wait("@getSearch");
	});

    /**
     * AT 0029
     * DSI Employee is on the page of clustering map and
     * clicks the 'Filter Option' button under the search
     * bar, then the filter will pop up from the left of
     * the screen.	
     */
    it("open filter drawer", () => {
        cy.getByData("filterButton").click();

        cy.getByData("filterDrawer").should("be.visible");
    })

    /**
     * AT 0030	
     * DSI Employee clicks the percentage from the filter
     * and clicks 'apply' button, then only top percentage
     * of the nodes will be left.	
     */
    it("apply filter by option", () => {
        cy.getByData("filterButton").click();

        cy.getByData("filterDrawer").should("be.visible");

        cy.getByData("percentButton").click();

        cy.getByData("applyFilterButton").click();
    })

    /**
     * AT 0031	
     * DSI Employee enters the percentage in the text area .
     * from the filter and clicks 'apply' button, then only
     * top percentage of the nodes will be left.
     */
     it.only("apply filter by value", () => {
        cy.getByData("filterButton").click();

        cy.getByData("filterDrawer").should("be.visible");

        cy.getByData("percentInput").clear().type(50);

        cy.getByData("applyFilterButton").click();
    })
})