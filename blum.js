const axios = require('axios');
const colors = require('colors');
const fs = require('fs');
const path = require('path');
const {DateTime} = require("luxon");
const users = JSON.parse(fs.readFileSync('blum.json', 'utf8'));

const iframes = [
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7207796735%252C%2522first_name%2522%253A%2522Jo%2522%252C%2522last_name%2522%253A%2522Mckinney%2522%252C%2522username%2522%253A%2522jo13475777634%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726108474%26hash%3D06c557945b783d8f04ee40cc04f0174352c8fa9a0c8176d6904f1432e2f382b4&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7504213891%252C%2522first_name%2522%253A%2522Cindy%2522%252C%2522last_name%2522%253A%2522Welch%2522%252C%2522username%2522%253A%2522cin13854733022%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107292%26hash%3Dbe9cc141ef7f623a3ec02aa31c2096364bb302cd5e7a2adb0a5fdc78d0a12d4e&tgWebAppVersion=7.8&tgWebAppPlatform=android&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7404468905%252C%2522first_name%2522%253A%2522Marion%2522%252C%2522last_name%2522%253A%2522Matthews%2522%252C%2522username%2522%253A%2522mar13854733221%2522%252C%2522language_code%2522%253A%2522lt%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107296%26hash%3D76654ebc13f79c2020fa0aab34ee31547880bc903e99c65754dc9d5a63b10d03&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7153452529%252C%2522first_name%2522%253A%2522Milton%2522%252C%2522last_name%2522%253A%2522Harrison%2522%252C%2522username%2522%253A%2522mil14063253657%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726108483%26hash%3D597f1bfb9b99936d0951dd858a6b9ba1a99d040d8d87fc27e0494f0b2dd99fd2&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A6994723386%252C%2522first_name%2522%253A%2522Tim%2522%252C%2522last_name%2522%253A%2522Smith%2522%252C%2522username%2522%253A%2522tim14063253726%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726108479%26hash%3D94ade225e59c62f0427c801aa771546246eef2115311245fed5f9b877e6d4f24&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7212081860%252C%2522first_name%2522%253A%2522Wyatt%2522%252C%2522last_name%2522%253A%2522Gibson%2522%252C%2522username%2522%253A%2522wya14063253758%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107323%26hash%3D7b1edf53166915d6baaf0de36b4c92200007e72cf0eae782a4103e864bf35946&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A6879085013%252C%2522first_name%2522%253A%2522Rita%2522%252C%2522last_name%2522%253A%2522Lambert%2522%252C%2522username%2522%253A%2522rit14155942350%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726108480%26hash%3D1b1afc8f67828961dc87f5d8fe3e03820348087b59f7697edb18a39b01034845&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7248047277%252C%2522first_name%2522%253A%2522Eddie%2522%252C%2522last_name%2522%253A%2522Lawrence%2522%252C%2522username%2522%253A%2522edd14155942465%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726108773%26hash%3D12818195c2651a1e1448ca863ba9c631fd4f86e630d90c8c7f45c54b514a416f&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7311504375%252C%2522first_name%2522%253A%2522James%2522%252C%2522last_name%2522%253A%2522Meyer%2522%252C%2522username%2522%253A%2522jam14155942571%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726108881%26hash%3D36b538b9fe909124b2529993e0df8863a92f26b8dfed641c65a2ae8380a8fcde&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7490071639%252C%2522first_name%2522%253A%2522Annie%2522%252C%2522last_name%2522%253A%2522Hanson%2522%252C%2522username%2522%253A%2522ann14155942585%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726108735%26hash%3Dad533a4bb6ccbd4cc2c3117254ebec6fd80d5e50bc5cdb9ffbfbc08af0cfa14b&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7271564190%252C%2522first_name%2522%253A%2522Ellen%2522%252C%2522last_name%2522%253A%2522Tucker%2522%252C%2522username%2522%253A%2522ell14155942629%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107401%26hash%3Da498a7e07ed082ff1ab9f0e27cbc4ff59f654f557dde8f72dd291044edc55dcf&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7414838832%252C%2522first_name%2522%253A%2522Sue%2522%252C%2522last_name%2522%253A%2522Washington%2522%252C%2522username%2522%253A%2522sue14155942717%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107410%26hash%3D6df1792150404ec99e669094c9c6e752db98267cc2ea5c354be4dac008f305d2&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7072856996%252C%2522first_name%2522%253A%2522Marvin%2522%252C%2522last_name%2522%253A%2522Rice%2522%252C%2522username%2522%253A%2522mar14155942720%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107464%26hash%3D0c4588e76cc1adb8b8606e3364c314cc1ed7787e49f205f011b9a76feef9921b&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7463117716%252C%2522first_name%2522%253A%2522Theresa%2522%252C%2522last_name%2522%253A%2522Bell%2522%252C%2522username%2522%253A%2522the14155942748%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107435%26hash%3D2ea1a0817ef7cfdc05959f35ccaadbb6323056cc4f36487bbb320976d0320367&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7199636748%252C%2522first_name%2522%253A%2522Lucas%2522%252C%2522last_name%2522%253A%2522Payne%2522%252C%2522username%2522%253A%2522luc14155942755%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107477%26hash%3D9affe81d385b3737888fb35e76d01f67311884925f749f1ddf88c002fc188f45&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7524747004%252C%2522first_name%2522%253A%2522Ida%2522%252C%2522last_name%2522%253A%2522Wright%2522%252C%2522username%2522%253A%2522ida14155942822%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107494%26hash%3D09992460d656acd9d7d31c2e4cd95096bad435b5e7dd54b9f7cf81204f8f91f0&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7405309596%252C%2522first_name%2522%253A%2522Courtney%2522%252C%2522last_name%2522%253A%2522Jenkins%2522%252C%2522username%2522%253A%2522cou14155942836%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107484%26hash%3D0f1b930a995a65c2df8cd08f96a473280c88d938264d594e11c41762c55a256b&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7304961616%252C%2522first_name%2522%253A%2522Gabriella%2522%252C%2522last_name%2522%253A%2522Mckinney%2522%252C%2522username%2522%253A%2522gab14155942881%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107476%26hash%3D4164b61d6afc98d6d7c94b483b9b72e68683c8de50808b7fbf3064370a832390&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7210652752%252C%2522first_name%2522%253A%2522Ruby%2522%252C%2522last_name%2522%253A%2522Ruiz%2522%252C%2522username%2522%253A%2522rub14155942889%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107542%26hash%3D9a555d4dd5e09d364d9449b2d931459f9e359172586e4402b1cd932c7aa31177&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A6839575703%252C%2522first_name%2522%253A%2522Robert%2522%252C%2522last_name%2522%253A%2522Garza%2522%252C%2522username%2522%253A%2522rob15395677003%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107509%26hash%3D3952956dbffb1ddd20f7e590c8b4c52f5b8d4ed9c501a2b0574aa7531cb1ddf1&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7546821242%252C%2522first_name%2522%253A%2522Dylan%2522%252C%2522last_name%2522%253A%2522Hale%2522%252C%2522username%2522%253A%2522dyl15395677029%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107544%26hash%3D49ba9dfcf41009f264617bd3d2aa6998c15db533ce7ab8fd00802247a0dd9f9e&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7276456657%252C%2522first_name%2522%253A%2522Lillie%2522%252C%2522last_name%2522%253A%2522Richardson%2522%252C%2522username%2522%253A%2522lil15395677120%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107513%26hash%3D32a760a805ab2a3c70624fc4a099a1d7494f2ddae9ecb704b44a97e9bced012e&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7349330786%252C%2522first_name%2522%253A%2522Alvin%2522%252C%2522last_name%2522%253A%2522Morrison%2522%252C%2522username%2522%253A%2522alv15395677123%2522%252C%2522language_code%2522%253A%2522lt%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107517%26hash%3D219dfb1523fc29a75f35cdb379d3cdf077c153fd55dff1009a08367bbc19b8dc&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7127875067%252C%2522first_name%2522%253A%2522Joanne%2522%252C%2522last_name%2522%253A%2522Miller%2522%252C%2522username%2522%253A%2522joa15395677128%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107559%26hash%3De3c7898e4125a82dd51d75d0e352a5c0f7d64ad0c0e9bf042de2bf03a127bf9a&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7446703477%252C%2522first_name%2522%253A%2522Pauline%2522%252C%2522last_name%2522%253A%2522Green%2522%252C%2522username%2522%253A%2522pau15395677140%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107540%26hash%3D089435993ff25429edd79825f75a2b05a51c1b0b64dcb553a60bfc5d64aff5f1&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A6935482512%252C%2522first_name%2522%253A%2522Hailey%2522%252C%2522last_name%2522%253A%2522Pierce%2522%252C%2522username%2522%253A%2522hai15395677202%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107543%26hash%3D06a90b222294bb0f4edc20eebdb53254c83ccfaf9f6b694a5141b0f808c85bd1&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7525144927%252C%2522first_name%2522%253A%2522Meghan%2522%252C%2522last_name%2522%253A%2522Cook%2522%252C%2522username%2522%253A%2522meg15395677222%2522%252C%2522language_code%2522%253A%2522lt%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107565%26hash%3D30e905f0ec94437cbc8a5e5f2809d154fbdfb5dfba7386a90645aadd7e6b8548&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7541062724%252C%2522first_name%2522%253A%252256261Corey%2522%252C%2522last_name%2522%253A%2522Long%2522%252C%2522username%2522%253A%2522cor15395677458%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107568%26hash%3Df1a653322b54a647957ed8af8aa9283facbdcbc228a851b0a550b84b6aa41ad4&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7090780482%252C%2522first_name%2522%253A%2522Vivan%2522%252C%2522last_name%2522%253A%2522Mills%2522%252C%2522username%2522%253A%2522viv15395677531%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107571%26hash%3D3147b0808b9043620bebcc1e754333a2e802301eaaf8c61339c12ea20fa8512e&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7274805821%252C%2522first_name%2522%253A%2522Julia%2522%252C%2522last_name%2522%253A%2522Torres%2522%252C%2522username%2522%253A%2522jul15395677603%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107571%26hash%3Ded956841aa04bfabbb6e0da29b34494f28299c25ce699607162a2b46b5a1c8f7&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7515469034%252C%2522first_name%2522%253A%2522Sonia%2522%252C%2522last_name%2522%253A%2522Hoffman%2522%252C%2522username%2522%253A%2522son15395677705%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107602%26hash%3Dce1a854ab108c0a972a5f9bdd8226ce00b10ec94529808e820e8ba0459ed54bc&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7531628129%252C%2522first_name%2522%253A%2522Alicia%2522%252C%2522last_name%2522%253A%2522Jordan%2522%252C%2522username%2522%253A%2522ali15395677724%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107591%26hash%3D3a4edc2f147af2b10199fc15f6130351a5d8ec3bdcc18399f34c364d5f4941be&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7335943403%252C%2522first_name%2522%253A%2522Felix%2522%252C%2522last_name%2522%253A%2522Reyes%2522%252C%2522username%2522%253A%2522fel16177811120%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107608%26hash%3Dc3c0865b1dffa0d43da67f3b24af4ce66b389284fcb106783b854fdb0e0a1c70&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7341047740%252C%2522first_name%2522%253A%252256365Vanessa%2522%252C%2522last_name%2522%253A%2522Andrews%2522%252C%2522username%2522%253A%2522van16177811173%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107598%26hash%3Dcf1971c7a5c7c8b7fe50cf6ed07f73cdaaec49bf113fa5e609ff0a751732bb63&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7289629103%252C%2522first_name%2522%253A%2522Milton%2522%252C%2522last_name%2522%253A%2522Rogers%2522%252C%2522username%2522%253A%2522mil16177811193%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107597%26hash%3D5825521a948269f50c378feb466c381570d93d8685cd7c9fd9529ffb6158402e&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7398296190%252C%2522first_name%2522%253A%2522Frank%2522%252C%2522last_name%2522%253A%2522Mills%2522%252C%2522username%2522%253A%2522fra16177811233%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107614%26hash%3D2ed0b4e963ea3fe5d810c5134812125855b357a0561d0db9d4731ba0572b05fb&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7208818552%252C%2522first_name%2522%253A%2522Gabriel%2522%252C%2522last_name%2522%253A%2522Sullivan%2522%252C%2522username%2522%253A%2522gab16673756688%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107621%26hash%3D830ece962d4734072e8b3e1db8df52c2ce7934139d4a52c7cac965be53a0dd41&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7383774788%252C%2522first_name%2522%253A%2522Gladys%2522%252C%2522last_name%2522%253A%2522Morgan%2522%252C%2522username%2522%253A%2522gla16673756907%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107624%26hash%3D53c1e01148a07fbe6100cc235360d1dd77950618fbcc0ce1ff8a1681e1985e07&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7506133859%252C%2522first_name%2522%253A%2522Colleen%2522%252C%2522last_name%2522%253A%2522Shaw%2522%252C%2522username%2522%253A%2522col16673756942%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107629%26hash%3D6195b24c574bf08bebe7f63365ce98a733142aef08606d62d47d71c9a8d8314c&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7186720826%252C%2522first_name%2522%253A%2522Evan%2522%252C%2522last_name%2522%253A%2522Hoffman%2522%252C%2522username%2522%253A%2522eva16673756945%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107632%26hash%3Dec7dd07833c4a6d9db9dfab6c9ddb0b19ed33dea652f7e9e1990b0234eb64389&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A6585733161%252C%2522first_name%2522%253A%2522Andy%2522%252C%2522last_name%2522%253A%2522Bates%2522%252C%2522username%2522%253A%2522and16673756985%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107639%26hash%3D5c99a2c3ff4878a1b9cba7217001e3ea2d9dd39dda649df863137552f680dfe5&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A6778571824%252C%2522first_name%2522%253A%2522Roland%2522%252C%2522last_name%2522%253A%2522Harrison%2522%252C%2522username%2522%253A%2522rol16673757035%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107668%26hash%3D5a70b15c0e95378ce0e6c1a951c7e7e18e43a90e90b7ac6b2d37407870ca139c&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7271923752%252C%2522first_name%2522%253A%2522Diane%2522%252C%2522last_name%2522%253A%2522Torres%2522%252C%2522username%2522%253A%2522dia16673757039%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726108509%26hash%3D7e92499c3ac554ef01d3fe191114e3e6fb5eae16dfab8333116492d561e25331&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7033389231%252C%2522first_name%2522%253A%2522Nathan%2522%252C%2522last_name%2522%253A%2522Jennings%2522%252C%2522username%2522%253A%2522nat16673757060%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726108548%26hash%3D3381d17974f32422b32d7975406e60c2b046edc9a23aab286ba3afe0bdffa957&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7140306391%252C%2522first_name%2522%253A%2522Stacey%2522%252C%2522last_name%2522%253A%2522Hoffman%2522%252C%2522username%2522%253A%2522sta16673757234%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726108534%26hash%3D4b17399fe9d2980ecbfbd26376fbc93e4f741ee707de3562d010aa933d8e7683&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7533211103%252C%2522first_name%2522%253A%2522Cameron%2522%252C%2522last_name%2522%253A%2522Hunter%2522%252C%2522username%2522%253A%2522cam16673757373%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726108565%26hash%3D7481d0202cb7fcbc26c65479856d426b6fefbe8c47cd1293d5a244c4edd91842&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7025417415%252C%2522first_name%2522%253A%2522Marjorie%2522%252C%2522last_name%2522%253A%2522Franklin%2522%252C%2522username%2522%253A%2522mar16673757415%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107725%26hash%3D149e9d2c68754b3d3d8e11c21db5b2ef862d7f69d45776e3d3d01223cc5638a9&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7421207070%252C%2522first_name%2522%253A%2522Joyce%2522%252C%2522last_name%2522%253A%2522Ortiz%2522%252C%2522username%2522%253A%2522joy16673757526%2522%252C%2522language_code%2522%253A%2522lt%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107732%26hash%3Df8dd4bec7cf0920c0067bbe62220f53307eb4ebb139cd2928f17674de389cdf1&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7473317741%252C%2522first_name%2522%253A%2522Willie%2522%252C%2522last_name%2522%253A%2522Lucas%2522%252C%2522username%2522%253A%2522wil16673757680%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107739%26hash%3D2b8c03b97fccc8b9ccb03d32edde8c1f357ddb68a5b77b5a254d0f08f7ab1c8f&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7546031664%252C%2522first_name%2522%253A%2522Rachel%2522%252C%2522last_name%2522%253A%2522Meyer%2522%252C%2522username%2522%253A%2522rac16673757695%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726108595%26hash%3D571832566b04209155624e14349ce572fa82b984462ef63b5a7b3cfe8c8a7eb9&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7541291088%252C%2522first_name%2522%253A%2522Gilbert%2522%252C%2522last_name%2522%253A%2522Barnett%2522%252C%2522username%2522%253A%2522gil16673757769%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107752%26hash%3Dd78f7eed5b31774a44e426db8e05aa31af2cfdd0b15d21681971884816d0de50&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A6881767965%252C%2522first_name%2522%253A%2522Judith%2522%252C%2522last_name%2522%253A%2522Kelly%2522%252C%2522username%2522%253A%2522jud16673757872%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107756%26hash%3D0787005c5bd8fb17b5c0995fdadeaa28164bdbb2acca8f9dd0852cfa75eba25a&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A6977067020%252C%2522first_name%2522%253A%2522Josephine%2522%252C%2522last_name%2522%253A%2522Gonzales%2522%252C%2522username%2522%253A%2522jos16675660141%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107765%26hash%3Df88ed410a5b87331e3e198aea62acfb39bfe35ed375195cd2f3e8a31b7f23df8&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7421149345%252C%2522first_name%2522%253A%2522Jane%2522%252C%2522last_name%2522%253A%2522Gilbert%2522%252C%2522username%2522%253A%2522jan16675660273%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107824%26hash%3D2e99372dedb3df6a42f02fe11613d5ed8583ec926042d6d6b86745174f09e96f&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7217457575%252C%2522first_name%2522%253A%2522Vicki%2522%252C%2522last_name%2522%253A%2522Lucas%2522%252C%2522username%2522%253A%2522vic16675660315%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107781%26hash%3D3ce274df46fa325195f94cc7bb529d9655af21062f4f48ebd0be1cb4e5b7e580&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7502193849%252C%2522first_name%2522%253A%2522Colleen%2522%252C%2522last_name%2522%253A%2522Scott%2522%252C%2522username%2522%253A%2522col16675660385%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107806%26hash%3Dbb559e9a867cf8ee9768504d20e2f21da4c8ef8d8eab02db3ae81998802bc01f&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7340052692%252C%2522first_name%2522%253A%2522Javier%2522%252C%2522last_name%2522%253A%2522Chavez%2522%252C%2522username%2522%253A%2522jav16675660398%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107795%26hash%3D531367b521fb28c78796ce7339e122802e1826c4b376c52961f41cac1e38abb7&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7034799832%252C%2522first_name%2522%253A%2522Mathew%2522%252C%2522last_name%2522%253A%2522Kelly%2522%252C%2522username%2522%253A%2522mat16675660465%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107871%26hash%3Dc8f7ff96615b59e9d86609d5647174d6418b2541cfd4d497e71a6f6458b756f8&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7517581611%252C%2522first_name%2522%253A%2522Colleen%2522%252C%2522last_name%2522%253A%2522Price%2522%252C%2522username%2522%253A%2522col17812013012%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107820%26hash%3D0c658263fb1e9e3fec5997c8e4f917004e31b296819db6e8558db734999a6ae3&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7078755594%252C%2522first_name%2522%253A%2522Bertha%2522%252C%2522last_name%2522%253A%2522Pearson%2522%252C%2522username%2522%253A%2522ber17812013155%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107829%26hash%3Dfa48438eca3968aa433dfd65532a420c7574b2857955cef1c578935bb3233035&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7501623951%252C%2522first_name%2522%253A%2522Ivan%2522%252C%2522last_name%2522%253A%2522Hayes%2522%252C%2522username%2522%253A%2522iva17812013179%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726108901%26hash%3D3c02155783252da22729e095338fbc2c62eae2a5e45895ed15e4bbf07d7bbbf7&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7219437944%252C%2522first_name%2522%253A%2522Ava%2522%252C%2522last_name%2522%253A%2522Prescott%2522%252C%2522username%2522%253A%2522ava17812013220%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107860%26hash%3D553766f4cd4b9587607c642d5e0b2b5bf71325b9b1a250509fe753ada013b27b&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7526513975%252C%2522first_name%2522%253A%2522Ben%2522%252C%2522last_name%2522%253A%2522Fisher%2522%252C%2522username%2522%253A%2522ben17812013306%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107878%26hash%3D9a17592b2e8acc70f9101fc1b78214c9839096f3d8e804e08a3e7284e57c629f&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7386411652%252C%2522first_name%2522%253A%2522Duane%2522%252C%2522last_name%2522%253A%2522Lewis%2522%252C%2522username%2522%253A%2522dua17812013351%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107860%26hash%3De7db249dd146517b3f5eb88f00b29a9133d8bff7dbde1dcf8b177f297567c8b3&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7421832461%252C%2522first_name%2522%253A%2522Catherine%2522%252C%2522last_name%2522%253A%2522Morales%2522%252C%2522username%2522%253A%2522cat17812013360%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107886%26hash%3D352f53dbc77c633a7c6229bc60f81eb31c3efe3029d55ba248f03d6511a4a4ff&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7448263601%252C%2522first_name%2522%253A%2522Elsie%2522%252C%2522last_name%2522%253A%2522Wright%2522%252C%2522username%2522%253A%2522els17812013434%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107940%26hash%3D6007d4a2f2afd67ac43ec2a2fd0e763c291cd98712984bb43f2c681056bfbe60&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7363488292%252C%2522first_name%2522%253A%2522Warren%2522%252C%2522last_name%2522%253A%2522Peters%2522%252C%2522username%2522%253A%2522war17812013474%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107897%26hash%3D2c2f680ec911892a2c539ddcad7efe89038719618c49da333f70788558445c20&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7489262966%252C%2522first_name%2522%253A%2522Michele%2522%252C%2522last_name%2522%253A%2522Lawrence%2522%252C%2522username%2522%253A%2522mic17812013482%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107920%26hash%3D8ded77ff8e16e9c01e41bdef72726cb66e1ee0cfdbd39eb7e0d486242cc8a7bd&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A6928917815%252C%2522first_name%2522%253A%2522Aubrey%2522%252C%2522last_name%2522%253A%2522Arnold%2522%252C%2522username%2522%253A%2522aub17812013668%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726108002%26hash%3D3ed0e62a8be6359e66434d1bc658e6a2cb3b7a893b525192c96c3f0764e99042&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7478963973%252C%2522first_name%2522%253A%2522Terry%2522%252C%2522last_name%2522%253A%2522Vargas%2522%252C%2522username%2522%253A%2522ter17812013751%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726107922%26hash%3Dd62390493630bacbaec4ca0575264a8325d31c623151fb8d4bd1b554e013bd06&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
  "https://telegram.blum.codes/?tgWebAppStartParam=ref_K2QD6GeNHi#tgWebAppData=user%3D%257B%2522id%2522%253A7514582915%252C%2522first_name%2522%253A%2522Gloria%2522%252C%2522last_name%2522%253A%2522Murray%2522%252C%2522username%2522%253A%2522glo17812013918%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D4331962878866535385%26chat_type%3Dchannel%26start_param%3Dref_K2QD6GeNHi%26auth_date%3D1726108016%26hash%3Dccfada53fed04ef0e3dea4681e6632d78387dcbe45237819f0ec4abb72860b52&tgWebAppVersion=7.8&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D",
]
async function getHeaders(user) {
  return {
      'authorization': `Bearer ${user.access}`,
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      // 'content-length': '0',
      'origin': 'https://telegram.blum.codes',
      'priority': 'u=1, i',
      'sec-ch-ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  }
}

async function getNewToken(user) {
  const headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': '0',
    'origin': 'https://telegram.blum.codes',
    'priority': 'u=1, i',
    'sec-ch-ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  };

  const url = 'https://gateway.blum.codes/v1/auth/refresh';

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await axios.post(url, {
        refresh: user.refresh
      }, {headers: headers});

      if (response.status === 200) {
        console.log(colors.green('Token tạo thành công'));
        return response.data;
      } else {
        console.log(colors.red(`Lấy token thất bại, thử lại lần thứ ${attempt + 1}`));
      }
    } catch (e) {
      console.log(colors.red(`Lỗi khi lấy token: ${e.message}`));
    }
  }
  console.log(colors.red('Lấy token thất bại sau 3 lần thử.'));
  return null;
}

