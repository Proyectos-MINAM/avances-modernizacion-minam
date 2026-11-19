import {clsx,type ClassValue} from 'clsx';import {twMerge} from 'tailwind-merge';
export const cn=(...inputs:ClassValue[])=>twMerge(clsx(inputs));
export const fmt=(n:number,d=1)=>`${n.toLocaleString('es-PE',{minimumFractionDigits:d,maximumFractionDigits:d})}%`;
export const fecha=(s:string)=>s?new Date(`${s}T12:00:00`).toLocaleDateString('es-PE',{day:'2-digit',month:'short',year:'numeric'}):'Sin fecha';
export const saveCsv=<T extends object>(data:T[],name:string)=>{if(!data.length)return;const keys=Object.keys(data[0]) as (keyof T)[];const escape=(v:unknown)=>`"${String(v??'').replace(/"/g,'""')}"`;const csv='\ufeff'+keys.map(k=>escape(k)).join(';')+'\n'+data.map(r=>keys.map(k=>escape(r[k])).join(';')).join('\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url)};
