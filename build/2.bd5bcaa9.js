(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{506:function(e,t,r){"use strict";r.r(t);var n=r(5),o=r.n(n),a=r(6),i=r.n(a),c=r(1),l=r.n(c),s=r(0),p=r.n(s),d=r(20),u=r(122),b=r(21),y=r(10),h=r.n(y),m=r(7);function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),!0).forEach(function(t){h()(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var g=Object(b.withTheme)(function(e){var t=e.theme,r=e.selected,n=(e.name,i()(e,["theme","selected","name"])),a=t.constants.color,c=a.text,l=a.highlight,s=c.primary;return r&&(s=l.primary),p.a.createElement(f,null,p.a.createElement("svg",o()({width:"16px",height:"16px",viewBox:"0 0 16 16",version:"1.1"},n),p.a.createElement("g",{id:"Page-1",stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd",strokeLinecap:"round"},p.a.createElement("g",{id:"Desktop-HD",transform:"translate(-928.000000, -633.000000)",stroke:s},p.a.createElement("polyline",{id:"Path-7",points:"929.946458 638.5 936 643.088594 941.906213 638.5"})))))}),f=m.a.span({display:"flex"},function(e){var t=e.theme,r=t.constants;return _objectSpread({},(0,t.icon)({theme:r}))}),O=r(52),j=r.n(O);function _templateObject(){var e=j()(["\n  color: ",";\n  font-size: ",";\n"]);return _templateObject=function _templateObject(){return e},e}var w={alignItems:"center",display:"flex",justifyContent:"space-between",width:"100%"},v=function Option(e){var t=e.label,r=e.value;return p.a.createElement(d.z.Option,e,p.a.createElement(e.value.tag,{style:w},t,p.a.createElement(S,null,r.keymap)))};v.propTypes={label:l.a.string.isRequired,value:l.a.shape({blockType:l.a.string,tag:l.a.string,keymap:l.a.string}).isRequired};var S=m.a.span(_templateObject(),function(e){return e.theme.constants.color.text.secondary},function(e){return e.theme.constants.fontSize.small}),k=v;function style_ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function style_objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?style_ownKeys(Object(r),!0).forEach(function(t){h()(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):style_ownKeys(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var x=function getStyles(e,t){return function(r,n){return style_objectSpread(style_objectSpread(style_objectSpread({},r),e),t?t(n):{})}},P=function getSelectStyle(e,t,r){var n=e.constants,o=e.select;return{container:x(style_objectSpread({backgroundColor:n.color.background.primary,borderRadius:n.borderRadius,display:"inline-block",lineHeight:1},o.wrapper)),control:x({backgroundColor:n.color.background.primary,border:"none",borderRadius:n.borderRadius,boxShadow:"none",height:"28px",minHeight:t||"28px",width:r||"112px"}),dropdownIndicator:x({padding:"4px"}),indicatorSeparator:x({display:"none"}),option:x(style_objectSpread({alignItems:"center",display:"flex",color:n.color.text.primary,height:"44px",minHeight:"44px",padding:"0 8px"},o.option),function(e){return style_objectSpread(style_objectSpread({},e.isSelected?{backgroundColor:n.color.background.primary,color:n.color.highlight.primary}:{}),e.isFocused?{backgroundColor:n.color.highlight.secondary}:{})}),menu:x(style_objectSpread({backgroundColor:n.color.background.primary,color:n.color.text.primary,width:"212px"},o.menu)),singleValue:x(style_objectSpread({overflow:"visible",color:n.color.text.primary,fontSize:n.fontSize.medium,fontWeight:n.fontWeight.medium},o.label))}},_=function DropdownIndicator(e){return p.a.createElement(d.z.DropdownIndicator,e,p.a.createElement(g,null))},E=function Select(e){var t=e.selectedOption,r=e.theme,n=e.height,a=e.width,c=i()(e,["selectedOption","theme","height","width"]);return p.a.createElement(u.a,o()({components:{Option:k,DropdownIndicator:_},styles:P(r,n,a),value:t},c))};E.propTypes={selectedOption:l.a.shape({label:l.a.string,value:l.a.object}),theme:l.a.shape({select:l.a.object}).isRequired,height:l.a.number,width:l.a.number},E.defaultProps={height:void 0,width:void 0,selectedOption:void 0};var D=Object(b.withTheme)(E);t.default={Select:D}}}]);