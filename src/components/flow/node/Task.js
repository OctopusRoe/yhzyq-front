import {
  UserTask,
  ServiceTask,
  ScriptTask,
  ReceiveTask,
  ManualTask,
  MailTask,
  CallActivityTask,
  BusinessRuleTask
} from "../task"

export const createTask = (type) => {
  if (type === "Task.UserTask") {
    return UserTask.newInstance();
  }
  if (type === "Task.ManualTask") {
    return ManualTask.newInstance();
  }
  if (type === "Task.ScriptTask") {
    return ScriptTask.newInstance();
  }
  if (type === "Task.MailTask") {
    return MailTask.newInstance();
  }
  if (type === "Task.ServiceTask") {
    return ServiceTask.newInstance();
  }
  if (type === "Task.ReceiveTask") {
    return ReceiveTask.newInstance();
  }
  if (type === "Task.BusinessRuleTask") {
    return BusinessRuleTask.newInstance();
  }
  if (type === "Task.CallActivity") {
    return CallActivityTask.newInstance();
  }
  return null;
}

export const Task = {
  UserTask,
  ServiceTask,
  ScriptTask,
  ReceiveTask,
  ManualTask,
  MailTask,
  CallActivityTask,
  BusinessRuleTask
}
