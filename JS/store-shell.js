(function(){
  'use strict';
  const CART_KEY='gjuStoreCart';
  const LEGACY_KEY='gjuPhysicalStoreCart';
  function cartCount(){
    try{
      const raw=localStorage.getItem(CART_KEY)||localStorage.getItem(LEGACY_KEY)||'[]';
      const cart=JSON.parse(raw);
      return Array.isArray(cart)?cart.reduce((n,item)=>n+Math.max(0,Number(item?.quantity||0)),0):0;
    }catch{return 0;}
  }
  function updateBadges(){
    const count=cartCount();
    document.querySelectorAll('[data-store-cart-count]').forEach(el=>{
      el.textContent=count>99?'99+':String(count);
      el.hidden=count<1;
    });
  }
  function focusSearch(){
    const input=document.querySelector('#pasProductSearch');
    if(!input)return;
    document.querySelector('#shopProducts')?.scrollIntoView({behavior:'smooth',block:'start'});
    setTimeout(()=>input.focus(),350);
  }
  document.querySelectorAll('[data-store-search]').forEach(form=>form.addEventListener('submit',event=>{
    event.preventDefault();
    const input=form.querySelector('input');
    const value=(input?.value||'').trim();
    if(document.querySelector('#pasProductSearch')){
      const target=document.querySelector('#pasProductSearch');
      target.value=value;
      target.dispatchEvent(new Event('input',{bubbles:true}));
      focusSearch();
    }else{
      location.href='store.html'+(value?'?q='+encodeURIComponent(value):'');
    }
  }));
  document.querySelectorAll('[data-store-focus-search]').forEach(el=>el.addEventListener('click',focusSearch));
  updateBadges();
  addEventListener('storage',e=>{if(e.key===CART_KEY||e.key===LEGACY_KEY)updateBadges();});
  document.addEventListener('gju:store-cart-updated',updateBadges);
}());
