import Index from './object';


module.exports = {
  path:'/dashboard/insights',
  component: require('./index'),
  indexRoute : { component: Index },
  onEnter : function(nextState, replace){
    
  },
  childRoutes: [
    // { path: '/dashboard/insights/smart-city', component: Index },
  ]
};