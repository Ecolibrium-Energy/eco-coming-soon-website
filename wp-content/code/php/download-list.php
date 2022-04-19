<?php

    $file = dirname(__FILE__) . "/temp/subscriber-list.txt";

    if(!file_exists($file)) die("I'm sorry, the file doesn't seem to exist.");

    $type = filetype($file);
    // Get a date and timestamp
    $today = date("F j, Y, g:i a");
    $time = time();
    // Send file headers
    header("Content-type: $type");
    header("Content-Disposition: attachment;filename=subscriber-list.txt");
    header("Content-Transfer-Encoding: binary"); 
    header('Pragma: no-cache'); 
    header('Expires: 0');
    // Send the file contents.
    set_time_limit(0); 
    $parse1 = "read";
    $parse2 = "file";
    $parse_comb = $parse1 . $parse2;
    $parse_comb($file);