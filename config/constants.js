// APPLICATION CONFIGURATION
export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm';
export const DATE_FORMAT_CALL_API = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT_CALL_API = 'YYYY-MM-DD HH:mm';
export const TIME_FORMAT = 'HH:mm';
export const PAGE_SIZE = 10;
export const GOOGLE_KEY = 'AIzaSyCbsRxuA3NGxpOMeC0UkmJTi0V2bvSyAJo';
// APPLICATION BACKGROUND COLOR
export const LIGHT_BACKGROUND_COLOR = '#e6d7ab';
export const DARK_BACKGROUND_COLOR = '#603a18';
export const DEFAULT_OLD_COLOR = '#33b3ab';
export const APPLICATION_TITLE_FONT_FAMILY = "'Open Sans', sans-serif";

export const SHOW_ITEMS_OPTIONS = [
  {
    label: 'All',
    value: 'All',
  },
  {
    label: 'Usable items',
    value: 'Usable items',
  },
  {
    label: 'Requested items',
    value: 'Requested items',
  },
];
// OBJECT STATUS
export const PARTNER_STATUS = {
  PROCESS: 'PROCESS',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};
export const ORDER_STATUS = {
  INITIALIZATION: 'INITIALIZATION',
  ACCEPTANCE: 'ACCEPTANCE',
  REJECTION: 'REJECTION',
  PREPARATION: 'PREPARATION',
  READINESS: 'READINESS',
  ARRIVAL: 'ARRIVAL',
  RECEPTION: 'RECEPTION',
  WAIT: 'WAIT',
  CANCELLATION: 'CANCELLATION',
  CLOSURE: 'CLOSURE',
};
export const ORDER_DONE_STATUS = [
  ORDER_STATUS.REJECTION,
  ORDER_STATUS.CANCELLATION,
  ORDER_STATUS.CLOSURE,
];
export const REQUESTED_ITEM_STATUS = {
  PROCESS: 'PROCESS',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};
export const CUSTOMER_STATUS = {
  ACTIVE: 'ACTIVE',
  PASSIVE: 'PASSIVE',
};
export const FCA_ITEM_STATUS = {
  ACTIVE: 'ACTIVE',
  ARCHIVE: 'ARCHIVE',
};
export const PARTNER_ITEM_STATUS = {
  ACTIVE: 'ACTIVE',
  ARCHIVE: 'ARCHIVE',
};
export const LICENSE_STATUS = {
  ACTIVE: 'ACTIVE',
  ARCHIVE: 'ARCHIVE',
};

// OPTIONS ARRAY
export const PARTNER_STATUS_FILTER = [
  {
    label: 'All',
    value: 'ALL',
  },
  {
    label: 'Process',
    value: PARTNER_STATUS.PROCESS,
  },
  {
    label: 'Approved',
    value: PARTNER_STATUS.APPROVED,
  },
  {
    label: 'Rejected',
    value: PARTNER_STATUS.REJECTED,
  },
];
export const PARTNER_STATUS_OPTIONS = [
  {
    label: 'Process',
    value: PARTNER_STATUS.PROCESS,
  },
  {
    label: 'Approved',
    value: PARTNER_STATUS.APPROVED,
  },
  {
    label: 'Rejected',
    value: PARTNER_STATUS.REJECTED,
  },
];
export const ORDER_STATUS_FILTER = [
  {
    label: 'All',
    value: 'ALL',
  },
  {
    label: 'Readiness',
    value: ORDER_STATUS.READINESS,
  },
  {
    label: 'Arrival',
    value: ORDER_STATUS.ARRIVAL,
  },
  {
    label: 'Wait',
    value: ORDER_STATUS.WAIT,
  },
  {
    label: 'Cancellation',
    value: ORDER_STATUS.CANCELLATION,
  },
];
export const PARTNER_STATUS_ITEM_OPTIONS = [
  {
    label: 'Active',
    value: PARTNER_ITEM_STATUS.ACTIVE,
  },
  {
    label: 'Archive',
    value: PARTNER_ITEM_STATUS.ARCHIVE,
  },
];
export const CANCEL_ORDER_REASON = [
  {
    label: 'Cửa hàng giao hàng chậm',
    value: 'CUSTOMER_PARTNER-DELIVERY-LATE',
  },
  {
    label: 'Món nước có vấn đề',
    value: 'CUSTOMER_DRINK-HAS-PROBLEM',
  },
  {
    label: 'Lí do cá nhận',
    value: 'CUSTOMER_PERSONAL-REASON',
  },
  {
    label: 'Không tìm thấy cửa hàng / Cửa hàng không mở cửa',
    value: 'CUSTOMER_STORE-NOT-FOUND',
  },
  {
    label: 'Khách không nhận nước',
    value: 'PARTNER_CUSTOMER-PROBLEM',
  },
  {
    label: 'Cần đóng cửa cửa hàng',
    value: 'PARTNER_CLOSE-STORE',
  },
  {
    label: 'Không đủ nguyên liệu',
    value: 'PARTNER_ORDER-OUT-OF-STOCK',
  },
  {
    label: 'Khác',
    value: 'OTHER',
  },
];
// LICENSE TYPE
export const LICENSE_PACKAGE = [
  {
    label: '1 month',
    value: 1,
    price: 39000,
  },
  {
    label: '3 months',
    value: 3,
    price: 109000,
  },
  {
    label: '6 months',
    value: 6,
    price: 229000,
  },
  {
    label: '12 months',
    value: 12,
    price: 549000,
  },
];
export const ITEM_STATUS_OPTIONS = [
  {
    label: 'Process',
    value: REQUESTED_ITEM_STATUS.PROCESS,
  },
  {
    label: 'Approved',
    value: REQUESTED_ITEM_STATUS.APPROVED,
  },
  {
    label: 'Rejected',
    value: REQUESTED_ITEM_STATUS.REJECTED,
  },
];
