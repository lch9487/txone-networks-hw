// @ts-check
const { test, expect } = require("@playwright/test");

test("has button", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const button = page.getByRole("button");

  await expect(button).toBeVisible();
});

test("has menu items when clicking button", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const button = page.getByRole("button");

  await button.click();

  const menuItems = page.getByRole("menuitem");

  await expect(menuItems).toHaveCount(5);
});
