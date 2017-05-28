/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    const TOTAL_DAYS = 12;

    var model = {
        // Attendance register
        attendance: {
            'Slappy the Frog': [],
            'Lilly the Lizard': [],
            'Paulrus the Walrus': [],
            'Gregory the Goat': [],
            'Adam the Anaconda': []
        },

        getRandom: function() {
            // Generate random true or false values
            return (Math.random() >= 0.5);
        },

        initializeAttendance: function() {
            // Populate the attendance register of each student
            // with true or false values
            console.log('    Creating attendance records...');
            // console.log(this);

            for (var student in this.attendance) {
                // console.log(student);
                for (var day = 0; day < TOTAL_DAYS; day++){
                    this.attendance[student].push(model.getRandom());
                }
            }
        },

        init: function() {
            console.log('Initializing model...');

            if (localStorage.getItem('attendanceData') !== null) {
                console.log('    Loading attendance records from localStorage...');
                this.attendance = JSON.parse(localStorage.getItem('attendanceData'));
            }
            else {
                this.initializeAttendance();
            }

            console.log('Model initialized');
            console.log(this);
        },

        save: function() {
            // Save model to localStorage
            console.log('Saving data to localStorage...');
            localStorage.setItem('attendanceData', JSON.stringify(this.attendance));
        }
    };

    var octopus = {
        init: function() {
            model.init();
            // model.save(); // This is just for tseting
            viewHeader.init();
        },

        getAttendance: function(name) {
            // Get the attendance of student, 'name'.
            return model.attendance[name];
        },
    };

    var viewHeader = {
        init: function() {
            this.render();
        },

        render: function() {
            // Render the header
            var trHeader = $('#tr-header');
            var headerContents = '';

            headerContents += '<th class="name-col">Student Name</th>';
            for (var i = 0; i < TOTAL_DAYS; i++) {
                headerContents += '<th>';
                headerContents += i + 1;
                headerContents += '</th>';
            }
            headerContents += '<th class="missed-col">Days Missed-col</th>';
            console.log(headerContents);

            trHeader.html(headerContents);
        }
    };

    octopus.init();


}());
