export const HEALTH_FIELD = 'OK';
export const TIME_NOW_FIELD = 1572652800000;
export const TIME_DATE_FIELD = new Date(TIME_NOW_FIELD);
export const TIME_MINUS_24HRS_FIELD = TIME_NOW_FIELD - 24 * 60 * 60 * 1000;
export const TIME_PLUS_24HRS_FIELD = TIME_NOW_FIELD + 24 * 60 * 60 * 1000;
export const TIME_NOW_STRING_FIELD = '2019-11-02T00:00:00.000Z';
export const TIME_NOW_DATE_FIELD = new Date(TIME_NOW_STRING_FIELD);
export const TIME_MINUS_24HRS_STRING_FIELD = '2019-11-01T00:00:00.000Z';
export const TIME_PLUS_24HRS_STRING_FIELD = '2019-11-03T00:00:00.000Z';
export const TIME_PLUS_24HRS_DATE_FIELD = new Date(
  TIME_PLUS_24HRS_STRING_FIELD
);
export const TIME_DATE_STRING_FIELD = '2021-01-11 10:10:00';
export const DATE_MOMENT_MINUS_24HRS_STRING_FIELD = '20191101';
export const DATE_MOMENT_PLUS_24HRS_STRING_FIELD = '20191103';
export const USER_FIELD = 'tester';
export const USER_ACCOUNT_ID_FIELD = '12365765';
export const EMAIL_FIELD = 'test@wiserjournal.com';
export const USER_EMAIL_FIELD = 'tester@wiserjournal.com';
export const URL_FIELD = 'https://www.wiserjournal.com/';
export const STRING_FIELD = 'test';
export const COMPANY_NAME_FIELD = 'Any kind of Text in English';
export const STRING_PHONE_FIELD = '1234567778';
export const STRING_FAX_FIELD = '23456711';
export const HTML_TEXT_FIELD = '<p>test</p>';
export const STRING_REGISTRY_CODE_FIELD = 'R03';
export const STRING_SUCCESS_FIELD = '1';
export const SHORT_ID_FIELD = 'bfg143vhn';
export const SHORT_ID_NUMBER_FIELD = '1';
export const DATE_FIELD = new Date(0);
export const MODEL_NO_FIELD = '10001';
export const MODEL_ORDER_NO_FIELD = '1910042485';
export const MODEL_NOS_FIELD = '10001,10002';
export const MONGO_ID_FIELD = '5f4bd1b0ee7c6953bf87ee50';
export const UUID_FIELD = 'daf5b3b5-e2d4-40f9-bfaa-ca1de045e90d';
export const STATUS_FIELD = 1;
export const STATUS_STRING_FIELD = 'active';
export const MONGO_VERSION_FIELD = 1;
export const MONGO_OBJECT_ID_FIELD = '5f4bd1b0ee7c6953bf87ee50';
export const BOOLEAN_FIELD = true;
export const BOOLEAN_FALSE_FIELD = false;
export const NUMBER_FIELD = 1;
export const NUMBER_ZERO_FIELD = 0;
export const STRING_NUMBER_FIELD = '1';
export const DATE_NUMBER_FIELD = 0;
export const MARKET_FIELD = 0;
export const MARKET_STRING_FIELD = 'HK';
export const EXCHANGE_FIELD = 0;
export const EXCHNAGE_STRING_FIELD = 'HK';
export const AMOUNT_FIELD = 2000;
export const OBJECT_ID_FIELD = '5da175018b5d382c56637b91';
export const INDEX_CODE_FIELD = 'HSI';
export const STOCK_CODE_FIELD = '02018';
export const HK_FULL_STOCK_CODE_FIELD = '02018.HK';
export const US_STOCK_CODE_FIELD = 'AAPL';
export const COMPANY_ID_FIELD = '5da175018b5d382c56637b91';
export const TAXREFUNDPERMISSION_FIELD = 1;
export const IMAGE_CONTENT_TYPE_FIELD = 'image/jpeg';
export const IMAGE_FILENAME_FIELD = 'test.jpeg';
export const IMAGE_S3_PATH_FIELD = 'test/test.jpg';
export const IMAGE_S3_KEY_FIELD = 'bf433d4d-5d20-4f24-a561-f42753acff50';
export const IMAGE_S3_TYPE_FIELD = 'temp';
export const IMAGE_S3_KEY_PATH_FIELD = `${IMAGE_S3_TYPE_FIELD}/${IMAGE_S3_KEY_FIELD}`;
export const IMAGE_S3_KEY_URL_FIELD = `${URL_FIELD}${IMAGE_S3_KEY_PATH_FIELD}`;
export const HASH_SHA_256_FIELD =
  'ed968e840d10d2d313a870bc131a4e2c311d7ad09bdf32b3418147221f51a6e2';
export const HASH_FIELD =
  'd003881275d2751f5078f657123683048e358bdf99af752ad203e29a4e58c2df3392b3c5e68f35ce95c4b9150b97fc0a8843bda257b7d8d4e9467433cb7d2a9f5744888c78d641f72c30e271a74523fc999c29c5e19ab5e4b7610c8274d208d85b9ec1b30d563bb3645659df6c45668f237a4aedb55f810f92436a04dda2545884e4d59e0957e4804aa8d45cb48f870b930fa7393ebca0371f70006fa2810d0c405fa8a4617947b81628baf7cd89e8b7da9ba1d1abaa70d7a79bea2bc6b54667995ccc18cf8490ce47330d9a54c08195a375bf70c8ff2eace6289fea325a9e861c4660f44169236ba4456cfec2dfee895955341c998224c27eac890cfa194d265a476fe0057ef27cfdf4cc2834e788bb01684d7bce315fa4cf23009e1e225b39e07ce547095ec41a2c00095b4994bd42b5eae535401a4744a0a5270cf98930c4';
export const KEY_FIELD = 'xnbfh13dcn3';
export const REQUEST_ID_FIELD = 'icon-service-test';
export const REQUEST_PATH_FIELD = 'v1.0/test';
export const REQUEST_METHOD_FIELD = 'GET';
export const INFOCAST_TIME_DATE_STRING_FIELD = '2021-01-11 10:10:00';
export const FILE_ID_FIELD = '5b833a74a5e4fd0079feaf33';
export const TEMP_FILE_URL = `https://dev-icon-api-image-cdn.hktester.com/temporary/${IMAGE_FILENAME_FIELD}`;
export const CDN_FILE_URL =
  'https://dev-icon-api-image-cdn.hktester.com/test/xxx.jpg';

export const HALT_REASON = 'news pending';

export const BASIC_COLLECTION_FIELDS = {
  createdBy: USER_FIELD,
  updatedBy: USER_FIELD,
  createdByEmail: EMAIL_FIELD,
  updatedByEmail: EMAIL_FIELD,
  createdAt: TIME_MINUS_24HRS_FIELD,
  updatedAt: TIME_NOW_FIELD,
  version: NUMBER_FIELD,
};

export const USER_SESSION_DTO_FIELDS = {
  userId: USER_ACCOUNT_ID_FIELD,
  userEmail: USER_EMAIL_FIELD,
};

export const FILE_DTO_FIELDS = {
  fileId: FILE_ID_FIELD,
  url: CDN_FILE_URL,
  caption: 'mainImage Caption',
  contentType: 'image/jpeg',
  filename: 'xxx.jpeg',
  s3Path: 'test/xxx.jpg',
};
