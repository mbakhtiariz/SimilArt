function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
}


function closeNav() {
  close_other_navs("");
  sleep(500).then(() => {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("menu_main").style.marginLeft= "0";
  });
}



function close_other_navs(selected_opt) {
  all_opts = ["about", "search", "contact"];
  for(opt in all_opts){
    if(all_opts[opt] != selected_opt){
      selected_id = all_opts[opt]+"_mySidebar";
      document.getElementById(selected_id).style.width = "0"
    }
  }
}


function open_selected_nav(selected_opt){
  close_other_navs(selected_opt);
  selected_id = selected_opt+"_mySidebar";
  document.getElementById(selected_id).style.width = "250px";
}