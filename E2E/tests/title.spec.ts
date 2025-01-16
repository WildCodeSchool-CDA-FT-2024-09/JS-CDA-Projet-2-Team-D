import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://predeploy.students-cda-js-4.wilders.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ClubCompta/);
});
