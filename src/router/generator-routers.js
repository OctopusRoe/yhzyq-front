import { Layout, PageWapper } from "@/layout";
import { cloneDeep } from "lodash";

// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  Layout: Layout,
  // ParentView: Layout
  PageWapper: PageWapper
  // Components: [Layout]
};

// 根级菜单
const rootRouter = {
  key: "PageWapper",
  path: "/PageWapper",
  name: "_PageWapper",
  component: PageWapper,
  // redirect: '/Sys/Role/Role.html',
  meta: {
    // title: '首页'
  },
  redirect: "/index",
  children: []
};

/**
 * 设置路由的redirect属性
 * @param {*} routers 路由
 */
export const addRedirectTo = routers => {
  const func = obj => {
    // console.log('6666666', obj.path, obj)
    // 有孩子
    if (obj.children?.length) {
      const childPath = obj.children[0].path;

      if (childPath.indexOf("/") === 0) {
        obj.redirect = childPath;
      } else {
        obj.redirect = obj.path + "/" + childPath;
      }

      obj.children.forEach(item => func(item));
    } else {
    }
  };

  func(routers);
};

/**
 * 返回实际会用到的路由
 * @param {Array} tempRouters 待改变的路由
 * @returns 新的路由
 * aurhor:陈偲
 * time:20210320
 */
export const actualRoutersHandler = tempRouters => {
  //   rootRouter.children.push(...routers);
  const routers = cloneDeep(tempRouters);

  const jointRouter = { ...rootRouter };

  const func = list => {
    list.forEach(item => {
      const tempItem = { ...item };

      delete tempItem.children;

      jointRouter.children.push(tempItem);

      if (item.children?.length) {
        func(item.children);
      } else {
        jointRouter.children.push(item);
      }
    });
  };

  func(routers);

  //   jointRouter.push(...[routers[1], routers[2]]);

  //   jointRouter.push(...routers.splice(1));

  console.log("3333333333", jointRouter);

  return [jointRouter];
};

/**
 * 加载路由的component
 * @param {String} view 相对地址
 * @returns component
 */
export const loadView = view => {
  // 路由懒加载
  return (
    constantRouterComponents[view] ||
    (resolve => require([`@/views/${view}`], resolve))
  );
};

/**
 * 处理组件物理地址而返回处理后的页面名字
 *  author:陈偲
 *  date:20210801
 * @param {String} path 页面的物理地址
 * @returns 处理后的页面名字
 */
export const loadComponentPath = path => {
  let pathArr = path.split("/");
  if (pathArr[pathArr.length - 1][0] === ".") {
    pathArr.length = pathArr.length - 1;
  }

  const result = pathArr.map(item => {
    let tempItem = item.replace("/");
    item = tempItem.substr(0, 1).toUpperCase() + tempItem.substr(1);

    return item;
  });

  return result.join("");
};

// 遍历后台传来的路由字符串，转换为组件对象
export const filterAsyncRouter = asyncRouterMap => {
  return asyncRouterMap.map((route, deep = 0) => {
    const currentRouter = { ...route, meta: { ...route.meta } };

    if (typeof route.component === "string") {
      if (route.component) {
        // 组件的加载
        currentRouter.component = loadView(route.component);
        currentRouter.meta.cacheName = loadComponentPath(route.component);
      } else {
        currentRouter.component = resolve =>
          require([`@/views/error/404.vue`], resolve);
      }
    }

    if (route.children && route.children.length) {
      currentRouter.children = filterAsyncRouter(route.children, ++deep);
    }

    return currentRouter;
  });
};
