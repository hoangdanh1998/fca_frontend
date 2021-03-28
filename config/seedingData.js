import moment from 'moment';

export const ORDER_LIST = [
  {
    id: 1,
    customerPhone: '766-564-0398',
    partnerStore: 'ghaseley0',
    status: 'INITIALIZATION',
    createdDate: '01/04/2020',
  },
  {
    id: 2,
    customerPhone: '900-989-9340',
    partnerStore: 'bbust1',
    status: 'INITIALIZATION',
    createdDate: '12/03/2020',
  },
  {
    id: 3,
    customerPhone: '879-401-4830',
    partnerStore: 'fblunsum2',
    status: 'ACCEPTANCE',
    createdDate: '27/03/2020',
  },
  {
    id: 4,
    customerPhone: '232-609-7708',
    partnerStore: 'mdoubleday3',
    status: 'ACCEPTANCE',
    createdDate: '20/03/2020',
  },
  {
    id: 5,
    customerPhone: '481-163-6463',
    partnerStore: 'mvice4',
    status: 'REJECTION',
    createdDate: '18/03/2020',
  },
  {
    id: 6,
    customerPhone: '929-698-6702',
    partnerStore: 'wabercromby5',
    status: 'PREPARATION',
    createdDate: '03/09/2020',
  },
  {
    id: 7,
    customerPhone: '287-382-8957',
    partnerStore: 'bmaggi6',
    status: 'REJECTION',
    createdDate: '03/12/2020',
  },
  {
    id: 8,
    customerPhone: '820-779-9709',
    partnerStore: 'fskowcraft7',
    status: 'PREPARATION',
    createdDate: '15/06/2020',
  },
  {
    id: 9,
    customerPhone: '151-264-0975',
    partnerStore: 'lwickens8',
    status: 'READINESS',
    createdDate: '18/12/2020',
  },
  {
    id: 10,
    customerPhone: '764-289-6481',
    partnerStore: 'fbolzen9',
    status: 'READINESS',
    createdDate: '16/03/2020',
  },
  {
    id: 11,
    customerPhone: '698-794-8146',
    partnerStore: 'awhitcomba',
    status: 'RECEPTION',
    createdDate: '07/12/2020',
  },
  {
    id: 12,
    customerPhone: '934-634-4153',
    partnerStore: 'hfrankcombeb',
    status: 'RECEPTION',
    createdDate: '26/02/2020',
  },
  {
    id: 13,
    customerPhone: '830-335-6475',
    partnerStore: 'lcauncec',
    status: 'CLOSURE',
    createdDate: '01/09/2020',
  },
  {
    id: 14,
    customerPhone: '546-169-0963',
    partnerStore: 'kchevertond',
    status: 'WAIT',
    createdDate: '11/09/2020',
  },
  {
    id: 15,
    customerPhone: '794-542-5740',
    partnerStore: 'cgoodhande',
    status: 'CLOSURE',
    createdDate: '19/12/2020',
  },
  {
    id: 16,
    customerPhone: '787-726-2199',
    partnerStore: 'pbrattanf',
    status: 'WAIT',
    createdDate: '02/02/2020',
  },
  {
    id: 17,
    customerPhone: '384-606-3901',
    partnerStore: 'lrapleyg',
    status: 'CANCELLATION',
    createdDate: '24/01/2021',
  },
  {
    id: 18,
    customerPhone: '964-374-7037',
    partnerStore: 'rfilbyh',
    status: 'CANCELLATION',
    createdDate: '02/02/2020',
  },
  {
    id: 19,
    customerPhone: '572-268-8939',
    partnerStore: 'gyanelei',
    status: 'REJECTION',
    createdDate: '16/07/2020',
  },
  {
    id: 20,
    customerPhone: '211-376-7422',
    partnerStore: 'ntwycrossj',
    status: 'REJECTION',
    createdDate: '11/05/2020',
  },
  {
    id: 21,
    customerPhone: '832-908-2628',
    partnerStore: 'bbrumfieldk',
    status: 'ACCEPTANCE',
    createdDate: '17/10/2020',
  },
  {
    id: 22,
    customerPhone: '381-155-7765',
    partnerStore: 'bashelfordl',
    status: 'ACCEPTANCE',
    createdDate: '08/02/2020',
  },
  {
    id: 23,
    customerPhone: '768-352-8644',
    partnerStore: 'gchsteneym',
    status: 'REJECTION',
    createdDate: '15/04/2020',
  },
  {
    id: 24,
    customerPhone: '700-169-9170',
    partnerStore: 'gprewettn',
    status: 'REJECTION',
    createdDate: '08/10/2020',
  },
  {
    id: 25,
    customerPhone: '615-276-5765',
    partnerStore: 'vpaffleyo',
    status: 'REJECTION',
    createdDate: '01/07/2020',
  },
  {
    id: 26,
    customerPhone: '587-763-9251',
    partnerStore: 'epinneyp',
    status: 'REJECTION',
    createdDate: '05/12/2020',
  },
  {
    id: 27,
    customerPhone: '843-429-9085',
    partnerStore: 'bmatitiahoq',
    status: 'ACCEPTANCE',
    createdDate: '10/10/2020',
  },
  {
    id: 28,
    customerPhone: '258-256-0542',
    partnerStore: 'jopdenortr',
    status: 'ACCEPTANCE',
    createdDate: '20/01/2021',
  },
  {
    id: 29,
    customerPhone: '356-723-5105',
    partnerStore: 'bthorogoods',
    status: 'ACCEPTANCE',
    createdDate: '17/04/2020',
  },
  {
    id: 30,
    customerPhone: '784-222-1525',
    partnerStore: 'bcareswellt',
    status: 'WAIT',
    createdDate: '29/05/2020',
  },
];

