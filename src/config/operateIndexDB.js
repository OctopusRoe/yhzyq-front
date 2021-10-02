/**
 * @author: 谭志顺
 * @description: 操作前端数据库
 * */

const tables = {
  subitemState:"subitem_state",
  wbsInstance:"fj_wbs_instance",
  sectionList:"fj_section_subitem_list",
  process:"fj_process",
  processList:"fj_process_list",
}

const methods = {
  //插入数据
  insert(tableName, data) {
    return new Promise(resolve => {
      window.$DB.then(db => {
        db.insert({
          tableName: tableName,
          data: data,
          success() {
            console.log(tableName + " 添加成功")
            resolve(true);
          }
        });
      });
    })
  },
  //通过主键删除某条数据
  deleteByPrimaryKey(tableName, id) {
    window.$DB.then(db => {
      db.delete_by_primaryKey({
        tableName: tableName,
        target: id,
        success: () => console.log("删除成功")
      });
    });
  },
  //根据主键查询
  selectByprimaryKey(tableName, id, callback) {
    //根据条件查询
    return new Promise(resolve => {
      window.$DB.then(db => {
        db.query_by_primaryKey({
          tableName: tableName,
          //查询条件
          target: id,
          success(res) {
            resolve(callback && callback(res));
          }
        });
      });
    });
  },
  //根据索引查询
  selectDBByindex(tableName, indexName, target, callback) {
    return new Promise(resolve => {
      window.$DB.then(db => {
        db.query_by_index({
          tableName: tableName,
          indexName: indexName,
          target: target,
          success(res) {
            resolve(callback && callback(res));
          }
        });
      });
    });
  },
  //查询所有
  selectAll(tableName, callback) {
    return new Promise(resolve => {
      window.$DB.then(db => {
        db.queryAll({
          tableName: tableName,
          success(res) {
            resolve(callback && callback(res));
          }
        });
      });
    });
  },

  //清空表数据
  clearTable(tableName) {
    window.$DB.then(db => {
      db.clear_table({
        tableName: tableName
      });
    });
  }
};

const wbsInstance = {
  findByList(orgId, parentId, callback){
    return new Promise(resolve => {
      window.$DB.then(db => {
        db.query({
          tableName: tables.wbsInstance,
          condition: (item) => {
            return item.orgId === orgId && item.parentId === parentId && item.tag !== -1
          },
          success: res => {
            resolve(callback && callback(res));
          }
        });
      });
    });
  }
};

const subitemState = {
  getItemByOrgId(orgId, callback){
    return new Promise(resolve => {
      window.$DB.then(db => {
        db.query_by_primaryKey({
          tableName: tables.subitemState,
          target: orgId,
          success: res => {
            resolve(callback && callback(res));
          }
        });
      });
    });
  }
};

export { tables, methods, subitemState, wbsInstance };
