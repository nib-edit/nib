// Trial node view to be used for image resize.

// export default class ImageView {
//   constructor(node) {
//     this.dom = document.createElement("span");
//     this.dom.style.position = "relative";
//     this.dom.style.display = "inline-block";
//     this.img = document.createElement("img");
//     this.img.src = node.attrs.src;
//     this.img.style = node.attrs.style;
//     this.dom.appendChild(this.img);
//     this.img.addEventListener("mousedown", e => {
//       this.img.style.outline = "2px solid #065FD4";
//       this.div1 = document.createElement("div");
//       this.div1.style = `height: 10px; width: 10px; position: absolute;left: 0px;top: 0px; background-color: #065FD4;`;
//       this.dom.appendChild(this.div1);
//       this.div2 = document.createElement("div");
//       this.div2.style = `height: 10px; width: 10px; position: absolute;right: 0px;top: 0px; background-color: #065FD4;`;
//       this.dom.appendChild(this.div2);
//       this.div3 = document.createElement("div");
//       this.div3.style = `height: 10px; width: 10px; position: absolute;left: 0px;bottom: 5px; background-color: #065FD4;`;
//       this.dom.appendChild(this.div3);
//       this.div4 = document.createElement("div");
//       this.div4.style = `height: 10px; width: 10px; position: absolute;right: 0px;bottom: 5px; background-color: #065FD4;`;
//       this.dom.appendChild(this.div4);
//       e.stopPropagation();
//     });
//   }

//   stopEvent() {
//     return true;
//   }
// }