async function getUserInfo(user, index) {
  const headers = await getHeaders(user)
  try {
    await axios.get('https://gateway.blum.codes/v1/user/me', {headers: headers});
    return users[index];
  } catch (e) {
    const hasil = e.response.data;
    if (hasil.message === 'Token is invalid') {
      console.log(colors.red('Token không hợp lệ, đang lấy token mới...'));
      const newToken = await getNewToken(user);
      if (newToken) {
        console.log(colors.green('Đã có token mới, thử lại...'));
        users[index] = {
          ...users[index],
          ...newToken,
          user: users[index].user
        }
        fs.writeFileSync('blum.json', JSON.stringify(users, null, 4));
        return await getUserInfo(newToken, index);
      } else {
        console.log(colors.red('Lấy token mới thất bại.'));
        return null;
      }
    } else {
      console.log(colors.red('Không thể lấy thông tin người dùng'));
      return null;
    }
  }
}

async function getBalance(user) {
  const headers = await getHeaders(user)
  try {
    const res = await axios.get('https://game-domain.blum.codes/api/v1/user/balance', {headers: headers});
    return res.data
  } catch (e) {
    console.log('getBalance', e.message)
    return null
  }
}

async function dailyReward(user) {
  const headers = await getHeaders(user)
  let success = false;
  try {
    const res = await axios.get('https://game-domain.blum.codes/api/v1/daily-reward?offset=-420', {headers: headers});
    if (res.status === 200) {
      try {
        const randTime3 = Math.floor(Math.random() * 2) + 1;
        await new Promise(resolve => setTimeout(resolve, (1 + randTime3) * 1000));
        const re = await axios.post('https://game-domain.blum.codes/api/v1/daily-reward?offset=-420', {},{headers: headers});
        console.log('success', re.data, re.status)
      } catch (e) {
        console.log('error post daily-reward', e.message, e.response.data)
      }
    }
    success = true;
  } catch (e) {
    console.log('error get daily-reward', e.response.data)
  }
  try {
    await axios.get('https://game-domain.blum.codes/api/v1/time/now', {headers: headers});
  } catch (e) {
    console.log('error get now', e.response.data)
  }
  return success
}

