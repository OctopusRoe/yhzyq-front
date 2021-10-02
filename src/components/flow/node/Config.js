let Server_Host = "http://localhost:8080";
let Config = {
  Url: {
    Save_Wf: Server_Host + "/bpm/api/process/deploy",
    Get_Task_Listener_Classes: Server_Host + "/bpm/api/listener/taskListener/list",
    Get_Execution_Listener_Classes: Server_Host + "/bpm/api/listener/executionListener/list",
    Get_Process_Listener_Classes: Server_Host + "/bpm/api/listener/executionListener/list",
    Get_Flow_Listener_Classes: Server_Host + "/bpm/api/listener/executionListener/list"
  },

};
Image = {
  Event_Start_Ico: "/static/icons/type.startevent.none.png",
  Event_End_Ico: "/static/icons/type.endevent.none.png",
  User_Task_Ico: "/static/icons/type.user.png",
  Manual_Task_Ico: "/static/icons/type.manual.png",
  Script_Task_Ico: "/static/icons/type.script.png",
  Mail_Task_Ico: "/static/icons/type.send.png",
  Service_Task_Ico: "/static/icons/type.service.png",
  Receive_Task_Ico: "/static/icons/type.receive.png",
  Business_Rule_Ico: "/static/icons/type.business.rule.png",
  Call_Activity_Ico: "/static/icons/callactivity.png",
  Sub_Process_Ico: "/static/icons/type.subprocess.expanded.png",
  Parallel_Gateway_Ico: "/static/icons/type.gateway.parallel.png",
  Exclusive_Gateway_Ico: "/static/icons/type.gateway.exclusive.png"
}
export default {
  Image
}
