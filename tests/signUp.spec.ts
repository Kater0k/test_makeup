import { expect, test } from "../pages/fixtures/baseTest";
import { TUserCredentials } from "./types";
import { EUsersTestId } from "./constants";
import { APIRequestContext, Page } from "@playwright/test";

const MOCK_USERS = {
  validUser: {
    name: "John",
    surname: "Doe",
    phone: "+380501234567",
    email: `john.doe.${Date.now()}@example.com`,
    password: "SecurePass123",
    repeatPassword: "SecurePass123",
  },
  emptyFields: {
    name: "",
    surname: "",
    phone: "",
    email: "",
    password: "",
    repeatPassword: "",
  },
  invalidEmail: {
    name: "Emily",
    surname: "Smith",
    phone: "+380501234567",
    email: "invalid-email-format",
    password: "Password123",
    repeatPassword: "Password123",
  },
  invalidPhone: {
    name: "Michael",
    surname: "Brown",
    phone: "123abc",
    email: `michael.brown.${Date.now()}@example.com`,
    password: "Password123",
    repeatPassword: "Password123",
  },
  duplicateEmail: {
    name: "Alice",
    surname: "Taylor",
    phone: "+380501234567",
    email: "existing.email@example.com",
    password: "Password123",
    repeatPassword: "Password123",
  },
};
test.describe("Sign up", () => {
  test.beforeAll((basePage)=>{
    basePage
  })
  test("successfuly with valid data", async ({ basePage }) => {
    await basePage.signUpAs(MOCK_USERS.validUser);

    await expect(
      basePage.page.getByText("Реєстрація пройшла успішно!")
    ).toBeVisible();
  });

  test("failed with empty data", async ({ basePage }) => {
    await basePage.signUpAs(MOCK_USERS.emptyFields);

    const emptyField = basePage.page
      .locator(EUsersTestId.SIGN_UP_FORM_EMAIL)
      .locator("..");
    await expect(emptyField).toContainClass("invalid");
  });

  test("failed with invalid email", async ({ basePage }) => {
    await basePage.signUpAs(MOCK_USERS.invalidEmail);

    const emptyField = basePage.page
      .locator(EUsersTestId.SIGN_UP_FORM_EMAIL)
      .locator("..");
    await expect(emptyField).toContainClass("invalid");
  });

  test("failed with invalid phone", async ({ basePage }) => {
    await basePage.signUpAs(MOCK_USERS.invalidPhone);

    const emptyField = basePage.page
      .locator(EUsersTestId.SIGN_UP_FORM_PHONE)
      .locator("..");
    await expect(emptyField).toContainClass("invalid");
  });

  test("failed with dublicate email", async ({ request, basePage }) => {
    await apiRegisterUser(request, MOCK_USERS.duplicateEmail);

    await basePage.signUpAs(MOCK_USERS.duplicateEmail);

    const emptyField = basePage.page.locator(EUsersTestId.SIGN_UP_FORM_EMAIL);
    await expect(emptyField.locator("..")).toContainClass("invalid");
    await expect(emptyField).toHaveAttribute(
      "title",
      "Користувач з вказаним Email вже зареєстрований!"
    );
  });
});

async function apiRegisterUser(
  request: APIRequestContext,
  user: TUserCredentials
) {
  const userData = {
    first_name: user.name,
    last_name: user.surname,
    phone: user.phone,
    email: user.email,
    cust_password1: user.password,
    cust_password2: user.repeatPassword,
  };

  const response = await request.post("https://makeup.com.ua/ua/register/", {
    form: userData,
  });
  expect(response.ok()).toBeTruthy();
}