async function playGame(user) {
  try {
    const headers = {
      'authorization': `Bearer ${user.access}`,
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      'content-length': '0',
      'origin': 'https://telegram.blum.codes',
      'priority': 'u=1, i',
      'sec-ch-ua': '"Chromium";v="125", "Not.A/Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
    };
    const res = await axios.post('https://game-domain.blum.codes/api/v1/game/play', {}, {headers: headers});
    return res.data.gameId ?? ''
  } catch (error) {
    console.log(colors.red("error start game: ", error))
  }
}


async function claimGame(user, gameId) {
  const url = 'https://game-domain.blum.codes/api/v1/game/claim';
  const headers = {
    'authorization': `Bearer ${user.access}`,
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    'origin': 'https://telegram.blum.codes',
    'priority': 'u=1, i',
    'sec-ch-ua': '"Chromium";v="125", "Not.A/Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
  };

  const randCoin = Math.floor(Math.random() * 180) + 31;
  await axios.post(url, {
    gameId: gameId,
    points: randCoin
  }, {headers: headers});
}

async function claimBalance(user) {
  const headers = await getHeaders(user)
  try {
    const res = await axios.post('https://game-domain.blum.codes/api/v1/farming/claim', {}, {headers: headers});
    return res.status === 200
  } catch (e) {
    console.log(e.response.data)
    return false
  }
}

