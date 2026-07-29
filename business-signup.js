
const form=document.getElementById("partnerApplication"),save=document.getElementById("saveDraft"),status=document.getElementById("formStatus"),key="escoPridePartnerDraft";
function data(){const out={};for(const [k,v] of new FormData(form).entries()){out[k]=out[k]?[].concat(out[k],v):v}return out}
save.addEventListener("click",()=>{localStorage.setItem(key,JSON.stringify(data()));status.textContent="Draft saved on this device."});
form.addEventListener("submit",e=>{e.preventDefault();status.textContent="Applications are not open yet. Your information has not been submitted."});
try{const saved=JSON.parse(localStorage.getItem(key)||"null");if(saved){Object.entries(saved).forEach(([n,v])=>{document.querySelectorAll(`[name="${n}"]`).forEach(f=>{const vals=Array.isArray(v)?v:[v];if(f.type==="checkbox")f.checked=vals.includes(f.value);else f.value=v})});status.textContent="Your saved draft has been restored."}}catch(e){}
document.getElementById("year").textContent=new Date().getFullYear();
