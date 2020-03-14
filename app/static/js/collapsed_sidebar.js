function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
}


function closeNav() {
  // close_other_navs("");
  // sleep(500).then(() => {
  // document.getElementById("mySidebar").style.width = "0";
  // document.getElementById("menu_main").style.marginLeft= "0";
  // });
  
  // Check if all sidebars are collapsed or not
  let other_navs_collapsed = true;
  let all_opts = ["about", "search", "contact"];
  for(opt in all_opts){
    let width = document.getElementById(all_opts[opt]+"_mySidebar").style.width;
    if (width != "0px" && width != "") {
        other_navs_collapsed = false;
        break;
    }
  }

  // If all sidebars are collapsed, immediately collapse main bar
  if (other_navs_collapsed) {
      document.getElementById("mySidebar").style.width = "0";
  // If side bars still open, close them and with a delay close the main bar
  } else {
      close_other_navs("");
      setTimeout(function () {
          document.getElementById("mySidebar").style.width = "0";
          // document.getElementById("menu_main").style.marginLeft= "0";
      }, 400);
  }

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