async function startFarming(user) {
  const headers = await getHeaders(user)
  try {
    await axios.post('https://game-domain.blum.codes/api/v1/farming/start', {}, {headers: headers});
    console.log("Start farming success!");
  }catch (e) {
    console.log("Start farming error!");
  }
}

async function checkBalanceFriend(user) {
  const headers = await getHeaders(user)
  try {
    const response = await axios.get(`https://gateway.blum.codes/v1/friends/balance`, { headers: headers });
    return response.data;
  } catch (error) {
    console.log(`Không thể kiểm tra số dư bạn bè: ${error.message}`);
    return null;
  }
}

async function claimBalanceFriend(user) {
  const headers = await getHeaders(user)
  try {
    const response = await axios.post(`https://gateway.blum.codes/v1/friends/claim`, {}, { headers: headers });
    return response.data;
  } catch (error) {
    console.log(`Không thể nhận số dư bạn bè!`, 'error');
    return null;
  }
}

async function getTasks(user) {
  const headers = await getHeaders(user)
  try {
    const response = await axios.get('https://game-domain.blum.codes/api/v1/tasks', {headers: headers});
    return response.data;
  } catch (error) {
    console.log(`Không thể lấy danh sách nhiệm vụ: ${error.message}`);
    return [];
  }
}

