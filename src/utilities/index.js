import { toast } from "react-toastify";

export const NotifySuccess = (str) => {
    if (typeof str === 'string') {
        toast.success(str);
    }
    console.error("This is not String");
}
export const NotifyFail = (str) => {
    if (typeof str === 'string') {
        toast.error(str);
    }
    console.error("This is not String");
}

export const UpperCase = (str) => {
    if (typeof str === 'string') {
        return str.toUpperCase();
    }
    console.error("This is not String");
}

export const DetectLink = (str) => {
    if (typeof str === 'string') {
        var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        return str.match(urlRegex)
    }
    console.error("This is not String");
}

export const OnlyNumber = (str) => {
    return str.match(/^[0-9!@#\$%\^\&*\)\(+=._-]+$/g);
}

export const checkURL = (str) => {
    return str.match(/(\d +)(?!.*\d)/);
}

export const ChooseURL = (str) => {
    const urlRegex_1688 = str.indexOf("1688");
    const urlRegex_Weidian = str.indexOf('weidian');
    const urlRegex_taobao = str.indexOf("taobao");
    const urlRegex_jd = str.indexOf("jd");
    if(urlRegex_taobao > -1) {
        return "taobao";
    } 
    if(urlRegex_1688 > -1) {
        return "1688";
    }
    if(urlRegex_Weidian > -1) {
        return "micro";
    }
    if(urlRegex_jd > -1) {
        return "jd";
    }
}

export const getId = (str) => {
    return str.match(/(\d+)(?!.*\d)/);
}