/* SupportPilot sample data — clearly labelled SAMPLE data.
   No real customer data is included. */
(function (root, factory) {
  var data = factory();
  if (typeof module === "object" && module.exports) module.exports = data;
  else root.SupportPilotData = data;
})(typeof self !== "undefined" ? self : this, function () {

  var KB = [
    { id: 1, category: "Orders", q: "Where is my order?", keywords: ["where", "order", "track", "tracking", "status", "delivery", "parcel"], a: "You can track your order from Account > Orders, or share your order ID here and I will look it up. Most orders update within 24 hours of dispatch." },
    { id: 2, category: "Orders", q: "How do I cancel my order?", keywords: ["cancel", "order", "stop"], a: "You can cancel an order from Account > Orders before it ships. If it has already shipped, please start a return once it arrives and we will refund you." },
    { id: 3, category: "Orders", q: "Can I change my delivery address?", keywords: ["change", "address", "delivery", "update"], a: "Yes, if the order has not shipped yet. Go to Account > Orders > Edit address, or tell me the new address and I will create a ticket for the support team." },
    { id: 4, category: "Orders", q: "My order arrived damaged", keywords: ["damaged", "broken", "defective", "arrived"], a: "I am sorry about that. Please share a photo of the damage and your order ID, and we will arrange a free replacement or a full refund." },
    { id: 5, category: "Orders", q: "I received the wrong item", keywords: ["wrong", "item", "incorrect", "mistake"], a: "Sorry for the mix-up. Please share your order ID and a photo of what arrived, and we will send the correct item and arrange collection of the wrong one." },
    { id: 6, category: "Refunds", q: "How do refunds work?", keywords: ["refund", "money", "back", "return"], a: "Refunds are issued to your original payment method within 5–7 business days after we receive the return. You will get an email when the refund is processed." },
    { id: 7, category: "Refunds", q: "How long does a refund take?", keywords: ["refund", "long", "time", "days", "wait"], a: "Most refunds take 5–7 business days to appear in your account, depending on your bank. If it has been longer, share your order ID and I will check it." },
    { id: 8, category: "Refunds", q: "What is your return policy?", keywords: ["return", "policy", "days", "exchange"], a: "You can return most items within 30 days in their original condition. Some items, like final-sale products, are marked as non-returnable on the product page." },
    { id: 9, category: "Refunds", q: "How do I start a return?", keywords: ["start", "return", "send", "back"], a: "Go to Account > Orders > Return, choose the item and the reason, and print the prepaid label. Pack the item and drop it at any listed courier point." },
    { id: 10, category: "Shipping", q: "How long does shipping take?", keywords: ["shipping", "long", "deliver", "days"], a: "Standard shipping takes 3–5 business days and express shipping takes 1–2 business days in most cities. Delivery times are shown at checkout." },
    { id: 11, category: "Shipping", q: "How much is shipping?", keywords: ["shipping", "cost", "price", "charge", "free"], a: "Standard shipping is free on orders over $50. Otherwise it is $4.99 for standard and $9.99 for express shipping." },
    { id: 12, category: "Shipping", q: "Do you ship internationally?", keywords: ["international", "ship", "abroad", "country"], a: "Yes, we ship to more than 40 countries. International delivery usually takes 7–14 business days, and any customs charges are shown at checkout where possible." },
    { id: 13, category: "Shipping", q: "My package is delayed", keywords: ["delayed", "late", "package", "not", "arrived"], a: "Delays are usually caused by the courier or local holidays. If your tracking has not updated for 3 days, share your order ID and I will raise it with the courier." },
    { id: 14, category: "Pricing", q: "What are your pricing plans?", keywords: ["pricing", "plans", "price", "cost", "pro", "business"], a: "SupportPilot has three plans: Free ($0), Pro ($29/month) and Business ($79/month). Yearly billing saves about 20%. You can change or cancel your plan any time." },
    { id: 15, category: "Pricing", q: "Is there a free trial?", keywords: ["free", "trial", "try"], a: "Yes. Pro comes with a 14-day free trial, no card required. You can keep your Free plan afterwards if you do not upgrade." },
    { id: 16, category: "Pricing", q: "Can I cancel my subscription?", keywords: ["cancel", "subscription", "plan", "stop"], a: "Yes. Go to Settings > Billing > Cancel plan. Your plan stays active until the end of the current billing period, and your data is kept for 30 days." },
    { id: 17, category: "Pricing", q: "Do you offer discounts for yearly billing?", keywords: ["yearly", "annual", "discount", "save"], a: "Yes. Yearly billing is $23/month for Pro and $63/month for Business, billed once a year, which saves about 20% compared to monthly billing." },
    { id: 18, category: "Account", q: "How do I reset my password?", keywords: ["reset", "password", "forgot", "login"], a: "Click 'Forgot password' on the login page, enter your email, and follow the reset link. Links expire after 60 minutes for security." },
    { id: 19, category: "Account", q: "How do I change my email address?", keywords: ["change", "email", "update", "account"], a: "Go to Settings > Account, update your email, and confirm the verification link we send to the new address." },
    { id: 20, category: "Account", q: "How do I delete my account?", keywords: ["delete", "account", "close", "remove"], a: "Go to Settings > Account > Delete account. This is permanent after a 30-day grace period, during which you can contact us to restore it." },
    { id: 21, category: "Account", q: "How do I update my business name?", keywords: ["business", "name", "company", "update"], a: "In the dashboard, go to Settings, edit the business name, and save. The chatbot greeting and embed widget update immediately." },
    { id: 22, category: "Payments", q: "What payment methods do you accept?", keywords: ["payment", "card", "pay", "methods", "visa"], a: "We accept Visa, Mastercard, Amex, PayPal and bank transfer on Business plans. All payments are processed securely and we never store full card numbers." },
    { id: 23, category: "Payments", q: "My payment failed", keywords: ["payment", "failed", "declined", "card"], a: "Please check that your card details and expiry date are correct, then try again. If it still fails, contact your bank — declined payments are usually blocked by the bank, not by us." },
    { id: 24, category: "Payments", q: "Where is my invoice?", keywords: ["invoice", "receipt", "bill", "download"], a: "Invoices are in Settings > Billing > Invoices. You can download any invoice as a PDF, or ask me to email a copy to your billing address." },
    { id: 25, category: "Product", q: "Is this product in stock?", keywords: ["stock", "available", "in", "product"], a: "Stock is shown on each product page. If an item is out of stock, you can join the waitlist and we will email you as soon as it is back." },
    { id: 26, category: "Product", q: "Do you offer a warranty?", keywords: ["warranty", "guarantee", "cover"], a: "Yes. Most products include a 12-month warranty against manufacturing defects. Accidental damage is covered only if you added accidental-damage cover at checkout." },
    { id: 27, category: "Product", q: "How do I use a discount code?", keywords: ["discount", "code", "coupon", "promo", "voucher"], a: "Enter your code at checkout in the 'Discount code' box and click Apply. Only one code can be used per order, and codes cannot be combined with other offers." },
    { id: 28, category: "Technical", q: "The website is not loading", keywords: ["website", "loading", "not", "working", "error"], a: "Please try refreshing the page, clearing your browser cache, or trying a different browser. If the problem continues, tell me the error message and I will create a ticket." },
    { id: 29, category: "Technical", q: "The chatbot is not answering", keywords: ["chatbot", "not", "answering", "bot", "reply"], a: "If the chatbot does not reply, please refresh the page and try again. If a question is missing from the knowledge base, use 'Create ticket' and a human agent will follow up." },
    { id: 30, category: "Technical", q: "How do I embed the chatbot on my website?", keywords: ["embed", "website", "widget", "code", "install"], a: "Go to Dashboard > Widget, copy the embed code snippet, and paste it before the closing </body> tag on your site. The widget will appear in the bottom-right corner." },
    { id: 31, category: "General", q: "What are your support hours?", keywords: ["support", "hours", "open", "contact", "time"], a: "Our chatbot is available 24/7. Human agents are available Monday to Friday, 9am–6pm, and reply to tickets within one business day." },
    { id: 32, category: "General", q: "How do I contact a human agent?", keywords: ["human", "agent", "person", "contact", "help"], a: "You can create a ticket from the chatbot by clicking 'Create ticket', or email support@example.com. A human agent will reply within one business day." },
    { id: 33, category: "General", q: "Do you have a mobile app?", keywords: ["mobile", "app", "android", "iphone"], a: "SupportPilot works fully in a mobile browser, so no app install is needed. The dashboard and chatbot are responsive on phones and tablets." },
    { id: 34, category: "General", q: "What languages do you support?", keywords: ["language", "languages", "urdu", "english", "roman"], a: "The dashboard and chatbot support English and Roman Urdu greetings. You can switch the greeting language in Settings, and add knowledge-base answers in either language." },
    { id: 35, category: "Orders", q: "Can I track my order without an account?", keywords: ["track", "without", "account", "guest", "order"], a: "Yes. Use the tracking link in your order confirmation email, or share your order ID and email here and I will look up the status for you." },
    { id: 36, category: "Refunds", q: "Can I get a refund to a different payment method?", keywords: ["refund", "different", "payment", "method", "bank"], a: "Refunds normally go back to the original payment method. If that method is closed, please create a ticket and our billing team will arrange an alternative." }
  ];

  var CONVERSATIONS = [
    { id: "C-1042", customer: "Ayesha K.", topic: "Where is my order?", status: "Open", time: "Today, 10:24", channel: "Website" },
    { id: "C-1041", customer: "Bilal R.", topic: "Refund for damaged item", status: "Resolved", time: "Today, 09:12", channel: "Widget" },
    { id: "C-1040", customer: "Sara M.", topic: "Change delivery address", status: "Waiting", time: "Yesterday, 16:40", channel: "Email" },
    { id: "C-1039", customer: "Danish A.", topic: "Pricing plans question", status: "Resolved", time: "Yesterday, 11:05", channel: "Website" },
    { id: "C-1038", customer: "Fatima N.", topic: "Payment failed at checkout", status: "Open", time: "Yesterday, 09:58", channel: "Widget" }
  ];

  var ANALYTICS = [
    { day: "Mon", chats: 42, resolved: 31 },
    { day: "Tue", chats: 58, resolved: 44 },
    { day: "Wed", chats: 51, resolved: 40 },
    { day: "Thu", chats: 66, resolved: 52 },
    { day: "Fri", chats: 73, resolved: 58 },
    { day: "Sat", chats: 48, resolved: 36 },
    { day: "Sun", chats: 39, resolved: 29 }
  ];

  return { KB: KB, CONVERSATIONS: CONVERSATIONS, ANALYTICS: ANALYTICS };
});
