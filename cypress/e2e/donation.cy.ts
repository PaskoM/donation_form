/// <reference types="cypress" />
import DonationForm from "../support/pageObjects/donation_form";

describe("Donation", () => {
  let donor;
  const donationForm = new DonationForm();

  beforeEach(() => {
    cy.intercept("POST", "https://api.pws.int.cruk.org/transaction").as(
      "apiCall"
    );
    cy.fixture("donor.json").then((data) => {
      donor = data;
    });
        donationForm.visit();
        donationForm.acceptCookies();
  });

  it("should make a card donation successfully and verify donation reference is the same as that in response of the transaction API call", () => {
    cy.checkAccessibility();
    donationForm.selectAmount();
    donationForm.donationType();
    donationForm.motivation();
    donationForm.cancerType();
    donationForm.continueBtn();
    donationForm.checkRedirectedTo("/support-us/details");
    cy.checkAccessibility();
    donationForm.firstName(donor);
    donationForm.surname(donor);
    donationForm.email(donor);
    donationForm.phone(donor);
    donationForm.address(donor);
    donationForm.addressLookUp();
    donationForm.verifyAddress(donor);
    donationForm.emailOptIn();
    donationForm.continueBtn();
    donationForm.checkRedirectedTo("/support-us/payment");
    cy.checkAccessibility();
    donationForm.creditCard();
    donationForm.creditCardFormName(donor);
    donationForm.creditCardFormCard(donor);
    donationForm.creditCardFormExpiry(donor);
    donationForm.creditCardFormCVV(donor);
    donationForm.giftAidCheck();
    donationForm.continueBtn();
    donationForm.checkRedirectedTo("/support-us/thanks");
    donationForm.confirmationLoaded();
    cy.wait("@apiCall").then((res) => {
      const reference = res.response.body.id;
      console.log(reference);

      donationForm.getUiReferenceNumber().then((uiReferenceNumber) => {
        expect(reference).to.equal(uiReferenceNumber);
      });
    });
  });
  it.only("should load within the expected time frame", () => {
    const startTime = new Date().getTime();
    cy.contains("h2", "Donation amount").should("be.visible");
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    expect(loadTime).to.be.lessThan(1000);
  });
});
