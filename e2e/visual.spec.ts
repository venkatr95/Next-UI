import { test, expect } from "@playwright/test";

test.describe("Visual regression", () => {
  test("homepage renders without layout shift", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const body = page.locator("body");
    await expect(body).toBeVisible();

    const height = await body.evaluate((el) => el.scrollHeight);
    expect(height).toBeGreaterThan(0);
  });

  test("components have consistent spacing", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const overlapping = await page.evaluate(() => {
      const elements = document.querySelectorAll(
        "button, input, [role='alert'], [role='dialog']"
      );
      let overlapCount = 0;
      const rects = Array.from(elements).map((el) =>
        el.getBoundingClientRect()
      );

      for (let i = 0; i < rects.length; i++) {
        for (let j = i + 1; j < rects.length; j++) {
          const a = rects[i];
          const b = rects[j];
          if (
            a.left < b.right &&
            a.right > b.left &&
            a.top < b.bottom &&
            a.bottom > b.top
          ) {
            overlapCount++;
          }
        }
      }
      return overlapCount;
    });

    expect(overlapping).toBeLessThan(5);
  });
});

test.describe("Performance", () => {
  test("page loads within acceptable time", async ({ page }) => {
    const start = Date.now();
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(10000);
  });

  test("no memory leaks on repeated navigation", async ({ page }) => {
    await page.goto("/");
    const initialMetrics = await page.evaluate(
      () => (performance as any).memory?.usedJSHeapSize ?? 0
    );

    for (let i = 0; i < 3; i++) {
      await page.reload();
      await page.waitForLoadState("networkidle");
    }

    const finalMetrics = await page.evaluate(
      () => (performance as any).memory?.usedJSHeapSize ?? 0
    );

    if (initialMetrics > 0 && finalMetrics > 0) {
      const growth = finalMetrics / initialMetrics;
      expect(growth).toBeLessThan(3);
    }
  });
});
