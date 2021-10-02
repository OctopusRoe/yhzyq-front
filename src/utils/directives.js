export default {
  install(Vue) {
    // v-dialogDrag: 弹窗拖拽
    // Vue.directive("dialogDrag", {
    //   bind(el, binding, vnode, oldVnode) {
    //     const dialogHeaderEl = el.querySelector(".el-dialog__header");
    //     const dragDom = el.querySelector(".el-dialog");
    //     dialogHeaderEl.style.cursor = "move";

    //     // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    //     const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

    //     dialogHeaderEl.onmousedown = e => {
    //       // 鼠标按下，计算当前元素距离可视区的距离
    //       const disX = e.clientX - dialogHeaderEl.offsetLeft;
    //       const disY = e.clientY - dialogHeaderEl.offsetTop;

    //       // 获取到的值带px 正则匹配替换
    //       let styL, styT;

    //       // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
    //       if (sty.left.includes("%")) {
    //         styL =
    //           +document.body.clientWidth * (+sty.left.replace(/\%/g, "") / 100);
    //         styT =
    //           +document.body.clientHeight * (+sty.top.replace(/\%/g, "") / 100);
    //       } else {
    //         styL = +sty.left.replace(/\px/g, "");
    //         styT = +sty.top.replace(/\px/g, "");
    //       }

    //       document.onmousemove = function(e) {
    //         // 通过事件委托，计算移动的距离
    //         const l = e.clientX - disX;
    //         const t = e.clientY - disY;

    //         // 移动当前元素
    //         dragDom.style.left = `${l + styL}px`;
    //         dragDom.style.top = `${t + styT}px`;

    //         // 将此时的位置传出去
    //         // binding.value({x:e.pageX,y:e.pageY})
    //       };

    //       document.onmouseup = function(e) {
    //         document.onmousemove = null;
    //         document.onmouseup = null;
    //       };
    //     };
    //   }
    // })

    // // v-dialogDragWidth: 弹窗宽度拖大 拖小
    // Vue.directive("dialogDragWidth", {
    //   bind(el, binding, vnode, oldVnode) {
    //     const dragDom = binding.value.$el.querySelector(".el-dialog");

    //     el.onmousedown = e => {
    //       // 鼠标按下，计算当前元素距离可视区的距离
    //       const disX = e.clientX - el.offsetLeft;

    //       document.onmousemove = function(e) {
    //         e.preventDefault(); // 移动时禁用默认事件

    //         // 通过事件委托，计算移动的距离
    //         const l = e.clientX - disX;
    //         dragDom.style.width = `${l}px`;
    //       };

    //       document.onmouseup = function(e) {
    //         document.onmousemove = null;
    //         document.onmouseup = null;
    //       };
    //     };
    //   }
    // });

    // Vue.directive("drap-resize", {
    //   inserted: function(el, binding, vnode) {
    //     let changeWidth = vnode.componentOptions.propsData.width;
    //     let drapObj = el.querySelector(".ant-layout-sider-zero-width-trigger-left");
    //     let timeout = 500;
    //     let deviation = 0;

    //     const verticalBar = document.createElement("div");
    //     verticalBar.id = "verticalBar_0019___";
    //     verticalBar.style.left = changeWidth - drapObj.offsetWidth + 20 + "px";
    //     verticalBar.style.width = `${drapObj.offsetWidth}px`;
    //     verticalBar.className = "vertical-bar";

    //     // let oDiv = el //当前元素
    //     drapObj.onmousedown = function(e) {
    //       e.preventDefault();

    //       if (el.className.indexOf("ant-layout-sider-collapsed") < 0) {
    //         console.log("444444444", vnode);

    //         // verticalBar.style.left = e.clientX + 'px'

    //         deviation = new Date().getTime();

    //         // 计算时间显示拖动的竖线
    //         let timeoutIndex = setTimeout(() => {
    //           el.appendChild(verticalBar);

    //           let disX = e.clientX;
    //           // 按下鼠标后鼠标的移动事件
    //           document.onmousemove = function(e) {
    //             e.preventDefault();
    //             let l = e.clientX - disX;
    //             // console.log('1111', l, vnode.width)
    //             changeWidth = parseInt(verticalBar.style.left) + l;
    //             verticalBar.style.left = changeWidth + "px";
    //             disX = e.clientX;
    //           };
    //         }, timeout);
    //         // 点击后松开鼠标的事件
    //         document.onmouseup = function(e) {
    //           deviation = new Date().getTime() - deviation;

    //           if (deviation < timeout) {
    //             clearTimeout(timeoutIndex);
    //           } else {
    //             binding.value.set(changeWidth); //将鼠标按下实时变动的值从自定义指令中传递出去

    //             removeElement(document.querySelector("#" + verticalBar.id));
    //           }

    //           e.preventDefault();

    //           document.onmousemove = null;
    //           document.onmouseup = null;
    //         };
    //       }
    //     };
    //   }
    // });

    Vue.directive("preventReClick", {
      inserted(el, bind, vnode) {
        
        const times = bind.value;
        el.addEventListener("click", (v) => {
          el.disabled = true;
          $(el).addClass("is-disabled");

          // bind.value.value().then(res => {
          //   el.disabled = false;
          //   $(el).removeClass("is-disabled");
          // });

          setTimeout(() => {
            el.disabled = false;
            $(el).removeClass("is-disabled");
          },times||5000);
        });
      }
    });
  }
};
