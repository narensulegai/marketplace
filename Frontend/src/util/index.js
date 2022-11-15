import { Parser } from 'expr-eval';
import * as formulajs from '@formulajs/formulajs';

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toDateString();
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes} ${ampm}`;
};

export const PAGE_SIZE = 5;
export const slicePage = (arr, currentPage) => {
  const offset = currentPage * PAGE_SIZE;
  return arr.slice(offset, offset + PAGE_SIZE);
};

const parser = new Parser();
Object.assign(parser.functions, formulajs);
export const formulaParser = parser;

export const reNameValues = (obj, callback) => {
  if (typeof obj === 'object' && obj !== null) {
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === 'string') {
        // eslint-disable-next-line no-param-reassign
        obj[key] = callback(obj[key], key);
      } else {
        reNameValues(obj[key], callback);
      }
    }
  }
};
