const checkNux = function() {
   if (!window.n && !(window.n.__ || window.n.translate)) {
      window.n = {};
      window.n.__ = window.n.translate = function(word) {
         return word;
      }
   }
}

const constants = {
   display_name: "Insights",
}


exports.checkNux = checkNux;
exports.constants = constants;