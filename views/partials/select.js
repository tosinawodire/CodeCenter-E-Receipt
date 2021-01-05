$(function(){
  //button select all or cancel
  $("#select-all").click(function () {
      var all = $("input.select-all")[0];
      all.checked = !all.checked
      var checked = all.checked;
      $("input.select-item").each(function (index,item) {
          item.checked = checked;
      });
  });
  //column checkbox select all or cancel
  $("input.select-all").click(function () {
      var checked = this.checked;
      $("input.select-item").each(function (index,item) {
          item.checked = checked;
      });
  });
  //check selected items
  $("input.select-item").click(function () {
      var checked = this.checked;
      var all = $("input.select-all")[0];
      var total = $("input.select-item").length;
      var len = $("input.select-item:checked:checked").length;
      all.checked = len===total;
  });
  
});

