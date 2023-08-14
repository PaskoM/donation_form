import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: "https://app.pws.int.cruk.org/support-us/your-donation",
    chromeWebSecurity: false,
  },
  retries: {
    runMode: 2,
    openMode: 1,
  },
});

