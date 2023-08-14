class DonationForm {
  visit() {
    cy.visit("https://app.pws.int.cruk.org/support-us/your-donation");
  }

  acceptCookies() {
    cy.get("#onetrust-accept-btn-handler").click();
    cy.get("#onetrust-accept-btn-handler").should("not.be.visible", {
      timeout: 10000,
    });
  }

  selectAmount() {
    cy.get('[data-cy="amount-sel-10"]').check();
    cy.get('[data-cy="amount-sel-10"]')
      .parent()
      .should("have.css", "color", "rgb(46, 45, 44)");
  }

  donationType() {
    cy.get("div.sc-bBrHrO.dyrTdO").eq(0).click();
    cy.get('input#typeRadioGroup0[type="radio"]').should("be.checked");
  }

  motivation() {
    cy.get('[data-testid="selectMotivation"]').select("In memory of someone");
    cy.get('[data-testid="selectMotivation"]').should(
      "have.value",
      "In memory of someone"
    );
  }

  cancerType() {
    cy.contains("Choose a cancer type or an area of research")
      .closest("div.sc-bjUoiL")
      .find('input[type="radio"]')
      .click({ force: true });
    cy.get('[data-testid="restrictionSelect"]').select("Bowel cancer");
    cy.get('[data-testid="restrictionSelect"]')
      .find("option:selected")
      .should("have.text", "Bowel cancer");
  }

  continueBtn() {
    cy.get(".iEeNAa.sc-hKMtZM").click({ force: true });
  }

  firstName(donor) {
    cy.get('[data-testid="forename"]')
      .type(donor.firstname)
      .should("have.value", donor.firstname);
  }

  surname(donor) {
    cy.get('[data-testid="surname"]')
      .type(donor.lastname)
      .should("have.value", donor.lastname);
  }

  email(donor) {
    cy.get('[data-testid="emailAddress"]')
      .type(donor.email)
      .should("have.value", donor.email);
  }

  phone(donor) {
    cy.get('[data-testid="phoneNumber"]')
      .type(donor.phone)
      .should("have.value", donor.phone);
  }

  address(donor) {
    cy.get("#postalCode")
      .type(donor.homeAddress.postcode)
      .should("have.value", donor.homeAddress.postcode);
    cy.get("button.sc-hKMtZM.byQprh").click();
  }

  addressLookUp() {
    const addressValue = `GB|RM|B|10271328`;
    cy.get("select#addressSelection").select(addressValue);
  }

  verifyAddress(donor) {
    cy.get('input[name="addressLine1"][aria-invalid="false"]').should(
      "have.value",
      donor.homeAddress.address1
    );
    cy.get('input[name="city"][aria-invalid="false"]').should(
      "have.value",
      donor.homeAddress.town
    );
    cy.get("#country").should("have.value", donor.homeAddress.country);
  }

  emailOptIn() {
    cy.get('input[name="emailOptIn"][value="no"]').check({ force: true });
  }

  creditCard() {
    cy.get("input#bt0").click({ force: true });
    cy.get("[class='PaymentToggle__PaymentOption-sc-1lx54at-3']").should(
      "be.visible"
    );
  }

  creditCardFormName(donor) {
    cy.get("#cardholderName")
      .type(donor.firstname, { timeout: 1000 })
      .should("have.value", "Tester");
  }

  creditCardFormCard = (donor) => {
    cy.get("#card-number", { timeout: 1000 })
    cy.iframe("#braintree-hosted-field-number")
      .find("input#credit-card-number").should('be.visible')
      .type(donor.cardNumber)
      .invoke("val")
      .then((val: string) => val.replace(/ /g, ""))
      .should("eq", donor.cardNumber);
  };
    
  creditCardFormExpiry  = (donor) => {
    cy.get("#card-expiration-date", { timeout: 1000 })
    cy.iframe("#braintree-hosted-field-expirationDate")
      .find("input#expiration")
      .should("be.visible")
      .type(donor.cardExpiry)
      .invoke("val")
      .then((val: string) => val.replace(/ /g, "").replace(/\//g, ""))
      .should("eq", donor.cardExpiry);
    };

  creditCardFormCVV(donor) {
    cy.get("#card-cvv", { timeout: 1000 })
    cy.iframe("#braintree-hosted-field-cvv")
      .should("be.visible")
      .find("input#cvv")
      .type(donor.cvv)
      .should("have.value", donor.cvv);
  }

  giftAidCheck() {
    cy.get("input#giftAid1").check();
    cy.get("input#giftAid1").should("be.checked");
  }

  checkRedirectedTo(path: string, timeout: number = 10000) {
    cy.location("pathname", { timeout: timeout }).should("equal", path);
  }

  confirmationLoaded() {
    cy.get('p[data-copy-type="confirmation"]', { timeout: 1000 }).should(
      "be.visible"
    );
  }

  getUiReferenceNumber() {
    return cy.get("strong").invoke("text");
  }
}

export default DonationForm; 

