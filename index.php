<?php

$config = require_once 'config.php';
require_once 'functions.php';
require_once 'classes/Db.php';
require_once 'classes/Pagination.php';

$db = (Db::getInstance()->getConnection($config['db']));
$page = $_GET['page'] ?? 1;
$total = get_count('city');
$per_page = $config['per_page'];
$pagination = new Pagination((int)$page, $per_page, $total);
$start = $pagination->get_start();
$cities = get_cities($start, $per_page);



require_once 'views/index.tpl.php';


