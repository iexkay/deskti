let reportModule;
const loads=new Map();
function script(src,globalName){if(globalThis[globalName])return Promise.resolve();if(loads.has(src))return loads.get(src);const pending=new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.async=true;s.onload=()=>globalThis[globalName]?resolve():reject(Error('No se pudo cargar el exportador. Vuelve a intentarlo.'));s.onerror=()=>{s.remove();loads.delete(src);reject(Error('No se pudo cargar el exportador. Revisa la conexión y vuelve a intentarlo.'));};document.head.append(s);});loads.set(src,pending);return pending;}
async function reports(){if(!reportModule)reportModule=import('./reports.js').catch(e=>{reportModule=null;throw e;});return reportModule;}
export async function inventoryPdf(...args){const [,m]=await Promise.all([script('assets/pdf-lib.min.js','PDFLib'),reports()]);return m.inventoryPdf(...args);}
export async function orderPdf(...args){const [,m]=await Promise.all([script('assets/pdf-lib.min.js','PDFLib'),reports()]);return m.orderPdf(...args);}
export async function inventoryExcel(...args){const [,m]=await Promise.all([script('assets/jszip.min.js','JSZip'),reports()]);return m.inventoryExcel(...args);}
