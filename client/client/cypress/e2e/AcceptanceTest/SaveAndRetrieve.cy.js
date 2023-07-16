describe("Save And Retrieve Test", () => {
    beforeEach(() => {

		// visit home page
		cy.visit("http://127.0.0.1:5173/");
	});

  /**
   * AT 0032	
   * DSI Employee enters some keywords into the search bar
   * and click 'save' button next to the search bar, then
   * the keywords will be save.
   */
  it("save keyword", () => {
    cy.getByData("searchTerm")
    .type("ai")
    .should("have.value", "ai");

    cy.getByData("saveButton").click();
  })

  /**
   * AT 0033
   * DSI Employee clicks the 'Record Bar' button under the
   * search bar, then the history list will be pop up on
   * the right of the screen.	
   */
  it("view saved history list", () => {
    cy.getByData("openSavedHistory").click();

    cy.getByData("savedDrawer").should("be.visible");
  })

  /**
   * AT 0034	DSI Employee clicks one of the history list,
   * then the details of the keywords along with 'delete'
   * button, 'edit'  button and 'apply' button will be shown.
   */
  it("view one saved history", () => {
    cy.getByData("openSavedHistory").click();

    cy.getByData("savedDrawer").should("be.visible");

    cy.get(".el-collapse").first().click().children().contains('Apply');
  })

  /**
   * AT 0035
   * DSI Employee clicks the 'delete' button, then the
   * history will be removed from the list.
   */
  it.only("delete one saved history", () => {
    cy.getByData("openSavedHistory").click();

    cy.getByData("savedDrawer").should("be.visible");

    cy.get(".el-collapse").children().first().click().within(() => {

      // cy.get('.el-button--danger').click();
    });
  })

  /**
   * AT 0036
   * DSI Employee clicks the 'edit' button and the text area
   * of the history will become editable.
   */
   it("edit one saved history", () => {
    cy.getByData("openSavedHistory").click();

    cy.getByData("savedDrawer").should("be.visible");

    cy.get(".el-collapse").children().first().click().within(() => {

      // cy.get('.el-button--info').click();
    });
  })

  /**
   * AT 0037	DSI Employee changes some text of a history and
   * clicks 'apply' buttom, then the changes will be applied.
   */
   it("apply one saved history", () => {
    cy.getByData("openSavedHistory").click();

    cy.getByData("savedDrawer").should("be.visible");

    cy.get(".el-collapse").children().first().click().contains('Apply').click();
  })

})