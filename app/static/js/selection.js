selections();

function selections() {
    const cat_label = document.getElementById("cat_label");
    cat_label.style.left = Math.max((150 - cat_label.clientWidth) - 10, 0).toString() + "px";

    /* Look for any elements with the class "custom-select": */
    var x = [document.getElementById("cat_div"), document.getElementById("search_cats_container")];
    for (var i = 0; i < x.length; i++) {
      var selElmnt, a, b, c;
      selElmnt = x[i].getElementsByTagName("select")[0];
      /* For each element, create a new DIV that will act as the selected item: */
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (var j = 0; j < selElmnt.length; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            /* When an item is clicked, update the original select box,
            and the selected item: */
            var y, m, k, s, h;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            h = this.parentNode.previousSibling;
            for (m = 0; m < s.length; m++) {
              if (s.options[m].innerHTML == this.innerHTML) {
                s.selectedIndex = m;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("same-as-selected");
                for (k = 0; k < y.length; k++) {
                  y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                break;
              }
            }
            h.click();
        });
        // If category filter menu, add listener for changing selection value and call change_category()
        if (i == 0) {
            const elem = c;
            elem.addEventListener("click", function(e) {
                document.getElementById("general_cats").value = e.target.innerText;
        		change_category();
            });
        // If search menu, set selection value
        } else if (i == 1) {
            const elem = c;
            elem.addEventListener("click", function(e) {
                document.getElementById("search_cat").value = e.target.innerText;
                change_search_cat();
            });
        }
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function(e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
      // For the category filter menu, put options above
      if (i == 0) {
          const opts = b;
          a.addEventListener("click", function(e) {
              opts.style.top = "-" + (opts.clientHeight-1).toString() + "px";
          });
      }
    }
}


function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
