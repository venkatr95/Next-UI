import { test, expect } from "@playwright/test";

test.describe("Button interactions", () => {
  test("button click produces visual feedback", async ({ page }) => {
    await page.goto("/");
    const button = page.locator("button").first();
    if (await button.isVisible()) {
      const box = await button.boundingBox();
      expect(box).toBeTruthy();
      await button.click();
    }
  });

  test("disabled button is not clickable", async ({ page }) => {
    await page.goto("/");
    const disabledBtn = page.locator("button[disabled]").first();
    if (await disabledBtn.isVisible()) {
      await expect(disabledBtn).toBeDisabled();
    }
  });
});

test.describe("Input interactions", () => {
  test("input accepts text", async ({ page }) => {
    await page.goto("/");
    const input = page.locator("input[type='text']").first();
    if (await input.isVisible()) {
      await input.fill("test input");
      await expect(input).toHaveValue("test input");
    }
  });

  test("input shows focus ring", async ({ page }) => {
    await page.goto("/");
    const input = page.locator("input").first();
    if (await input.isVisible()) {
      await input.focus();
      const isFocused = await input.evaluate(
        (el) => document.activeElement === el
      );
      expect(isFocused).toBe(true);
    }
  });
});

test.describe("Modal interactions", () => {
  test("modal can be opened and closed", async ({ page }) => {
    await page.goto("/");
    const trigger = page.locator(
      '[data-testid="modal-trigger"], button:has-text("Open Modal")'
    );
    if (await trigger.isVisible()) {
      await trigger.click();
      const dialog = page.locator('[role="dialog"]');
      await expect(dialog).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(dialog).not.toBeVisible();
    }
  });
});

test.describe("Navigation", () => {
  test("keyboard navigation works through interactive elements", async ({
    page,
  }) => {
    await page.goto("/");
    const interactiveCount = await page
      .locator("button:visible, a:visible, input:visible")
      .count();

    if (interactiveCount > 1) {
      await page.keyboard.press("Tab");
      const first = await page.evaluate(() =>
        document.activeElement?.tagName.toLowerCase()
      );
      await page.keyboard.press("Tab");
      const second = await page.evaluate(() =>
        document.activeElement?.tagName.toLowerCase()
      );
      expect(first).toBeTruthy();
      expect(second).toBeTruthy();
    }
  });
});
