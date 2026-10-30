export async function api(path,opts={}){const res=await fetch('/api'+path,{credentials:'same-origin',headers:{'Content-Type':'application/json',...(opts.headers||{})},...opts});const data=await res.json().catch(()=>({}));if(!res.ok)throw Error(data.error||'Request failed');return data;}
export const user=()=>api('/auth/me').then(x=>x.user).catch(()=>null);
export const post=(path,data)=>api(path,{method:'POST',body:JSON.stringify(data)});
