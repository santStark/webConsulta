import axios from 'axios';
import {apiPath} from '../../apiPath';

console.log('a',apiPath);
export const api = axios.create({
    baseURL:apiPath
})