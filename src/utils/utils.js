import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
};

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ routes, path = '/' }) =>
      (path && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach(route => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

export const dmyDateFormat = () => {
  return 'DD/MM/YYYY';
};

export const ymdDateFormat = () => {
  return 'YYYY/MM/DD';
};

export const getApplicationSources = () => {
  return [
    {
      alias: 'facebook_fanpage',
      name: 'Facebook Fanpage',
    },
    {
      alias: 'grandline',
      name: 'Grandline',
    },
    {
      alias: 'gu_Linkedin',
      name: 'GU Linkedin',
    },
    {
      alias: 'itviec',
      name: 'ITviec',
    },
    {
      alias: 'facebook',
      name: 'Facebook',
    },
    {
      alias: 'linkedin',
      name: 'Linkedin',
    },
    {
      alias: 'network',
      name: 'Network',
    },
    {
      alias: 'referral',
      name: 'Referral',
    },
    {
      alias: 'others',
      name: 'Others',
    },
  ];
};

export const getSourceOfApplicationName = sourceAlias => {
  const sources = getApplicationSources();
  const source = sources.find(({ alias }) => alias === sourceAlias);
  return source ? source.name : '';
};

export const getChapters = () => {
  return [
    {
      alias: 'PA',
      name: 'Product Analysis',
    },
    {
      alias: 'PD',
      name: 'Product Design',
    },
    {
      alias: 'PM',
      name: 'Product Mobile Development',
    },
    {
      alias: 'PF',
      name: 'Product Frontend Development',
    },
    {
      alias: 'PB',
      name: 'Product Backend Development',
    },
    {
      alias: 'PO',
      name: 'Product Operations',
    },
    {
      alias: 'GA',
      name: 'Geek Acquisition',
    },
    {
      alias: 'GD',
      name: 'Geek Development',
    },
    {
      alias: 'GE',
      name: 'Geek Experience',
    },
    {
      alias: 'GH',
      name: 'GEEK Hub',
    },
    {
      alias: 'CD',
      name: 'Client Development',
    },
    {
      alias: 'BO',
      name: 'Business Operations',
    },
    {
      alias: 'BD',
      name: 'Business Design',
    },
  ];
};

export const getSeasonSources = () => {
  return [
    {
      alias: 'spring2020',
      name: 'Spring 2020',
      enable: false,
    },
    {
      alias: 'summer2020',
      name: 'Summer 2020',
      enable: false,
    },
    {
      alias: 'autumn2020',
      name: 'Autumn 2020',
      enable: false,
    },
    {
      alias: 'winter2020',
      name: 'Winter 2020',
      enable: true,
    },
    {
      alias: 'spring2021',
      name: 'Spring 2021',
      enable: true,
    },
    {
      alias: 'summer2021',
      name: 'Summer 2021',
      enable: true,
    },
    {
      alias: 'autumn2021',
      name: 'Autumn 2021',
      enable: true,
    }, {
      alias: 'winter2021',
      name: 'Winter 2021',
      enable: true,
    },
  ];
};

export const getSeasonNameFromAlias = (alias) => {
  const seasons = getSeasonSources();
  const foundSeason = seasons.find((season) => season.alias === alias);
  if (!foundSeason) return alias;
  return foundSeason.name;
};

export const getSeasonFilter = () => {
  const seasons = getSeasonSources();
  seasons[seasons.length] = {
    name: 'No season',
    alias: 'NO_SEASON',
  };
  return seasons.map((season) => {
    return {
      text: season.name,
      value: season.alias,
    };
  });
};

export const getChapterByAlias = alias => {
  const chapters = getChapters();
  // i mean that.  dont want to  witch to find()
  // eslint-disable-next-line no-restricted-syntax
  for (const chapter of chapters) {
    if (chapter.alias.localeCompare(alias) === 0) {
      return chapter;
    }
  }
  return null;
};

export const getChapterNameByAlias = alias => {
  const chapters = getChapters();
  // i mean that.  dont want to  witch to find()
  // eslint-disable-next-line no-restricted-syntax
  for (const chapter of chapters) {
    if (chapter.alias.localeCompare(alias) === 0) {
      return chapter.name;
    }
  }

  return '';
};

export const getFileNameFromUrl = url => {
  if (!url) return '';
  const lastPath = url.split('/').pop();
  return lastPath.split('?').shift();
};

export const isMayDuplicate = (application, applications) => {
  return applications.find(({ applicationCode, email, phone }) => {
    if (application.applicationCode.localeCompare(applicationCode) === 0) return false;

    return (
      application.email.localeCompare(email) === 0 ||
      (application.phone || '').localeCompare(phone) === 0
    );
  });
};

export const getSlotName = slotType => {
  switch (slotType) {
    case SlotType.fullDay:
      return 'Full day interview';
    case SlotType.afternoon:
      return 'Afternoon interview';
    case SlotType.morning:
      return 'Morning interview';
    default:
      return '';
  }
};

export const arrayRange = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);


export const getAvailableCategories = (categories, currentApplication) => {
  const { state: currentApplicationState, isProcessing, consolidateResult } = currentApplication;

  if (!isProcessing || consolidateResult !== null || currentApplicationState === ApplicationState.success) {
    return categories.filter(category => category.applicationState === null);
  }

  const states = getListArticlesApplicationState();

  if (states.indexOf(currentApplicationState) === states.length - 1) return categories;
  const availableStates = states.slice(0, states.indexOf(currentApplicationState) + 1);
  return categories.filter(category => {
    return (
      category.applicationState === null || availableStates.includes(category.applicationState)
    );
  });
};
