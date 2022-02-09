(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1046],{71046:function(t,e,n){"use strict";n.r(e),n.d(e,{FrameConnector:function(){return m},UserRejectedRequestError:function(){return f}});var s=n(26939),o=n(215),r=n.n(o),i=n(2177);function c(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function h(t,e){return(h=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function u(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function d(t,e,n){return(d=u()?Reflect.construct:function(t,e,n){var s=[null];s.push.apply(s,e);var o=new(Function.bind.apply(t,s));return n&&h(o,n.prototype),o}).apply(null,arguments)}function p(t){var e="function"===typeof Map?new Map:void 0;return(p=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!==typeof t)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof e){if(e.has(t))return e.get(t);e.set(t,s)}function s(){return d(t,arguments,a(this).constructor)}return s.prototype=Object.create(t.prototype,{constructor:{value:s,enumerable:!1,writable:!0,configurable:!0}}),h(s,t)})(t)}function l(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var f=function(t){function e(){var e;return(e=t.call(this)||this).name=e.constructor.name,e.message="The user rejected the request.",e}return c(e,t),e}(p(Error)),m=function(t){function e(e){var n;return 1!==e.supportedChainIds.length&&(0,i.Z)(!1),(n=t.call(this,e)||this).handleNetworkChanged=n.handleNetworkChanged.bind(l(n)),n.handleChainChanged=n.handleChainChanged.bind(l(n)),n.handleAccountsChanged=n.handleAccountsChanged.bind(l(n)),n.handleClose=n.handleClose.bind(l(n)),n}c(e,t);var n=e.prototype;return n.handleNetworkChanged=function(t){this.emitUpdate({provider:this.provider,chainId:t})},n.handleChainChanged=function(t){this.emitUpdate({chainId:t})},n.handleAccountsChanged=function(t){this.emitUpdate({account:0===t.length?null:t[0]})},n.handleClose=function(t,e){this.emitDeactivate()},n.activate=function(){try{var t=this;return t.provider||(t.provider=r()("frame")),t.provider.on("networkChanged",t.handleNetworkChanged).on("chainChanged",t.handleChainChanged).on("accountsChanged",t.handleAccountsChanged).on("close",t.handleClose),Promise.resolve(t.provider.enable().then((function(t){return t[0]})).catch((function(t){throw t&&4001===t.code?new f:t}))).then((function(e){return{provider:t.provider,account:e}}))}catch(e){return Promise.reject(e)}},n.getProvider=function(){try{return Promise.resolve(this.provider)}catch(t){return Promise.reject(t)}},n.getChainId=function(){try{return Promise.resolve(this.provider.send("eth_chainId"))}catch(t){return Promise.reject(t)}},n.getAccount=function(){try{return Promise.resolve(this.provider.send("eth_accounts").then((function(t){return t[0]})))}catch(t){return Promise.reject(t)}},n.deactivate=function(){this.provider.removeListener("networkChanged",this.handleNetworkChanged).removeListener("chainChanged",this.handleChainChanged).removeListener("accountsChanged",this.handleAccountsChanged).removeListener("close",this.handleClose)},e}(s.AbstractConnector)},66312:function(t,e,n){const s=n(17187),o=!1;t.exports=class extends s{constructor(t,e,n){super(),this.targets=e,this.connections=t,this.connected=!1,this.status="loading",this.interval=n.interval||5e3,this.name=n.name||"default",this.inSetup=!0,this.connect()}connect(t=0){if(this.connection&&"connected"===this.connection.status&&t>=this.connection.index)o;else if(0===this.targets.length)o;else{const{protocol:e,location:n}=this.targets[t];this.connection=this.connections[e](n),this.connection.on("error",(e=>this.connected?this.listenerCount("error")?this.emit("error",e):void console.warn("eth-provider - Uncaught connection error: "+e.message):this.connectionError(t,e))),this.connection.on("close",(t=>{this.connected=!1,this.emit("close"),this.closing||this.refresh()})),this.connection.on("connect",(()=>{this.connection.target=this.targets[t],this.connection.index=t,this.targets[t].status=this.connection.status,this.connected=!0,this.inSetup=!1,this.emit("connect")})),this.connection.on("data",(t=>this.emit("data",t))),this.connection.on("payload",(t=>this.emit("payload",t)))}}refresh(t=this.interval){clearTimeout(this.connectTimer),this.connectTimer=setTimeout((()=>this.connect()),t)}connectionError(t,e){this.targets[t].status=e,this.targets.length-1===t?(this.inSetup=!1,this.refresh()):this.connect(++t)}close(){this.closing=!0,this.connection?this.connection.close():this.emit("close"),clearTimeout(this.connectTimer)}error(t,e,n=-1){this.emit("payload",{id:t.id,jsonrpc:t.jsonrpc,error:{message:e,code:n}})}send(t){this.inSetup?setTimeout((()=>this.send(t)),100):this.connection.closed?this.error(t,"Not connected"):this.connection.send(t)}}},215:function(t,e,n){const s=n(80433),o=n(35487),r=n(56746),i={ethereum:"undefined"!==typeof window&&"undefined"!==typeof window.ethereum?window.ethereum:null,web3:"undefined"!==typeof window&&"undefined"!==typeof window.web3?window.web3.currentProvider:null},c="undefined"!==typeof window&&"undefined"!==typeof window.WebSocket?window.WebSocket:null,a="undefined"!==typeof window&&"undefined"!==typeof window.XMLHttpRequest?window.XMLHttpRequest:null;i.ethereum&&(i.ethereum.__isProvider=!0);const h={injected:i.ethereum||n(57713)(i.web3),ipc:n(54195)("IPC connections are unavliable in the browser"),ws:n(37397)(c),http:n(84278)(a)};t.exports=(t=["injected","frame"],e={})=>o(h,s(t,r),e)},84278:function(t,e,n){const s=n(17187),o=n(86925);let r;class i extends s{constructor(t,e,n){super(),r=t,this.connected=!1,this.subscriptions=!1,this.status="loading",this.url=e,this.pollId=o(),setTimeout((()=>this.create()),0)}create(){if(!r)return this.emit("error",new Error("No HTTP transport available"));this.on("error",(()=>{this.connected&&this.close()})),this.init()}init(){this.send({jsonrpc:"2.0",method:"eth_syncing",params:[],id:1},((t,e)=>{if(t)return this.emit("error",t);this.send({jsonrpc:"2.0",id:1,method:"eth_pollSubscriptions",params:[this.pollId,"immediate"]},((t,e)=>{t||(this.subscriptions=!0,this.pollSubscriptions()),this.connected=!0,this.emit("connect")}))}))}pollSubscriptions(){this.send({jsonrpc:"2.0",id:1,method:"eth_pollSubscriptions",params:[this.pollId]},((t,e)=>{if(t)return this.subscriptionTimeout=setTimeout((()=>this.pollSubscriptions()),1e4),this.emit("error",t);this.closed||(this.subscriptionTimeout=this.pollSubscriptions()),e&&e.map((t=>{let e;try{e=JSON.parse(t)}catch(n){e=!1}return e})).filter((t=>t)).forEach((t=>this.emit("payload",t)))}))}close(){this.closed=!0,this.emit("close"),clearTimeout(this.subscriptionTimeout),this.removeAllListeners()}filterStatus(t){if(t.status>=200&&t.status<300)return t;const e=new Error(t.statusText);throw e.res=t,e.message}error(t,e,n=-1){this.emit("payload",{id:t.id,jsonrpc:t.jsonrpc,error:{message:e,code:n}})}send(t,e){if(this.closed)return this.error(t,"Not connected");if("eth_subscribe"===t.method){if(!this.subscriptions)return this.error(t,"Subscriptions are not supported by this HTTP endpoint");t.pollId=this.pollId}const n=new r;let s=!1;const o=(o,r)=>{if(!s)if(n.abort(),s=!0,e)e(o,r);else{const{id:e,jsonrpc:n}=t,s=o?{id:e,jsonrpc:n,error:{message:o.message,code:o.code}}:{id:e,jsonrpc:n,result:r};this.emit("payload",s)}};n.open("POST",this.url,!0),n.setRequestHeader("Content-Type","application/json"),n.timeout=6e4,n.onerror=o,n.ontimeout=o,n.onreadystatechange=()=>{if(4===n.readyState)try{const t=JSON.parse(n.responseText);o(t.error,t.result)}catch(t){o(t)}},n.send(JSON.stringify(t))}}t.exports=t=>(e,n)=>new i(t,e,n)},57713:function(t,e,n){const s=n(17187);class o extends s{constructor(t,e){super(),t?setTimeout((()=>this.emit("error",new Error("Injected web3 provider is not currently supported"))),0):setTimeout((()=>this.emit("error",new Error("No injected provider found"))),0)}}t.exports=t=>e=>new o(t,e)},54195:function(t,e,n){const s=n(17187);class o extends s{constructor(t){super(),setTimeout((()=>this.emit("error",new Error(t))),0)}}t.exports=t=>()=>new o(t)},37397:function(t,e,n){const s=n(17187),o=n(48868);let r;class i extends s{constructor(t,e,n){super(),r=t,setTimeout((()=>this.create(e,n)),0)}create(t,e){r||this.emit("error",new Error("No WebSocket transport available"));try{this.socket=new r(t)}catch(n){return this.emit("error",n)}this.socket.addEventListener("error",(t=>this.emit("error",t))),this.socket.addEventListener("open",(()=>{this.emit("connect"),this.socket.addEventListener("message",(t=>{const e="string"===typeof t.data?t.data:"";o(e,((t,e)=>{t||e.forEach((t=>{Array.isArray(t)?t.forEach((t=>this.emit("payload",t))):this.emit("payload",t)}))}))})),this.socket.addEventListener("close",(()=>this.onClose()))}))}onClose(){this.socket=null,this.closed=!0,this.emit("close"),this.removeAllListeners()}close(){this.socket?this.socket.close():this.onClose()}error(t,e,n=-1){this.emit("payload",{id:t.id,jsonrpc:t.jsonrpc,error:{message:e,code:n}})}send(t){this.socket&&this.socket.readyState===this.socket.CONNECTING?setTimeout((e=>this.send(t)),10):!this.socket||this.socket.readyState>1?(this.connected=!1,this.error(t,"Not connected")):this.socket.send(JSON.stringify(t))}}t.exports=t=>(e,n)=>new i(t,e,n)},31511:function(t){for(var e=[],n=0;n<256;++n)e[n]=(n+256).toString(16).substr(1);t.exports=function(t,n){var s=n||0,o=e;return[o[t[s++]],o[t[s++]],o[t[s++]],o[t[s++]],"-",o[t[s++]],o[t[s++]],"-",o[t[s++]],o[t[s++]],"-",o[t[s++]],o[t[s++]],"-",o[t[s++]],o[t[s++]],o[t[s++]],o[t[s++]],o[t[s++]],o[t[s++]]].join("")}},67412:function(t){var e="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(e){var n=new Uint8Array(16);t.exports=function(){return e(n),n}}else{var s=new Array(16);t.exports=function(){for(var t,e=0;e<16;e++)0===(3&e)&&(t=4294967296*Math.random()),s[e]=t>>>((3&e)<<3)&255;return s}}},86925:function(t,e,n){var s=n(67412),o=n(31511);t.exports=function(t,e,n){var r=e&&n||0;"string"==typeof t&&(e="binary"===t?new Array(16):null,t=null);var i=(t=t||{}).random||(t.rng||s)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,e)for(var c=0;c<16;++c)e[r+c]=i[c];return e||o(i)}},48868:function(t){let e,n;t.exports=(t,s)=>{const o=[];t.replace(/\}[\n\r]?\{/g,"}|--|{").replace(/\}\][\n\r]?\[\{/g,"}]|--|[{").replace(/\}[\n\r]?\[\{/g,"}|--|[{").replace(/\}\][\n\r]?\{/g,"}]|--|{").split("|--|").forEach((t=>{let r;e&&(t=e+t);try{r=JSON.parse(t)}catch(i){return e=t,clearTimeout(n),void(n=setTimeout((()=>s(new Error("Parse response timeout"))),15e3))}clearTimeout(n),e=null,r&&o.push(r)})),s(null,o)}},56746:function(t){t.exports={injected:["injected"],frame:["ws://127.0.0.1:1248","http://127.0.0.1:1248"],direct:["ws://127.0.0.1:8546","http://127.0.0.1:8545"],infura:["wss://mainnet.infura.io/ws/v3/786ade30f36244469480aa5c2bf0743b","https://mainnet.infura.io/v3/786ade30f36244469480aa5c2bf0743b"],infuraRopsten:["wss://ropsten.infura.io/ws/v3/786ade30f36244469480aa5c2bf0743b","https://ropsten.infura.io/v3/786ade30f36244469480aa5c2bf0743b"],infuraRinkeby:["wss://rinkeby.infura.io/ws/v3/786ade30f36244469480aa5c2bf0743b","https://rinkeby.infura.io/v3/786ade30f36244469480aa5c2bf0743b"],infuraKovan:["wss://kovan.infura.io/ws/v3/786ade30f36244469480aa5c2bf0743b","https://kovan.infura.io/v3/786ade30f36244469480aa5c2bf0743b"]}},35487:function(t,e,n){const s=n(17187),o=n(43202),r=n(66312),i=t=>{function e(e){t.status=e,t instanceof s&&t.emit("status",e)}async function n(){if(t.inSetup)return setTimeout(n,1e3);try{await t.send("eth_syncing")?(e("syncing"),setTimeout((()=>n()),5e3)):e("connected")}catch(s){e("disconnected")}}return e("loading"),n(),t.on("connect",(()=>n())),t.on("close",(()=>e("disconnected"))),t};t.exports=(t,e,n)=>{if(t.injected.__isProvider&&e.map((t=>t.type)).indexOf("injected")>-1)return delete t.injected.__isProvider,i(t.injected);const s=new o(new r(t,e,n));return s.setMaxListeners(128),i(s)}},80433:function(t){const e=t=>"injected"===t?"injected":t.endsWith(".ipc")?"ipc":t.startsWith("wss://")||t.startsWith("ws://")?"ws":t.startsWith("https://")||t.startsWith("http://")?"http":"";t.exports=(t,n)=>[].concat(...[].concat(t).map((t=>n[t]?n[t].map((n=>({type:t,location:n,protocol:e(n)}))):{type:"custom",location:t,protocol:e(t)}))).filter((t=>!(!t.protocol&&"injected"!==t.type)||(console.log('eth-provider | Invalid provider preset/location: "'+t.location+'"'),!1)))},43202:function(t,e,n){const s=n(17187);t.exports=class extends s{constructor(t){super(),this.connected=!1,this.nextId=0,this.promises={},this.subscriptions=[],this.connection=t,this.connection.on("connect",(()=>this.checkConnection())),this.connection.on("close",(()=>this.emit("close"))),this.connection.on("payload",(t=>{const{id:e,method:n,error:s,result:o}=t;"undefined"!==typeof e?this.promises[e]&&(t.error?this.promises[e].reject(s):this.promises[e].resolve(o),delete this.promises[e]):n&&n.indexOf("_subscription")>-1&&(this.emit(t.params.subscription,t.params.result),this.emit(n,t.params),this.emit("data",t))})),this.on("newListener",((t,e)=>{"networkChanged"===t?!this.attemptedNetworkSubscription&&this.connected&&this.startNetworkSubscription():"accountsChanged"===t&&!this.attemptedAccountsSubscription&&this.connected&&this.startAccountsSubscription()}))}async checkConnection(){try{this.emit("connect",await this._send("net_version")),this.connected=!0,this.listenerCount("networkChanged")&&!this.attemptedNetworkSubscription&&this.startNetworkSubscription(),this.listenerCount("accountsChanged")&&!this.attemptedAccountsSubscription&&this.startAccountsSubscription()}catch(t){this.connected=!1}}async startNetworkSubscription(){this.attemptedNetworkSubscription=!0;try{let t=await this.subscribe("eth_subscribe","networkChanged");this.on(t,(t=>this.emit("networkChanged",t)))}catch(t){console.warn("Unable to subscribe to networkChanged",t)}}async startAccountsSubscription(){this.attemptedAccountsSubscription=!0;try{let t=await this.subscribe("eth_subscribe","accountsChanged");this.on(t,(t=>this.emit("accountsChanged",t)))}catch(t){console.warn("Unable to subscribe to accountsChanged",t)}}enable(){return new Promise(((t,e)=>{this._send("eth_accounts").then((n=>{if(n.length>0)this.accounts=n,this.coinbase=n[0],this.emit("enable"),t(n);else{const t=new Error("User Denied Full Provider");t.code=4001,e(t)}})).catch(e)}))}_send(t,e=[]){if(!t||"string"!==typeof t)return new Error("Method is not a valid string.");if(!(e instanceof Array))return new Error("Params is not a valid array.");const n={jsonrpc:"2.0",id:this.nextId++,method:t,params:e},s=new Promise(((t,e)=>{this.promises[n.id]={resolve:t,reject:e}}));return this.connection.send(n),s}send(...t){return this._send(...t)}_sendBatch(t){return Promise.all(t.map((t=>this._send(t.method,t.params))))}subscribe(t,e,n=[]){return this._send(t,[e,...n]).then((t=>(this.subscriptions.push(t),t)))}unsubscribe(t,e){return this._send(t,[e]).then((t=>{if(t)return this.subscriptions=this.subscriptions.filter((t=>t!==e)),this.removeAllListeners(e),t}))}sendAsync(t,e){return e&&"function"===typeof e?t?t instanceof Array?this.sendAsyncBatch(t,e):this._send(t.method,t.params).then((n=>{e(null,{id:t.id,jsonrpc:t.jsonrpc,result:n})})).catch((t=>{e(t)})):e(new Error("Invalid Payload")):e(new Error("Invalid or undefined callback provided to sendAsync"))}sendAsyncBatch(t,e){return this._sendBatch(t).then((n=>{let s=n.map(((e,n)=>({id:t[n].id,jsonrpc:t[n].jsonrpc,result:e})));e(null,s)})).catch((t=>{e(t)}))}isConnected(){return this.connected}close(){this.connection.close(),this.connected=!1;let t=new Error("Provider closed, subscription lost, please subscribe again.");this.subscriptions.forEach((e=>this.emit(e,t))),this.subscriptions=[]}}}}]);