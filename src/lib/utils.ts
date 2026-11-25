import {clsx,type ClassValue} from 'clsx';import {twMerge} from 'tailwind-merge';
export const cn=(...inputs:ClassValue[])=>twMerge(clsx(inputs));
export const fmt=(n:number,d=1)=>`${n.toLocaleString('es-PE',{minimumFractionDigits:d,maximumFractionDigits:d})}%`;
export const fecha=(s:string)=>s?new Date(`${s}T12:00:00`).toLocaleDateString('es-PE',{day:'2-digit',month:'short',year:'numeric'}):'Sin fecha';
