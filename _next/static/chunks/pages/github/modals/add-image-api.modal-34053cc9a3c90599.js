(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5913],{98707:function(e,s,a){"use strict";a.r(s);var t=a(67294),r=a(42699),l=a(2914),n=a(93680),i=a(85893);s.default=function(e){var s=(0,t.useState)(""),a=s[0],o=s[1],c=(0,t.useState)(""),d=c[0],f=c[1];return(0,i.jsxs)(r.Z,{show:e.open,onHide:e.onHide,centered:!0,size:"lg",children:[(0,i.jsx)(r.Z.Header,{closeButton:!0,children:(0,i.jsx)(r.Z.Title,{id:"contained-modal-title-vcenter",children:"Add New Image Api"})}),(0,i.jsxs)(r.Z.Body,{children:[(0,i.jsxs)(l.Z,{children:[(0,i.jsxs)(l.Z.Group,{children:[(0,i.jsx)(l.Z.Label,{children:"Enter name of API"}),(0,i.jsx)(l.Z.Control,{size:"lg",type:"text",placeholder:"enter name of api",onChange:function(e){return o(e.target.value)}})]}),(0,i.jsx)("hr",{}),(0,i.jsxs)(l.Z.Group,{children:[(0,i.jsx)(l.Z.Label,{children:"Enter API endpoint URL"}),(0,i.jsx)(l.Z.Control,{size:"lg",type:"text",placeholder:"enter API endpoint URL",onChange:function(e){return f(e.target.value)}})]}),(0,i.jsxs)(l.Z.Label,{style:{fontSize:"10px"},children:["A get request will be send to this URL and a 200 status is expected with a body that says ","{'status':'ok'}"]})]}),(0,i.jsx)("hr",{}),(0,i.jsx)(n.Z,{disabled:e.buttonDisabled,variant:"success",onClick:function(){return e.addNewImageApi(a,d)},children:"Add"})]}),(0,i.jsx)(r.Z.Footer,{children:(0,i.jsx)(n.Z,{onClick:function(){return e.setOpen(!1)},children:"Close"})})]})}},59577:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/github/modals/add-image-api.modal",function(){return a(98707)}])},2914:function(e,s,a){"use strict";a.d(s,{Z:function(){return V}});var t=a(94184),r=a.n(t),l=a(45697),n=a.n(l),i=a(67294),o=a(85893);const c={type:n().string,tooltip:n().bool,as:n().elementType},d=i.forwardRef((({as:e="div",className:s,type:a="valid",tooltip:t=!1,...l},n)=>(0,o.jsx)(e,{...l,ref:n,className:r()(s,`${a}-${t?"tooltip":"feedback"}`)})));d.displayName="Feedback",d.propTypes=c;var f=d;var m=i.createContext({}),u=a(76792);const p=i.forwardRef((({id:e,bsPrefix:s,className:a,type:t="checkbox",isValid:l=!1,isInvalid:n=!1,as:c="input",...d},f)=>{const{controlId:p}=(0,i.useContext)(m);return s=(0,u.vE)(s,"form-check-input"),(0,o.jsx)(c,{...d,ref:f,type:t,id:e||p,className:r()(a,s,l&&"is-valid",n&&"is-invalid")})}));p.displayName="FormCheckInput";var x=p;const h=i.forwardRef((({bsPrefix:e,className:s,htmlFor:a,...t},l)=>{const{controlId:n}=(0,i.useContext)(m);return e=(0,u.vE)(e,"form-check-label"),(0,o.jsx)("label",{...t,ref:l,htmlFor:a||n,className:r()(s,e)})}));h.displayName="FormCheckLabel";var v=h;const b=i.forwardRef((({id:e,bsPrefix:s,bsSwitchPrefix:a,inline:t=!1,disabled:l=!1,isValid:n=!1,isInvalid:c=!1,feedbackTooltip:d=!1,feedback:p,feedbackType:h,className:b,style:y,title:N="",type:j="checkbox",label:w,children:g,as:I="input",...C},k)=>{s=(0,u.vE)(s,"form-check"),a=(0,u.vE)(a,"form-switch");const{controlId:F}=(0,i.useContext)(m),E=(0,i.useMemo)((()=>({controlId:e||F})),[F,e]),P=!g&&null!=w&&!1!==w||function(e,s){return i.Children.toArray(e).some((e=>i.isValidElement(e)&&e.type===s))}(g,v),R=(0,o.jsx)(x,{...C,type:"switch"===j?"checkbox":j,ref:k,isValid:n,isInvalid:c,disabled:l,as:I});return(0,o.jsx)(m.Provider,{value:E,children:(0,o.jsx)("div",{style:y,className:r()(b,P&&s,t&&`${s}-inline`,"switch"===j&&a),children:g||(0,o.jsxs)(o.Fragment,{children:[R,P&&(0,o.jsx)(v,{title:N,children:w}),p&&(0,o.jsx)(f,{type:h,tooltip:d,children:p})]})})})}));b.displayName="FormCheck";var y=Object.assign(b,{Input:x,Label:v});a(42473);const N=i.forwardRef((({bsPrefix:e,type:s,size:a,htmlSize:t,id:l,className:n,isValid:c=!1,isInvalid:d=!1,plaintext:f,readOnly:p,as:x="input",...h},v)=>{const{controlId:b}=(0,i.useContext)(m);let y;return e=(0,u.vE)(e,"form-control"),y=f?{[`${e}-plaintext`]:!0}:{[e]:!0,[`${e}-${a}`]:a},(0,o.jsx)(x,{...h,type:s,size:t,ref:v,readOnly:p,id:l||b,className:r()(n,y,c&&"is-valid",d&&"is-invalid","color"===s&&`${e}-color`)})}));N.displayName="FormControl";var j=Object.assign(N,{Feedback:f}),w=(0,a(66611).Z)("form-floating");const g=i.forwardRef((({controlId:e,as:s="div",...a},t)=>{const r=(0,i.useMemo)((()=>({controlId:e})),[e]);return(0,o.jsx)(m.Provider,{value:r,children:(0,o.jsx)(s,{...a,ref:t})})}));g.displayName="FormGroup";var I=g,C=a(31555);const k=i.forwardRef((({as:e="label",bsPrefix:s,column:a,visuallyHidden:t,className:l,htmlFor:n,...c},d)=>{const{controlId:f}=(0,i.useContext)(m);s=(0,u.vE)(s,"form-label");let p="col-form-label";"string"===typeof a&&(p=`${p} ${p}-${a}`);const x=r()(l,s,t&&"visually-hidden",a&&p);return n=n||f,a?(0,o.jsx)(C.Z,{ref:d,as:"label",className:x,htmlFor:n,...c}):(0,o.jsx)(e,{ref:d,className:x,htmlFor:n,...c})}));k.displayName="FormLabel",k.defaultProps={column:!1,visuallyHidden:!1};var F=k;const E=i.forwardRef((({bsPrefix:e,className:s,id:a,...t},l)=>{const{controlId:n}=(0,i.useContext)(m);return e=(0,u.vE)(e,"form-range"),(0,o.jsx)("input",{...t,type:"range",ref:l,className:r()(s,e),id:a||n})}));E.displayName="FormRange";var P=E;const R=i.forwardRef((({bsPrefix:e,size:s,htmlSize:a,className:t,isValid:l=!1,isInvalid:n=!1,id:c,...d},f)=>{const{controlId:p}=(0,i.useContext)(m);return e=(0,u.vE)(e,"form-select"),(0,o.jsx)("select",{...d,size:a,ref:f,className:r()(t,e,s&&`${e}-${s}`,l&&"is-valid",n&&"is-invalid"),id:c||p})}));R.displayName="FormSelect";var Z=R;const L=i.forwardRef((({bsPrefix:e,className:s,as:a="small",muted:t,...l},n)=>(e=(0,u.vE)(e,"form-text"),(0,o.jsx)(a,{...l,ref:n,className:r()(s,e,t&&"text-muted")}))));L.displayName="FormText";var _=L;const $=i.forwardRef(((e,s)=>(0,o.jsx)(y,{...e,ref:s,type:"switch"})));$.displayName="Switch";var T=Object.assign($,{Input:y.Input,Label:y.Label});const z=i.forwardRef((({bsPrefix:e,className:s,children:a,controlId:t,label:l,...n},i)=>(e=(0,u.vE)(e,"form-floating"),(0,o.jsxs)(I,{ref:i,className:r()(s,e),controlId:t,...n,children:[a,(0,o.jsx)("label",{htmlFor:t,children:l})]}))));z.displayName="FloatingLabel";var S=z;const A={_ref:n().any,validated:n().bool,as:n().elementType},O=i.forwardRef((({className:e,validated:s,as:a="form",...t},l)=>(0,o.jsx)(a,{...t,ref:l,className:r()(e,s&&"was-validated")})));O.displayName="Form",O.propTypes=A;var V=Object.assign(O,{Group:I,Control:j,Floating:w,Check:y,Switch:T,Label:F,Text:_,Range:P,Select:Z,FloatingLabel:S})},42473:function(e){"use strict";var s=function(){};e.exports=s}},function(e){e.O(0,[4451,9774,2888,179],(function(){return s=59577,e(e.s=s);var s}));var s=e.O();_N_E=s}]);