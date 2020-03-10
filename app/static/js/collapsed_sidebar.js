function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  //document.getElementById("menu_main").style.marginLeft = "250px";
}

function closeNav() {
  close_search_Nav();
  close_filter_Nav();
  sleep(500).then(() => {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("menu_main").style.marginLeft= "0";
  });
}

function close_search_Nav() {
  document.getElementById("search_mySidebar").style.width = "0";
  //document.getElementById("menu_main").style.marginLeft = "250px";
}


function close_filter_Nav() {
  document.getElementById("filter_mySidebar").style.width = "0";
 
}

function open_search_nav(){
  console.log("Search pressed...................")
  close_filter_Nav();
  document.getElementById("search_mySidebar").style.width = "250px";
  //document.getElementById("menu_main").style.marginLeft = "500px";
}

function open_filter_nav(){
  close_search_Nav();
  console.log("filter pressed...................")
  document.getElementById("filter_mySidebar").style.width = "250px";
  //document.getElementById("menu_main").style.marginLeft = "500px";
}