async function startTask(user, taskId) {
  const headers = await getHeaders(user)
  try {
    const response = await axios.post(`https://game-domain.blum.codes/api/v1/tasks/${taskId}/start`, {}, {headers: headers});
    return response.data;
  } catch (error) {
     console.log(`Không thể bắt đầu nhiệm vụ ${taskId}: ${error.message}`);
    return null;
  }
}

async function claimTask(user, taskId) {
  const headers = await getHeaders(user)
  try {
    const response = await axios.post(`https://game-domain.blum.codes/api/v1/tasks/${taskId}/claim`, {}, {headers: headers});
    return response.data;
  } catch (error) {
    console.log(`Không thể bắt đầu claim ${taskId}: ${error.message}`);
    return null;
  }
}

async function joinTribe(user, tribeId) {
  const headers = await getHeaders(user)
  const url = `https://game-domain.blum.codes/api/v1/tribe/${tribeId}/join`;
  try {
    const response = await axios.post(url, {}, { headers: headers });
    if (response.status === 200) {
      console.log('Bạn đã gia nhập tribe thành công');
      return true;
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message === 'USER_ALREADY_IN_TRIBE') {
      console.log('Bạn đã gia nhập tribe rồi');
    } else {
      console.log(`Không thể gia nhập tribe: ${error.message}`);
    }
    return false;
  }
}
async function processToken(iframe) {
  let decodedData = "";
  try {
      const parsedUrl = new URL(iframe);
      
      const fragment = parsedUrl.hash.substring(1);
      // Extract tgWebAppData parameter
      const params = new URLSearchParams(fragment);
      const tgWebAppData = params.get('tgWebAppData');
      // Decode the tgWebAppData value
      decodedData = decodeURIComponent(tgWebAppData);
      const token = await getNewToken(decodedData);
      const userInfo = await getUserInfos(token);
      
      updateBlumJson(token, userInfo.username);
  } catch (e) {
      console.log("error", e);
  }
}

