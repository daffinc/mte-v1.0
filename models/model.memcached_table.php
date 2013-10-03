<?php
class memcached_table extends table{
	function read($fields){
		$time_start = microtime(true);
		if(class_exists('Memcache')){
			$memcache = new Memcache;	
			$memcache->connect('***REMOVED***', 11211) or die ("Could not connect memcache");
			$this->execute = false;
			parent::read($fields);
			$this->execute = true;
			var_dump($this->sql);
			$query_hash = sha1($this->sql);
			var_dump($query_hash);
			if($result = $memcache->get($query_hash)){				
				$time_end = microtime(true);
				$time = $time_end - $time_start;
				echo 'Memcached: '.$time;
				return $result;
			}else{
				$result = parent::read($fields);				
				$time_end = microtime(true);
				$memcache->set($query_hash,$result,false,0);
				$time = $time_end - $time_start;
				echo "Query from DB:".$time;

				return $result;
			}
		}else{
			return parent::read($fields);
		}		
	}
}
?>