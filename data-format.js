export const roleOptions=['SOPORTE INFORMÁTICO','SOPORTE TECNOLÓGICO','COORDINADOR DE INNOVACIÓN Y SOPORTE TECNOLÓGICO'];
export const brandOptions=['HP','LENOVO','DELL','ASUS','ACER','APPLE','SAMSUNG','LG','EPSON','CANON','BROTHER','XEROX','KYOCERA','RICOH','BENQ','VIEWSONIC','SONY','AOC','ADVANCE','HALION','INTEL','MSI','GIGABYTE','TOSHIBA','KINGSTON','LOGITECH','MICROSOFT','TP-LINK','D-LINK','CISCO','UBIQUITI','MIKROTIK','HUAWEI','APC','FORZA','CDP','PLUG & POWER','TECNIASES','OTROS','SIN MARCA'];
export const upperText=value=>String(value??'').trim().toLocaleUpperCase('es-PE');
const roleKey=value=>upperText(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ');
export function normalizeRole(value){const key=roleKey(value);if(key==='SOPORTE INFOMATICO')return roleOptions[0];return roleOptions.find(role=>roleKey(role)===key)||upperText(value);}
const equipmentKeys=['category','name','code','area','brand','model','serial','year','source','color','responsible','cpu','ram','storage','condition','notes'];
const orderKeys=['number','date','time','requestType','startedDate','type','priority','technician','requester','status','problem','solution','closedDate','equipmentStatus'];
const reportKeys=['institution','responsible','role','modality','date','otiOffice'];
function normalize(data,keys){const result={...data};for(const key of keys)if(typeof result[key]==='string')result[key]=upperText(result[key]);return result;}
export const normalizeEquipment=data=>normalize(data,equipmentKeys);
export const normalizeOrder=data=>normalize(data,orderKeys);
export function normalizeReport(data){const result=normalize(data,reportKeys);if(typeof result.role==='string')result.role=normalizeRole(result.role);return result;}
