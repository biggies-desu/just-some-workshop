import { test, expect } from '@playwright/test';

//write function for OTP part use, will seperate invaild case

//for properly work on automate testing...... i tried change a email for testing purpose somehow it work 
//i might assume its gonna be security purpose so it pervent me to spam when i tested my script so expect its gonna not work on OTP part (where it acutal login into system)

async function vaildlogin(page){
  await page.goto('https://portal.uat.gofive.co.th/Register/empeo');
  await page.getByTestId('input_radio_registration_company_others').locator('#undefined').check();
  await page.getByTestId('input_textfield_input_register_company_name').click();
  await page.getByTestId('input_textfield_input_register_company_name').fill('Test131'); //please check at this
  await page.getByText('ประเภทธุรกิจ*').click();
  await page.locator('div').filter({ hasText: /^eCommerce$/ }).nth(1)
  await page.getByText('ผู้ใช้งาน*').click();
  await page.locator('div').filter({ hasText: '1-20' }).nth(5)
  await page.getByTestId('input_textfield_input_registration_email').click();
  //
  await page.getByTestId('input_textfield_input_registration_email').fill('Test131@gmail.com'); //please check at this
  await page.getByTestId('input_textfield_input_register_first_name').click();
  await page.getByTestId('input_textfield_input_register_first_name').fill('Test');
  await page.getByTestId('input_textfield_input_register_first_name').press('Tab');
  await page.getByTestId('input_textfield_input_register_last_name').fill('test');
  await page.getByRole('textbox', { name: 'เบอร์มือถือ*' }).click();
  await page.getByRole('textbox', { name: 'เบอร์มือถือ*' }).fill('0967690709');
  await page.getByTestId('input_checkbox_registration_checkbox').check();
  await page.getByTestId('button_submit_registration_try_for_free').click();
}


//before OTP related
test('T1 : Register with valid data', async ({ page }) => {
  await vaildlogin(page)
  await expect(page.getByText('กรุณาตรวจสอบข้อความ')).toBeVisible
});

test('T2 : Register with already used company name', async ({ page }) => {
  await page.goto('https://portal.uat.gofive.co.th/Register/empeo');
  await page.getByTestId('input_radio_registration_company_others').locator('#undefined').check();
  await page.getByTestId('input_textfield_input_register_company_name').click();
  await page.getByTestId('input_textfield_input_register_company_name').fill('sss');
  await page.getByTestId('input_textfield_input_register_company_name').press('Tab');
  await page.locator('.go5-form-field.go5-primary.go5-enabled.go5-hover > .go5-form-field-block > .go5-form-field-content-template > .go5-form-field-content-template-body').click();
  await page.locator('div').filter({ hasText: /^eCommerce$/ }).nth(1)
  await page.locator('.go5-form-field.go5-primary.go5-enabled.go5-hover > .go5-form-field-block > .go5-form-field-content-template > .go5-form-field-content-template-body').click();
  await page.locator('div').filter({ hasText: '-20' }).nth(5)
  await page.getByTestId('input_textfield_input_registration_email').click();
  await page.getByTestId('input_textfield_input_registration_email').fill('Test001@gmail.com');
  await page.getByTestId('input_textfield_input_register_first_name').click();
  await page.getByTestId('input_textfield_input_register_first_name').fill('Test');
  await page.getByTestId('input_textfield_input_register_first_name').press('Tab');
  await page.getByTestId('input_textfield_input_register_last_name').fill('test');
  await page.getByRole('textbox', { name: 'เบอร์มือถือ*' }).click();
  await page.getByRole('textbox', { name: 'เบอร์มือถือ*' }).fill('0967690709');
  await page.getByTestId('input_checkbox_registration_checkbox').check();
  await page.getByTestId('button_submit_registration_try_for_free').click();
  await expect(page.getByText('บริษัทนี้มีบัญชีใช้งานแล้ว')).toBeVisible
});

test('T3 : Register with already used email', async ({ page }) => {
  await page.goto('https://portal.uat.gofive.co.th/Register/empeo');
  await page.getByTestId('input_radio_registration_company_others').locator('#undefined').check();
  await page.getByTestId('input_textfield_input_register_company_name').click();
  await page.getByTestId('input_textfield_input_register_company_name').fill('Test01');
  await page.getByTestId('input_textfield_input_register_company_name').press('Tab');
  await page.locator('.go5-form-field.go5-primary.go5-enabled.go5-hover > .go5-form-field-block > .go5-form-field-content-template > .go5-form-field-content-template-body').click();
  await page.locator('div').filter({ hasText: /^eCommerce$/ }).nth(1)
  await page.locator('.go5-form-field.go5-primary.go5-enabled.go5-hover > .go5-form-field-block > .go5-form-field-content-template > .go5-form-field-content-template-body').click();
  await page.locator('div').filter({ hasText: '-20' }).nth(5)
  await page.getByTestId('input_textfield_input_registration_email').click();
  await page.getByTestId('input_textfield_input_registration_email').fill('Test@gmail.com');
  await page.getByTestId('input_textfield_input_register_first_name').click();
  await page.getByTestId('input_textfield_input_register_first_name').fill('Test');
  await page.getByTestId('input_textfield_input_register_first_name').press('Tab');
  await page.getByTestId('input_textfield_input_register_last_name').fill('test');
  await page.getByRole('textbox', { name: 'เบอร์มือถือ*' }).click();
  await page.getByRole('textbox', { name: 'เบอร์มือถือ*' }).fill('0967690709');
  await page.getByTestId('input_checkbox_registration_checkbox').check();

  await expect(page.getByText('อีเมลนี้มีบัญชีใช้งานแล้ว ลองล็อกอินหรือทำเรื่องลืมรหัสผ่าน')).toBeVisible
  await expect(page.getByTestId('button_button_registration_sign_in')).toBeVisible;
});

