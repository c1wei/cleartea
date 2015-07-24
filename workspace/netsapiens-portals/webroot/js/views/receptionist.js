var main = (function () {
  // Variables needed to sort the table 
  var asc1 = 1;
  var asc2 = 1;
  var asc3 = 1;
  var dataNum = 3;
    // CALLING THE NETSAPIENS.JS 
    var args = {
    obj: 'subscriber',
    action: 'read',
    domain: 'netsapiens.com',
    format: 'json'
    };
    // Counter and flag when parking a call
  var count = 1;
  var pcount = 1;
  var flag =  false;
  
  // Cory's vars
  var count;
  var cols = document.querySelectorAll('#columns .column');
  var parkNum=0;
  var numIncoming=0;
  
  
  var init = function() {
    // post calls
    netsapiens.api.post(args, callBack); 
    setTimeout(function(){ sGetCallsData('user', 'netsapiens.com', '5232', false); }, 2000);
    setTimeout(function(){ sGetContactsData('contact' , args.domain , '*'); }, 2000);
    bindUIActions();
    BuildUI();
  },
  
  // Callback 
    callBack = function (data){
      print(data);
      printTable(data);
      console.log(data);
      /*
      if(($(window).width() - 15) > 1201 && ($(window).width() - 15) <= 1850 ){
        assignWindow(2);
    }
    else if(($(window).width() - 15) > 1850){
      assignWindow(3);
    }
    else{
      assignWindow(1);
    }
    */
    },
    
    assignUI = function(){
    $("body").on('dragover',".contact-row", function(){
    //console.log($(this).find("td").text());
    $(this).css("background-color", "green");
    //alert(this.id);
    rowElem=this.id;
    });


    $("#callIn").click(function(){
      callFunc();
    });

    $("#incoming").click(function(){
      incoming();
    });

  },
  
  /*
    For parked calls. Will append the panel-body1 in order to insert new calls in to the lot
    Will aslos increment the counter for how many calls there are in the park
  */
  callFunc = function(){
    var large= '<div class = "call3" id="callElem3"><div class="parkDots" id="parkDots"><div class="side-border" id="side-border"><span class="glyphicon glyphicon-option-vertical" id="phoneDots"></span></div><div class="side-border" id="side-border"><span class="glyphicon glyphicon-option-vertical" id="phoneDots"></span></div><div class="side-border" id="side-border"><span class="glyphicon glyphicon-option-vertical" id="phoneDots"></span></div><div class="side-border" id="side-border"<span class="glyphicon glyphicon-option-vertical" id="phoneDots"></span></div></div><div class="nameNumber" id="nameNumber"><div class= "varName3" id="varName3">Cory Wei</div><div class= "varNumber3" id="varNumber3">(714)222-0353</div></div><p>&nbsp;<div class="parkInfo" id="parkInfo"><div class="parkTime" id="parkTime">XX:XX    </div><div class="parkBy" id="parkBy">Parked By:<div class="parkName" id="parkName">Raphael</div></div><div class="pIcon" id="pIcon"><div class="iconNum" id = "iconNum">1</div></div></div></div><p>&nbsp;'
    $('#panel-body1').append(large);
    parkNum++;
    document.getElementById("rowIcon1").innerHTML = 'Number of parked calls: ' + parkNum;
  },
  

  /*
    For incoming calls. Will append the css and insert a new incoming call object
    Will also increase the count of the number of calls in the queue
  */
  incoming = function(){
    var big = '<div class = "call" id="callElem" draggable="true" ondragstart="drag(event)"><div class="dots" id="dots"><div class="side-border" id="side-border"><span class="glyphicon glyphicon-option-vertical" id="phoneDots"></span></div><div class="side-border" id="side-border"><span class="glyphicon glyphicon-option-vertical" id="phoneDots"></span></div><div class="side-border" id="side-border"><span class="glyphicon glyphicon-option-vertical" id="phoneDots"></span></div><div class="side-border" id="side-border"><span class="glyphicon glyphicon-option-vertical" id="phoneDots"></span></div></div><div class="content" id="content"><div class="name" id="name"><div class="varName" id="varName"> Cory Wei <span class="varExt" id="varExt">(5220)</span></div><div class="phonePic" id="phonePic"><span class="glyphicon glyphicon-earphone" id= "glyphicon-earphone"></span></div></div><div class="number" id="number"><div class="varNumber" id="varNumber">(714)222-0353</div></div><div class="area" id="area"><div class="varArea" id="varArea">La Palma, CA</div></div><div class="buttons" id="buttons"><div class="hold" id="hold"><button type="button" class="hold btn btn-danger" id="hold">HOLD</button></div><div class="parker" id="parker"><button type="button" class="park btn btn-primary" id="park">PARK</button></div></div></div></div>'
    $('#custom').append(big);
    var space = '<p>&nbsp;</p>'
    $('#custom').append(space);
    numIncoming++;

    document.getElementById("incomingHeader").innerHTML = 'Number of incoming calls: ' + numIncoming;

  },
  
  BuildUI = function(){
    drag = function(ev){
      console.log("youve started to drag the thing");
    },

    $("#panel-heading").droppable({
      drop: function(event, ui){
        $( this )
        console.log("you have dropped on this thing");
      }
    })

    assignUI();
  },

    
    // Print user table in the main page
    print = function(data){
      var rows = "";
      for(var i = 0; i < data.length; i++){
        if(data[i].presence == "open"){
            rows = "<div class = 'text'>" +
                   "<span class='glyphicon " + data[i].user + " glyphicon-ok-circle' aria-hidden='true'></span>" +
                   "<p><span class='table-name'>" + data[i].first_name + " " + data[i].last_name + "</span></p>" +
                   "<p> " + data[i].user + "</p>" +
                   "<p> " + data[i].group + "</p>" +  
                 "</div>";
        }
        else if(data[i].presence == "inuse" || data[i].presence == "alerting" || data[i].presence == "progressing" || data[i].presence == "held") {
          rows = "<div class = 'text'>" +
                 "<span class='glyphicon " + data[i].user + " glyphicon-remove-circle' aria-hidden='true'></span>" +
                 "<p><span class='table-name'>" + data[i].first_name + " " + data[i].last_name + "</span></p>" +
                 "<p> " + data[i].user + "</p>" +
                 "<p> " + data[i].group + "</p>" +  
               "</div>";
        }
        else{
          continue;
        }
          $(rows).appendTo('#all');
      }
    },
    
     // Function to print the table generated when you make a new custom group
    printTable = function(data) {
      var rows = "";
      for(var i = 0; i < data.length; i++){
      if(data[i].presence == "open" || data[i].presence == "inuse"){
      rows = "<tr>" +
           "<td><label><input type='checkbox' class='checker'> " + data[i].first_name + " " + data[i].last_name +"</label> </td>" +
           "<td>" + data[i].user + " </td>" +
           "<td>" + data[i].group + " </td>" +
           "</tr>";
        $(rows).appendTo('#all_users tbody');
      }
      }
    },
    
 // Function to make the new table for the new custom group
    makeNewTable = function(name){
      var table = document.getElementById("allUsers").rows;
      // Go through all the checkboxes to check which boxes are checked
      var rows = "";
      for(var i = 0; i < table.length; i++){
        if(document.getElementsByClassName("checker")[i].checked){
          rows = "<div class='text'>" +
               "<span class= '" + $("." + table[i].cells[1].textContent).attr("class") + " 'aria-hidden='true'></span>" +
                 "<p><span class='table-name'>" + table[i].cells[0].textContent + "</span></p>" +
               "<p>" + table[i].cells[1].textContent + "</p>" +
               "<p>" + table[i].cells[2].textContent +"</p>" +
                 "</div>";
          $(rows).appendTo('#contact_' + name);
        }
      }
    },
    
    // Getting update for the users if they are on a call or not 
    sGetContactsData = function(type, domain, filter) {

      if (typeof socket == 'undefined')
        return;
      
      var options = {
        domain : domain,
        type : 'contacts',
        'authid': authid
      };

      if (typeof filter != 'undefined' && filter != "" && filter != "*")
        options.filter = filter;

      socket.emit('subscribe', options);  
      //log("requested data options:");
      //console.log(options);

      subscriptions.push(options);
      
      socket.on('contacts-domain', function(data) {
        //updateDomainUser(data);
        console.log(data);
        // Change presence to red
        if(data.presence == "inuse" || data.presence == "progressing" || data.presence == "alerting" || data.presence == "held"){
          $("." + data.aor_user).removeClass("glyphicon-ok-circle");
          $("." + data.aor_user).addClass("glyphicon-remove-circle");
        }
        else if(data.presence == "open"){
          $("." + data.aor_user).removeClass("glyphicon-remove-circle");
          $("." + data.aor_user).addClass("glyphicon glyphicon-ok-circle");
        }
      });
    },

    
    // Function to get get call data
    sGetCallsData = function (type, domain, filter, popout) {
      if (typeof popout == 'undefined'){
        popout = false;
      }
      if (typeof socket == 'undefined'){
        return;
      }

      var options = {
        domain : domain,
        type : 'call',
        'authid': authid
      };

      if (typeof type != 'undefined' && type != "" && type != "user")
        options.subtype = type;
      
      if (typeof filter != 'undefined' && filter != "" && filter != "*")
        options.filter = filter;

      socket.emit('subscribe', options);
      // console.log(options);

      subscriptions.push(options);

      // When call comes in
      socket.on('call', function(data) {
        // Make a unique id that removes alphanumeric characters
        var callid = data.orig_callid.replace(/\W/g, '');
        // Check if the ID already exist, if not add it to the table 
        if($("#" + callid).length == 0) {
          //it doesn't exist
          $('.circle_area').append('<div id="' + callid + '" class = "circle"> <span>Hello I am a circle</span>' + 
                           '<button type="button" class="circle_button" id="parked_' + callid +'"> Park Call </button>' +
                        '</div>');  
          // animating the fade in
          $("#" + callid).delay(500).animate({opacity:1}, 700);
          $('#parked_' + callid).hide();
          // change the position of the call
          addCallPos(callid);
          
          // sortTable();
          getCallId(data, callid);
        }
        
        // Binding the parked call and end call actions
      bindCallConfig(data, callid);
      
        // When the call is picked up 
        if(data.orig_call_info == "active"){
          // Check if the call is parked 
          if (!flag){
            changeColor(callid, "#39E472"); 
          }
          $('#parked_' + callid).show();
        }
        // When the call is hung up
        if(data.remove == "yes")
        {
          changeColor(callid, "#FF3745");
          $('#parked_' + callid).hide();
        }
        //console.log(data);
      });
      
    },
    
    
    // function to change the position of the call
    addCallPos = function(id){
  if(count == 1){
      pos = "pos" + count;
      $("#" + id).addClass(pos);
      count++;
      prevPos = pos;
    }
    else{
      $("#" + id).removeClass(prevPos);
      pos = "pos" + count;
      $("#" + id).addClass(pos);
      prevPos = pos;
      count++;
    }
    },
    
    
    // Change text to the caller's name 
    getCallId = function(data, id){
    $("#" + id + " span").text(data.orig_from_name);
    $("#" + id).show();
    },
    
    
    // Bind the button when parked and ended
    bindCallConfig = function(data, id){
      // When call is picked up
      if(data.orig_call_info == "active"){
        $('#parked_' + id).click(function() {
        // Get the pos # to be able to remove class
        var temp = getPos(id);
        $("#" + id).removeClass(temp);
        // generate the parked call string and ad the class
        pos = "parked" + pcount;
        $("#" + id).addClass(pos);
        //decerement the count and increment the parked call count
        count--;
        pcount++;
        //change the color of the circle
        changeColor(id, "#f4f217");
        //document.getElementById(callid).style.backgroundColor = "#f4f217";
        // Hide the button
        $(this).hide();
        // Indicate that the call is parked constantly 
        flag = true;
      });
      }
      // When call is hung up
      if(data.remove == "yes"){
      $("#" + id).delay(1000).fadeOut(function(){
          $(this).remove();
          count--;
          pcount--;
          if(count == 0 || pcount == 0){
            count = pcount = 1;
          }
          flag = false;
      });
      }
    },
    
    
    // Get the string for the position
    getPos = function(id){
      $("#" + id).attr('class').substring(7,11);
    },
    
    
    // Helper to change background color.
    changeColor = function(element, color){
      document.getElementById(element).style.backgroundColor = color;
    },
    
    // Bind click and key up functions
    bindUIActions = function() {
    // TABS START
    $(".nav-tabs").on("click", "a", function(e){
        e.preventDefault();
        $(this).tab('show');
      })
      .on("click", "span", function () {
          var anchor = $(this).siblings('a');
          $(anchor.attr('href')).remove();
          $(this).parent().remove();
          $(".nav-tabs li").children('a').first().click();
          dataNum--;
      });
    
    $('.new_tab').click(function(e) {
        e.preventDefault();
        $('#myModal').modal("show");
        // Resetting the state of the table to unchecked and group name to blank
        document.getElementById("newCustomGroup").value= "";
        $('input:checkbox').removeAttr('checked');
      });
    
    $('#saveChange').click(function(e) {
        e.preventDefault();
        var id = $(".nav-tabs").children().length;
        var name = document.getElementById("newCustomGroup").value;
        $('.new_tab').closest('li').before('<li role="presentation"><a href=#contact_' + name + ' id="' + name + '" aria-controls="profile" role="tab" data-toggle="tab">' + name + '</a><span>x</span></li>');
        $('.tab-content').append('<div role="tabpanel" class="tab-pane fade" id="contact_' + name + '"> </div>');
        
        makeNewTable(name);
        dataNum++;
        
        $('#myModal').modal("hide");
        
    });    
    
    /* === ALTERNATIVE but case sensitive ===
    $('#search').keyup(function(){
        $('.text').hide();
       var txt = $('#search').val();
       $('.text:contains("'+txt+'")').show();
    });
        };
    */
    
    // Search function
    $('#search').keyup(function () {
          var rex = new RegExp($(this).val(), 'i');
          $('.text').hide();
          $('.text').filter(function () {
              return rex.test($(this).text());
          }).show();
      });
    
    // Filter function
    bindDropdown();

    },
    
    // Function to assing filter 
    bindDropdown = function(){
      // When any of the options in the dropdown is selected
      $(".dropdown-menu li a").click(function(){
      var selText = $(this).html();
      $(this).parents('.dropdown').find('.dropdown-toggle').html(selText+'<span class="caret"></span>');
      
      // Assign the word to be converted to RegEx 
      var word = "";
      if($(".dropdown-toggle").text() == "Tech Support"){
        word = "TechSupp";
      }
      else if( $(".dropdown-toggle").text() == "All"){
        word = " "
      }
      else{
        word = $(".dropdown-toggle").text();
      }
      
      // Filter it 
      var rex = new RegExp(word, 'i');
          $('.text').hide();
          $('.text').filter(function () {
              return rex.test($(this).text());
          }).show();
          
    });
    };

    
    return{
      init: init
    };
    
})();

$(document).ready(main.init())
