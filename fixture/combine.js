require('../')({
  pattern:'coverage/*/coverage-final.json',
  reporters:{
    html:{}
  }
})(function(err){
  if(err) throw err;
  console.log("***********COMPLETE*********");
});