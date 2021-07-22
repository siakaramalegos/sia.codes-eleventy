/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global gtag */

import {getCLS, getFCP, getFID, getLCP} from 'https://unpkg.com/web-vitals?module';

const HOSTNAME = 'sia.codes'

const getConfig = (id) => {
  const config = {
    measurement_version: '6',
    page_path: location.pathname,
  };

  if (id.startsWith('UA-')) {
    Object.assign(config, {
      transport_type: 'beacon',
      custom_map: {
        dimension1: 'measurement_version',
        dimension2: 'client_id',
        dimension3: 'segments',
        dimension4: 'config',
        dimension5: 'report_source',
        dimension6: 'debug_target',
        dimension7: 'metric_rating',
        metric1: 'report_size',
      },
    });
  }
  if (id.startsWith('G-')) {
    if (location.hostname !== HOSTNAME) {
      config.debug_mode = true;
    }
  }
  return ['config', id, config];
};

const thresholds = {
  CLS: [0.1, 0.25],
  FCP: [1800, 3000],
  FID: [100, 300],
  LCP: [2500, 4000],
};

function getRating(value, thresholds) {
  if (value > thresholds[1]) {
    return 'poor';
  }
  if (value > thresholds[0]) {
    return 'ni';
  }
  return 'good';
}

function getSelector(node, maxLen = 100) {
  let sel = '';
  try {
    while (node && node.nodeType !== 9) {
      const part = node.id ? '#' + node.id : node.nodeName.toLowerCase() + (
        (node.className && node.className.length) ?
        '.' + Array.from(node.classList.values()).join('.') : '');
      if (sel.length + part.length > maxLen - 1) return sel || part;
      sel = sel ? part + '>' + sel : part;
      if (node.id) break;
      node = node.parentNode;
    }
  } catch (err) {
    // Do nothing...
  }
  return sel;
}

function getLargestLayoutShiftEntry(entries) {
  return entries.reduce((a, b) => a && a.value > b.value ? a : b);
}

function getLargestLayoutShiftSource(sources) {
  return sources.reduce((a, b) => {
    return a.node && a.previousRect.width * a.previousRect.height >
        b.previousRect.width * b.previousRect.height ? a : b;
  });
}

function wasFIDBeforeDCL(fidEntry) {
  const navEntry = performance.getEntriesByType('navigation')[0];
  return navEntry && fidEntry.startTime < navEntry.domContentLoadedEventStart;
}

function getDebugInfo(name, entries = []) {
  // In some cases there won't be any entries (e.g. if CLS is 0,
  // or for LCP after a bfcache restore), so we have to check first.
  if (entries.length) {
    if (name === 'LCP') {
      const lastEntry = entries[entries.length - 1];
      return {
        debug_target: getSelector(lastEntry.element),
        event_time: lastEntry.startTime,
      };
    } else if (name === 'FID') {
      const firstEntry = entries[0];
      return {
        debug_target: getSelector(firstEntry.target),
        debug_event: firstEntry.name,
        debug_timing: wasFIDBeforeDCL(firstEntry) ? 'pre_dcl' : 'post_dcl',
        event_time: firstEntry.startTime,
      };
    } else if (name === 'CLS') {
      const largestEntry = getLargestLayoutShiftEntry(entries);
      if (largestEntry && largestEntry.sources && largestEntry.sources.length) {
        const largestSource = getLargestLayoutShiftSource(largestEntry.sources);
        if (largestSource) {
          return {
            debug_target: getSelector(largestSource.node),
            event_time: largestEntry.startTime,
          };
        }
      }
    }
  }
  // Return default/empty params in case there are no entries.
  return {
    debug_target: '(not set)',
  };
}

function handleMetric({name, value, delta, id, entries}) {
  gtag('event', name, {
    value: Math.round(name === 'CLS' ? delta * 1000 : delta),
    event_category: 'Web Vitals',
    event_label: id,
    metric_value: value,
    metric_delta: delta,
    metric_rating: getRating(value, thresholds[name]),
    non_interaction: true,
    ...getDebugInfo(name, entries),
  });
}

function measureWebVitals() {
  getCLS(handleMetric);
  getFCP(handleMetric);
  getFID(handleMetric);
  getLCP(handleMetric);
}

function initAnalytics() {
  if (location.hostname !== HOSTNAME) {
    window.gtag = console.log;
  }

  gtag('js', new Date());

  gtag(...getConfig('G-VMTGZPWPWD'));
  gtag(...getConfig('UA-59135521-1'));

  measureWebVitals();
}

initAnalytics();
