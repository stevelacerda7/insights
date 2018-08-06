const c = require('./src/constants');

module.exports = {
  getMenu : function(){

  },
  register : function(){

  },
  unregister : function(){

  },
  getRoutes : function(){
    return require('./src/route');
  },
  getNavigationProps : function(){
    return {
      text : n.__(c.constants.display_name, 't'),
      value : '/dashboard/insights'
    };
  }
};