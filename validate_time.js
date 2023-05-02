// ╔═════════════════════════════════════════════════════════════════════════╗
// ║                                                                         ║
// ║ validate_time.js                                                        ║
// ║ Joshua Lee Ockert, 2023                                                 ║
// ║                                                                         ║
// ║ This file is hereby dedicated to the public domain.                     ║
// ║                                                                         ║
// ║ Permission to use, copy, modify, and/or distribute this work for any    ║
// ║ purpose is hereby granted, without precondition or royalty.             ║
// ║                                                                         ║
// ║ THIS WORK IS PROVIDED "AS IS" WITH NO WARRANTY OF ANY KIND. THE IMPLIED ║
// ║ WARRANTIES OF MERCHANTABILITY, FITNESS, NON-INFRINGEMENT, AND TITLE ARE ║
// ║ EXPRESSLY DISCLAIMED. NO AUTHOR SHALL BE LIABLE UNDER ANY THEORY OF LAW ║
// ║ FOR ANY DAMAGES OF ANY KIND RESULTING FROM THE USE OF THIS WORK.        ║
// ║                                                                         ║
// ╚═════════════════════════════════════════════════════════════════════════╝
function miltime_to_civtime(hhmm) {
    hr = hhmm.substring(0,2);
    mm = hhmm.substring(2);

    if (parseInt(hr) < 12) ap = "AM";
    else ap = "PM"

    if (hr == "00") hr = "12";
    if (parseInt(hr) > 12) hr = "" + (parseInt(hr) - 12);

    if (hr.substring(0,1) == "0") hr = hr.substring(1);

    return (hr + ":" + mm + " " + ap);
}


function validate_time(time) {
    timeorig = time;
    time = time.toLowerCase();

    // Get any letters
    if (time.match(/[a-z]+/g)) timeltrs = time.match(/[a-z]+/g).join('');
    else                       timeltrs = "";

    // Get digits (if none, half heartedly try reading English... or fail)
    if (time.match(/[0-9]+/g))           timedigs = time.match(/[0-9]+/g).join('');
    else if (timeltrs.match("noon"))     timedigs = "1200";
    else if (timeltrs.match("midnight")) timedigs = "0000";
    else if (timeltrs.match("one"))      timedigs = "100";
    else if (timeltrs.match("two"))      timedigs = "200";
    else if (timeltrs.match("three"))    timedigs = "300";
    else if (timeltrs.match("four"))     timedigs = "400";
    else if (timeltrs.match("five"))     timedigs = "500";
    else if (timeltrs.match("six"))      timedigs = "600";
    else if (timeltrs.match("seven"))    timedigs = "700";
    else if (timeltrs.match("eight"))    timedigs = "800";
    else if (timeltrs.match("nine"))     timedigs = "900";
    else if (timeltrs.match("ten"))      timedigs = "1000";
    else if (timeltrs.match("eleven"))   timedigs = "1100";
    else if (timeltrs.match("twelve"))   timedigs = "1200";
    else  {
        console.log("INPUT: '" + timeorig + "'  -->  Returning false");
        return false;
    }

    // Look for a valid time
    if (timedigs.match(/^(20|21|22|23|[0-1][0-9])[0-5][0-9]$/))  hhmm = timedigs.match(/^(20|21|22|23|[0-1][0-9])[0-5][0-9]$/)[0];
    else if (timedigs.match(/^[0-9][0-5][0-9]$/))                hhmm = timedigs.match(/^[0-9][0-5][0-9]$/)[0];
    else if (timedigs.match(/^(20|21|22|23|[0-1][0-9])$/))       hhmm = timedigs.match(/^(20|21|22|23|[0-1][0-9])$/)[0] + "00";
    else if (timedigs.match(/^[0-9]$/))                          hhmm = timedigs.match(/^[0-9]$/)[0] + "00";
    else  {
        console.log("INPUT: '" + timeorig + "'  -->  Returning false");
        return false;
    }

    // Check if letters contain am/pm information
    if      (timeltrs == "pm") pm = 1;
    else if (timeltrs == "am") pm = 0;
    else if (timeltrs == "p")  pm = 1;
    else if (timeltrs == "a")  pm = 0;
    else if (hhmm[0]  == "0")  pm = 0;
    else                       pm = -1

    // If pm, add 1200 to hours for military time
    hhmm = parseInt(hhmm);
    if      (pm==1  && hhmm<1200)               hhmm = hhmm + 1200;
    else if (pm==0  && hhmm>=1200 && hhmm<1300) hhmm = hhmm - 1200;
    else if (pm==-1 && hhmm>=100  && hhmm<600)  hhmm = hhmm + 1200;
    hhmm = ("000" + hhmm).slice(-4);

    console.log("INPUT: '" + timeorig + "'  -->  Returning '" + hhmm + "'");
    return hhmm;
}
