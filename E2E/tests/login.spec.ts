import { test, expect } from "@playwright/test";

test("connect as Super Admin", async ({ page }) => {
  await page.goto("https://predeploy.students-cda-js-4.wilders.dev/");

  // await page.getByLabel("Adresse Email *").fill("super@admin.net");
  await page.fill("#email", "super@admin.net");
  // await page.getByLabel("Mot de passe", { exact: true }).fill("whS0@cqnuros");
  await page.fill("#password", "whS0@cqnuros");

  await page.on("request", (request) => {
    console.log("Requête interceptée :", request.method(), request.url());
  });

  // Surveillez également les réponses
  await page.on("response", (response) => {
    console.log("Réponse reçue :", response.url(), response.status());
  });

  await page.getByRole("button", { name: "Se connecter" }).click();

  await page.waitForLoadState("networkidle");

  const h1 = await page.getByRole("heading", { level: 1 });
  expect(h1).toHaveText("Accès administrateur");
});
