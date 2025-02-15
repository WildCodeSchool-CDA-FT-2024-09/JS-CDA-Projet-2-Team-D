import { test, expect } from "@playwright/test";

test("connect as Super Admin", async ({ page }) => {
  await page.goto("https://predeploy.students-cda-js-4.wilders.dev/");

  await page.getByLabel("Adresse Email *").fill("super@admin.net");

  await page
    .getByRole("textbox", { name: "Mot de passe" })
    .fill("whS0@cqnuros");

  page.on("request", (request) => {
    console.log("Requête interceptée :", request.method(), request.url());
  });

  // Surveillez également les réponses
  page.on("response", (response) => {
    console.log("Réponse reçue :", response.url(), response.status());
  });

  await page.getByRole("button", { name: "Se connecter" }).click();
  await page.getByLabel("Se connecter").click();

  // await page.waitForLoadState("networkidle");
  await page.waitForTimeout(5000);

  await expect(page).toHaveURL(/administrator/);
});
