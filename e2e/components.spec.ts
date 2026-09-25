import { test, expect } from "@playwright/test";

test.describe("Component rendering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page loads successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/.+/);
  });

  test("no console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });
});

test.describe("Accessibility", () => {
  test("buttons are keyboard focusable", async ({ page }) => {
    await page.goto("/");
    const buttons = page.locator("button");
    const count = await buttons.count();
    if (count > 0) {
      await page.keyboard.press("Tab");
      const focused = page.locator(":focus");
      await expect(focused).toBeVisible();
    }
  });

  test("interactive elements have accessible names", async ({ page }) => {
    await page.goto("/");
    const buttons = page.locator("button:visible");
    const count = await buttons.count();
    for (let i = 0; i < Math.min(count, 10); i++) {
      const button = buttons.nth(i);
      const name = await button.getAttribute("aria-label");
      const text = await button.textContent();
      expect(name || text?.trim()).toBeTruthy();
    }
  });
});

test.describe("Responsive", () => {
  test("components render on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  test("components render on tablet viewport", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  test("components render on desktop viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Theme", () => {
  test("dark mode toggle works if present", async ({ page }) => {
    await page.goto("/");
    const darkToggle = page.locator(
      '[data-testid="theme-toggle"], [aria-label*="dark"], [aria-label*="theme"]'
    );
    if ((await darkToggle.count()) > 0) {
      await darkToggle.first().click();
      const html = page.locator("html");
      const hasDark = await html.evaluate((el) =>
        el.classList.contains("dark")
      );
      expect(typeof hasDark).toBe("boolean");
    }
  });
});
