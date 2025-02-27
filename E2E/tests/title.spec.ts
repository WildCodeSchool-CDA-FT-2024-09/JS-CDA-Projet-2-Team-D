import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://predeploy.students-cda-js-4.wilders.dev/");

  // Check that the title is correct
  await expect(
    page.getByRole("heading", { name: "Connexion ClubCompta" }),
  ).toBeVisible();
});
