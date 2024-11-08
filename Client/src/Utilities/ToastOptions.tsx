import {Slide, ToastPosition} from 'react-toastify';

export interface toastType{
    position : ToastPosition,
    autoClose : number,
    hideProgressBar: boolean,
    closeOnClick: boolean,
    pauseOnHover: boolean,
    draggable: boolean,
    progress: any,
    theme: string,
    transition: any
}

export const toastOptions : toastType = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide
    }