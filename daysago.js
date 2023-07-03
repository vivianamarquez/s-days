function COUNT_DAYS_IN_LAST_180(data, por) {
    if (por == 'latest') {
        por = new Date(data[data.length-1][2]); // Fetching the latest exit date
    } else if (por == 'today') {
        por = new Date(); // Today's date
    } else {
        por = new Date(por); // User-entered date
    }
    por.setHours(0, 0, 0, 0); // Set time to 00:00:00
    
    var daysago180 = new Date(por.getTime());
    daysago180.setDate(por.getDate() - 180); // Subtract 180 days
    daysago180.setHours(0, 0, 0, 0); // Set time to 00:00:00

    var cnt = 0;
    for (var i = 0; i < data.length; i++) {
        var entry = new Date(data[i][0]);
        entry.setHours(0, 0, 0, 0); // Set time to 00:00:00
        var exit = new Date(data[i][2]);
        exit.setHours(0, 0, 0, 0); // Set time to 00:00:00

        if (exit < daysago180 || entry > por) {
            continue;
        } else {
            if (entry < daysago180) entry = daysago180;
            if (exit > por) exit = por;
            
            entry.setHours(0, 0, 0, 0);
            exit.setHours(0, 0, 0, 0);
            
            var number_of_days = Math.ceil((exit - entry)/(1000*60*60*24)) + 1; // Calculate the difference in days
            cnt += number_of_days;
        }
    }
    return cnt;
}