test('T4 : Register while leave blank data', async ({ page }) => {
  await page.goto('https://portal.uat.gofive.co.th/Register/empeo');
  await page.getByTestId('input_radio_registration_company_others').locator('#undefined').check();
  await page.getByTestId('button_submit_registration_try_for_free').click();

  await expect(page.getByText('กรุณากรอกข้อมูลที่จำเป็นทั้งหมด')).toBeVisible;
  await expect(page.getByText('กรุณากรอกอีเมล')).toBeVisible;
  await expect(page.getByText('กรุณากรอกชื่อ')).toBeVisible;
  await expect(page.getByText('กรุณากรอกนามสกุล')).toBeVisible;
  await expect(page.getByText('กรุณากรอกเบอร์โทรศัพท์มือถือ')).toBeVisible;
  await expect(page.getByText('กรุณารับทราบนโยบายความเป็นส่วนตัว และข้อกำหนดและเงื่อนไขการใช้งาน')).toBeVisible;
})

test('T5 : Register with invaild Email format', async ({ page }) => {
  await page.goto('https://portal.uat.gofive.co.th/Register/empeo');
  await page.getByTestId('input_radio_registration_company_others').locator('#undefined').check();
  await page.getByTestId('input_textfield_input_register_company_name').click();
  await page.getByTestId('input_textfield_input_register_company_name').fill('Test01');
  await page.getByTestId('input_textfield_input_register_company_name').press('Tab');
  await page.locator('.go5-form-field.go5-primary.go5-enabled.go5-hover > .go5-form-field-block > .go5-form-field-content-template > .go5-form-field-content-template-body').click();
  await page.locator('div').filter({ hasText: /^eCommerce$/ }).nth(1)
  await page.locator('.go5-form-field.go5-primary.go5-enabled.go5-hover > .go5-form-field-block > .go5-form-field-content-template > .go5-form-field-content-template-body').click();
  await page.locator('div').filter({ hasText: '-20' }).nth(5)
  await page.getByTestId('input_textfield_input_registration_email').click();
  await page.getByTestId('input_textfield_input_registration_email').fill('Test001@gmail.@@');
  await page.getByTestId('input_textfield_input_register_first_name').click();
  await page.getByTestId('input_textfield_input_register_first_name').fill('Test');
  await page.getByTestId('input_textfield_input_register_first_name').press('Tab');
  await page.getByTestId('input_textfield_input_register_last_name').fill('test');
  await page.getByRole('textbox', { name: 'เบอร์มือถือ*' }).click();
  await page.getByRole('textbox', { name: 'เบอร์มือถือ*' }).fill('0967690709');
  await page.getByTestId('input_checkbox_registration_checkbox').check();
  await page.getByTestId('button_submit_registration_try_for_free').click();
  await expect(page.getByText('กรุณาใส่อีเมลที่ถูกต้อง')).toBeVisible
});

test('T6 : Register with wrong telephone format', async ({ page }) => {
  await page.goto('https://portal.uat.gofive.co.th/Register/empeo');
  await page.getByTestId('input_radio_registration_company_others').locator('#undefined').check();
  await page.getByTestId('input_textfield_input_register_company_name').click();
  await page.getByTestId('input_textfield_input_register_company_name').fill('sss');
  await page.getByTestId('input_textfield_input_register_company_name').press('Tab');
  await page.locator('.go5-form-field.go5-primary.go5-enabled.go5-hover > .go5-form-field-block > .go5-form-field-content-template > .go5-form-field-content-template-body').click();
  await page.locator('div').filter({ hasText: /^eCommerce$/ }).nth(1)
  await page.locator('.go5-form-field.go5-primary.go5-enabled.go5-hover > .go5-form-field-block > .go5-form-field-content-template > .go5-form-field-content-template-body').click();
  await page.locator('div').filter({ hasText: '-20' }).nth(5)
  await page.getByTestId('input_textfield_input_registration_email').click();
  await page.getByTestId('input_textfield_input_registration_email').fill('Test001@gmail.com');
  await page.getByTestId('input_textfield_input_register_first_name').click();
  await page.getByTestId('input_textfield_input_register_first_name').fill('Test');
  await page.getByTestId('input_textfield_input_register_first_name').press('Tab');
  await page.getByTestId('input_textfield_input_register_last_name').fill('test');
  await page.getByRole('textbox', { name: 'เบอร์มือถือ*' }).click();
  await page.getByRole('textbox', { name: 'เบอร์มือถือ*' }).fill('33333333333');
  await expect(page.getByText('รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง')).toBeVisible

  //await page.getByTestId('input_checkbox_registration_checkbox').check();
  //await page.getByTestId('button_submit_registration_try_for_free').click();
});

