// APPLICATION CONFIGURATION
export const DATE_FORMAT = 'DD/MM/YYYY';
export const PAGE_SIZE = 10;
export const GOOGLE_KEY = 'AIzaSyCbsRxuA3NGxpOMeC0UkmJTi0V2bvSyAJo';
// APPLICATION BACKGROUND COLOR
export const LIGHT_BACKGROUND_COLOR = '#e6d7ab';
export const DARK_BACKGROUND_COLOR = '#603a18';
export const DEFAULT_OLD_COLOR = '#33b3ab';
export const APPLICATION_TITLE_FONT_FAMILY = "'Open Sans', sans-serif";
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
export const ITEM_STATUS = {
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
// LICENSE TYPE
export const LICENSE_PACKAGE = [
  {
    label: '1 month',
    value: 1,
  },
  {
    label: '3 months',
    value: 3,
  },
  {
    label: '6 months',
    value: 6,
  },
  {
    label: '12 months',
    value: 12,
  },
];
export const ITEM_STATUS_OPTIONS = [
  {
    label: 'Process',
    value: ITEM_STATUS.PROCESS,
  },
  {
    label: 'Approved',
    value: ITEM_STATUS.APPROVED,
  },
  {
    label: 'Rejected',
    value: ITEM_STATUS.REJECTED,
  },
];