export const PARTNER_LIST = [
  {
    id: 1,
    storeName: 'Holmgrenanthe petrophila (Coville & Morton) Elisens',
    storeAddress: '8795 Forster Court',
    storeStatus: 'APPROVED',
    expirationDate: '01/09/2020',
    createdDate: '01/09/2020',
  },
  {
    id: 2,
    storeName: 'Ornithopus sativus Brot. ssp. sativus',
    storeAddress: '00871 Sloan Avenue',
    storeStatus: 'PROCESS',
    expirationDate: '25/07/2020',
    createdDate: '25/07/2020',
  },
  {
    id: 3,
    storeName:
      'Dichanthelium sphaerocarpon (Elliott) Gould var. isophyllum (Scribn.) Gould & C.A. Clark',
    storeAddress: '95 Sunnyside Center',
    storeStatus: 'PROCESS',
    expirationDate: '28/10/2020',
    createdDate: '28/10/2020',
  },
  {
    id: 4,
    storeName: 'Cymbocarpa refracta Miers',
    storeAddress: '9 Meadow Vale Trail',
    storeStatus: 'PROCESS',
    expirationDate: '24/12/2020',
    createdDate: '24/12/2020',
  },
  {
    id: 5,
    storeName: 'Coreocarpus Benth.',
    storeAddress: '74 Summit Alley',
    storeStatus: 'APPROVED',
    expirationDate: '15/04/2020',
    createdDate: '15/04/2020',
  },
  {
    id: 6,
    storeName: 'Cyclanthera pedata (L.) Schrad.',
    storeAddress: '10085 Columbus Avenue',
    storeStatus: 'APPROVED',
    expirationDate: '15/04/2020',
    createdDate: '15/04/2020',
  },
  {
    id: 7,
    storeName: 'Clematis coactilis (Fernald) Keener',
    storeAddress: '2981 Carey Court',
    storeStatus: 'APPROVED',
    expirationDate: '15/02/2020',
    createdDate: '15/02/2020',
  },
  {
    id: 8,
    storeName: 'Diodia radula Cham. & Schltdl.',
    storeAddress: '4 Aberg Pass',
    storeStatus: 'APPROVED',
    expirationDate: '21/05/2020',
    createdDate: '21/05/2020',
  },
  {
    id: 9,
    storeName: 'Calylophus Spach',
    storeAddress: '3 Garrison Circle',
    storeStatus: 'APPROVED',
    expirationDate: '25/01/2021',
    createdDate: '25/01/2021',
  },
  {
    id: 10,
    storeName: 'Justicia cooleyi Monachino & Leonard',
    storeAddress: '24180 Pennsylvania Street',
    storeStatus: 'APPROVED',
    expirationDate: '12/06/2020',
    createdDate: '12/06/2020',
    createdDate: '12/06/2020',
  },
  {
    id: 11,
    storeName: 'Stellaria crassifolia Ehrh.',
    storeAddress: '1 Pierstorff Terrace',
    storeStatus: 'APPROVED',
    expirationDate: '02/06/2020',
    createdDate: '12/06/2020',
  },
  {
    id: 12,
    storeName: 'Douglasia beringensis S. Kelso',
    storeAddress: '495 Forest Run Lane',
    storeStatus: 'APPROVED',
    expirationDate: '30/07/2020',
    createdDate: '12/06/2020',
  },
  {
    id: 13,
    storeName: 'Tortula amphidiacea (Müll. Hal.) Broth.',
    storeAddress: '3 Loeprich Lane',
    storeStatus: 'PROCESS',
    expirationDate: '30/12/2020',
    createdDate: '12/06/2020',
  },
  {
    id: 14,
    storeName: 'Phlox colubrina Wherry & Constance',
    storeAddress: '93935 Spohn Place',
    storeStatus: 'APPROVED',
    expirationDate: '31/03/2020',
    createdDate: '12/06/2020',
  },
  {
    id: 15,
    storeName: 'Elymus elymoides (Raf.) Swezey ssp. hordeoides (Suksd.) Barkworth',
    storeAddress: '8231 Mitchell Plaza',
    storeStatus: 'REJECTED',
    expirationDate: '27/09/2020',
    createdDate: '12/06/2020',
  },
  {
    id: 16,
    storeName: 'Epilobium leptophyllum Raf.',
    storeAddress: '186 Tony Trail',
    storeStatus: 'APPROVED',
    expirationDate: '03/03/2020',
    createdDate: '12/06/2020',
  },
  {
    id: 17,
    storeName: 'Celtis L.',
    storeAddress: '5 Fair Oaks Way',
    storeStatus: 'APPROVED',
    expirationDate: '18/03/2020',
    createdDate: '12/06/2020',
  },
  {
    id: 18,
    storeName: 'Acarospora fuscescens H. Magn.',
    storeAddress: '3184 Sheridan Alley',
    storeStatus: 'REJECTED',
    expirationDate: '26/09/2020',
    createdDate: '12/06/2020',
  },
  {
    id: 19,
    storeName: 'Verbesina aristata (Elliott) A. Heller',
    storeAddress: '88334 Stone Corner Court',
    storeStatus: 'APPROVED',
    expirationDate: '20/11/2020',
    createdDate: '12/06/2020',
  },
  {
    id: 20,
    storeName: 'Delphinium carolinianum Walter ssp. virescens (Nutt.) R.E. Brooks',
    storeAddress: '44513 Welch Pass',
    storeStatus: 'REJECTED',
    expirationDate: '03/05/2020',
    createdDate: '12/06/2020',
  },
  {
    id: 21,
    storeName: 'Fabronia Raddi',
    storeAddress: '5 Dexter Pass',
    storeStatus: 'APPROVED',
    expirationDate: '14/10/2020',
    createdDate: '12/06/2020',
  },
  {
    id: 22,
    storeName: 'Artemisia maritima L.',
    storeAddress: '98417 Fair Oaks Alley',
    storeStatus: 'APPROVED',
    expirationDate: '19/12/2020',
    createdDate: '12/06/2020',
  },
  {
    id: 23,
    storeName: 'Arctotheca J.C. Wendl.',
    storeAddress: '644 Mayfield Street',
    storeStatus: 'REJECTED',
    expirationDate: '01/06/2020',
    createdDate: '12/06/2020',
  },
  {
    id: 24,
    storeName: 'Portulacaria afra (L.) Jacq.',
    storeAddress: '0609 Oak Valley Court',
    storeStatus: 'APPROVED',
    expirationDate: '14/06/2020',
    createdDate: '12/06/2020',
  },
  {
    id: 25,
    storeName: 'Symphyotrichum lateriflorum (L.) Á. Löve & D. Löve',
    storeAddress: '74711 Cascade Parkway',
    storeStatus: 'APPROVED',
    expirationDate: '14/05/2020',
    createdDate: '12/06/2020',
  },
  {
    id: 26,
    storeName: 'Buellia dialyta (Nyl.) Tuck.',
    storeAddress: '95993 Grim Junction',
    storeStatus: 'APPROVED',
    expirationDate: '28/11/2020',
    createdDate: '12/06/2020',
  },
  {
    id: 27,
    storeName: 'Arthrorhaphis Th. Fr.',
    storeAddress: '0 Myrtle Road',
    storeStatus: 'APPROVED',
    expirationDate: '17/01/2021',
    createdDate: '12/06/2020',
  },
  {
    id: 28,
    storeName: 'Ophioparma Norman',
    storeAddress: '397 Oxford Junction',
    storeStatus: 'REJECTED',
    expirationDate: '15/05/2020',
    createdDate: '12/06/2020',
  },
  {
    id: 29,
    storeName: 'Ramalina hypoprotocetrarica W.L. Culb.',
    storeAddress: '549 Messerschmidt Circle',
    storeStatus: 'APPROVED',
    expirationDate: '28/02/2020',
    createdDate: '12/06/2020',
  },
  {
    id: 30,
    storeName: 'Ballota nigra L. var. foetida (Hayek) Vis.',
    storeAddress: '38 Maple Wood Park',
    storeStatus: 'APPROVED',
    expirationDate: '17/07/2020',
    createdDate: '12/06/2020',
  },
];

