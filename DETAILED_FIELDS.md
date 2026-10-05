# Events Collection
**ID:** 6abc810f36cbcba74b8af4a3
**Slug:** events

| Field Name | Slug | Type | Required | Validations |
|------------|------|------|----------|-------------|
| Property Location | `property-location` | Reference |  | {"collectionId":"6abc812fd98b325b281d6301"} |
| Datetime Start | `datetime` | DateTime |  | {"format":"date-time"} |
| Read More | `read-more` | Link |  | - |
| Short Description | `short-description` | PlainText |  | {"singleLine":true} |
| Long Description | `long-description` | PlainText |  | {"singleLine":false} |
| Onsite Event Location | `onsite-event-location` | Reference |  | {"collectionId":"6abc819c43b4b395a2b80752"} |
| Offsite Event | `offsite-event` | Switch |  | - |
| Offsite Event Location | `offsite-event-location` | PlainText |  | {"singleLine":true} |
| Image Long | `image-long` | Image |  | - |
| Image Short | `image` | Image |  | - |
| Onsite | `onsite` | Switch |  | - |
| Onsite Custom Location | `onsite-custom-location` | PlainText |  | {"singleLine":true} |
| Datetime End | `datetime-end` | DateTime |  | {"format":"date-time"} |
| Recurrence Type | `recurrence-type` | Option |  | {"options":[{"name":"One Time","id":"de874223b039df253956066a7d1b04d9"},{"name":"Daily","id":"1ca8e904af0708d46f5e480d678256ca"},{"name":"Weekly","id":"d0ad84472f081450b147999db968f686"},{"name":"Monthly","id":"25f888fcdf13745275d035a6eacfe18c"}]} |
| Repeat Every | `repeat-every` | Number |  | {"format":"integer","precision":1,"allowNegative":false} |
| Repeat On | `repeat-on` | Option |  | {"options":[{"name":"Sunday","id":"98af54dd9ea9b5f335099c095aca1136"},{"name":"Monday","id":"7cc86e6537ed9a5131cdac1d17619c69"},{"name":"Tueday","id":"1921d71fca00d00f7cbcc5550b19ab23"},{"name":"Wednesday","id":"29bbbd6b12272d329bd745713ac0b2ed"},{"name":"Thursday","id":"cee5257a2f496e62195f2ab361114c66"},{"name":"Friday","id":"eed4571c21a505739557d7c0c2d56aeb"},{"name":"Saturday","id":"fae03cbec436d68c927f322815f34da9"},{"name":"Everyday","id":"aef6c1474053c11670fd05ac8e96f485"}]} |
| Recurring Start | `recurring-start` | DateTime |  | {"format":"date-time"} |
| Recurring End | `recurring-end` | DateTime |  | {"format":"date-time"} |
| Adults Only 21+ | `adults-only-21` | Switch |  | - |
| Name | `name` | PlainText | ✓ | {"maxLength":256} |
| Slug | `slug` | PlainText | ✓ | {"maxLength":256,"pattern":{},"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}} |

---

# Offers Collection
**ID:** 6abc811cb92ea32dd64d79e0
**Slug:** offers

| Field Name | Slug | Type | Required | Validations |
|------------|------|------|----------|-------------|
| Mews Rate ID | `mews-rate-id` | PlainText |  | {"singleLine":true} |
| Cancellation Penalty Window | `cancellation-penalty-window` | Number |  | {"format":"integer","precision":1,"allowNegative":false} |
| Cancellation Penalty Window Period | `cancellation-penalty-window-period` | Option |  | {"options":[{"name":"Hours","id":"96d9f63af466d3052a7b0ab42fc1132d"},{"name":"Days","id":"a9907e83d9c4b7a0dd29301f0f99eaeb"}]} |
| Full Card Image | `full-card` | Image |  | {"minImageWidth":500,"minImageHeight":1038,"maxImageWidth":500,"maxImageHeight":1038} |
| Compact Card Image | `compact-card` | Image |  | {"minImageWidth":500,"maxImageWidth":675,"minImageHeight":500,"maxImageHeight":675} |
| Button Color | `button-color` | Option |  | {"options":[{"name":"Paper","id":"44d02a40e5192724b7a88fed37419fc2"},{"name":"Ash","id":"257c18410c3f292ff4dbf92d08c5405a"},{"name":"Alpine Linen","id":"6557681373db903350922e892f0e4a93"},{"name":"Nude Ember","id":"3d5c6eeaef47677bd42a3651e81b2602"},{"name":"Lodge Yellow","id":"02227fbb218da7144b22c1b2fa41bd67"},{"name":"Oxidized Teal","id":"25aed0122bde78c80c42ffd17b38f223"},{"name":"Lake Forest","id":"b26cece08c1b60a2d653595fecdb84ae"},{"name":"Oxblood","id":"54161f7c27ef717bab50cf9a29f3b8ae"},{"name":"Whiskey Sour","id":"6a985593eba4bd250cb934ace52b19d7"},{"name":"Bandana Red","id":"d2c1505a1d48dc1db10b844d0532630e"},{"name":"Copper","id":"25a597c21874ce61a1a449a766e4c998"},{"name":"Cowboy Umber","id":"4f325ae6df5c8e1cc141d886f54dd83b"},{"name":"Smoke","id":"06fad834bc888d6ccf15c26432c8c6ab"}]} |
| Text Color | `text-color` | Option |  | {"options":[{"name":"Paper","id":"6e885b2e73caec02a8e2c440c2cf5449"},{"name":"Ash","id":"631a34cd1a8f7d052cb671a8817ffb79"},{"name":"Alpine Linen","id":"6f2194f27b83b07b315724ff026930a6"},{"name":"Nude Ember","id":"f1cffe2ddc0dc17db5e5d05067fd976a"},{"name":"Lodge Yellow","id":"e81ff759b50f307dc4d6a78562167ab6"},{"name":"Oxidized Teal","id":"cdf50f339fb1291b8d708deb60fe14f7"},{"name":"Lake Forest","id":"f4a91306b5f191f9b209a46c98d7d2a1"},{"name":"Oxblood","id":"8d7aa467148ce8a853000e82ad4c2ab7"},{"name":"Whiskey Sour","id":"736a5ad1f487696a396429b4503d0948"},{"name":"Lodge Yellow","id":"708e9b920a53953659f646b2992a0bd6"},{"name":"Bandana Red","id":"d8d2f8a1df12e54a09b027d2958ccd1e"},{"name":"Whiskey Sour","id":"1e285f872a24537260576cf66221b01b"},{"name":"Copper","id":"78bff79a28500e6a012e126e25e06085"},{"name":"Cowboy Umber","id":"2fb2b62d67bb7d93926e70928a8c3f80"},{"name":"Smoke","id":"7c79e1dcd65dee16f6d56d5a0e1559a0"}]} |
| Card Fill | `card-fill` | Option |  | {"options":[{"name":"Filled","id":"4d69ebd51289a1a63bcb4aa47427cb43"},{"name":"Outline","id":"7988397e27407c562257584fc4666cc6"}]} |
| Active | `active` | Switch |  | - |
| Member Only | `member-only` | Switch |  | - |
| Miles From Center | `miles-from-center` | Number |  | {"format":"integer","precision":1,"allowNegative":false} |
| Postal Code | `postal-code` | Number |  | {"format":"integer","precision":1,"allowNegative":false,"maxValue":5} |
| Geo Fencing Active | `geo-fencing-active` | Switch |  | - |
| Exclude From US | `exclude-from-us` | Switch |  | - |
| Exclude From North America | `exclude-from-north-america` | Switch |  | - |
| Europe | `europe` | Switch |  | - |
| Asia | `asia` | Switch |  | - |
| Mexico | `mexico` | Switch |  | - |
| Canada | `canada` | Switch |  | - |
| Short Description | `description` | PlainText |  | {"singleLine":true} |
| International Fencing Active | `international-fencing-active` | Switch |  | - |
| Font | `rate-font` | Option |  | {"options":[{"name":"Quattrocento & Bianco Sans","id":"9e54cda72744174774e724c308069e7f"},{"name":"Rundeck & to Serif Tibetan","id":"6a6676c484cecf4a67ab35b98dbf64c3"},{"name":"League Spartan & Arvo","id":"4e011484a08da5fab58d07a88b5aa022"},{"name":"League Gothic & DM Sans","id":"3e3fdc39e57fb02d36aecbda39e2b7e8"},{"name":"Noto Serif Tibetan & Lato","id":"8cf8fa0bae9e4ba30984524d4a42c215"},{"name":"Motter Corpus Std & Coustard","id":"642ccf1243d84ba2801fca50ade8c2f4"},{"name":"Filicudi & Special Elite","id":"d0c50f4d6598a380c116b3839b2d2a76"}]} |
| Long Description | `long-description` | RichText |  | - |
| Call to Action | `call-to-action` | PlainText |  | {"singleLine":true} |
| Headline | `headline` | PlainText |  | {"singleLine":true} |
| Eyebrow | `eyebrow` | PlainText |  | {"singleLine":true} |
| Rate Starting From | `rate-starting-from` | Number |  | {"format":"integer","precision":1,"allowNegative":false} |
| Name | `name` | PlainText | ✓ | {"maxLength":256} |
| Slug | `slug` | PlainText | ✓ | {"maxLength":256,"pattern":{},"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}} |

---

# Locations Collection
**ID:** 6abc812fd98b325b281d6301
**Slug:** locations

| Field Name | Slug | Type | Required | Validations |
|------------|------|------|----------|-------------|
| Full Location Name | `full-location-name` | PlainText |  | {"singleLine":true} |
| Short Location Name | `short-location-name` | PlainText |  | {"singleLine":true} |
| Street Address Line 1 | `street-address-line-1` | PlainText |  | {"singleLine":true} |
| Street Address Line 2 | `street-address-line-2` | PlainText |  | {"singleLine":true} |
| CIty | `city` | PlainText |  | {"singleLine":true} |
| State | `state` | PlainText |  | {"singleLine":true,"maxLength":2} |
| Postal Code | `postal-code` | Number |  | {"format":"integer","precision":1,"allowNegative":false,"maxValue":5} |
| Primary Phone | `primary-phone` | Phone |  | - |
| Front Desk | Operations Emails | `front-desk-operations-emails` | Email |  | - |
| Reservations Email | `reservations-email` | Email |  | - |
| Sales Email | `sales-email` | Email |  | - |
| General Email | `general-email` | Email |  | - |
| Website | `website` | Link |  | - |
| Instagram | `instagram` | Link |  | - |
| Facebook | `facebook` | Link |  | - |
| Trip Advisor | `trip-advisor` | Link |  | - |
| Short Description | `short-description` | PlainText |  | {"singleLine":true} |
| Long Description | `long-description` | PlainText |  | {"singleLine":false} |
| Hero Image | `hero-image` | Image |  | - |
| Location Details | `location-details` | PlainText |  | {"singleLine":true} |
| Name | `name` | PlainText | ✓ | {"maxLength":256} |
| Slug | `slug` | PlainText | ✓ | {"maxLength":256,"pattern":{},"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}} |

---

# Menu Items Collection
**ID:** 6abc8145eb90b8f4d6d650f4
**Slug:** menu-items

| Field Name | Slug | Type | Required | Validations |
|------------|------|------|----------|-------------|
| Name | `name` | PlainText | ✓ | {"maxLength":256} |
| Slug | `slug` | PlainText | ✓ | {"maxLength":256,"pattern":{},"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}} |

---

# Room Types Collection
**ID:** 6abc815b36cbcba74b8b01c4
**Slug:** room-types

| Field Name | Slug | Type | Required | Validations |
|------------|------|------|----------|-------------|
| Full Name | `full-name` | PlainText |  | {"singleLine":true} |
| Short Name | `short-name` | PlainText |  | {"singleLine":true} |
| Long Description | `long-description` | PlainText |  | {"singleLine":false} |
| Short Description | `short-description` | PlainText |  | {"singleLine":true} |
| Building | `building` | Reference |  | {"collectionId":"6abc8192a900d21d00b7c588"} |
| Property Location | `property-location` | Reference |  | {"collectionId":"6abc812fd98b325b281d6301"} |
| Square Feet | `square-feet` | PlainText |  | {"singleLine":true} |
| Features & Amenities | `features-amenities` | MultiReference |  | {"collectionId":"6abc8175a7bbdc92fa9e6599"} |
| Policies | `policies` | MultiReference |  | {"collectionId":"6abc8175a7bbdc92fa9e6599"} |
| Images | `images` | MultiImage |  | - |
| Benefits Statment | `benefits-statment` | PlainText |  | {"singleLine":true} |
| Number of Bedrooms | `number-of-bedrooms` | Number |  | {"format":"integer","precision":1,"allowNegative":false} |
| Number of Beds | `number-of-beds` | Number |  | {"format":"integer","precision":1,"allowNegative":false} |
| Suite | `suite` | Switch |  | - |
| Room | `room` | Switch |  | - |
| Bed Type | `bed-type` | Option |  | {"options":[{"name":"King","id":"4a1795ffb5ce99db12f83346b8fa5298"},{"name":"Queen","id":"dcf29f6638b39f418ea1eed3b86ecc91"},{"name":"Double Queen","id":"88dcc8fa3677123856ae63a96e70f527"},{"name":"Double Twin","id":"83d3ac682dc58f0a4caa0c71c5ab9b95"},{"name":"King and Queen Mixed","id":"ecc7975f2b87a6c1ac4262ce4fb07033"},{"name":"Queen and King","id":"e32c370af45cf97de484aba0703cf939"}]} |
| Sort | `sort` | Number |  | {"format":"integer","precision":1,"allowNegative":false} |
| Number of Units | `number-of-units` | Number |  | {"format":"integer","precision":1,"allowNegative":false} |
| Component Room | `component-room` | Switch |  | - |
| Name | `name` | PlainText | ✓ | {"maxLength":256} |
| Slug | `slug` | PlainText | ✓ | {"maxLength":256,"pattern":{},"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}} |

---

# Amenities Collection
**ID:** 6abc8175a7bbdc92fa9e6599
**Slug:** amenities

| Field Name | Slug | Type | Required | Validations |
|------------|------|------|----------|-------------|
| Active | `active` | Switch |  | - |
| Full Name | `full-name` | PlainText |  | {"singleLine":true} |
| Short Name | `short-name` | PlainText |  | {"singleLine":true} |
| Image | `image` | Image |  | - |
| Icon (SVG) | `icon-svg` | RichText |  | - |
| Type | `type` | Option |  | {"options":[{"name":"Feature","id":"908f603542153024f0605c52bd2b7baa"},{"name":"Amenity","id":"05da49184d5d40cc30467a9454b19ac3"},{"name":"Policy","id":"7c93dc1078791efcf798aff5800d16a3"},{"name":"Accessibility","id":"a7e2402250f35527b6ad217a3e34fdca"},{"name":"Welness","id":"938f68ca22b088e084fc90b4cba1aea7"},{"name":"Nature or Envrioment","id":"540b2385453e19174335160b7f7611bb"},{"name":"Activity","id":"456b1d4fa69d63c00e317fcdd452b878"}]} |
| Marketing Headline | `marketing-headline` | PlainText |  | {"singleLine":true} |
| Marketing Subheadline | `marketing-subheadline` | PlainText |  | {"singleLine":true} |
| Short Description | `short-description` | PlainText |  | {"singleLine":true} |
| Long Description | `long-description` | PlainText |  | {"singleLine":false} |
| Key Benefit or Selling Point Headline | `key-benefit-or-selling-point-headline` | PlainText |  | {"singleLine":true} |
| Key Benefit or Selling Point Description | `key-benefit-or-selling-point-description` | PlainText |  | {"singleLine":false} |
| Category | `category` | Option |  | {"options":[{"name":"Property","id":"f126f434fcb5bcbefbb11426e17d26cf"},{"name":"Rooms","id":"37a31365e9f0c3a7d56ea3a0a181e416"},{"name":"Outlet","id":"a936277f759399871935402251a8dabd"},{"name":"Location","id":"c50c49095f890863307d345f9c2243d1"},{"name":"Other","id":"506e24477ef5d706a5ff36ea5adb30e6"}]} |
| Location | `location` | MultiReference | ✓ | {"collectionId":"6abc812fd98b325b281d6301"} |
| Name | `name` | PlainText | ✓ | {"maxLength":256} |
| Slug | `slug` | PlainText | ✓ | {"maxLength":256,"pattern":{},"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}} |

---

# Buildings Collection
**ID:** 6abc8192a900d21d00b7c588
**Slug:** buildings

| Field Name | Slug | Type | Required | Validations |
|------------|------|------|----------|-------------|
| Location | `location` | Reference |  | {"collectionId":"6abc812fd98b325b281d6301"} |
| Subheadline | `subheadline` | PlainText |  | {"singleLine":true} |
| Long Description | `long-description` | PlainText |  | {"singleLine":false} |
| Feature Benefits | `feature-benefits` | PlainText |  | {"singleLine":true} |
| Exterior Building Image | `exterior-building-image` | Image |  | - |
| Illustration SVG | `illustration-svg` | RichText |  | - |
| Name | `name` | PlainText | ✓ | {"maxLength":256} |
| Slug | `slug` | PlainText | ✓ | {"maxLength":256,"pattern":{},"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}} |

---

# Outlets Collection
**ID:** 6abc819c43b4b395a2b80752
**Slug:** outlets

| Field Name | Slug | Type | Required | Validations |
|------------|------|------|----------|-------------|
| Outlet Name | `outlet-name` | PlainText |  | {"singleLine":true} |
| Outlet Type | `outlet-type` | Option |  | {"options":[{"name":"Restaurant","id":"b263d2d5ddcea0f1e1e681efd9a6a35a"},{"name":"Bar","id":"4f8dbe9c0a99353279b971327c3790c3"},{"name":"Lounge","id":"d82f4d6c1d6f37a1ad6e61184591bae6"},{"name":"Activity ","id":"cdb0199899f116d1270068ed04ad2f38"},{"name":"Pool","id":"44e99c69c141fe353735647f902f8f47"},{"name":"Spa","id":"c524535578338352e1eaba0fc66c6f0f"},{"name":"Golf","id":"a41d545c63725168924fa8d04d2b8bb0"},{"name":"Gift Shop","id":"0d407648b4e05e5a19f1a196ec7cbfe6"},{"name":"Rooftop","id":"00bb1f8fd6fc217edd6f4bbbecfb34e7"},{"name":"Other","id":"4707f4ee90d1efbd2d752f1818337b00"}]} |
| Street Address Line 1 | `street-address-line-1` | PlainText |  | {"singleLine":true} |
| Street Address Line 2 | `street-address-line-2` | PlainText |  | {"singleLine":true} |
| City | `city` | PlainText |  | {"singleLine":true} |
| State | `state` | PlainText |  | {"singleLine":true,"maxLength":2} |
| Postal Code | `postal-code` | PlainText |  | {"singleLine":true} |
| Outlet Short Name | `outlet-short-name` | PlainText |  | {"singleLine":true} |
| Short Description | `short-description` | PlainText |  | {"singleLine":true} |
| Long Description | `long-description` | PlainText |  | {"singleLine":false} |
| Website | `website` | Link |  | - |
| Instagram | `instrgram` | Link |  | - |
| Facebook | `facebook` | Link |  | - |
| Yelp | `yelp` | Link |  | - |
| Hours of Operation | `hours-of-operation` | PlainText |  | {"singleLine":false} |
| Email Address | `email-address` | Email |  | - |
| Hero Image | `hero-image` | Image |  | - |
| Logo | `logo` | Image |  | - |
| Location | `location` | Reference |  | {"collectionId":"6abc812fd98b325b281d6301"} |
| Reservations URL | `reservations-url` | Link |  | - |
| Main Phone | `main-phone` | Phone |  | - |
| Google Maps Link | `google-maps-link` | Link |  | - |
| Name | `name` | PlainText | ✓ | {"maxLength":256} |
| Slug | `slug` | PlainText | ✓ | {"maxLength":256,"pattern":{},"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}} |

---

# Instagrams Collection
**ID:** 6abe1d64ff9619885c7e5cf7
**Slug:** instagram

| Field Name | Slug | Type | Required | Validations |
|------------|------|------|----------|-------------|
| Media Type | `media-type` | Option |  | {"options":[{"name":"Post","id":"0cc2358c65f7d7a5e131a074da55b2c7"},{"name":"Reel","id":"122890cf752803a5eea5239a02302bcd"}]} |
| Caption | `caption` | PlainText |  | {"singleLine":false} |
| Instagram url | `instagram-url` | Link |  | - |
| Image | `image` | Image |  | - |
| Image URL | `image-url` | Link |  | - |
| Shortcode | `shortcode` | PlainText |  | {"singleLine":true} |
| Instagram Username | `instagram-username` | PlainText |  | {"singleLine":true} |
| Sort | `sort` | Number |  | - |
| Caption RIch Text | `caption-rich-text` | RichText |  | - |
| Name | `name` | PlainText | ✓ | {"maxLength":256} |
| Slug | `slug` | PlainText | ✓ | {"maxLength":256,"pattern":{},"messages":{"pattern":"Must be alphanumerical and not contain any spaces or special characters","maxLength":"Must be less than 256 characters"}} |

---

