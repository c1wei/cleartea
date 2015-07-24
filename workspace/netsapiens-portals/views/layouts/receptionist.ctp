<!DOCTYPE html>
<html lang="en">

<head>

	<title>
	
	</title>
	 <link rel="stylesheet" href="/portal/css/bootstrap-3.3.2.min.css" type="text/css">
	 <link rel="stylesheet" href="/portal/css/receptionist.css" type="text/css">
	 
</head>



<body> 

        
	<?php echo $content_for_layout; ?>
</body>

<!-- JavaScript
    ================================================== -->

	<script src="/portal/cjs/jquery-1.11.2.min.js<?php echo $ver?>"></script>
    <script src="/portal/cjs/jquery-ui.min.js<?php echo $ver?>"></script>
    <script src="/portal/webroot/js/bootstrap-3.3.2.min.js<?php echo $ver?>"></script> 
    <script src="/portal/webroot/js/netsapiens.js"></script>

	<script type="text/javascript" src= "/portal/js/views/receptionist.js"></script>
       
 <!--AAKER STUFF -->
 <?php 

$socket_url = 'https://'.$this->Uiconfig->getUiConfig("PORTAL_SOCKET_HOSTNAME",$_SERVER["HTTP_HOST"]) .':8001';
// $socket_url = 'https://'.'corp.netsapiens.com' .':8001';

$socket_posfix = '/socket.io/socket.io.js';

$v2 = preg_replace("/[^A-Za-z0-9 ]/", '',  '%VERSION_NUMBER%');

if ($v2 == "VERSIONNUMBER" )
$v2 =time();
$v2 = str_replace(" ","",$v2);
$v2 = str_replace("-","",$v2);
$v2 = str_replace(".","",$v2);
if ($this->Uiconfig->isUiConfig("PORTAL_SOCKET_ADD_VERSION","yes"))
$socket_posfix = '/socket.io/socket.io.v'. $v2.'.js';

$js_url = $socket_url .$socket_posfix;

$date = date_create();
$node_session_id= str_replace("/","",$_SERVER['REDIRECT_URL']).date_timestamp_get($date).$this->Session->read('sub_user');
$domain = $this->Session->check('orig_domain')?$this->Session->read('orig_domain'):$this->Session->read('sub_domain');
$sub_user = $this->Session->check('orig_user')?$this->Session->read('orig_user'):$this->Session->read('sub_user');

$userAgent = $_SERVER['HTTP_USER_AGENT'] ;
Cache::write($node_session_id,$domain." ".$userAgent,'_node_auth_');


?>
<script type="text/javascript" src="<?php echo $js_url;?>"></script>
<script>
try 
{
//io.enable('browser client minification');  
//io.enable('browser client etag');          
//io.enable('browser client gzip');        
var socket = io.connect('<?php echo $socket_url;?>', {
secure : true

});

var authid = '<?php echo $node_session_id ?>';
var subscriptions = [];

var options1 = {
domain : sub_domain,
type : 'chat',
user : sub_user,
'authid': authid
};
socket.on('reconnect', function(){
   log('...reconnected');
   log(subscriptions);
   for (var i = 0; i < subscriptions.length; i++) {
  socket.emit('subscribe', subscriptions[i]);
     
   }
   }); 
}
catch (e){};
</script>
</html>
<?php

?>