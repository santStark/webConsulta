import axios from 'axios';
import {apiPath} from '../../apiPath';

export const api = axios.create({
    baseURL:apiPath
})

export function toDate(sdate, format, ret) {

    if(!sdate) return '';

    let normalized = sdate.replace(/[^a-zA-Z0-9]/g, '-');
    let normalizedFormat = format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    let formatItems = normalizedFormat.split('-');
    let dateItems = normalized.split('-');

    let monthIndex = formatItems.indexOf("mm");
    let dayIndex = formatItems.indexOf("dd");
    let yearIndex = formatItems.indexOf("yyyy");


    let today = new Date();

    let year = yearIndex > -1 ? dateItems[yearIndex] : today.getFullYear();
    let month = (monthIndex > -1 ? dateItems[monthIndex.toString()] - 1 : today.getMonth() - 1 )+ 1;
    let day = dayIndex > -1 ? dateItems[dayIndex] : today.getDate();

    let retDate ;

    if(ret === 'br'){
        retDate = year.toString()+'-'+month.toString().padStart(2,'0')+'-'+day.toString().padStart(2,'0');
    }else{
        retDate = day.toString().padStart(2,'0')+'/'+month.toString().padStart(2,'0')+'/'+year.toString();
    }

    return retDate;
};