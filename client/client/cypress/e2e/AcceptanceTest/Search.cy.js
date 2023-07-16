describe("Search AC Test", () => {

	beforeEach(() => {
		// visit home page
		cy.visit("http://127.0.0.1:5173/");
	});

	/**
	 * AT 0001
	 * DSI Employee put some words in the search bar and clicks 'cross' button
	 * appeared on the right, the words will be cleared.
	 */
	it("clear search term", () => {
		cy.getByData("searchTerm")
			.type("ai")
			.should("have.value", "ai")
			.clear()
			.should("be.empty");
	});

	/**
	 * AT 0002
	 * DSI Employee put some words in the search bar and clicks search button
	 * on the right of the search bar, it will lead to a page which displays
	 * the corresponding full clustering map of my search results.
	 */
	it("search key words", () => {
		cy.getByData("searchTerm")
			.type("ai")
			.should("have.value", "ai");

		cy.getByData("searchButton").click();

		cy.intercept({
            method: 'GET',
            url: '/search*',
            hostname: 'localhost',
          }).as('getSearch');

		cy.wait("@getSearch").its('response.statusCode').should('eq', 304);
	});

	/**
	 * AT 0003
	 * DSI Employee clicks the setting button next to the search bar and see
	 * a pop-up window, then clicks the 'cross' button on the right top or
	 * the 'cancel' button on the right bottom, the pop-up window will be closed.
	 */
	it("open and close advanced search dialog", () => {

		cy.getByData("settingButton").click();

		cy.getByData("advancedSearch")
			.should("be.visible");

		cy.getByData("advCancelButton").click();

		cy.getByData("advancedSearch")
			.should("not.be.visible");
	});

	/**
	 * AT 0004
	 * DSI Emloyee clicks the button 'Anywhere in the article' or 'In the title
	 * of the article', the search logic will be changed.
	 */
	it("apply advanced search", () => {
		cy.getByData("settingButton").click();

		cy.getByData("advancedSearch")
		.should("be.visible");

		cy.getByData("withAllField")
		.type("ai")
		.should("have.value", "ai");

		cy.getByData("advSearchButton")
		.click();

		// check advanced search response
	})
});
