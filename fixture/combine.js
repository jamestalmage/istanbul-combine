require('../')(
  {
    pattern:'coverage/*/coverage-final.json',
    reporters:{
      html:{}
    }
  },
  function(err){
    if(err) throw err;
    console.log("***********ASYNC COMPLETE*********");
  }
);

console.log("*********STARTING SYNC**************");

require('../').sync({
  pattern:'coverage/*/coverage-final.json',
  reporters:{
    html:{}
  }
});
console.log("***********SYNC COMPLETE**************");