export const PARTNER_INFORMATION = {
  id: 1,
  storeName: 'Cafe Go CAGO',
  storePhone: '990-264-3499',
  storeAddress: '3 Carioca Plaza',
  storeStatus: 'APPROVED',
  storeImage:
    'http://retaildesignblog.net/wp-content/uploads/2016/07/GENERAL-SUPPLY-store-and-cafe-Nagoya-Japan.jpg',
};

export const PARTNER_LAST_LICENSE = {
  id: 1,
  storeName: 'Cafe Go CAGO',
  licenseFrom: '01/01/2021',
  licenseTo: '31/01/2021',
  // partnerLicense: {
  //   storeName: record.storeName,
  //   licenseFrom: record.expirationDate,
  //   licenseTo: record.expirationDate,
  // },
};

export const PARTNER_LICENSE_LIST = [
  {
    id: 1,
    startDate: '01/10/2020',
    endDate: '01/11/2020',
    createdDate: '30/09/2020',
    price: 30000,
  },
  {
    id: 2,
    startDate: '01/10/2020',
    endDate: '01/11/2020',
    createdDate: '30/09/2020',
    price: 30000,
  },
  {
    id: 3,
    startDate: '01/10/2020',
    endDate: '01/11/2020',
    createdDate: '30/09/2020',
    price: 30000,
  },
  {
    id: 4,
    startDate: '01/10/2020',
    endDate: '01/11/2020',
    createdDate: '30/09/2020',
    price: 30000,
  },
  {
    id: 5,
    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 6,
    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 7,
    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 8,
    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 9,
    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 10,
    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 11,

    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 12,

    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 13,

    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 14,

    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 15,

    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 16,

    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 17,

    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 18,

    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 19,

    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 20,

    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 21,

    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 22,

    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 23,

    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 24,

    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 25,

    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 26,

    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 27,

    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 28,

    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 29,

    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
  {
    id: 30,

    startDate: '01/10/2020',
    endDate: '01/01/2021',
    createdDate: '30/09/2020',
    price: 90000,
  },
];

export const PARTNER_ITEM_LIST = [
  {
    id: 1,
    itemName: 'Puerto Rico Hempvine',
    itemPrice: 30000,
    fcaGroup: 1,
    itemStatus: 'APPROVED',
    createdDate: '15/10/2020',
  },
  {
    id: 2,
    itemName: "Olney's Hairy Sedge",
    itemPrice: 30000,
    fcaGroup: 1,
    itemStatus: 'PROCESS',
    createdDate: '13/05/2020',
  },
  {
    id: 3,
    itemName: 'Cayenne Pepper',
    itemPrice: 30000,
    fcaGroup: 1,
    itemStatus: 'PROCESS',
    createdDate: '17/09/2020',
  },
  {
    id: 4,
    itemName: 'Russet Buffaloberry',
    itemPrice: 35000,
    fcaGroup: 1,
    itemStatus: 'APPROVED',
    createdDate: '27/10/2020',
  },
  {
    id: 5,
    itemName: 'Blumer Buckthorn',
    itemPrice: 30000,
    fcaGroup: 1,
    itemStatus: 'PROCESS',
    createdDate: '06/12/2020',
  },
  {
    id: 6,
    itemName: 'Limnophila',
    itemPrice: 35000,
    fcaGroup: 1,
    itemStatus: 'APPROVED',
    createdDate: '29/07/2020',
  },
  {
    id: 7,
    itemName: 'Australian Brake',
    itemPrice: 30000,
    fcaGroup: 1,
    itemStatus: 'PROCESS',
    createdDate: '22/02/2020',
  },
  {
    id: 8,
    itemName: 'Lecidea Lichen',
    itemPrice: 30000,
    fcaGroup: 1,
    itemStatus: 'APPROVED',
    createdDate: '04/01/2020',
  },
  {
    id: 9,
    itemName: 'Flame Orchid',
    itemPrice: 30000,
    fcaGroup: 1,
    itemStatus: 'APPROVED',
    createdDate: '23/01/2020',
  },
  {
    id: 10,
    itemName: 'Crisped Bristle Fern',
    itemPrice: 35000,
    fcaGroup: 1,
    itemStatus: 'PROCESS',
    createdDate: '06/10/2020',
  },
];

export const IMAGE_ADDRESS = 'https://image.flaticon.com/icons/png/512/1151/1151695.png';

export const FCA_ITEM_LIST = [
  {
    value: '91d94e22-14e9-4955-b5b7-66ef9a4a36d6',
    label: 'Iced Coffee',
  },
  {
    value: '7d3714d3-f026-46af-82dc-8649f40d96ef',
    label: 'Iced Coffee With Milk',
  },
  {
    value: 'ce8487fb-7108-40d0-b71e-36b1703043dc',
    label: 'Iced Chocolate',
  },
];

export const PARTNER_ITEM = {
  id: 'ed8c5c09-6bcf-4247-83b6-e2f6803314a0',
  createdAt: '2021-02-22T15:42:18.653Z',
  updatedAt: '2021-02-22T15:42:18.653Z',
  deletedAt: null,
  partner: null,
  name: 'Cacao đá',
  price: '25000',
  status: 'ACTIVE',
  imageLink: 'https://www.godairyfree.org/wp-content/uploads/2007/05/pics-iced-cocoa-vert.jpg',
  fcaItem: {
    id: 'ce8487fb-7108-40d0-b71e-36b1703043dc',
    createdAt: '2021-02-22T15:23:12.083Z',
    updatedAt: '2021-02-22T15:23:12.083Z',
    deletedAt: null,
    name: 'Cacao',
    status: null,
  },
};

export const LICENSE_LIST = [
  {
    id: '44d112a9-f22c-454e-a96d-b0cc6e6ef3ba',
    name: 'Gói bản quyền 1 tháng',
    duration: '1',
    price: '39000',
    status: 'ACTIVE',
    createdAt: '2021-02-22T15:23:12.083Z',
    description:
      'Tiết kiệm thời gian cho nhân viên phục vụ, tiếp nhận đơn hàng từ xa, chủ động trong việc chuẩn bị, đáp ứng cho nhu cầu trong giờ cao điểm. Công nghệ real-time đơn hàng hiện đại, đồng bộ việc trao đổi đơn hàng giữa Khách hàng và Đối tác',
  },
  {
    id: '54d112a9-f22c-454e-a96d-b0cc6e6ef3ba',
    name: 'Gói bản quyền 3 tháng',
    duration: '3',
    price: '109000',
    status: 'ACTIVE',
    createdAt: '2021-02-22T15:23:12.083Z',
    description:
      'Tiết kiệm thời gian cho nhân viên phục vụ, tiếp nhận đơn hàng từ xa, chủ động trong việc chuẩn bị, đáp ứng cho nhu cầu trong giờ cao điểm. Công nghệ real-time đơn hàng hiện đại, đồng bộ việc trao đổi đơn hàng giữa Khách hàng và Đối tác',
  },
  {
    id: '64d112a9-f22c-454e-a96d-b0cc6e6ef3ba',
    name: 'Gói bản quyền 6 tháng',
    duration: '6',
    price: '229000',
    status: 'ACTIVE',
    createdAt: '2021-02-22T15:23:12.083Z',
    description:
      'Tiết kiệm thời gian cho nhân viên phục vụ, tiếp nhận đơn hàng từ xa, chủ động trong việc chuẩn bị, đáp ứng cho nhu cầu trong giờ cao điểm. Công nghệ real-time đơn hàng hiện đại, đồng bộ việc trao đổi đơn hàng giữa Khách hàng và Đối tác',
  },
  {
    id: '74d112a9-f22c-454e-a96d-b0cc6e6ef3ba',
    name: 'Gói bản quyền 12 tháng',
    duration: '12',
    price: '549000',
    status: 'ACTIVE',
    createdAt: '2021-02-22T15:23:12.083Z',
    description:
      'Tiết kiệm thời gian cho nhân viên phục vụ, tiếp nhận đơn hàng từ xa, chủ động trong việc chuẩn bị, đáp ứng cho nhu cầu trong giờ cao điểm. Công nghệ real-time đơn hàng hiện đại, đồng bộ việc trao đổi đơn hàng giữa Khách hàng và Đối tác',
  },
];

export const LINE_CHART_DATA = [
  {
    id: 'OrderTotalData',
    color: 'hsl(167, 70%, 50%)',
    data: [
      {
        x: moment().format('DD/MM'),
        value: moment().format('DD/MM/YYYY'),
        y: 100,
      },
      {
        x: '02/03',
        y: 150,
      },
      {
        x: '03/03',
        y: 170,
      },
      {
        x: '04/03',
        y: 200,
      },
      {
        x: '05/03',
        y: 210,
      },
      {
        x: '06/03',
        y: 100,
      },
      {
        x: '07/03',
        y: 70,
      },
    ],
  },
];

export const SPARTNER = {
  data: {
    TOTAL: { count: 63 },
    PROCESSING: { count: 13 },
    APPROVED: {
      count: 45,
      opening: { normal: 39, almostExpired: 1 },
      closing: { normal: 4, expired: 1 },
    },
    REJECTED: { count: 5 },
  },
};

export const S_APPROVED_PARTNER = {
  total: 60,
  opening: {
    color: '#82B366',
    total: 50,
    normal: {
      total: 45,
      values: [],
    },
    almostExpired: {
      total: 5,
      values: [],
    },
  },
  closing: {
    color: '#B85450',
    total: 10,
    normal: {
      total: 9,
      values: [],
    },
    expired: {
      total: 1,
      values: [],
    },
  },
};
export const S_ORDER = {
  total: 60,
  details: [
    {
      label: 'Closure',
      total: 50,
      color: '#82B366',
    },
    {
      label: 'Rejection',
      total: 4,
      color: '#B85450',
    },
    {
      label: 'Cancellation',
      total: 6,
      color: 'whitesmoke',
    },
  ],
};

export const S_ITEM = {
  total: 60,
  details: [
    {
      label: 'Iced Coffee',
      total: 10,
      color: '#FFF2CC',
    },
    {
      label: 'Iced Coffee with Milk',
      total: 10,
      color: '#FFF2CC',
    },
    {
      label: 'Chocolate',
      total: 10,
      color: '#FFF2CC',
    },
    {
      label: 'Milkshake',
      total: 10,
      color: '#FFF2CC',
    },
    {
      label: 'Soda',
      total: 10,
      color: '#FFF2CC',
    },
    {
      label: 'Soft-drink',
      total: 10,
      color: '#FFF2CC',
    },
  ],
};

export const STATISTICS_PARTNER = {
  TOTAL: 1000,
  APPROVED: 800,
  REJECTED: 100,
  PROCESSING: 100,
};

export const PIE_CHART_DATA_PARTNER = [
  {
    id: 'Opening',
    label: 'Opening',
    value: 600,
    color: '#b3e2cd',
  },
  {
    id: 'Closing',
    label: 'Closing',
    value: 100,
    color: '#dcd6d6',
  },
];

export const PIE_CHART_DATA_ORDER = [
  {
    id: 'Reception',
    label: 'Reception',
    value: 600,
    color: '#b3e2cd',
  },
  {
    id: 'Processing',
    label: 'Processing',
    value: 100,
    color: '#DAE8FC',
  },
  {
    id: 'Rejection',
    label: 'Rejection',
    value: 100,
    color: '#F8CECC',
  },
  {
    id: 'Cancellation',
    label: 'Cancellation',
    value: 100,
    color: '#dcd6d6',
  },
];