async function getNewToken(queryId) {
  console.log("Getting new token for queryId: ", queryId);
  const headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "origin": "https://telegram.blum.codes",
    "referer": "https://telegram.blum.codes/"
  };

  const data = JSON.stringify({ query: queryId });
  const url = "https://user-domain.blum.codes/api/v1/auth/provider/PROVIDER_TELEGRAM_MINI_APP";

  for (let attempt = 0; attempt < 3; attempt++) {
      console.log("Getting token...");
      try {
          const requestConfig = {
              method: 'post',
              url: url,
              data: data,
              headers: headers
          };
          const response = await axios(requestConfig);
          if (response.status === 200) {
              console.log("Token successfully created");
              return response.data.token.refresh;
          } else {
              console.log(response.data);
              console.log(`Failed to get token, attempt ${attempt + 1}`);
          }
      } catch (error) {
          console.log(`Failed to get token, attempt ${attempt + 1}`);
          console.log(error);
      }
  }
  return null;
}

function updateBlumJson(token, username) {
  try {
      const filePath = path.join(__dirname, './blum.json');
      const data = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(data);

      let userFound = false;
      for (const item of jsonData) {
          if (item.user === username) {
              item.access = token;
              userFound = true;
              break;
          }
      }

      if (!userFound) {
          jsonData.push({
              access: token,
              refresh: "",
              user: username
          });
      }

      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
      console.log('File updated successfully');
  } catch (error) {
      console.error('Error updating file:', error);
  }
}


