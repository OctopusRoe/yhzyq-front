// import Vue from 'vue'
// import Router from 'vue-router'
// import ProcessProp from '../components/flow/page/ProcessProperties'
// import ProcessListenerCfg from '../components/flow/page/ProcessListenerCfg'
// import UserTaskProp from '../components/flow/page/task/UserTaskProperties'
// import ManualTaskProp from '../components/flow/page/task/ManualTaskProperties'
// import ScriptTaskProp from '../components/flow/page/task/ScriptTaskProperties'
// import MailTaskProp from '../components/flow/page/task/MailTaskProperties'
// import ServiceTaskProp from '../components/flow/page/task/ServiceTaskProperties'
// import RecieveTaskProp from '../components/flow/page/task/RecieveTaskProperties'
// import BusinessRuleTaskProp from '../components/flow/page/task/businessRuleTaskProperties'
// import CallActivityTaskProp from '../components/flow/page/task/CallActivityTaskProperties'
// import ConnectionProp from '../components/flow/page/connection/ConnectionProperties'
// import SubProcessProp from '../components/flow/page/container/SubProcessProperties'
// import ExportXML from '../components/flow/page/ExportXML'
// import ImportXML from '../components/flow/page/ImportXML'
// import flowDesign from '../views/flow/flowDesign'
// import flowManage from '../views/flow/flowManage'
//
// Vue.use(Router)
//
// export default new Router({
//   mode: 'history',
//
//   routes: [
//     {
//       path: "/",
//       name: "home",
//       component: flowManage
//     },
//     {
//       path: "/flowDesign",
//       name: "flowDesign",
//       component: flowDesign
//     },
//     {
//       path: "/process/prop",
//       name: "processProp",
//       component: ProcessProp,
//       children: [
//         {
//           name: "processListener",
//           path: "listenerCfg/:id",
//           component: ProcessListenerCfg,
//           meta: {
//             keepAlive: true
//           }
//         }
//       ],
//       meta: {
//         keepAlive: true
//       }
//     },
//     {
//       path: "/task/userTask/prop",
//       name: "userTaskProp",
//       component: UserTaskProp,
//       meta: {
//         keepAlive: true
//       }
//     },
//     {
//       path: "/task/manaulTask/prop",
//       name: "manualTaskProp",
//       component: ManualTaskProp,
//       meta: {
//         keepAlive: true
//       }
//     },
//     {
//       path: "/task/scriptTask/prop",
//       name: "scriptTaskProp",
//       component: ScriptTaskProp,
//       meta: {
//         keepAlive: true
//       }
//     },
//     {
//       path: "/task/mailTask/prop",
//       name: "mailTaskProp",
//       component: MailTaskProp,
//       meta: {
//         keepAlive: true
//       }
//     },
//     {
//       path: "/task/serviceTask/prop",
//       name: "serviceTaskProp",
//       component: ServiceTaskProp,
//       meta: {
//         keepAlive: true
//       }
//     },
//     {
//       path: "/task/recieveTask/prop",
//       name: "recieveTaskProp",
//       component: RecieveTaskProp,
//       meta: {
//         keepAlive: true
//       }
//     },
//     {
//       path: "/task/businessRuleTask/prop",
//       name: "businessRuleTaskProp",
//       component: BusinessRuleTaskProp,
//       meta: {
//         keepAlive: true
//       }
//     },
//     {
//       path: "/task/callActivityTask/prop",
//       name: "callActivityTaskProp",
//       component: CallActivityTaskProp,
//       meta: {
//         keepAlive: true
//       }
//     },
//     {
//       path: "/connection/prop",
//       name: "connectionProp",
//       component: ConnectionProp,
//       meta: {
//         keepAlive: true
//       }
//     },
//     {
//       path: "/subProcess/prop",
//       name: "subProcessProp",
//       component: SubProcessProp,
//       meta: {
//         keepAlive: true
//       }
//     },
//     {
//       path: "/export",
//       name: "export",
//       component: ExportXML,
//       meta: {
//         keepAlive: true
//       }
//     },
//     {
//       path: "/import",
//       name: "import",
//       component: ImportXML,
//       meta: {
//         keepAlive: true
//       }
//     }
//   ]
// });
//
