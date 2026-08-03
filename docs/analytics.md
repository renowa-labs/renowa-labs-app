# Analytics

GA4 Measurement ID: `G-Q9L0V05VWS`

## Events

- `generate_lead` fires after the contact form API confirms a successful submission. It sends `form_name: contact` and `method: contact_form` only.
- `email_click` fires when a visitor selects a live email link or the contact-form fallback action. It may send `link_text` and `location`.
- `contact_cta_click` fires for the home `Contact`, about `Work with us`, and product-detail `Discuss a product` CTAs. It sends `cta_text` and `location`.
- `product_click` fires when a visitor opens an internal product page. It sends `product_name` and `destination`.
- `outbound_product_click` fires when a visitor opens an external product destination such as an App Store page or product website. It sends `product_name` and `destination`.

No names, email addresses, phone numbers, messages, or complete form data are sent to Google Analytics.

## UTM links

- LinkedIn: https://www.renowa-labs.com/?utm_source=linkedin&utm_medium=social&utm_campaign=renowa_launch
- Instagram: https://www.renowa-labs.com/?utm_source=instagram&utm_medium=social&utm_campaign=renowa_launch
- X: https://www.renowa-labs.com/?utm_source=x&utm_medium=social&utm_campaign=renowa_launch
- GitHub: https://www.renowa-labs.com/?utm_source=github&utm_medium=referral&utm_campaign=renowa_launch
- Email signature: https://www.renowa-labs.com/?utm_source=email_signature&utm_medium=email&utm_campaign=renowa_launch
- Product Hunt: https://www.renowa-labs.com/?utm_source=producthunt&utm_medium=referral&utm_campaign=renowa_launch

Promotional links should consistently include `utm_source`, `utm_medium`, and `utm_campaign`.
