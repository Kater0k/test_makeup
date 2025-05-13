import { expect, type Locator, type Page } from "@playwright/test";
import { TUserCredentials } from "../../tests/types";
import { EUsersTestId } from "../../tests/constants";

export class BasePOM {
  readonly page: Page;
  readonly baseUrl: string;


  constructor(page: Page, baseUrl?: string) {
    this.page = page;
    this.baseUrl = baseUrl || "https://makeup.com.ua/";

  }


  async gotoSignUpPage() {
    await this.page.goto(`/ua/register/`);
  };

  
  async signUpAs(user: TUserCredentials) {
    await this.gotoSignUpPage();
  
    await this.page.locator(EUsersTestId.SIGN_UP_FORM_NAME).fill(user.name);
    await this.page.locator(EUsersTestId.SIGN_UP_FORM_SURNAME).fill(user.surname);
    await this.page.locator(EUsersTestId.SIGN_UP_FORM_EMAIL).fill(user.email);
    await this.page.locator(EUsersTestId.SIGN_UP_FORM_PHONE).fill(user.phone);
    await this.page.locator(EUsersTestId.SIGN_UP_FORM_PASSWORD).fill(user.password);
    await this.page.locator(EUsersTestId.SIGN_UP_FORM_REPEAT_PASSWORD).fill(user.repeatPassword);
   
    await this.page.getByRole('button', { name: 'Зареєструватися' }).click();
  }

}
