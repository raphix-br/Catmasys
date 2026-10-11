(() => {
  const USERS_KEY = "catmasys_users_v1";
  const ACTIVE_KEY = "catmasys_active_user_v1";
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const getUsers = () => { try { const value = JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); return Array.isArray(value) ? value : []; } catch (_) { return []; } };
  const getActive = () => { try { return JSON.parse(localStorage.getItem(ACTIVE_KEY) || "null"); } catch (_) { return null; } };
  const setMessage = (message, kind) => { const node=$("auth-message"); if(node){node.textContent=message;node.className="auth-message"+(kind?" "+kind:"");} };
  const bytesToHex = bytes => Array.from(new Uint8Array(bytes)).map(b=>b.toString(16).padStart(2,"0")).join("");
  const randomSalt = () => { const bytes = new Uint8Array(16); crypto.getRandomValues(bytes); return bytes; };
  async function hashPassword(password, saltHex) {
    if (!window.crypto || !crypto.subtle) throw new Error("A autenticação local precisa de um navegador atualizado em uma conexão HTTPS.");
    const salt = saltHex ? new Uint8Array(saltHex.match(/.{1,2}/g).map(b=>parseInt(b,16))) : randomSalt();
    const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits({name:"PBKDF2",salt,iterations:150000,hash:"SHA-256"}, material, 256);
    return {hash:bytesToHex(bits), salt:bytesToHex(salt)};
  }
  function updateUserButton() {
    const user=getActive();
    document.querySelectorAll("#user-button").forEach(button=>{
      const label=button.querySelector(".user-button-label");
      if(label) label.textContent=user ? user.name : "Usuário";
      button.title=user ? "Perfil: "+user.name : "Entrar ou criar perfil";
      button.classList.toggle("user-btn-active",Boolean(user));
    });
    const panel=$("session-panel"), auth=$("auth-panels"), activeName=$("active-user-name");
    if(panel){panel.hidden=!user;if(activeName&&user)activeName.textContent=user.name;}
    if(auth) auth.hidden=Boolean(user);
  }
  const loginForm=$("login-form"), createForm=$("create-form");
  if(loginForm) loginForm.addEventListener("submit", async event=>{
    event.preventDefault(); setMessage("Verificando perfil…");
    const email=$("login-email").value.trim().toLowerCase(), password=$("login-password").value;
    const user=getUsers().find(item=>item.email===email);
    if(!user){setMessage("Não encontrei esse perfil neste navegador. Confira o e-mail ou crie um perfil.","error");return;}
    try{
      const result=await hashPassword(password,user.salt);
      if(result.hash!==user.passwordHash){setMessage("Senha incorreta. Tente novamente.","error");return;}
      localStorage.setItem(ACTIVE_KEY,JSON.stringify({id:user.id,name:user.name,email:user.email}));
      setMessage("Login realizado neste navegador.","success"); updateUserButton();
      window.setTimeout(()=>{location.href="minha_colecao.html";},450);
    }catch(error){setMessage(error.message||"Não foi possível verificar o perfil.","error");}
  });
  if(createForm) createForm.addEventListener("submit",async event=>{
    event.preventDefault();
    const name=$("create-name").value.trim(),email=$("create-email").value.trim().toLowerCase(),password=$("create-password").value,confirm=$("create-password-confirm").value;
    if(password.length<8){setMessage("Use uma senha com pelo menos 8 caracteres.","error");return;}
    if(password!==confirm){setMessage("As senhas não coincidem.","error");return;}
    const users=getUsers();
    if(users.some(user=>user.email===email)){setMessage("Já existe um perfil com esse e-mail neste navegador. Faça login.","error");return;}
    setMessage("Criando perfil local…");
    try{
      const result=await hashPassword(password);
      const user={id:"u_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,8),name,email,salt:result.salt,passwordHash:result.hash,createdAt:new Date().toISOString()};
      users.push(user);localStorage.setItem(USERS_KEY,JSON.stringify(users));localStorage.setItem(ACTIVE_KEY,JSON.stringify({id:user.id,name:user.name,email:user.email}));
      setMessage("Perfil criado e ativado neste navegador.","success");updateUserButton();
      window.setTimeout(()=>{location.href="minha_colecao.html";},450);
    }catch(error){setMessage(error.message||"Não foi possível criar o perfil.","error");}
  });
  const logout=$("logout-btn");
  if(logout) logout.addEventListener("click",()=>{
    localStorage.removeItem(ACTIVE_KEY);updateUserButton();setMessage("Você saiu do perfil. Seus dados locais continuam salvos.","success");
  });
  const mode=new URLSearchParams(location.search).get("mode");
  if(mode==="login") $("login-email")?.focus();
  if(mode==="create") $("create-name")?.focus();
  updateUserButton();
})();