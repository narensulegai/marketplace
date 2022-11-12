import { post } from '..';

export const getMlQuote = (d) => post('getQuote', d);
export const createModel = (d) => post('createModel', d);