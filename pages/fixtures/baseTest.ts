import { test as base } from "@playwright/test";
import { BasePOM } from "../models/BasePOM";


export type TBaseFixture = { basePage: BasePOM };

export const test = base.extend<TBaseFixture>({
  basePage: async ({ page, baseURL }, use) => {
    await use(new BasePOM(page, baseURL));
  },
});

export { expect } from "@playwright/test";
