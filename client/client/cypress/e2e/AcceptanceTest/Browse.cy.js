describe("Browse AC Test", () => {

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
     * AT 0005
     * DSI Employee is on the page of the clustering map, and clicks
     * the 'Authors' button, it will show the clustering map of the
     * full co-authorship.
     */
     it.only("show author graph", () => {
        cy.contains("Authors")
        .click()
        .should('have.class', 'is-checked')
	});

    /**
     * AT 0006
     * DSI Employee is on the page of the clustering map, and clicks
     * the 'Articles' button, it will show the clustering map of the
     * full relationship of articles.
     */
     it("show article graph", () => {
        cy.contains("Articles")
        .click()
        .should('have.class', 'is-checked')
	});

    /**
     * AT 0007
     * DSI Employee is on the page of the clustering map, and clicks
     * the 'Institutions' button, it will show the clustering map of
     * the full relationship of institutions.
     */
     it("show Institution graph", () => {
        cy.contains("Institutions")
        .click()
        .should('have.class', 'is-checked')
	});

    // AT 0008-0021 is skipped since cypress cannot confirm whether graph is loaded
    // or not, hence cannot perfrom mouse action on graph

    /**
     * AT 0008
     * DSI Employee is on the page of the clustering map of the full
     * co-authorship, and zooms in/out, it will show the bigger/smaller
     * view of the map.
     */

    /**
     * AT 0009
     * DSI Employee is on the page of the clustering map of the full
     * co-authorship, and drags the blank space, the map will move to
     * that direction.
     */

    /**
     * AT 0010
     * DSI Employee is on the page of the full paper clustering map,
     * and zooms in/out, it will show the bigger/smaller view of the map.
     */

    /**
     * AT 0011
     * DSI Employee is on the page of the full paper clustering map,
     * and drags the blank space, the map will move to that direction.
     */

    /**
     * AT 0012
     * DSI Employee is on the page of the clustering map of the full
     * institution clustering map, and zooms in/out, it will show the
     * bigger/smaller view of the map.
     */

    /**
     * AT 0013
     * DSI Employee is on the page of the full institution clustering
     * map, and drags the blank space, the map will move to that direction.
     */

    /**
     * AT 0014
     * DSI Employee is on the page of the clustering map, and clicks
     * on one of the sub-cluster, then only the whole view of the sub-cluster will be shown.
     */


    /**
     * AT 0015
     * DSI Employee is on page of the sub-cluster, and clicks the 'return'
     * button below, the whole clustering map will be shown again.
     */

    /**
     * AT 0016
     * DSI Employee is on page of the sub-cluster, and hover the mouse on
     * one of the tags, only the tag with the mousen on it will be shown on the screen.
     */

    /**
     * AT 0017
     * DSI Employee is on page of the sub-cluster, and click the selected
     * tags, the tag will be unselected and that sub-cluster will disapear.
     */

    /**
     * AT 0018
     * DSI Employee is on page of the sub-cluster, and click the unselected
     * tags, the tag will be selected and that sub-cluster will appear.
     */

    /**
     * AT 0019
     * DSI Employee is on page of the sub-cluster, and clicks the 'Select All'
     * button, all the tags will be selected and all sub-cluster will be shown.
     */

    /**
     * AT 0020
     * DSI Employee is on page of the sub-cluster, and clicks the 'Unselect All'
     * button, all the tags will be selected and all sub-cluster will disapear.
     */

    /**
     * AT 0021
     * DSI Employee is on the page of the clustering map, and moves the mouse to
     * one of the nodes, the label that contains the brief information will pop up.
     */

});