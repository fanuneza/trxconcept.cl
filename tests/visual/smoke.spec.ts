import { expect, test } from "@playwright/test";

const pages = [
  { name: "home", path: "/" },
  { name: "servicios", path: "/servicios/" },
  { name: "sobre-mi", path: "/sobre-mi/" },
  { name: "preguntas-frecuentes", path: "/preguntas-frecuentes/" },
  { name: "politica-de-cookies", path: "/politica-de-cookies/" },
];

for (const pageInfo of pages) {
  test(`smoke ${pageInfo.name}`, async ({ page }) => {
    const response = await page.goto(pageInfo.path, { waitUntil: "networkidle" });

    expect(response, `missing response for ${pageInfo.path}`).not.toBeNull();
    expect(response!.ok(), `unexpected status for ${pageInfo.path}`).toBeTruthy();

    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
  });
}