async function getUserInfos(token) {
  const headers = {
    'Authorization': `Bearer ${token}`,
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'origin': 'https://telegram.blum.codes',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0'
  };

  try {
      const requestConfig = {
          method: 'get',
          url: 'https://gateway.blum.codes/v1/user/me',
          headers,
      };
      const response = await axios(requestConfig);

      if (response.status === 200) {
          return response.data;
      } else {
          const result = response.data;

          if (result.message === 'Token is invalid') {
              console.log("Invalid token, getting a new token...");
              const newToken = await getNewToken("", proxy);
              if (newToken) {
                  console.log("New token obtained, trying again...");
                  return getUserInfo(newToken, proxy);
              } else {
                  console.log("Failed to get a new token.");
                  return null;
              }
          } else {
              console.log("Failed to get user information");
              return null;
          }
      }
  } catch (e) {
      // console.log(e);
      return null;
  }
}

// Sử dụng các hàm đã định nghĩa ở trên
(async () => {
  console.log(`============== BLUM ==============`);
  console.log(`============== ${DateTime.now().toString()} ==============`);
  iframes.forEach(async (iframe) => {
    await processToken(iframe)
  })
  await new Promise(r => setTimeout(r, 2000));
  for (let i = 0; i < users.length; i++) {
    console.log(colors.blue(`Bắt đầu tài khoản ${users[i].user ?? ''}`))
    let user = users[i];
    user = await getUserInfo(user, i);
    if (user === null) {
      console.log('Không tìm thấy thông tin người dùng: ', users[i].user);
      continue;
    }
    console.log("Lấy token mới : ", user.access === users[i].access)
    const balance = await getBalance(user);

    // script làm tasks
    await checkBalanceFriend(user);
    await claimBalanceFriend(user);
    await dailyReward(user);
    const tribeId = 'b372af40-6e97-4782-b70d-4fc7ea435022';
    await joinTribe(user, tribeId);
    if (balance && typeof balance.farming === 'undefined') {
      await startFarming(user);
    }

    const dataTask = await getTasks(user);
    for (const task of dataTask[0].subSections){
      for ( const t of task.tasks){
        await startTask(user, t.id);        
      }
    }

    for (const task of dataTask[0].subSections){
      for ( const t of task.tasks){
        await claimTask(user, t.id);
      }
    }

    // script chơi game
    let playPasses = balance.playPasses ?? 0;
    if (playPasses > 0) {
      const randTime2 = Math.floor(Math.random() * 4) + 1;
      await new Promise(resolve => setTimeout(resolve, (2 + randTime2) * 1000));

      console.log(`Có ${playPasses} lượt. Bắt đầu chơi game ....`);
      while (playPasses > 0) {
        const gameId = await playGame(user);
        if (gameId !== '') {
          const randTime3 = Math.floor(Math.random() * 5) + 1;
          await new Promise(resolve => setTimeout(resolve, (60 + randTime3) * 1000));
          await claimGame(user, gameId);
          console.log(`Kết thúc gameID ${gameId}`);
        }
        if (playPasses > 0) {
          console.log(`Còn lại ${playPasses - 1} lượt`);
        }
        playPasses -= 1;
      }
    } else {
      console.log(`Hết lượt chơi game .... `);
    }
  }
})();