test('T7 : Register with invaild promotion code', async ({ page }) => {
  await page.goto('https://portal.uat.gofive.co.th/Register/empeo');
  await page.getByTestId('input_radio_registration_company_others').locator('#undefined').check();
  await page.getByTestId('input_textfield_input_register_company_name').click();
  await page.getByTestId('input_textfield_input_register_company_name').fill('sss');
  await page.getByTestId('input_textfield_input_register_company_name').press('Tab');
  await page.locator('.go5-form-field.go5-primary.go5-enabled.go5-hover > .go5-form-field-block > .go5-form-field-content-template > .go5-form-field-content-template-body').click();
  await page.locator('div').filter({ hasText: /^eCommerce$/ }).nth(1)
  await page.locator('.go5-form-field.go5-primary.go5-enabled.go5-hover > .go5-form-field-block > .go5-form-field-content-template > .go5-form-field-content-template-body').click();
  await page.locator('div').filter({ hasText: '-20' }).nth(5)
  await page.getByTestId('input_textfield_input_registration_email').click();
  await page.getByTestId('input_textfield_input_registration_email').fill('Test001@gmail.com');
  await page.getByTestId('input_textfield_input_register_first_name').click();
  await page.getByTestId('input_textfield_input_register_first_name').fill('Test');
  await page.getByTestId('input_textfield_input_register_first_name').press('Tab');
  await page.getByTestId('input_textfield_input_register_last_name').fill('test');
  await page.getByRole('textbox', { name: 'เบอร์มือถือ*' }).click();
  await page.getByRole('textbox', { name: 'เบอร์มือถือ*' }).fill('0967690709');

  await page.getByText('ใช้โค้ดส่วนลด').click();
  await page.getByTestId('input_text_registration_coupon_code').click();
  await page.getByTestId('input_text_registration_coupon_code').fill('sdsa');
  await expect(page.getByText('คูปองโค้ดไม่ถูกต้อง')).toBeVisible

  //await page.getByTestId('input_checkbox_registration_checkbox').check();
  //await page.getByTestId('button_submit_registration_try_for_free').click();
});

test('T8 : Register with vaild promotion code', async ({ page }) => {
  await vaildlogin(page)
  await page.getByTestId('input_button_registration_register_ticket_got_coupon').click();
  await page.getByTestId('input_text_registration_coupon_code').click();
  await page.getByTestId('input_text_registration_coupon_code').fill('FREE15DAY');
  await page.getByTestId('input_button_registration_btn_apply').click();
});

//OTP verification flow (i cant figure it out how it get a right locator for this)

test('T9.1 : invaild OTP', async ({ page }) => {
  await vaildlogin(page)
  await expect(page.getByText('กรุณาตรวจสอบข้อความ')).toBeVisible
  await page.locator('input[type="tel"]').nth(1).click();
  await page.locator('input[type="tel"]').nth(1).fill('6');
  await page.locator('input[type="tel"]').nth(2).fill('6');
  await page.locator('input[type="tel"]').nth(3).fill('6');
  await page.locator('input[type="tel"]').nth(4).fill('6');
  await page.locator('input[type="tel"]').nth(5).fill('6');
  await page.locator('input[type="tel"]').nth(5).fill('6');
  await page.getByTestId('button_button_registration_verify').click()
  await expect(page.getByText('OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง')).toBeVisible
});

test('T9.2 : vaild OTP', async ({ page }) => {
  await vaildlogin(page)
  await expect(page.getByText('กรุณาตรวจสอบข้อความ')).toBeVisible
  await page.locator('input[type="tel"]').nth(1).click();
  await page.locator('input[type="tel"]').nth(1).fill('1');
  await page.locator('input[type="tel"]').nth(2).fill('2');
  await page.locator('input[type="tel"]').nth(3).fill('3');
  await page.locator('input[type="tel"]').nth(4).fill('4');
  await page.locator('input[type="tel"]').nth(5).fill('5');
  await page.locator('input[type="tel"]').nth(5).fill('6');
  await page.getByTestId('button_button_registration_verify').click()
  await expect(page.getByText('กรุณาตั้งรหัสผ่าน', { exact: true })).toBeVisible
});

